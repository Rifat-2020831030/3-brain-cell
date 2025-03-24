import { useState } from "react";

const organizationData = [
    {
      name: "Lindsey Curtis",
      role: "Web Designer",
      location: "Chittagong",
      status: "Active",
    },
    {
      name: "Kaiya George",
      role: "locaton Manager",
      location: "Chittagong",
      status: "Pending",
    },
    {
      name: "Zain Geidt",
      role: "Content Writing",
      location: "Chittagong",
      status: "Active",
    },
    {
      name: "Abram Schleifer",
      role: "Digital Marketer",
      location: "Chittagong",
      status: "Cancel",
    },
    {
      name: "Carla George",
      role: "Front-end Developer",
      location: "Chittagong",
      status: "Active",
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
                <th className="p-2 text-left">Volunteer Name</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-center">Avatar</th>
                <th className="p-2 text-center">Status</th>
                <th>Approval</th>
              </tr>
            </thead>
            <tbody>
              {organizationData.map((user, index) => (
                <tr key={index} className="border-b-1 border-gray-300">
                  <td className="p-3">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.role}</div>
                  </td>
                  <td className="p-3">{user.location}</td>
                  <td className="p-3 flex -space-x-2 overflow-hidden">
                    {[...Array(user.team)].map((_, i) => (
                      <img
                        key={i}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                        src={`https://i.pravatar.cc/40?img=${i + index}`}
                        alt="Team Member"
                      />
                    ))}
                  </td>
                  <td className="p-3">
                    <p
                      className={`${
                        user.status === "Active" ? "text-green-500" : "text-red-500"
                      } px-2 py-1 text-center`}
                    >
                      {user.status}
                    </p>
                  </td>
                  <td className="flex justify-center items-end">
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