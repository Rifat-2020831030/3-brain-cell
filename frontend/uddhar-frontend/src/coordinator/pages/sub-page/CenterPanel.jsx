import DisasterSummary from "../../components/DisasterSummary";
import UserTable from "../../components/UserTable";
import WeatherCard from "../../components/WeatherCard";
import Proptypes from "prop-types";

const CenterPanel = ({Event, weatherData}) => {

  return (
    <>
      <div className="flex flex-col my-5"> 
        {/* <Toaster position="bottom-right" richColors /> */}
        {Event}
        <div className="flex justify-center gap-[10px]">
          <WeatherCard weatherData={weatherData} />
          <DisasterSummary type="flood" />
        </div>
        {/* <div className="flex justify-center h-150 w-full bg-green my-10">
          <Map />
          <MapLeftOperation />
        </div> */}
        <UserTable />
        {/* <TableWithPagination currentEvent={currentEvent}/> */}
      </div>
    </>
  );
};
export default CenterPanel;

CenterPanel.propTypes = {
  Event: Proptypes.element.isRequired,
  weatherData: Proptypes.object.isRequired,
};
