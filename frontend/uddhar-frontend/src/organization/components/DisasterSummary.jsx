import {typhoon} from "../../assets/Assests";
import { useState, useEffect } from "react";
import { disasterUpdates } from '../../public/data/Data';
import PropTypes from 'prop-types';
 
const DisasterSummary = ({ type }) => {
  const data = disasterUpdates[type] || null;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Object.keys(disasterUpdates).length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

return (
    <div className="overflow-hidden rounded-lg shadow-md">
        <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
            {Object.keys(disasterUpdates).map((key) => {
                const disaster = disasterUpdates[key];
                return (
                    <div
                        key={disaster.title}
                        className="bg-gradient-to-r from-red-300 via-red-200 to-red-100 p-3 rounded-lg shadow-md w-full flex-shrink-0 text-gray-900 min-w-full transition-transform duration-700 ease-in-out"
                    >
                        <div className="flex items-center gap-2">
                            <img
                                src={typhoon}
                                alt={disaster.title}
                                className="w-10 h-10 rounded-full shadow-sm"
                            />
                            <h2 className="text-md font-semibold">{disaster.title}</h2>
                        </div>
                        <ul className="mt-2 text-xs text-gray-800 space-y-1">
                            {disaster.details.map((detail) => (
                                <li key={detail} className="flex items-center gap-0 text-lg font-sans break-after-all"> 
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    </div>
);
};
DisasterSummary.propTypes = {
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default DisasterSummary;

DisasterSummary.propTypes = {
  type: PropTypes.string,
};