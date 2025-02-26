import LeftPanel from "../components/LeftPanel";
import CenterPanel from "../components/CenterPanel";
import RightPanel from "../components/RightPanel";

const CoordinatorDashboard = () => {
  return <> 
    <div className="flex justify-between">
      <LeftPanel />
      <CenterPanel />
      <RightPanel />
    </div>
  </>;
};
export default CoordinatorDashboard;
