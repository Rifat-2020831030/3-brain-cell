import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import icons from "../../assets/icons/Icons";
import ScrollableEvent from "../../shared/components/ScrollableEvent";
import { getOngoingDisasters } from "../data/DisasterMangement";
import Analytics from "./sub-page/Analytics";
import CenterPanel from "./sub-page/CenterPanel";
import DisasterManagement from "./sub-page/DisasterManagement";
import Emergency from "./sub-page/Emergency";
import LeftPanel from "./sub-page/LeftPanel";
import RightPanel from "./sub-page/RightPanel";
import OrgManagement from "./sub-page/OrgManagement";
import Resources from "./sub-page/Resources";

const CoordinatorDashboard = ({ activeSection }) => {
  const [active, setActive] = useState(activeSection || "home"); // active is set based on path after /dashboard/coordinator
  const [ongoingDisaster, setOngoingDisaster] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    disaster_id: "",
    location: "",
    title: "",
    startDate: "",
    type: "",
    description: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);

  const onGoingDisasters = async () => {
    try {
      setLoading(true);
      const response = await getOngoingDisasters();
      setLoading(false);
      if (response.status) {
        const disasters = response.disasters;
        setOngoingDisaster(disasters);
        setCurrentEvent(disasters[0] || null);
        toast.success("Ongoing disasters updated successfully");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch ongoing disasters");
      console.error("Error fetching ongoing disasters: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    onGoingDisasters();
  }, []);

  const onClickEventHandler = async (info) => {
    // set current disaster
    setCurrentEvent(info);
    toast.info('Seeing details of: ' + info.title, { duration: 2000, color: 'green' });
    // update disaster summary
    // update table
  };

  const eventComponent = (
    <ScrollableEvent
      loading={loading}
      ongoingEventData={ongoingDisaster}
      heading={"Ongoing Disasters →"}
      onClickEventHandler={onClickEventHandler}
      currentEvent={currentEvent}
      isCoordinator={true}
    />
  );

  const menus = [
    {
      name: "Home",
      link: "home",
      icon: icons.home,
      component: (
        <CenterPanel Event={eventComponent} currentEvent={currentEvent}/>
      ),
    },
    {
      name: "Disaster Control",
      link: "active-disaster",
      icon: icons.resources,
      component: (
        <DisasterManagement
          Event={eventComponent}
          currentEvent={currentEvent}
          onGoingDisasters={onGoingDisasters}
        />
      ),
    },
    {
      name: "Analytics",
      link: "analytics",
      icon: icons.analysis,
      component: <Analytics 
      Event={eventComponent}
      currentEvent={currentEvent}
      />,
    },
    {
      name: "Organization",
      link: "orgmanagement",
      icon: icons.org,
      component: <OrgManagement />,
    },
    {
      name: "Resources",
      link: "resources",
      icon: icons.resources,
      component: <Resources />,
    },
    {
      name: "Emergency",
      link: "emergency",
      icon: icons.emergency,
      component: <Emergency />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Toaster position="top-center" richColors />
      <div className="w-[250px] flex-shrink-0">
        <LeftPanel active={active} setActive={setActive} menus={menus} />
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {/* render component based on active state value */}
        {menus.map(
          (menu) =>
            active === menu.link && (
              <span key={menu.link}>{menu.component}</span>
            )
        )}
      </div>
      <div className="w-[300px] flex-shrink-0">
        <RightPanel currentEvent={currentEvent}/>
      </div>
    </div>
  );
};
export default CoordinatorDashboard;

CoordinatorDashboard.propTypes = {
  activeSection: PropTypes.string,
};
