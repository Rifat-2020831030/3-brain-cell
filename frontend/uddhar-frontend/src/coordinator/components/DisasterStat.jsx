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
  const reliefData = Object.entries(data)
    .filter(([key]) => key !== "totalItems") // Exclude totalItems
    .map(([name, value]) => ({
      name,
      value,
    }));

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
const DailyData = {
  dailyBreakdown: [
    {
      date: '2023-07-01',
      volunteersCount: 50,
      itemsDistributed: 200,
      rescuedPeople: 15,
      medicalAidProvided: 30
    },
    {
      date: '2023-07-02',
      volunteersCount: 65,
      itemsDistributed: 250,
      rescuedPeople: 20,
      medicalAidProvided: 35
    },
    {
      date: '2023-07-03',
      volunteersCount: 45,
      itemsDistributed: 180,
      rescuedPeople: 12,
      medicalAidProvided: 25
    },
    {
      date: '2023-07-04',
      volunteersCount: 70,
      itemsDistributed: 300,
      rescuedPeople: 25,
      medicalAidProvided: 40
    }
  ]
};

export const DailyBreakdownChart = ({ data = DailyData }) => {
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
