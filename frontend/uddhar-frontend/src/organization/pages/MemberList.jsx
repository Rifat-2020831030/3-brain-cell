import { useState } from "react";
import { memberList } from "../../public/data/Data";
import Sidebar from "../components/Sidebar";
import { CgProfile } from "react-icons/cg";

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
    <div className="flex h-full mt-3 mb-5">
        <div className="h-full w-1/5 text-white p-4">
            <Sidebar />
        </div>
        <div className="w-full flex flex-col mr-auto justify-center items-center">
            <h3 className="text-2xl font-serif text-wrap self-start m-5 ">
                Member List
            </h3>
            <div className="w-4/5 bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-y-auto max-h-120">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-green-600 text-white text-left">
                                <th className="px-4 py-2 text-center">ID</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2 text-left">Avatar</th>
                                <th className="px-4 py-2 text-center">Role</th>
                                <th className="px-4 py-2">Location</th>
                                <th className="px-4 py-2">Skill</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members
                                .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
                                .map((member, index) => (
                                    <tr key={member.id} className="border-b">
                                        <td className="px-4 py-2 text-center">{member.id}</td>
                                        <td className="px-4 py-2">{member.name}</td>
                                        <td className="px-4 py-2 text-center">
                                            <CgProfile
                                                className="w-12 h-12 rounded-full"
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {canChangeRole ? (
                                                <div
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="relative "
                                                >
                                                    <span
                                                        onClick={() => {
                                                            const popup = document.getElementById(
                                                                `role-popup-${index}`
                                                            );
                                                            if (popup) {
                                                                popup.style.display = "block";
                                                            }
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        {member.role}
                                                    </span>
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
                                                            <option value="volunteer">Volunteer</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="organizer">Organizer</option>
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
                                                                className="px-2 py-1 bg-red-500 text-white rounded"
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
                    className={`px-4 py-2 rounded ${
                        currentPage === 0 ? "bg-gray-400 text-gray-700" : "bg-blue-600 text-white"
                    }`}
                >
                    Previous
                </button>
                <button
                    onClick={saveChanges}
                    disabled={!isChanged}
                    className={`px-4 py-2 rounded ${
                        isChanged ? "bg-green-600 text-white" : "bg-gray-400 text-gray-700"
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
                    className={`px-4 py-2 rounded ${
                        (currentPage + 1) * ITEMS_PER_PAGE >= members.length
                            ? "bg-gray-400 text-gray-700"
                            : "bg-blue-600 text-white"
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
