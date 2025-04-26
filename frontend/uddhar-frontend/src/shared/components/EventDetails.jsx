import { AlertCircle, Clock9, MapPin, X } from "lucide-react";
import PropTypes from "prop-types";

const EventDetails = ({ event, onClose, joinReq, isJoined }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label="Close details"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">{event.title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {event.type}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{event.location}</span>
            </div>

            {/* Date/Time */}
            <div className="flex items-center gap-3 text-gray-700">
              <Clock9 className="w-5 h-5 text-gray-500" />
              <span>
                {new Date(event.startDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                <AlertCircle className="w-5 h-5" />
                Description
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4 cursor-pointer">
            <button
              type="button"
              className={`${
                isJoined
                  ? "bg-green-800 cursor-not-allowed font-extrabold"
                  : "cursor-pointer bg-emerald-500 hover:bg-emerald-600"
              } flex-1 px-6 py-3 text-white rounded-lg transition-colors`}
              onClick={(e) => {
                e.stopPropagation();
                joinReq();
              }}
            >
              {isJoined ? "Joined" : "Join"}
            </button>
            <button
              type="button"
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

EventDetails.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    location: PropTypes.string,
    startDate: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  joinReq: PropTypes.func.isRequired,
  isJoined: PropTypes.bool,
};
