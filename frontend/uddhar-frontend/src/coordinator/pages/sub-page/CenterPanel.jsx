import DisasterSummary from "../../components/DisasterSummary";
import UserTable from "../../components/UserTable";
import WeatherCard from "../../components/WeatherCard";
import { ongoingEventData } from "../../data/Data";
import ScrollableEvent from "../../components/ScrollableEvent";
import axios from "axios";
import { useEffect, useState } from "react";
import TableWithPagination from "../../components/TableWithPagination";

const CenterPanel = () => {
  const [weatherData, setWeatherData] = useState({
    Temperature: 0,
    Pressure: 0,
    Wind: 0,
    MinTemp: 0,
    MaxTemp: 0,
  });

  const onClickEventHandler = async (location) => {
    console.log("Event Clicked from: ", location);
  } 

  return (
    <>
      <div className="flex flex-col my-5">
        <ScrollableEvent ongoingEventData={ongoingEventData} heading={"Ongoing Disasters →"} onClickEventHandler={onClickEventHandler}/>
        <div className="flex gap-[10px]">
          <WeatherCard weatherData={weatherData} />
          <DisasterSummary type="flood" />
        </div>
        <UserTable />
        <TableWithPagination />
      </div>
    </>
  );
};
export default CenterPanel;
