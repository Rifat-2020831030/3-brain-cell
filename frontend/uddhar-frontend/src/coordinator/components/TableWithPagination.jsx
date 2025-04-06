import { useState } from "react";
import FilterComponent from "./Filter";

const data = [
  {
    teamNo: 1,
    leader: "Abdur Rahman",
    assignedLocation: "New York",
    responsibility: "Rescue",
    organisation: "Red Cross",
  },
  {
    teamNo: 2,
    leader: "Md Labid",
    assignedLocation: "California",
    responsibility: "Medical",
    organisation: "WHO",
  },
  {
    teamNo: 3,
    leader: "Farhan Rahman",
    assignedLocation: "New York",
    responsibility: "Rescue",
    organisation: "Red Cross",
  },
  {
    teamNo: 4,
    leader: "Labid Hasan",
    assignedLocation: "California",
    responsibility: "Medical",
    organisation: "WHO",
  },
  {
    teamNo: 5,
    leader: "Abdur Rahman",
    assignedLocation: "New York",
    responsibility: "Rescue",
    organisation: "Red Cross",
  },
  {
    teamNo: 6,
    leader: "Md Labid",
    assignedLocation: "California",
    responsibility: "Medical",
    organisation: "WHO",
  },
  {
    teamNo: 7,
    leader: "Mehedi Hasan",
    assignedLocation: "BD",
    responsibility: "Food Distribution",
    organisation: "ASH",
  },
  {
    teamNo: 8,
    leader: "Labid Hasan",
    assignedLocation: "Dhaka",
    responsibility: "Relief",
    organisation: "VBD",
  },
];

const getUniqueValues = (data, key) => {
  return [...new Set(data.map((item) => item[key]))];
};

const TableWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    assignedLocation: "",
    responsibility: "",
    organisation: "",
  });

  const uniqueValues = {
    assignedLocation: getUniqueValues(data, "assignedLocation"),
    responsibility: getUniqueValues(data, "responsibility"),
    organisation: getUniqueValues(data, "organisation"),
  };

  const filteredData = data.filter((item) => {
    return (
      (filters.assignedLocation === "" ||
        item.assignedLocation === filters.assignedLocation) &&
      (filters.responsibility === "" ||
        item.responsibility === filters.responsibility) &&
      (filters.organisation === "" ||
        item.organisation === filters.organisation)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <p className="text-3xl ml-5">Team Information</p>
      <div className="container mx-auto p-4">
        <div className="flex gap-x-2">
            <p className="text-2xl">Filter</p>
          <FilterComponent
            filters={filters}
            setFilters={setFilters}
            uniqueValues={uniqueValues}
          />
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-black text-white text-left">
              <th className="py-2 px-4 border-b">Team No</th>
              <th className="py-2 px-4 border-b">Leader</th>
              <th className="py-2 px-4 border-b">Assigned Location</th>
              <th className="py-2 px-4 border-b">Responsibility</th>
              <th className="py-2 px-4 border-b">Organisation</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={item.teamNo}
                className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
              >
                <td className="py-2 px-4 border-b">{item.teamNo}</td>
                <td className="py-2 px-4 border-b">{item.leader}</td>
                <td className="py-2 px-4 border-b">{item.assignedLocation}</td>
                <td className="py-2 px-4 border-b">{item.responsibility}</td>
                <td className="py-2 px-4 border-b">{item.organisation}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-x-2">
            <button
              onClick={() => handleClick(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded cursor-pointer"
            >
              &laquo;
            </button>
            <button
              onClick={() => handleClick(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded cursor-pointer"
            >
              &lsaquo;
            </button>
            {[...Array(totalPages)].map((_, index, counter =0) => (
              <button
                key={counter++}
                onClick={() => handleClick(index + 1)}
                className={`px-2 py-1 border rounded cursor-pointer ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handleClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded cursor-pointer"
            >
              &rsaquo;
            </button>
            <button
              onClick={() => handleClick(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded cursor-pointer"
            >
              &raquo;
            </button>
          </div>
          <div>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1 cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableWithPagination;
