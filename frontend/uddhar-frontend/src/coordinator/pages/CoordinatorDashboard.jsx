import LeftPanel from "../components/LeftPanel";
import CenterPanel from "../components/UserTable";
import RightPanel from "../components/RightPanel";
import DashboardNavbar from "../components/DashBoardNavbar";

const CoordinatorDashboard = () => {
  return <> 
    <DashboardNavbar />
    <div className="flex justify-between">
      <LeftPanel />
      <CenterPanel />
      <RightPanel />
    </div>
  </>;
};
export default CoordinatorDashboard;
