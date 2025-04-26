import {
  MdDashboard,
  MdFlood,
  MdOutlineFlood,
  MdOutlineForwardToInbox,
  MdOutlineLogout
} from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { GrGroup } from "react-icons/gr";
import Sidepanel from "../../public/components/Sidebar";

function Sidebar() {
  
  const upperPart = [
    { label: "Dashboard", icon: <MdDashboard />, href: "/dashboard/organization" },
    { label: "Team Creation", icon: <IoAnalytics />, href: "/dashboard/organization/create-a-team" },
    { label: "Reporting", icon: <TbReportSearch />, href: "/dashboard/organization/reporting" },
    { label: "Member List", icon: <GrGroup />, href: "/dashboard/organization/member-list" },
    { label: "Registered Disaster", icon: <MdFlood />, href: "/dashboard/organization/joined-disaster" },
    { label: "Past Disaster", icon: <MdOutlineFlood />, href: "/dashboard/organization/past-disaster" },
  ];
  
  const lowerPart = [
    { label: "Inbox", icon: <MdOutlineForwardToInbox />, href: "/dashboard/organization/inbox" },
    { label: "Profile", icon: <CgProfile />, href: "/profile" },
    { label: "Log Out", icon: <MdOutlineLogout />, href: "/dashboard/organization/logout" },
  ];

  return (
    <Sidepanel upperPart={upperPart} lowerPart={lowerPart} />
  );
}

export default Sidebar;
