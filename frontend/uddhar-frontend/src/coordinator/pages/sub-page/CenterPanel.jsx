import DisasterSummary from "../../components/DisasterSummary";
import UserTable from "../../components/UserTable";
import WeatherCard from "../../components/WeatherCard";
import { ongoingEventData } from "../../data/Data";
import ScrollableEvent from "../../components/ScrollableEvent";
import axios from "axios";
import { useEffect, useState } from "react";

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
    // const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${location}`);
    // const cityKey = response.data[0].Key;
    // const weatherResponse = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}&details=true`);
    // let preProcess = {
    //   Temperature: weatherResponse.data[0]?.Temperature?.Matric?.Value,
    //   TempUnit: weatherResponse.data[0]?.Temperature?.Matric?.Unit,
    //   Pressure: weatherResponse.data[0]?.Pressure?.Matric?.Value,
    //   PUnit: weatherResponse.data[0]?.Pressure?.Matric?.Unit,
    //   Wind: weatherResponse.data[0]?.Wind?.Speed?.Matric?.Value,
    //   WUnit: weatherResponse.data[0]?.Wind?.Speed?.Matric?.Unit,
    //   MinTemp: weatherResponse.data[0]?.TemperatureSummary?.Past24HourRange?.Minimum?.Matric?.Value,
    //   MaxTemp: weatherResponse.data[0]?.TemperatureSummary?.Past24HourRange?.Maximum?.Matric?.Value,
    // };
    // setWeatherData(preProcess);
    // console.log("Weather Data: ", weatherData);
  } 

  return (
    <>
      <div className="flex flex-col my-5">
        <ScrollableEvent ongoingEventData={ongoingEventData} heading={"Ongoing Event →"} onClickEventHandler={onClickEventHandler}/>
        <div className="flex gap-[10px]">
          <WeatherCard weatherData={weatherData} />
          <DisasterSummary type="flood" />
        </div>
        <UserTable />
      </div>
    </>
  );
};
export default CenterPanel;
