import PropTypes from "prop-types";
import ContentSection from "../../components/Content";
import TeamAssignment from "../../components/TeamAssignment/TeamAssignment";

const DisasterManagement = ({ Event, currentEvent, onGoingDisasters }) => {
  //   if there is no active event
  if (currentEvent === null || currentEvent === undefined) {
    return (
      <div className="flex flex-col justify-center items-center h-100 gap-y-10">
        <h1 className="text-3xl font-bold">There is no active event to show</h1>
      </div>
    );
  }
  return (
    <div>
      {Event}
      <div>
        <div className="h-auto w-full mx-auto p-6 mb-8">
          <h1 className="text-4xl font-bold mb-2">Disaster Details</h1>
          {currentEvent.disaster_id ? (
            <ContentSection
            currentEvent={currentEvent}
            onGoingDisasters={onGoingDisasters}
          />
          ) : (
            <div className="flex flex-col justify-center items-center h-50 gap-y-10">
              <h1 className="text-3xl text-gray-800">There is no active event to show</h1>
            </div>
          )}
        </div>
        <TeamAssignment currentEvent={currentEvent} />
      </div>
    </div>
  );
};
export default DisasterManagement;

DisasterManagement.propTypes = {
  Event: PropTypes.element,
  currentEvent: PropTypes.object,
  onGoingDisasters: PropTypes.func,
};
