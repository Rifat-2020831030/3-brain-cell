import {typhoon} from "../../assets/Assests";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const disasterUpdates = {
  earthquake: {
    title: "Earthquake Update",
    icon: "earthquake.png",
    details: [
      "Magnitude: 6.5, Epicenter: City A",
      "Affected Population: 1.2M",
      "Casualties: 150, Injuries: 500",
      "Structural Damage: Severe",
      "Volunteers: 2,000",
    ],
  },
  flood: {
    title: "Flood Update",
    icon: "flood.png",
    details: [
      "Water Level: 3.2m, Severity: High",
      "Affected Population: 500K",
      "Rainfall: 120mm in 24h",
      "Rescue Status: Ongoing",
      "Volunteers: 1,500",
    ],
  },
  cyclone: {
    title: "Cyclone Alert",
    icon: "cyclone.png",
    details: [
      "Wind Speed: 180 km/h, Category 4",
      "Landfall Expected: City B",
      "Affected Regions: Coastal Areas",
      "Rainfall & Storm Surge: Severe Warning",
      "Volunteers: 3,000",
    ],
  },
  fire: {
    title: "Fire Update",
    icon: "fire.png",
    details: [
      "Location: Forest Zone C",
      "Severity: Extreme",
      "Casualties: 10, Injuries: 30",
      "Evacuations: 5,000 people",
      "Update: Fire 60% contained",
    ],
  },
};

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
            {Object.keys(disasterUpdates).map((key, index) => {
                const disaster = disasterUpdates[key];
                return (
                    <div
                        key={key}
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
                            {disaster.details.map((detail, idx) => (
                                <li key={detail.detail} className="flex items-center gap-0 text-lg font-sans break-after-all"> 
                                    {/* <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> */}
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
  type: PropTypes.oneOf(['earthquake', 'flood', 'cyclone', 'fire']).isRequired
};

export default DisasterSummary;