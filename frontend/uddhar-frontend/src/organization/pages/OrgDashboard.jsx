
import Sidebar from "../components/Sidebar";
import CenterPanel from "./sub_pages/CenterPanel";
import RightPanel from "./sub_pages/RightPanel";

function OrgDashboard() {
  return (
    <div className="flex flex-col md:flex-row  ">
      <Sidebar />
        <CenterPanel />
      <RightPanel />
    </div>
  );
}

export default OrgDashboard;
