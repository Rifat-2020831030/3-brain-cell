import typhoon from "../../assets/icons/typhoon.gif";

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
  if (!data) return null;

  return (
    <div className="bg-red-200 p-4 rounded-xl shadow-md w-72 text-gray-900">
      <div className="flex items-center gap-3">
        <img src={typhoon} alt={data.title} className="w-10" />
        <h2 className="text-lg font-semibold">{data.title}</h2>
      </div>
      <ul className="mt-2 text-sm text-gray-800">
        {data.details.map((detail, index) => (
          <li key={index} className="mt-1">• {detail}</li>
        ))}
      </ul>
    </div>
  );
};

export default DisasterSummary;
