import { BadgeMinus, BadgePlus } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import VolunteerTable from "../../shared/components/VolunteerTable";
import { assignTeam } from "../data/TeamManagement";
import { getCurrentDisasters } from "../../shared/data/DisasterManagement";

const TeamAssignment = ({ volunteers, setVolunteers }) => {
  const [assignedVolunteers, setAssignedVolunteers] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [leaderId, setLeaderId] = useState(null);
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [availableDisasters, setAvailableDisasters] = useState([]);

  useEffect(() => {
    const getJoinedDisasters = async () => {
      const response = await getCurrentDisasters();
      const joinedDisasterId = JSON.parse(localStorage.getItem("joinedDisasters") || "[]");
      if (response.status) {
        const available = response.data.filter(disaster => joinedDisasterId.includes(disaster.disaster_id));
        setAvailableDisasters(available);
      } 
    }
    getJoinedDisasters();
  },[]);

  const handleSelectionChange = (event) => {
    const selectedId = event.target.value;
    setSelectedDisaster(selectedId);
  };

  const toggleSelectVolunteer = (volunteerId) => {
    const newSelectedVolunteers = new Set(selectedVolunteers);
    if (newSelectedVolunteers.has(volunteerId)) {
      newSelectedVolunteers.delete(volunteerId);
    } else {
      newSelectedVolunteers.add(volunteerId);
    }
    setSelectedVolunteers(newSelectedVolunteers);
  };

  const addSelectedVolunteers = () => {
    const selected = volunteers.filter((v) => selectedVolunteers.has(v.id)); // filter out selected volunteers
    setAssignedVolunteers([...assignedVolunteers, ...selected]);
    setVolunteers(volunteers.filter((v) => !selectedVolunteers.has(v.id))); // remove selected volunteers from the available list
    setSelectedVolunteers(new Set());
  };
  // Remove selected volunteers from the assigned list
  const removeSelectedVolunteers = () => {
    const selected = assignedVolunteers.filter((v) =>
      selectedVolunteers.has(v.id)
    );
    setVolunteers([...volunteers, ...selected]);
    setAssignedVolunteers(
      assignedVolunteers.filter((v) => !selectedVolunteers.has(v.id))
    );
    setSelectedVolunteers(new Set());
  };

  //on Submit
  const createTeam = async () => {
    const isTeamIncomplete = !assignedVolunteers.length || !leaderId || !selectedDisaster;
    if (isTeamIncomplete) {
      toast.error("Please select provide required data to assign the team");
      return;
    }
    const teamData = {
      teamName: `Team-${leaderId}`, 
      teamLeader: leaderId,
      memberIds: assignedVolunteers.map((volunteer) => volunteer.id),
      disasterId: selectedDisaster,
    };
    const response = assignTeam(teamData); // returns a promise
    toast.promise(response, {
      loading: "Assigning volunteers...",
    });

    const result = await response;
    if (result.status) {
      toast.success("Volunteers assigned successfully");
      setAssignedVolunteers([]);
      return;
    }
    toast.error(result.message);
  };

  const filteredVolunteers =
    (volunteers.length > 0 &&
      volunteers.filter((volunteer) =>
        volunteer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )) ||
    [];

  return (
    <div className="flex flex-col items-center p-8 bg-gray-200 min-h-screen w-full">
      <Toaster position="top-center" />
      {((assignedVolunteers.length > 0 || selectedVolunteers.length > 0) && availableDisasters.length > 0) ? (
        <>
          <div className="flex justify-end w-full mb-4 gap-y-3">
            <button
              onClick={createTeam}
              className="bg-green-500 text-white px-6 py-2 hover:bg-green-600 transition duration-200 cursor-pointer"
            >
              Create
            </button>
          </div>
          <div className="w-full flex justify-start ml-10">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-400 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300 max-w-100 w-100"
            />
          </div>
          {/* available disasters list */}
          <div className="max-w-md mx-auto p-4 space-y-4">
            <div className="space-y-2">
              <label 
                htmlFor="disaster-select" 
                className="block text-sm font-medium text-gray-700"
              >
                Select a Disaster:
              </label>
              <select
                id="disaster-select"
                value={selectedDisaster || ""}
                onChange={handleSelectionChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm"
              >
                {availableDisasters.map((disaster) => (
                  <option key={disaster.disaster_id} value={disaster.disaster_id}>
                    ({disaster.disaster_id}) {disaster.title} : {disaster.location}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col w-full min-w-4xl ml-10">
            <div className="flex mb-10">
              <VolunteerTable
                title="Available Volunteers"
                volunteers={filteredVolunteers}
                selectedVolunteers={selectedVolunteers}
                toggleSelectVolunteer={toggleSelectVolunteer}
                isSelectable={true}
              />
              <div className="flex flex-col justify-center items-center mx-4">
                <button
                  onClick={addSelectedVolunteers}
                  className="bg-blue-300 text-black cursor-pointer p-2 rounded mb-2 hover:bg-blue-500 transition duration-200"
                >
                  <BadgePlus />
                </button>
                <button
                  onClick={removeSelectedVolunteers}
                  className="rounded text-red-500 bg-red-100 hover:bg-red-200 cursor-pointer p-2 hover:text-red-700 transition duration-200"
                >
                  <BadgeMinus />
                </button>
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <VolunteerTable
                title="Selected Volunteers"
                volunteers={assignedVolunteers}
                selectedVolunteers={selectedVolunteers}
                toggleSelectVolunteer={toggleSelectVolunteer}
                isSelectable={true}
                setLeaderId={setLeaderId}
                leaderId={leaderId}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            No Volunteers Available
          </h1>
          <p className="text-gray-500">
            Please add volunteers to assign them to a team.
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamAssignment;

TeamAssignment.propTypes = {
  volunteers: PropTypes.array,
  setVolunteers: PropTypes.func,
};
