import { useState } from "react";

const organizationData = [
  {
    name: "Lindsey Curtis",
    role: "Web Designer",
    location: "Chittagong",
    skill: "Rescue Expert",
  },
  {
    name: "Kaiya George",
    role: "locaton Manager",
    location: "Chittagong",
    skill: "Reliefe Distribution",
  },
  {
    name: "Zain Geidt",
    role: "Content Writing",
    location: "Chittagong",
    skill: "Medical Aid",
  },
  {
    name: "Abram Schleifer",
    role: "Digital Marketer",
    location: "Chittagong",
    skill: "Reliefe Distribution",
  },
  {
    name: "Carla George",
    role: "Front-end Developer",
    location: "Chittagong",
    skill: "Medical Aid",
  },
];

const statusOptions = [
  { label: "Approve", color: "bg-green-200 text-green-800" },
  { label: "Cancel", color: "bg-red-200 text-red-800" },
];

const VolunteerReqList = () => {
  const [status, setStatus] = useState(
    organizationData.map((user) => user.status)
  );

  const handleStatusChange = (index, newStatus) => {
    setStatus((prev) =>
      prev.map((status, i) => (i === index ? newStatus : status))
    );
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <h1 className="p-4 text-2xl text-gray-800 font-semibold">Volunteer Requests</h1>
        <div className="overflow-x-auto p-4 w-full">
          <table className="min-w-full border-[0.1px] border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Volunteer Name</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Skill</th>
                <th className="p-3 text-center">Approval</th>
              </tr>
            </thead>
            <tbody>
              {organizationData.map((user, index) => (
                <tr key={index} className="border-b-1 border-gray-300">
                  <td className="p-3">
                    <div className="font-semibold">{user.name}</div>
                  </td>
                  <td className="p-3">{user.location}</td>
                  <td className="p-3">{user.skill}</td>
                  <td className="p-3 flex justify-center items-center">
                    <button className="border-2 rounded-[5px] bg-green-200 hover:bg-green-700 hover:text-white p-1 cursor-pointer text-green-500 mr-1">
                      Accept
                    </button>
                    <button className="border-2 rounded-[5px] bg-red-200 hover:bg-red-700 hover:text-white p-1 cursor-pointer text-red-500">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VolunteerReqList;