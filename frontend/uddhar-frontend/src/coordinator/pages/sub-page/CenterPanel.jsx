import PropTypes from "prop-types";
import Map from "../sub-page/Map";

const CenterPanel = ({ Event, currentEvent }) => {
  return (
    <div className="flex flex-col my-5">
      {Event}
      <div className="flex flex-col justify-center h-165 w-full my-10 overflow-hidden">
          <p className="text-4xl text-gray-800 text-center">Latest update on map</p>
          <span className="text-left text-lg text-gray-600">Currently observing updates of: <span className="text-blue-500">{currentEvent.title}</span></span>
          <Map currentEvent={currentEvent}/>
      </div>
    </div>
  );
};
export default CenterPanel;

CenterPanel.propTypes = {
  Event: PropTypes.element,
  currentEvent: PropTypes.object,
};
