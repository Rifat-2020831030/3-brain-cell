import React, { useState } from "react";
import WeatherCard from "../../../organization/components/WeatherCard";
import { ongoingEventData } from "../../data/data";
import OrganizationList from "../../components/OrganizationList";
import { organizations } from "../../data/data";

import ScrollableEvent from "../../components/ScrollableEvent";
function RightPanel() {
    const [loading, setLoading] = useState(true);
    const[index , setIndex] = useState(0) ;
    const [ currentEvent, setCurrentEvent] = useState({
      disaster_id: "",
      location: "",
      title: "",
      startDate: "",
      type: "",
    });
    const onClickEventHandler = async (index) => {
        console.log("On click Event handler ");
        setIndex(index);
        setCurrentEvent(ongoingEventData[0] || ongoingEventData[index]);
      } 

  return (
    <div className="gap-4 p-4 h-full  ">
      <div className="flex flex-wrap gap-5 m-10 justify-center">
        <ScrollableEvent loading={loading} ongoingEventData={ongoingEventData} heading={"Ongoing Disasters →"} onClickEventHandler={onClickEventHandler} currentEvent={currentEvent} />
        <WeatherCard />
      </div>
      <div className="flex-wrap justify-center ">

        <div className="justify-center">
          <OrganizationList organizations={organizations} />
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
