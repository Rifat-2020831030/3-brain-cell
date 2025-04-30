import { CircleX } from "lucide-react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const TeamDetails = ({
  selectedTeam,
  closeTeamDetails,
  locations,
  responsibilities,
  handleSelect,
  assign,
}) => {
  const [location, setLocation] = useState(selectedTeam?.location || "Dhaka");
  const [responsibility, setResponsibility] = useState(selectedTeam?.responsibility || "Rescue");
  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-10 w-full max-w-2xl relative">
        <button
          onClick={closeTeamDetails}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
        >
          <CircleX className="w-8 h-8" />
        </button>
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold mb-4">
            Team {selectedTeam.team_id} Details
          </h2>
          <button
            onClick={() => {
              assign(selectedTeam.team_id);
            }}
            className="mr-10 border-black bg-green-500 hover:bg-green-700 hover:text-white px-5 rounded cursor-pointer"
          >
            Assign
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col justify-center items-center gap-2 bg-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold">Team Leader</h3>
            <span className="text-green-600 font-semibold text-3xl">
              {selectedTeam.teamLeader}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 bg-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold">Assigned Location:</h3>
            <select
              onChange={(e) => {
                setLocation(e.target.value);
                handleSelect(e.target.value, "location");
              }}
              value={location}
              className="border px-5 py-1 rounded w-3/4"
            >
              {locations?.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 bg-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold">Responsibility:</h3>
            <select
              onChange={(e) => {
                setResponsibility(e.target.value);
                handleSelect(e.target.value, "responsibility");
              }}
              value={responsibility}
              className="border px-5 py-1 rounded w-3/4"
            >
              {responsibilities.map((responsibility) => (
                <option key={uuidv4()} value={responsibility}>
                  {responsibility}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 bg-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold">Organization:</h3>
            <p className="font-bold text-3xl">{selectedTeam.organization?.organization_name}</p>
          </div>
        </div>

        <h3 className="font-semibold my-4">Team Members:</h3>
        <div className="grid grid-cols-2 gap-4">
          {selectedTeam.members?.map((member, index) =>
            index < Math.ceil(selectedTeam.members.length / 2) ? (
              <ul key={`col1-${uuidv4()}`} className="list-disc pl-5">
                <li>{member.name}</li>
              </ul>
            ) : (
              <ul key={`col2-${uuidv4()}`} className="list-disc pl-5">
                <li>{member.name}</li>
              </ul>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;

TeamDetails.propTypes = {
  selectedTeam: PropTypes.shape({
    team_id: PropTypes.string.isRequired,
    teamLeader: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    organization: PropTypes.shape({
      organization_name: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.string,
    responsibility: PropTypes.string,
  }).isRequired,
  closeTeamDetails: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string),
  responsibilities: PropTypes.arrayOf(PropTypes.string),
  handleSelect: PropTypes.func,
  assign: PropTypes.func,
};
