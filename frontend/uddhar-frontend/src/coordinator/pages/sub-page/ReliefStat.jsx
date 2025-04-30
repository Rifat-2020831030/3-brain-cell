import ResourceGraph from "../../components/ResourceGraph";

const ReliefStat = () => {
  const sampleData = {
    "Medical Supplies": {
      "4/26/2025": 100,
      "4/27/2025": 120,
      "4/28/2025": 110,
      "4/29/2025": 130,
      "4/30/2025": 115,
    },
    "Food Resources": {
      "4/26/2025": 200,
      "4/27/2025": 220,
      "4/28/2025": 210,
      "4/29/2025": 230,
      "4/30/2025": 215,
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
