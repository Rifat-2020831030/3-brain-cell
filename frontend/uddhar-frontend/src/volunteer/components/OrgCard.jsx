import Proptypes from "prop-types";
import { CgAlbum } from "react-icons/cg";
import Button from "../../shared/components/Button";

const OrgCard = ({ org, handleCardClick, handleJoinRequest }) => {
  return (
    <div className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 p-6 flex flex-col items-center border border-gray-200">
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
        <Button variant="secondary" onClick={()=> handleCardClick(org)}>See Details</Button>
        {org.isApplied? <Button disabled={true} >Applied</Button>:<Button onClick={()=>handleJoinRequest(org.id)}>Join</Button>}
      </div>
    </div>
  );
};

export default OrgCard;

OrgCard.propTypes = {
  org: Proptypes.shape({
    id: Proptypes.number.isRequired,
    name: Proptypes.string.isRequired,
    type: Proptypes.string,
    sector: Proptypes.string,
    mission: Proptypes.string,
    location: Proptypes.string,
    website: Proptypes.string,
    parentOrg: Proptypes.string,
    mail: Proptypes.string,
    isApplied: Proptypes.bool,
  }).isRequired,
  handleCardClick: Proptypes.func,
  handleJoinRequest: Proptypes.func.isRequired,
};
