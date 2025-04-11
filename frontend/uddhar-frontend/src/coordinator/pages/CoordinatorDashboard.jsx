import LeftPanel from "./sub-page/LeftPanel";
import RightPanel from "./sub-page/RightPanel";
import CenterPanel from "./sub-page/CenterPanel";
import DisasterManagement from "./sub-page/DisasterManagement";
import { useState } from "react";
import Analytics from "./sub-page/Analytics";
import Communication from "./sub-page/Communication";
import Emergency from "./sub-page/Emergency";

const CoordinatorDashboard = () => {
  const [active, setActive] = useState("Home");
  return (
    <>
      <div className="flex justify-between">
        <LeftPanel active={active} setActive={setActive} />
        {(() => {
          if(active === "Home"){
            return <CenterPanel />
          } else if(active === "Disaster Control"){
            return <DisasterManagement />
          } else if(active === "Analytics"){
            return <Analytics />
          } else if(active === "Resources"){
            return <CenterPanel />
          } else if(active === "Communication"){
            return <Communication />
          } else if(active === "Emergency"){
            return <Emergency />
          }
          return null;
        })()}
        <RightPanel />
      </div>
    </>
  );
};
export default CoordinatorDashboard;
