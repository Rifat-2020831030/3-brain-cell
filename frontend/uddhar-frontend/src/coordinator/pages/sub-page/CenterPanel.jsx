import PropTypes from "prop-types";
import DisasterSummary from "../../components/DisasterSummary";
import OrgTable from "../../components/OrgTable";
import WeatherCard from "../../components/WeatherCard";
import Map from "../sub-page/Map";

const CenterPanel = ({ Event, weatherData, currentEvent }) => {
  return (
    <div className="flex flex-col my-5">
      {Event}
      <div className="flex justify-center gap-[10px]">
        <WeatherCard weatherData={weatherData} />
        <DisasterSummary type="flood" />
      </div>
      <div className="flex flex-col justify-center h-165 w-full my-10 overflow-hidden">
          <p className="text-4xl text-gray-800 text-center">Latest update on the map</p>
          <span className="text-left text-lg text-gray-600">Currently observing updates of: <span className="text-blue-500">{currentEvent.title}</span></span>
          <Map currentEvent={currentEvent}/>
      </div>
      <div className="border-1 border-gray-300 rounded-lg shadow-2xl p-5">
        <p className="text-4xl font-bold text-gray-800">Organization Joining Request</p>
        <OrgTable />
      </div>
      {/* <TableWithPagination currentEvent={currentEvent}/> */}
    </div>
  );
};
export default CenterPanel;

CenterPanel.propTypes = {
  Event: PropTypes.element,
  weatherData: PropTypes.object,
  currentEvent: PropTypes.object,
};
