import { ongoingDisaster } from "../../../public/data/Data";
import DisasterCard from "../../components/DisasterCard";
import DisasterSummary from "../../components/DisasterSummary";
import VolunteerReqList from "../../components/VolunteerReqList";
import WeatherCard from "../../components/WeatherCard";
import OngoingDisasters from "./OngoingDisaster";

const CenterPanel = () => {
  return (
    <div className="flex flex-col my-5 w-240 ">
      <OngoingDisasters />
      <div className="flex gap-5 justify-center">
        <WeatherCard />
        <div className="w-1/4">
          <DisasterSummary type="earthquake" />
        </div>
      </div>
      <div className="flex justify-center w-[90%] mx-auto">
        {/* <DisasterCard ongoingDisaster={ongoingDisaster} /> */}
      </div>
      <VolunteerReqList />
    </div>
  );
};
export default CenterPanel;
