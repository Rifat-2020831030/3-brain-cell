import ContentSection from "../../components/Content";
import TableWithPagination from "../../components/TableWithPagination";
import Button from "../../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import ReliefStat from "./ReliefStat";
import Stat from "./Stat";
import Proptypes from "prop-types";

const DisasterControl = ({Event, currentEvent, onGoingDisasters}) => {
  const navigate = useNavigate();
  return (
    <div>
      {Event}
      {currentEvent === null || currentEvent === undefined ? (
        <div className="flex flex-col justify-center items-center h-100 gap-y-10">
          <h1 className="text-3xl font-bold">There is no active event to show</h1>
          <Button onClick={navigate('/dashboard/coordinator/home')}>Checkout past disasters</Button>
        </div>
      ) : (
        <>
          <div className="h-auto w-full mx-auto p-6 mb-8">
            <h1 className="text-4xl font-bold mb-2">Disaster Details</h1>
              <ContentSection currentEvent={currentEvent} onGoingDisasters={onGoingDisasters} />
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 w-full">
            <h2 className="text-4xl font-semibold mb-4">Day-wise Relief Stat</h2>
            <ReliefStat currentEvent={currentEvent} />
          </div>
          <Stat disaster_id = {currentEvent.disaster_id}/>
          <TableWithPagination />
        </>
      )}
    </div>
  );
};
export default DisasterControl;

DisasterControl.propTypes = {
  Event: Proptypes.element,
  currentEvent: Proptypes.object,
  onGoingDisasters: Proptypes.func
};