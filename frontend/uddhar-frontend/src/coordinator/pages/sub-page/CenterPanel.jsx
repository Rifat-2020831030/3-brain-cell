import DisasterSummary from "../../components/DisasterSummary";
import UserTable from "../../components/UserTable";
import WeatherCard from "../../components/WeatherCard";
import ScrollableEvent from "../../components/ScrollableEvent";
import { useEffect, useState } from "react";
import TableWithPagination from "../../components/TableWithPagination";
import { getOngoingDisasters, getWeatherData } from "../../data/DisasterMangement";
import { Toaster, toast } from "sonner";

const CenterPanel = () => {
  const [weatherData, setWeatherData] = useState({
    Temperature: 0,
    Pressure: 0,
    Wind: 0,
    MinTemp: 0,
    MaxTemp: 0,
  });
  const [ ongoingDisaster, setOngoingDisaster] = useState([]);
  const [ currentEvent, setCurrentEvent] = useState({
    disaster_id: "",
    location: "",
    title: "",
    startDate: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const onGoingDisasters = async () => {
      setLoading(true);
      const response = await getOngoingDisasters();
      setLoading(false);
      // console. log("Ongoing disasters: ", response);
      if(response.status){
        const disasters = response.disasters;
        setOngoingDisaster(disasters);
        setCurrentEvent(disasters[0] || null);
        toast.success("Ongoing disasters updated successfully");
      } else {
        toast.error(response.message);
      }
    }
    onGoingDisasters();
  },[])

  const onClickEventHandler = async (info) => {
    // set current disaster
    setCurrentEvent(info);
    console.log("Selected disaster: ",currentEvent.disaster_id);
    // update weather info
    const weatherUpdate = await getWeatherData(info);
    console.log("Weather data: ", weatherUpdate);
    if(weatherUpdate.status){
      setWeatherData(weatherUpdate.data);
    }
    // update disaster summary
    // update table
  } 

  return (
    <>
      <div className="flex flex-col my-5"> 
        <Toaster position="bottom-right" richColors />
        <ScrollableEvent loading={loading} ongoingEventData={ongoingDisaster} heading={"Ongoing Disasters →"} onClickEventHandler={onClickEventHandler} currentEvent={currentEvent} />
        <div className="flex gap-[10px]">
          <WeatherCard weatherData={weatherData} />
          <DisasterSummary type="flood" />
        </div>
        {/* <div className="flex justify-center h-150 w-full bg-green my-10">
          <Map />
          <MapLeftOperation />
        </div> */}
        <UserTable />
        <TableWithPagination currentEvent={currentEvent}/>
      </div>
    </>
  );
};
export default CenterPanel;
