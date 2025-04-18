import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const TeamDetails = ({
  selectedTeam,
  closeTeamDetails,
  locations,
  responsibilities,
  handleSelect,
  assign,
}) => {
  return (
    <div className="fixed inset-0 bg-blue bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
        <button
          onClick={closeTeamDetails}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
        >
          &times;
        </button>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">
            Team {selectedTeam.teamNo} Details
          </h2>
          <button
            onClick={() => { assign(selectedTeam.teamNo, )}}
            className="mr-10 border-black bg-green-500 hover:bg-green-700 hover:text-white px-5 rounded cursor-pointer"
          >
            Assign
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Leader:</h3>
            <p>{selectedTeam.leader}</p>
          </div>
          <div>
            <h3 className="font-semibold">Assigned Location:</h3>
            <select
              onChange={(e)=>{handleSelect(e, "location")}}
              className="border px-5 py-1 rounded"
            >
              {locations.map((location) => (
                <option key={uuidv4()} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="font-semibold">Responsibility:</h3>
            <select
              onChange={(e)=>{handleSelect(e, "responsibility")}}
              className="border px-5 py-1 rounded"
            >
              {responsibilities.map((responsibility) => (
                <option key={uuidv4()} value={responsibility}>
                  {responsibility}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="font-semibold">Organisation:</h3>
            <p>{selectedTeam.organisation}</p>
          </div>
        </div>

        <h3 className="font-semibold mt-4">Team Members:</h3>
        <ul className="list-disc pl-5">
          {selectedTeam.members?.map((member) => (
            <li key={uuidv4()}>{member}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamDetails;

TeamDetails.propTypes = {
  selectedTeam: PropTypes.shape({
    teamNo: PropTypes.string.isRequired,
    leader: PropTypes.string.isRequired,
    assignedLocation: PropTypes.string,
    responsibility: PropTypes.string,
    organisation: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  closeTeamDetails: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string),
  responsibilities: PropTypes.arrayOf(PropTypes.string),
  handleSelect: PropTypes.func,
  assign: PropTypes.func,
};
