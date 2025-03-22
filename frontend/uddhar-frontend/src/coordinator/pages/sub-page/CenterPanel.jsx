import UserTable from "../../components/UserTable";
import WeatherCard from "../../components/WeatherCard";
import DisasterSummary from "../../components/DisasterSummary";

const CenterPanel = () => {
  return (
    <>
      <div className="flex flex-col my-5">
        <div className="flex gap-[10px]">
          <WeatherCard />
          <DisasterSummary type="flood" />
        </div>
        <UserTable />
      </div>
    </>
  );
};
export default CenterPanel;
