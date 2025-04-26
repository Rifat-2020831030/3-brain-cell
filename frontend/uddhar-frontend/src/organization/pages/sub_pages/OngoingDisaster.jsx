import { useEffect, useState } from "react";
import ScrollableEvent from "../../../shared/components/ScrollableEvent";
import { getCurrentDisasters } from "../../../shared/data/DisasterManagement";

const OngoingDisasters = () => {
  const [loading, setLoading] = useState(false);
  const [disasters, setDisasters] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    disaster_id: "",
    location: "",
    title: "",
    startDate: "",
    type: "",
    description: "",
    status: "",
  });

  const onClickEventHandler = async (info) => {
    // set current disaster
    setCurrentEvent(info);
    console.log("info: ", info);
    console.log("Selected disaster: ", currentEvent);
  };

  useEffect(() => {
    const fetchOngoingDisasters = async () => {
      setLoading(true);
      const response = await getCurrentDisasters();
      if (response.status) {
        setDisasters(response.data);
        setCurrentEvent(response.data[0] || {});
      } else {
        console.error("Failed to fetch disasters disasters:", response.message);
      }
      setLoading(false);
    };

    fetchOngoingDisasters();
  }, []);

  return (
    <ScrollableEvent
      ongoingEventData={disasters}
      heading="Ongoing Disasters"
      onClickEventHandler={onClickEventHandler}
      currentEvent={currentEvent}
      loading={loading}
      isCoordinator={false}
    />
  );
};

export default OngoingDisasters;
