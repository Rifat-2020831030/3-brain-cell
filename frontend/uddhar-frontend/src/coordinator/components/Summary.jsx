import Proptypes from "prop-types";

export const DisasterSummary = ({ data }) => {
  const statCards = [
    {
      title: "Total Reports",
      value: data.totalReports,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Volunteers",
      value: data.totalVolunteers,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Organizations",
      value: data.organizations.length,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Total Rescued",
      value: data.rescueShelter.totalRescued,
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {statCards.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          bgColor={card.bgColor}
          textColor={card.textColor}
        />
      ))}
    </div>
  );
};

const StatCard = ({ title, value, bgColor, textColor }) => (
  <div className={`${bgColor} p-4 rounded-lg`}>
    <h3 className={`text-sm ${textColor} font-semibold`}>{title}</h3>
    <p className={`text-2xl font-bold ${textColor.replace("600", "800")}`}>
      {value}
    </p>
  </div>
);

DisasterSummary.propTypes = {
  data: Proptypes.shape({
    totalReports: Proptypes.number,
    totalVolunteers: Proptypes.number,
    organizations: Proptypes.array,
    rescueShelter: Proptypes.shape({
      totalRescued: Proptypes.number,
    }),
  }),
};

StatCard.propTypes = {
  title: Proptypes.string.isRequired,
  value: Proptypes.oneOfType([Proptypes.string, Proptypes.number]).isRequired,
  bgColor: Proptypes.string.isRequired,
  textColor: Proptypes.string.isRequired,
};
