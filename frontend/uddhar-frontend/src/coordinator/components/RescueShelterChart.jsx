// components/DisasterStat/RescueShelterChart.jsx
import PropTypes from "prop-types";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const RescueShelterChart = ({ data }) => {
  // Data preparation
  const shelterData = [
    {
      name: "Men",
      value: data.rescueShelter.men,
      color: "#4299E1",
      percentage: (
        (data.rescueShelter.men / data.rescueShelter.totalRescued) *
        100
      ).toFixed(1),
    },
    {
      name: "Women",
      value: data.rescueShelter.women,
      color: "#48BB78",
      percentage: (
        (data.rescueShelter.women / data.rescueShelter.totalRescued) *
        100
      ).toFixed(1),
    },
    {
      name: "Children",
      value: data.rescueShelter.children,
      color: "#ED8936",
      percentage: (
        (data.rescueShelter.children / data.rescueShelter.totalRescued) *
        100
      ).toFixed(1),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600">Total Rescued</p>
          <p className="text-2xl font-bold text-gray-800">
            {data.rescueShelter.totalRescued}
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={shelterData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
          >
            {shelterData.map((entry, index) => (
              <Cell
                key={`cell-${entry}-${index}`}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={<CustomLegend shelterData={shelterData} />}
            verticalAlign="bottom"
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RescueShelterChart;


RescueShelterChart.propTypes = {
  data: PropTypes.shape({
    rescueShelter: PropTypes.shape({
      totalRescued: PropTypes.number.isRequired,
      men: PropTypes.number.isRequired,
      women: PropTypes.number.isRequired,
      children: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

// Custom Legend
const CustomLegend = ({ payload, shelterData }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {payload.map((entry, index) => (
        <div key={`legend-${entry.payload.name}`} className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-600">
            {entry.value}: {shelterData[index].value} (
            {shelterData[index].percentage}%)
          </span>
        </div>
      ))}
    </div>
  );
};

CustomLegend.propTypes = {
  payload: PropTypes.array,
  shelterData: PropTypes.array,
};

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{data.name}</p>
        <p className="text-gray-600">Count: {data.value}</p>
        <p className="text-gray-600">Percentage: {data.percentage}%</p>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
};


