import { CgProfile } from "react-icons/cg";
import { MdPrecisionManufacturing } from "react-icons/md";
import  { useState } from "react";

const MemberList = [
  {
    name: "Amit",
    avatar: "/",
    role: "Admin",
  },
  {
    name: "Joy",
    avatar: "/",
    role: "Volunteer",
  },
  {
    name: "Hassan",
    avatar: "/",
    role: "Volunteer",
  },
  {
    name: "Rifat",
    avatar: "/",
    role: "Volunteer",
  },
  {
    name: "Mehedi",
    avatar: "/",
    role: "Organizer",
  },
  {
    name: "Amit",
    avatar: "/",
    role: "Admin",
  },
  {
    name: "Joy",
    avatar: "/",
    role: "Volunteer",
  },
  {
    name: "Hassan",
    avatar: "/",
    role: "Volunteer",
  },
  {
    name: "Rifat",
    avatar: "/",
    role: "Volunteer",
  },
  {
    name: "Mehedi",
    avatar: "/",
    role: "Organizer",
  },
  {
    name: "Amit",
    avatar: "/",
    role: "Admin",
  },
  {
    name: "Joy",
    avatar: "/",
    role: "Volunteer",
  },
];

const RightPanel = () => {
  const MAX_VISIBLE_MEMBERS = 6;
  const [showAll, setShowAll] =  useState(false);

  const visibleMembers = showAll ? MemberList : MemberList.slice(0, MAX_VISIBLE_MEMBERS);

  return (
    <>
    <div className="flex flex-col justify-between gap-1.5">

      <div className="bg-gray-100 mr-1 mt-4 min-w-68 px-8 py-6 h-screen border-gray-300 border-1 rounded-l-2xl shadow-2xl">
        <h1 className="text-xl font-bold text-gray-800 mb-3">Member List</h1>

        <div className="flex flex-col gap-3 mt-4">
          {visibleMembers.map((member, index) => (
            <div
              key={index}
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
              className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-lg self-center"
              onClick={() => setShowAll(true)}
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};
export default RightPanel;
