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
import { GrGroup } from "react-icons/gr";
import Sidebar from "../../../public/components/Sidebar";

function LeftPanel() {
  
  const upperPart = [
    { label: "Dashboard", icon: <MdDashboard />, href: "/dashboard/volunteer" },
    { label: "Analytics", icon: <IoAnalytics />, href: "/dashboard/volunteer/analytics" },
    { label: "Organization Lists", icon: <VscOrganization />, href: "/dashboard/volunteer/organization-lists" },
    { label: "Member List", icon: <GrGroup />, href: "/dashboard/volunteer/member-list" },
    { label: "Ongoing Disaster", icon: <MdFlood />, href: "/dashboard/volunteer/ongoing-disaster" },
    { label: "Past Disaster", icon: <MdOutlineFlood />, href: "/dashboard/volunteer/past-disaster" },
  ];
  
  const lowerPart = [
    { label: "Inbox", icon: <MdOutlineForwardToInbox />, href: "/dashboard/volunteer/inbox" },
    { label: "Profile", icon: <CgProfile />, href: "/dashboard/volunteer/profile" },
    { label: "Log Out", icon: <MdOutlineLogout />, href: "/dashboard/volunteer/log-out" },
  ];

  return (
    <Sidebar upperPart={upperPart} lowerPart={lowerPart}/>
  );
}

export default LeftPanel;
