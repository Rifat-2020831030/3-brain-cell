import PropTypes from "prop-types";

const VolunteerTable = ({
  title,
  volunteers,
  selectedVolunteers,
  toggleSelectVolunteer,
  isSelectable,
  setLeaderId,
  leaderId,
}) => {
  return (
    <div className="w-250 my-4">
      <h2 className="text-lg font-bold mb-2 text-gray-700">{title}</h2>
      <span className="ml-2 inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
        {volunteers.length} Volunteers
      </span>
      <div className="overflow-y-auto max-h-64 shadow-md">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {isSelectable && <th className="py-3 px-6 text-left">Select</th>}
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Experience</th>
              <th className="py-3 px-6 text-left">Skills</th>
              <th className="py-3 px-6 text-left">Location</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {volunteers.map((volunteer) => (
              <tr
                key={volunteer.id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  selectedVolunteers.has(volunteer.id) ? "bg-blue-100" : ""
                }`}
              >
                {isSelectable && (
                  <td className="py-3 px-6 text-center">
                    <input
                      type="checkbox"
                      checked={selectedVolunteers.has(volunteer.id)}
                      onChange={() => toggleSelectVolunteer(volunteer.id)}
                    />
                  </td>
                )}
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {volunteer.name}
                  <span className="text-green-900 pl-1 font-bold">{leaderId === volunteer.id && "(Leader)"}</span>
                </td>
                <td className="py-3 px-6 text-left">{volunteer.experience}</td>
                <td className="py-3 px-6 text-left">{volunteer.skills}</td>
                <td className="py-3 px-6 text-left">{volunteer.location}</td>
                {setLeaderId && (
                  <td className="py-3 px-6 text-left">
                    <button
                      onClick={() => setLeaderId(volunteer.id)}
                      disabled={leaderId === volunteer.id}
                      className={`bg-green-800 text-white px-2 py-1 rounded cursor-pointer ${
                        leaderId === volunteer.id ? "opacity-50" : ""
                      }`}
                    >
                      {leaderId === volunteer.id ? "Remove from Leader" : "Set Leader"}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

VolunteerTable.propTypes = {
  title: PropTypes.string,
  volunteers: PropTypes.array.isRequired,
  selectedVolunteers: PropTypes.instanceOf(Set).isRequired,
  toggleSelectVolunteer: PropTypes.func.isRequired,
  isSelectable: PropTypes.bool,
  setLeaderId: PropTypes.func,
  leaderId: PropTypes.number,
};

export default VolunteerTable;
