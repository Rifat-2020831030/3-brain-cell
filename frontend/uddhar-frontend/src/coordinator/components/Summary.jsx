import PropTypes from "prop-types";

export const DisasterSummary = ({ data }) => {
  const statCards = [
    {
      id: 1,
      title: "Total Reports",
      value: data.totalReports,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Total Volunteers",
      value: data.totalVolunteers,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      id: 3,
      title: "Organizations",
      value: data.organizations.length,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    { 
      id: 4,
      title: "Total Rescued",
      value: data.rescueShelter.totalRescued,
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {statCards.map((card) => (
        <StatCard
          key={card.id}
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
  data: PropTypes.shape({
    totalReports: PropTypes.number,
    totalVolunteers: PropTypes.number,
    organizations: PropTypes.array,
    rescueShelter: PropTypes.shape({
      totalRescued: PropTypes.number,
    }),
  }),
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};
