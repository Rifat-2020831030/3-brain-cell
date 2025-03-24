import DisasterSummary from "../../components/DisasterSummary";
import WeatherCard from "../../components/WeatherCard";
import DisasterCard from "../../components/DisasterCard";
import VolunteerReqList from "../../components/VolunteerReqList";
const CenterPanel = () => {
  return (
    <>
      <div className="flex flex-col my-5 w-240 ">
        <div className="flex gap-5 justify-center">
          <WeatherCard />
          <div className="w-1/4">
          <DisasterSummary type="earthquake" /> 
          </div>
        </div>
        <DisasterCard/>
        <VolunteerReqList />
      </div>
    </>
  );
};
export default CenterPanel;