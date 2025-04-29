import { useEffect, useState } from "react";
import DisasterSummary from "../../components/DisasterSummary";
import { getWeatherData } from "../../../public/data/WeatherData";
import PropTypes from "prop-types";
import WeatherInfo from "../../components/WeatherInfo";


const RightPanel = ({ currentEvent }) => {
  const [weatherData, setWeatherData] = useState();
  useEffect(() => {
    const fetchWeather = async () => {
      const weatherUpdate = await getWeatherData(currentEvent);
      if (weatherUpdate.status) {
        setWeatherData(weatherUpdate.data);
      }
    };
    fetchWeather();
  }, [currentEvent]);

  return (
    <div className="bg-gray-100 w-full min-w-60 px-1 py-5 h-screen border-gray-300 border-1 rounded-l-2xl shadow-2xl sticky top-0 overflow-clip">
      <div className="flex flex-col h-full">
        {/* <WeatherCard weatherData={weatherData} /> */}
        <WeatherInfo weatherData={weatherData} />
        <DisasterSummary type="flood" />
      </div>
    </div>
  );
};
export default RightPanel;

RightPanel.propTypes = {
  currentEvent: PropTypes.object.isRequired,
};