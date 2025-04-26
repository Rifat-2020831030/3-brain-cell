import { useState } from "react";
import { memberList } from "../../public/data/Data";
import Sidebar from "../components/Sidebar";
import Avatar, { genConfig } from "react-nice-avatar";

function MemberList() {
  const [members, setMembers] = useState(memberList);
  const [isChanged, setIsChanged] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleRoleChange = (index, newRole) => {
    const updatedMembers = [...members];
    updatedMembers[index].role = newRole;
    setMembers(updatedMembers);
    setIsChanged(true);
  };

  const saveChanges = () => {
    // Reflect changes in the memberList array
    memberList.splice(0, memberList.length, ...members);
    setIsChanged(false);
    alert("Changes saved successfully!");
  };

  const ITEMS_PER_PAGE = 10;

  const currentUser = { id: 2, role: "Admin" }; // Example current user object

  const adminUsers = members.filter((member) => member.role === "Admin");
  const canChangeRole = adminUsers.some((admin) => admin.id === currentUser.id);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex flex-col m-5 ">
        <h3 className="text-4xl text-center font-bold mb-5 text-gray-700">
          Member List
        </h3>
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-y-auto max-h-120">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-600 text-white text-left">
                  <th className="px-4 py-2 text-center">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2 text-left">Avatar</th>
                  <th className="px-4 py-2 text-center">Role</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Skill</th>
                  <th className="px-4 py-2 text-center">Remove Member</th>
                </tr>
              </thead>
              <tbody>
                {members
                  .slice(
                    currentPage * ITEMS_PER_PAGE,
                    (currentPage + 1) * ITEMS_PER_PAGE
                  )
                  .map((member, index) => (
                    <tr key={member.id} className="border-b">
                      <td className="px-4 py-2 text-center">{member.id}</td>
                      <td className="px-4 py-2">{member.name}</td>
                      <td className="px-4 py-2 text-center">
                        <Avatar className="w-10 h-10" {...genConfig(member.name)} />
                      </td>
                      <td className="px-4 py-2 text-center">
                        {canChangeRole ? (
                          <div
                            className="relative "
                          >
                            <button
                              onClick={() => {
                                const popup = document.getElementById(
                                  `role-popup-${index}`
                                );
                                if (popup) {
                                  popup.style.display = "block";
                                }
                              }}
                              className="cursor-pointer border-1 w-20 rounded bg-blue-300/70 hover:bg-blue-300"
                            >
                              {`${member.role}`}
                            </button>
                            <div
                              id={`role-popup-${index}`}
                              className="absolute  bg-white border border-gray-300 rounded shadow-lg p-2"
                              style={{
                                display: "none",
                                zIndex: 10,
                              }}
                            >
                              <select
                                value={member.role}
                                onChange={(e) => {
                                  handleRoleChange(index, e.target.value);
                                }}
                                className="px-2 py-1 rounded border border-gray-300"
                              >
                                <option value="Volunteer">Volunteer</option>
                                <option value="Admin">Admin</option>
                                <option value="Organizer">Organizer</option>
                              </select>
                              <div className="flex justify-end mt-2">
                                <button
                                  onClick={() => {
                                    const popup = document.getElementById(
                                      `role-popup-${index}`
                                    );
                                    if (popup) {
                                      popup.style.display = "none";
                                    }
                                  }}
                                  className="px-2 py-1 bg-red-600/70 cursor-pointer text-white rounded"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span>{member.role}</span>
                        )}
                      </td>
                      <td className="px-4 py-2">{member.location}</td>
                      <td className="px-4 py-2">{member.skill}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            const updatedMembers = members.filter(
                              (_, i) => i !== index
                            );
                            setMembers(updatedMembers);
                            setIsChanged(true);
                          }}
                          className="px-2 py-1 bg-red-500/70 hover:bg-red-500 cursor-pointer text-white rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex mt-4 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded cursor-pointer ${
              currentPage === 0
                ? "bg-gray-400 text-gray-700"
                : "bg-amber-600 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={saveChanges}
            disabled={!isChanged}
            className={`px-4 py-2 rounded cursor-pointer ${
              isChanged
                ? "bg-green-600 text-white"
                : "bg-gray-400 text-gray-700"
            }`}
          >
            Save Changes
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                (prev + 1) * ITEMS_PER_PAGE < members.length ? prev + 1 : prev
              )
            }
            disabled={(currentPage + 1) * ITEMS_PER_PAGE >= members.length}
            className={`px-4 py-2 rounded cursor-pointer ${
              (currentPage + 1) * ITEMS_PER_PAGE >= members.length
                ? "bg-gray-400 text-gray-700"
                : "bg-amber-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemberList;
