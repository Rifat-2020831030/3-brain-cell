import { useState } from "react";
import WeatherCard from "../../../organization/components/WeatherCard";
import OrganizationList from "../../components/OrganizationList";

import ScrollableEvent from "../../components/ScrollableEvent";

import PropTypes from "prop-types";

function RightPanel({ ongoingEventData, loading }) {
  const [currentEvent, setCurrentEvent] = useState( ongoingEventData[0] || {
    disaster_id: "",
    location: "",
    title: "",
    startDate: "",
    type: "",
  });
  const onClickEventHandler = async (event) => {
    setCurrentEvent(event);
    console.log("Active Event", event);
  };


  return (
    <div className="gap-4 p-4 h-full  ">
      <div className="flex flex-wrap gap-5 m-10 justify-center">
        <ScrollableEvent
          loading={loading}
          ongoingEventData={ongoingEventData}
          heading={"Ongoing Disasters →"}
          onClickEventHandler={onClickEventHandler}
          currentEvent={currentEvent}
        />
        <WeatherCard />
      </div>
      <div className="flex-wrap justify-center ">
        <div className="justify-center">
          <OrganizationList />
        </div>
      </div>
    </div>
  );
}

export default RightPanel;

RightPanel.propTypes = {
  ongoingEventData: PropTypes.arrayOf(
    PropTypes.shape({
      disaster_id: PropTypes.number,
      location: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      startDate: PropTypes.string,
      type: PropTypes.string,
    }),
  ),
  loading: PropTypes.bool,
};