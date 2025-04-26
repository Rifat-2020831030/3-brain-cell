import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import OverlapedCard from "../../../public/components/OverlapedCard";

const JoinedDisaster = ({ ongoingDisasters, setActiveSection, setSelectedDisaster }) => {
  return (
    <div className="flex flex-col">
      <p className="text-gray-800 font-semibold text-5xl text-center">
        Select Prefered disaster
      </p>
      <div className="flex flex-wrap mt-10 gap-10">
        {ongoingDisasters.map((disaster) => {
          return (
            <button
              type="button"
              key={uuidv4()}
              onClick={() => {
                setSelectedDisaster(disaster.disaster_id);
                setActiveSection("report");
              }}
            >
              <OverlapedCard data={disaster} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default JoinedDisaster;

JoinedDisaster.propTypes = {
  ongoingDisasters: PropTypes.array.isRequired,
  setActiveSection: PropTypes.func,
  setSelectedDisaster: PropTypes.func,
};
