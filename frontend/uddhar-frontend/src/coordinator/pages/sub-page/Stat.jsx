import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import {
  DailyBreakdownChart,
  ReliefDistributionChart,
} from "../../components/DisasterStat";
import RescueShelterChart from "../../components/RescueShelterChart";
import { DisasterSummary } from "../../components/Summary";
import { getStat } from "../../data/DisasterMangement";
import LoadingScreen from "../../../shared/components/LoadingScreen";

const Stat = ({ disaster_id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getStat(disaster_id);
      if (response.status) {
        setData(response.data);
        if(response.data.totalReports === 0){
          toast.error("No data available for this disaster",{
            duration: 5000,
            description: "Please try again later",
            closeIcon: true,
            position: "bottom-right",
          });
        }
      } else {
        toast.error(response.message,{
            duration: 5000,
            description: "Please try again later",
            closeIcon: true,
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [disaster_id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster richColors position="bottom-right" closeIcon={false} />
      {loading ? (
        <div className="relative">
          <LoadingScreen />
        </div>
      ) : (
        <div className="flex flex-col gap-y-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Disaster Statistics
          </h1>

          {/* Rescue Shelter & summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Disaster Summary Container */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                Disaster Summary
              </h2>
              {data && <DisasterSummary data={data} />}
            </div>

            {/* Rescue Shelter Container */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                Rescue Shelter Overview
              </h2>
              {data && <RescueShelterChart info={data.rescueShelter} />}
            </div>
          </div>

          {/* Relief Distribution Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 w-full">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Relief Distribution
            </h2>
            <div className="w-full max-w-4xl mx-auto">
              {data && <ReliefDistributionChart data={data.reliefDistribution} />}
            </div>
          </div>

          {/* Daily Breakdown Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 w-full">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              Daily Breakdown
            </h2>
            <div className="w-full max-w-4xl mx-auto">
              {data && <DailyBreakdownChart />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stat;

Stat.propTypes = {
  disaster_id: PropTypes.number,
};
