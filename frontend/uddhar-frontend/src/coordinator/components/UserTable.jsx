import { useState } from "react";

import { organizationData } from "../data/Data";

const statusOptions = [
  { label: "Active", color: "bg-green-200 text-green-800" },
  { label: "Pending", color: "border-blue-800 text-blue-800" },
  { label: "Cancel", color: "bg-red-200 text-red-800" },
];

const UserTable = () => {
  const [statuses, setStatuses] = useState(
    organizationData.map((user) => user.status)
  );

  const handleStatusChange = (index, newStatus) => {
    setStatuses((prev) =>
      prev.map((status, i) => (i === index ? newStatus : status))
    );
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <h1 className="p-4 text-2xl text-gray-800 font-semibold">Organization Creation Request</h1>
        <div className="overflow-x-auto p-4 w-full">
          <table className="min-w-full border-[0.1px] border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Organization Name</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Team Member</th>
                <th className="p-3 text-left">Status</th>
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
                    <select
                      className={`p-2 border rounded bg-white ${
                        statusOptions.find((s) => s.label === statuses[index])
                          ?.color
                      }`}
                      value={statuses[index]}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                    >
                      {statusOptions.map(({ label, color }) => (
                        <option key={label} value={label} className={color}>
                          {label}
                        </option>
                      ))}
                    </select>
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

export default UserTable;
