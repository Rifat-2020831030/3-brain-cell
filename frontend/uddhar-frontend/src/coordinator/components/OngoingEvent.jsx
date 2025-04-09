import { MapPin } from "lucide-react";
import PropTypes from "prop-types";

const OngoingEvent = ({ info, onClickEventHandler, bg }) => {
  return (
    <div
      className={`min-w-70 h-50 ${bg} flex flex-col gap-y-[10px] text-left p-10 rounded cursor-pointer`}
      onClick={() => {
        onClickEventHandler(info.location);
      }}
      role="button"
    >
      <p className="text-3xl font-bold flex items-center gap-x-3">
        <MapPin />
        {info.location}
      </p>
      <p className="text-[20px]">{info.name}</p>
      <p className="text-lg">{info.date}</p>
    </div>
  );
};

OngoingEvent.propTypes = {
  info: PropTypes.shape({
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onClickEventHandler: PropTypes.func.isRequired,
  bg: PropTypes.string,
};

export default OngoingEvent;
