import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/Sidebar";
import CenterPanel from "./sub_pages/CenterPanel";
import RightPanel from "./sub_pages/RightPanel";
function OrgDashboard() {
  const token = localStorage.getItem("token");
  console.log(jwtDecode(token));
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <CenterPanel />
      <RightPanel />
    </div>
  );
}

export default OrgDashboard;
