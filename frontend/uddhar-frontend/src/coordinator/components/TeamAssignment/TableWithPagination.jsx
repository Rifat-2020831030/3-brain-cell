import PropTypes from "prop-types";
import { useState } from "react";

const getUniqueValues = (data, key) => {
  return [...new Set(data.map((item) => item[key]))];
};

const TableWithPagination = ({ data, setSelectedTeam }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    location: "",
    responsibility: "",
  });

  const uniqueValues = {
    location: getUniqueValues(data, "location"),
    responsibility: getUniqueValues(data, "responsibility"),
  };

  const filteredData = data.filter((item) => {
    return (
      (filters.location === "" ||
        item.location === filters.location) &&
      (filters.responsibility === "" ||
        item.responsibility === filters.responsibility)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const resetFilters = () => {
    setFilters({
      location: "",
      responsibility: "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Standard Filter Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700">Filters</h3>
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Reset all filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <select
              id="location"
              value={filters.location}
              onChange={(e) =>
                handleFilterChange("location", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Locations</option>
              {uniqueValues.location.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="responsibility"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Responsibility
            </label>
            <select
              id="responsibility"
              value={filters.responsibility}
              onChange={(e) =>
                handleFilterChange("responsibility", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Responsibilities</option>
              {uniqueValues.responsibility.map((responsibility) => (
                <option key={responsibility} value={responsibility}>
                  {responsibility}
                </option>
              ))}
            </select>
          </div>

        </div>
        {/* Results count */}
        <div className="text-sm text-gray-600 mt-3">
          Showing {filteredData.length} results
        </div>
      </div>
       
       {/* if no data available, show a message */}
      {data.length === 0 && (
        <div className="flex justify-center items-center h-64 text-gray-500">
          No team data available in database.
        </div>
      )}

      {/* Table */}
      {data.length > 0 && (
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-800 text-left text-white">
              <th className="py-3 px-4 border-b font-medium">Team No</th>
              <th className="py-3 px-4 border-b font-medium">Leader</th>
              <th className="py-3 px-4 border-b font-medium">
                Assigned Location
              </th>
              <th className="py-3 px-4 border-b font-medium">Responsibility</th>
              <th className="py-3 px-4 border-b font-medium">Organization</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((team) => (
              <tr
                key={team.team_id}
                className={`hover:bg-gray-300 cursor-pointer
                ${team.location && 'bg-green-300/50'}
                `}
                onClick={() => setSelectedTeam(team)}
              >
                <td className="py-3 px-4 border-b">{team.team_id}</td>
                <td className="py-3 px-4 border-b">{team.teamLeader}</td>
                <td className="py-3 px-4 border-b">{team.location || 'Not assigned'}</td>
                <td className="py-3 px-4 border-b">{team.responsibility || 'Not assigned'}</td>
                <td className="py-3 px-4 border-b">{team.organization?.organization_name || 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>

        <div className="flex gap-2">
          {(() => {
            let startPage, endPage;

            if (totalPages <= 5) {
              // Show all pages if total pages is 5 or less
              startPage = 1;
              endPage = totalPages;
            } else {
              // Calculate start and end pages for the sliding window
              startPage = Math.max(
                1,
                Math.min(currentPage - 2, totalPages - 4)
              );
              endPage = Math.min(totalPages, startPage + 4);
            }

            // Generate the page buttons
            return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const pageNum = startPage + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => handleClick(pageNum)}
                  className={`px-3 py-1 border rounded-md cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            });
          })()}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded-md px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TableWithPagination;

TableWithPagination.propTypes = {
  data: PropTypes.array.isRequired,
  setSelectedTeam: PropTypes.func.isRequired,
};
