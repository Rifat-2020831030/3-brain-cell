import ResourceGraph from "../../components/ResourceGraph";

const ReliefStat = () => {
  const sampleData = {
    "Medical Supplies": {
      "4/8/2025": 100,
      "4/9/2025": 120,
      "4/10/2025": 110,
      "4/11/2025": 130,
      "4/12/2025": 115,
      "4/13/2025": 140,
      "4/14/2025": 125,
    },
    "Food Resources": {
      "4/8/2025": 200,
      "4/9/2025": 220,
      "4/10/2025": 210,
      "4/11/2025": 230,
      "4/12/2025": 215,
      "4/13/2025": 240,
      "4/14/2025": 225,
    },
  };

  const lines = [
    { name: "Medical Supplies", color: "#fff" },
    { name: "Food Resources", color: "#888" },
  ];
  return (
    <div>
      <ResourceGraph
        data={sampleData}
        lines={lines}
        dateRange={5}
        dateOffset={0}
      />
    </div>
  );
};
export default ReliefStat;
