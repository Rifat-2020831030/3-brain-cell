import typhoon from "../../assets/icons/typhoon.gif";
import PropTypes from "prop-types";
import { disasterUpdates } from '../../public/data/Data';

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
        {data.details.map((detail) => (
          <li key={detail} className="mt-1">• {detail}</li>
        ))}
      </ul>
    </div>
  );
};

export default DisasterSummary;

DisasterSummary.propTypes = {
  type: PropTypes.string,
};
