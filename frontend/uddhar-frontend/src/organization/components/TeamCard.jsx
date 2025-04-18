import { useState } from "react";
import PropTypes from 'prop-types';

function TeamCard({ initialTeams, handleNext }) {

  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const closePopup = () => {
    setSelectedTeam(null);
  };

  return (
    <div className="ml-60 flex-wrap self-center">
      <div className="self-end ml-170 mb-2">
        <button
          onClick={() => {
            handleNext();
          }}
          className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-3 z-10 rounded-lg shadow-lg hover:from-green-500 hover:to-green-700 transition duration-300 transform hover:scale-105 font-semibold tracking-wide"
        >
          Submit Report
        </button>
      </div>
      <div className="space-y-6 w-full h-full ">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="border border-gray-300 px-15 py-2">Name</th>
              <th className="border border-gray-300 px-15 py-2">Team Number</th>
              <th className="border border-gray-300 px-15 py-2">Location</th>
              <th className="border border-gray-300 px-15 py-2">Event Name</th>
            </tr>
          </thead>
          <tbody>
            {initialTeams.map((team) => (
              <tr
                key={team.id}
                className="hover:bg-blue-100 transition duration-300"
              >
                <td
                  className="border border-gray-300 px-4 py-2 cursor-pointer text-blue-600 font-semibold underline"
                  onClick={() => handleTeamClick(team)}
                >
                  {team.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {typeof team.teamNumber === 'object' ? JSON.stringify(team.teamNumber) : team.teamNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {team.location}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {team.eventName}
                </td>
                {/* <td className="border border-gray-300 px-4 py-2 text-center">
      <button
        onClick={() => {
        handleNext();
        }}
        className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded shadow-md hover:from-green-500 hover:to-green-700 transition duration-300"
      >
        Submit Report
      </button>
      </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTeam && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-1/3 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
              {selectedTeam.name} Members
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Location</th>
                  <th className="border border-gray-300 px-4 py-2">Skill</th>
                </tr>
              </thead>
              <tbody>
                {selectedTeam.members && selectedTeam.members.length > 0 ? (
                  selectedTeam.members.map((member) => (
                    <tr key={member.id} className="hover:bg-blue-100 transition duration-300">
                      <td className="border border-gray-300 px-4 py-2 text-center">{member.id}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{member.name}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{member.location}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{member.skill}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                      No members available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              onClick={closePopup}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition duration-300 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
TeamCard.propTypes = {
  initialTeams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      teamNumber: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
      ]).isRequired,
      location: PropTypes.string.isRequired
    })
  ).isRequired,
  handleNext: PropTypes.func.isRequired
};

export default TeamCard;
