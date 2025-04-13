import PropTypes from "prop-types";
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Bar Chart for Relief Distribution
export const ReliefDistributionChart = ({ data }) => {
  const reliefData = Object.entries(data.reliefDistribution.details).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <BarChart width={600} height={400} data={reliefData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

// Line Chart for Daily Breakdown
export const DailyBreakdownChart = ({ data }) => {
  return (
    <LineChart width={600} height={400} data={data.dailyBreakdown}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="volunteersCount"
        stroke="#8884d8"
        name="Volunteers"
      />
      <Line
        type="monotone"
        dataKey="itemsDistributed"
        stroke="#82ca9d"
        name="Items Distributed"
      />
      <Line
        type="monotone"
        dataKey="rescuedPeople"
        stroke="#ffc658"
        name="Rescued People"
      />
      <Line
        type="monotone"
        dataKey="medicalAidProvided"
        stroke="#ff8042"
        name="Medical Aid"
      />
    </LineChart>
  );
};

ReliefDistributionChart.propTypes = {
  data: PropTypes.shape({
    reliefDistribution: PropTypes.shape({
      details: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};

DailyBreakdownChart.propTypes = {
  data: PropTypes.shape({
    dailyBreakdown: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        volunteersCount: PropTypes.number.isRequired,
        itemsDistributed: PropTypes.number.isRequired,
        rescuedPeople: PropTypes.number.isRequired,
        medicalAidProvided: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
