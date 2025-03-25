import LeftPanel from "./sub-page/LeftPanel";
import RightPanel from "./sub-page/RightPanel";
import CenterPanel from "./sub-page/CenterPanel";

const CoordinatorDashboard = () => {
  return (
    <>
      <div className="flex justify-between">
        <LeftPanel />
        <CenterPanel />
        <RightPanel />
      </div>
    </>
  );
};
export default CoordinatorDashboard;
