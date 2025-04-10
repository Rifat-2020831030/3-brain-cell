// purpose: To display last 3 past disasters in the home page

import { typhoon } from "../../assets/Assests";
import OverlapeCard from "./OverlapedCard";

const PastDisaster = ({ ongoingDisaster }) => {
  return (
    <>
      <div className="w-full h-[500px] max-md:h-auto my-20">
        <h1 className="text-4xl font-bold text-center my-10">Past Disasters</h1>
        <div className="grid md:flex max-sm:grid-cols-1 max-md:grid-cols-2 gap-10 justify-center items-center mx-10">
          {ongoingDisaster.map((data, index) => (
            <OverlapeCard data={data} key={index} />
          ))}
          <div className="w-100 max-md:w-70 h-70 gap-10 bg-gray-300 flex flex-col justify-center items-center rounded-2xl cursor-pointer">
            <p className="text-3xl scale-90 max-md:scale-80 text-center">
              Ongoing Disaster <span>&#8594;</span>
            </p>
            <img className="w-40 h-40" src={typhoon} alt="Typhoon gif" /> 
          </div>
        </div>
      </div>
    </>
  );
};

export default PastDisaster;
