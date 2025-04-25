import { useState } from "react";
import { CgProfile } from "react-icons/cg";

const MemberList = [
  {
    id: 1,
    name: "Amit",
    avatar: "/",
    role: "Admin",
  },
  {
    id: 2,
    name: "Joy",
    avatar: "/",
    role: "Volunteer",
  },
  {
    id: 3,
    name: "Hassan",
    avatar: "/",
    role: "Volunteer",
  },
  {
    id: 4,
    name: "Rifat",
    avatar: "/",
    role: "Volunteer",
  },
  {
    id: 5,
    name: "Mehedi",
    avatar: "/",
    role: "Organizer",
  },
  {
    id: 6,
    name: "Amit",
    avatar: "/",
    role: "Admin",
  },
  {
    id: 7,
    name: "Joy",
    avatar: "/",
    role: "Volunteer",
  }
];

const RightPanel = () => {
  const MAX_VISIBLE_MEMBERS = 6;
  const [showAll, setShowAll] = useState(false);

  const visibleMembers = showAll
    ? MemberList
    : MemberList.slice(0, MAX_VISIBLE_MEMBERS);

  return (
    <div className="flex flex-col justify-between gap-y-1.5 sticky top-0 right-0">
      <div className="bg-gray-100 mr-1 mt-4 min-w-68 px-8 py-6 h-screen border-gray-300 border-1 rounded-l-2xl shadow-2xl">
        <h1 className="text-xl font-bold text-gray-800 mb-3">Board Member</h1>

        <div className="flex flex-col gap-3 mt-4">
          {visibleMembers.map((member) => (
            <div
              key={member.id}
              className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-3">
                <CgProfile className="w-8 h-8 rounded-full" />
                <div>
                  <h1 className="text-md font-bold text-gray-800">
                    {member.name}
                  </h1>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
              <button className="bg-red-400 text-white px-3 py-1 text-xs rounded-lg">
                Remove
              </button>
            </div>
          ))}
          {MemberList.length > MAX_VISIBLE_MEMBERS && !showAll && (
            <button
              className="bg-blue-500 cursor-pointer text-white px-4 py-2 mt-3 rounded-lg self-center"
              onClick={() =>
                setShowAll((prev) => !prev)
              }
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default RightPanel;
