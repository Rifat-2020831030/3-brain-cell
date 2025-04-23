import { useState } from "react";
import TeamDetails from "./TeamDetails";
import { assignATeam } from "../data/TeamManagement";
import { Toaster, toast } from "sonner";
import PropTypes from "prop-types";
import LoadingScreen from "../../shared/components/LoadingScreen";

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

const locations = [
  "Ashulia",
  "Dhaka",
  "Savar",
];
const responsibilities = [
  "Rescue",
  "Medical",
  "Food Distribution",
];

const getUniqueValues = (data, key) => {
  return [...new Set(data.map((item) => item[key]))];
};

const TableWithPagination = ({currentEvent}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    assignedLocation: "",
    responsibility: "",
    organisation: "",
  });
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    assignedLocation: false,
    responsibility: false
  });

  const [loading, setLoading] = useState(false);
  const [asignData, setAsignData] = useState();
  const handleSelect = (e, name) => {
    const selectedData = e.target.value;
    setAsignData((prev) => ({ ...prev, [name]: selectedData }));
  };

  const assign = async () => {
    setLoading(true);
    console.log("Location from event: , with disaster ID: ", location, currentEvent.disaster_id);
    const data = {
      teamId: asignData.teamNo,
      disasterId: currentEvent?.disaster_id,
      location: asignData.location,
      responsibility: asignData.responsibility,
    }
    const response = await assignATeam(data);
    
    setLoading(false);
    if (response.status === "success") {
      toast.success(`Team ${asignData.teamNo} assigned successfully`);
    } else {
      toast.error(`Error assigning team: ${response.message}`);
    }
  }

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

  const handleFilterToggle = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value
    }));
    
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const closeTeamDetails = () => {
    setSelectedTeam(null);
  };

  return (
    <div className="relative">
      <Toaster richColors position="bottom-right" />
      <p className="text-3xl ml-5">Team Information</p>
      <div className="container mx-auto p-4">
        <div className="flex gap-x-2 mb-4">
          <p className="text-2xl">Filter</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleFilterToggle('assignedLocation', filters.assignedLocation)}
              className={`px-4 py-2 rounded cursor-pointer ${
                selectedFilters.assignedLocation 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Assigned Location
            </button>
            <button
              onClick={() => handleFilterToggle('responsibility', filters.responsibility)}
              className={`px-4 py-2 rounded cursor-pointer ${
                selectedFilters.responsibility 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Responsibility
            </button>
          </div>
        </div>

        {/* Filter dropdowns */}
        {selectedFilters.assignedLocation && (
          <div className="mb-4">
            <select
              value={filters.assignedLocation}
              onChange={(e) => setFilters(prev => ({...prev, assignedLocation: e.target.value}))}
              className="border rounded px-2 py-1 cursor-pointer"
            >
              <option value="">All Locations</option>
              {uniqueValues.assignedLocation.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedFilters.responsibility && (
          <div className="mb-4">
            <select
              value={filters.responsibility}
              onChange={(e) => setFilters(prev => ({...prev, responsibility: e.target.value}))}
              className="border rounded px-2 py-1 cursor-pointer"
            >
              <option value="">All Responsibilities</option>
              {uniqueValues.responsibility.map((responsibility) => (
                <option key={responsibility} value={responsibility}>
                  {responsibility}
                </option>
              ))}
            </select>
          </div>
        )}

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
                className={`${index % 2 === 0 ? "bg-gray-200" : "bg-white"} hover:bg-blue-100 cursor-pointer`}
                onClick={() => handleTeamSelect(item)}
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

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-x-2">
            <button
              onClick={() => handleClick(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded cursor-pointer disabled:opacity-50"
            >
              &laquo;
            </button>
            <button
              onClick={() => handleClick(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded cursor-pointer disabled:opacity-50"
            >
              &lsaquo;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
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
              className="px-2 py-1 border rounded cursor-pointer disabled:opacity-50"
            >
              &rsaquo;
            </button>
            <button
              onClick={() => handleClick(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded cursor-pointer disabled:opacity-50"
            >
              &raquo;
            </button>
          </div>
          <div>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
      </div>

      {/* Team Details Overlay */}
      {loading && <LoadingScreen />}
      {selectedTeam && (  <TeamDetails selectedTeam={selectedTeam} closeTeamDetails={closeTeamDetails} locations={locations} responsibilities={responsibilities} handleSelect={handleSelect} assign={assign}/>)}
    </div>
  );
};

export default TableWithPagination;

TableWithPagination.propTypes = {
  currentEvent: PropTypes.shape({
    disaster_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  }),
};