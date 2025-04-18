import { Clock9, MapPin } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import EventDetails from "./EventDetails";
import { joinInDisaster } from '../data/DisasterManagement';
import { useAuth } from "../../authentication/context/AuthContext";
import { Toaster, toast } from "sonner";

const OngoingEvent = ({ info, onClickEventHandler, bg, currentEvent }) => {
  const { user } = useAuth();
  const [showDetails, setShowDetails] = useState(false);

  const joinReq = async () => {
    console.log("Joining disaster with ID:", info.disaster_id, user.id);
    const response = await joinInDisaster(info.disaster_id, user.id);
    if (response.status) {
      toast.success(`Successfully joined in: ${info.title}`);
    } else {
      toast.error(`Failed to join in: ${info.title}`);
      console.error("Failed to join in disaster:", response.message);
    }
  }

  return (
    <div
      className={`min-w-70 h-auto ${
        currentEvent.disaster_id === info.disaster_id ? "bg-green-300" : bg
      } flex flex-col rounded shadow-md`}
    > 
      <Toaster position="top-center" richColors closeButton={false} />
      <button
        type="button"
        className="w-full h-full flex flex-col gap-y-2 text-left cursor-pointer p-6"
        onClick={() => {
          onClickEventHandler(info);
        }}
      >
        <p className="text-3xl font-bold flex items-center gap-x-3">
          <MapPin />
          {info.location.split(",")[0]}
        </p>
        <p className="text-lg bg-green-300 w-26 px-2 rounded text-center">
          {info.type}
        </p>
        <p className="text-[20px]">
          {info.title.length > 20
            ? `${info.title.slice(0, 20)}...`
            : info.title}
        </p>
        <p className="text-lg flex items-center gap-x-3">
          <Clock9 />
          {info.startDate.split("T")[0]}{" "}
          {info.startDate.split("T")[1].slice(0, 5)}
        </p>
      </button>

      {/* Button Container for organization role*/}
      {user.role === "organization" && (
        <>
          <div className="flex gap-x-4 p-2 w-full">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering parent button's onClick
                setShowDetails(true);
              }}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg 
               hover:bg-gray-300 font-medium text-sm
               flex items-center justify-center gap-x-2 cursor-pointer"
            >
              See Details
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                joinReq();
              }}
              className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg 
               hover:bg-orange-600 font-medium text-sm cursor-pointer
               flex items-center justify-center gap-x-2"
            >
              Join
            </button>
          </div>
          {showDetails && (
            <EventDetails event={info} onClose={() => setShowDetails(false)} joinReq={joinReq}/>
          )}
        </>
      )}
    </div>
  );
};

OngoingEvent.propTypes = {
  info: PropTypes.shape({
    disaster_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    location: PropTypes.string,
    title: PropTypes.string,
    startDate: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onClickEventHandler: PropTypes.func.isRequired,
  bg: PropTypes.string,
  currentEvent: PropTypes.shape({
    disaster_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    location: PropTypes.string,
    title: PropTypes.string,
    startDate: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default OngoingEvent;
