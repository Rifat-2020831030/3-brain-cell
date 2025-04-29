import PropTypes from "prop-types";
import { CgAlbum } from "react-icons/cg";
import Button from "../../shared/components/Button";
import LoadingScreen from "../../shared/components/LoadingScreen";

const OrgCard = ({ org, handleCardClick, handleJoinRequest, isLoading, hasJoined }) => {

  return (
    <div className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 p-6 flex flex-col items-center border border-gray-200 relative">
      {isLoading && (
        <LoadingScreen loading={isLoading} height="h-24" width="w-24" />
      )}
      <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mb-4">
        <CgAlbum className="w-16 h-16 text-gray-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{org.name}</h3>
      <p className="text-sm text-gray-500 mb-1">
        <span className="text-blue-600 font-medium">Location:</span>{" "}
        {org.location}
      </p>
      <p className="text-sm text-gray-500 mb-1">
        <span className="text-blue-600 font-medium">Type:</span> {org.type}
      </p>
      <div className="flex justify-center gap-3 mt-4">
        <Button variant="secondary" onClick={() => handleCardClick(org)}>
          See Details
        </Button>
        {(org.requestStatus == "approved" || org.requestStatus == 'pending' || org.requestStatus == 'rejected') ? (
          <Button variant="primary" disabled>
            {org.requestStatus.toUpperCase()}
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => handleJoinRequest(org.id)}
            disabled={hasJoined}
          >
            Join
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrgCard;

OrgCard.propTypes = {
  org: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    sector: PropTypes.string,
    mission: PropTypes.string,
    location: PropTypes.string,
    website: PropTypes.string,
    parentOrg: PropTypes.string,
    mail: PropTypes.string,
    requestStatus: PropTypes.string,
  }).isRequired,
  handleCardClick: PropTypes.func,
  handleJoinRequest: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  hasJoined: PropTypes.bool,
};
