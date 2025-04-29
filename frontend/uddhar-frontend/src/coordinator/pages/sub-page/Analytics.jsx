import PropTypes from "prop-types";
import ReliefStat from "./ReliefStat";
import Stat from "./Stat";

const Analytics = ({ Event, currentEvent }) => {
  //   if there is no active event
  if (currentEvent === null || currentEvent === undefined) {
    return (
      <div className="flex flex-col justify-center items-center h-100 gap-y-10">
        <h1 className="text-3xl font-bold">There is no active event to show</h1>
      </div>
    );
  }
  //   if there is an active event
  return (
    <>
      {Event}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full">
        <h2 className="text-4xl font-semibold mb-4">Relief Distribution Statistics</h2>
        <ReliefStat currentEvent={currentEvent} />
      </div>
      <Stat disaster_id={currentEvent.disaster_id} />
    </>
  );
};
export default Analytics;

Analytics.propTypes = {
  Event: PropTypes.element,
  currentEvent: PropTypes.object,
};
