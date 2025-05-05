import DisasterSummary from "../../components/DisasterSummary";
import VolunteerReqList from "../../components/VolunteerReqList";
import WeatherCard from "../../../coordinator/components/WeatherCard";
import OngoingDisasters from "./OngoingDisaster";
import { useEffect,useState } from "react";
import { getApplicants } from "../../data/TeamManagement";
import { Toaster,toast } from "sonner";

const CenterPanel = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applicants data on page load
  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      const response = await getApplicants();
      if (response.status) {
        setApplicants(response.data);
      } else {
        toast.info(response.message || response.error);
      }
      setLoading(false);
    };
    fetchApplicants();
  }, []);

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
      <Toaster richColors position="top-center" closeButton />
      <VolunteerReqList applicants={applicants} setApplicants={setApplicants} loading={loading}/>
    </div>
  );
};
export default CenterPanel;
