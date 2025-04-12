import React, { useState } from "react";
import WeatherCard from "../../../organization/components/WeatherCard";
import { ongoingDisaster } from "../../../public/data/Data";
import DisasterSummary from "../../../organization/components/DisasterSummary";
import OrganizationList from "../../components/OrganizationList";
import { organizations } from "../../data/data";
import OngoingDisasterCard from "../../components/OngoingDisasterCard";
function RightPanel() {
    const [step ,setstep ] = useState(0);
    const handleNext = (step) => {
        setstep(step+1);
    };
  return (
    <div clssName="gap-4 p-4 h-full  ">
      <div className="flex gap-5 m-10 justify-center">
        <WeatherCard />
      </div>
      <div className="flex-wrap justify-center ">

        <div clssName="justify-center">
          <OrganizationList organizations={organizations} />
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
