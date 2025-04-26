import { Clock9, MapPin } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { useAuth } from "../../authentication/context/AuthContext";
import { getFromLocal, storeLocally } from "../../organization/data/data";
import { joinInDisaster } from "../data/DisasterManagement";
import EventDetails from "./EventDetails";

const OngoingEvent = ({ info, onClickEventHandler, bg, currentEvent }) => {
  const { user } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [isJoined, setIsJoined] = useState(() => {
    const joinedDisasters = getFromLocal("joinedDisasters");
    return joinedDisasters.includes(info.disaster_id);
  });

  const joinReq = async () => {
    console.log("Joining disaster with ID:", info.disaster_id, user.id);
    const response = await joinInDisaster(info.disaster_id, user.id);
    if (response.status) {
      storeLocally("joinedDisasters", info.disaster_id);
      setIsJoined(true);
      toast.success(`Successfully joined in: ${info.title}`);
    } else {
      toast.error(`Failed to join in: ${info.title}`);
      console.error("Failed to join in disaster:", response.message);
    }
  };

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
          {new Date(info.startDate).toLocaleDateString()}{" "}
          {new Date(info.startDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
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
              disabled={isJoined}
              className={`flex-1 px-6 py-3 text-white rounded-lg 
               font-bold text-sm 
               flex items-center justify-center gap-x-2 ${
                 isJoined
                   ? "bg-green-800 cursor-not-allowed font-extrabold"
                   : "cursor-pointer bg-emerald-500 hover:bg-emerald-600"
               }`}
            >
              {isJoined ? "Joined" : "Join"}
            </button>
          </div>
          {showDetails && (
            <EventDetails
              event={info}
              onClose={() => setShowDetails(false)}
              joinReq={joinReq}
              isJoined={isJoined}
            />
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
