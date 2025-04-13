import { Clock9, MapPin } from "lucide-react";
import PropTypes from "prop-types";

const OngoingEvent = ({ info, onClickEventHandler, bg, currentEvent }) => {
  return (
    <div
      className={`min-w-70 h-50 ${
        currentEvent.disaster_id === info.disaster_id ? "bg-green-400" : bg
      } flex flex-col gap-y-[10px] text-left p-10 rounded cursor-pointer`}
      onClick={() => {
        onClickEventHandler(info);
      }}
      role="button"
    >
      <p className="text-3xl font-bold flex items-center gap-x-3">
        <MapPin />
        {info.location.split(",")[0]}
      </p>
      <p className="text-lg bg-green-300 w-26 px-2 rounded text-center">
        {info.type}
      </p>
      <p className="text-[20px]">{info.title.length > 20 ? `${info.title.slice(0,20)}...` : info.title}</p>
      <p className="text-lg flex items-center gap-x-3">
        <Clock9 />
        {info.startDate}
      </p>
    </div>
  );
};

OngoingEvent.propTypes = {
  info: PropTypes.shape({
    disaster_id: PropTypes.number,
    location: PropTypes.string,
    title: PropTypes.string,
    startDate: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onClickEventHandler: PropTypes.func.isRequired,
  bg: PropTypes.string,
  currentEvent: PropTypes.shape({
    disaster_id: PropTypes.number,
    location: PropTypes.string,
    title: PropTypes.string,
    startDate: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default OngoingEvent;
