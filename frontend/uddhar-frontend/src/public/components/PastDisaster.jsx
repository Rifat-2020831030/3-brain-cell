// purpose: To display last 3 past disasters in the home page

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { typhoon } from "../../assets/Assests";
import OverlapeCard from "./OverlapedCard";

const PastDisaster = ({ ongoingDisaster }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full max-md:h-auto my-20">
      <h1 className="text-4xl font-bold text-center my-10">Past Disasters</h1>
      <div className="grid md:flex max-sm:grid-cols-1 max-md:grid-cols-2 gap-10 justify-center items-center mx-10">
        {ongoingDisaster.map((data) => (
          <OverlapeCard data={data} key={uuidv4()} />
        ))}
        <button
          type="button"
          className="w-100 max-md:w-70 h-70 gap-10 bg-gray-300 flex flex-col justify-center items-center rounded-2xl cursor-pointer"
          onClick={() => navigate("/map")}
        >
          <p className="text-3xl scale-90 max-md:scale-80 text-center">
            Ongoing Disaster <span>&#8594;</span>
          </p>
          <img className="w-40 h-40" src={typhoon} alt="Typhoon gif" />
        </button>
      </div>
    </div>
  );
};

export default PastDisaster;

PastDisaster.propTypes = {
  ongoingDisaster: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string,
      location: PropTypes.string,
    })
  ),
};
