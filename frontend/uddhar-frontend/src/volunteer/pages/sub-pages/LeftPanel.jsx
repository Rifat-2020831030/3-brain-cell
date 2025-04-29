import {
  MdDashboard,
  MdFlood,
  MdOutlineFlood,
  MdOutlineForwardToInbox,
  MdOutlineLogout
} from "react-icons/md";
import { VscOrganization } from "react-icons/vsc";
import { IoAnalytics } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Sidebar from "../../../public/components/Sidebar";

function LeftPanel() {
  
  const upperPart = [
    { label: "Dashboard", icon: <MdDashboard />, href: "/dashboard/volunteer" },
    { label: "Team Info", icon: <VscOrganization />, href: "/dashboard/volunteer/team-info" },
    { label: "Past Disaster", icon: <MdOutlineFlood />, href: "/dashboard/volunteer/past-disaster" },
    { label: "Analytics", icon: <IoAnalytics />, href: "/dashboard/volunteer/analytics" },
    { label: "Disaster Reporting", icon: <MdFlood />, href: "/dashboard/volunteer/disaster-reporting" },
  ];
  
  const lowerPart = [
    { label: "Inbox", icon: <MdOutlineForwardToInbox />, href: "/dashboard/volunteer/inbox" },
    { label: "Profile", icon: <CgProfile />, href: "/profile" },
    { label: "Log Out", icon: <MdOutlineLogout />, href: "/dashboard/volunteer/logout" },
  ];

  return (
    <Sidebar upperPart={upperPart} lowerPart={lowerPart}/>
  );
}

export default LeftPanel;
