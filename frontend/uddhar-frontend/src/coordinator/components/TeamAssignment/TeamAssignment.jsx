import { toast } from "sonner";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import { assignATeam, getTeamData, getUpozilas } from "../../data/TeamManagement";
import TeamAssignmentTable from "./TableWithPagination";
import TeamDetails from "./TeamDetails";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const responsibilities = ["Rescue", "Medical", "Food Distribution"];

const TeamAssignment = ({currentEvent}) => {
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [asignData, setAsignData] = useState();
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);

  const fetchTeamDetails = async () => {
    setLoading(true);
    const response = await getTeamData(currentEvent?.disaster_id);
    setLoading(false);
    (response.status) && setData(response.data);
  }
  useEffect(() => {
    // get the team data of the current event
    fetchTeamDetails();
    // get upozilas of the affected area
    const fetchUpozilas = async () => {
      if(data.length === 0) return;
      const response = await getUpozilas(currentEvent.location);
      response.status && setLocations(response.data);
    }
    fetchUpozilas();
  },[currentEvent?.disaster_id]);

  const handleSelect = (value, name) => {
    setAsignData((prev) => ({ ...prev, [name]: value }));
  };

  // handle assignment of a team
  const assign = async () => {
    setLoading(true);
    const response = await assignATeam(
      selectedTeam.team_id,
      currentEvent?.disaster_id,
      asignData,
    );

    setLoading(false);
    if (response.status) {
      toast.success(`Team ${selectedTeam?.team_id} assigned successfully`);
      // change value locally
      fetchTeamDetails();
      setSelectedTeam(null);
      return;
    } 
    toast.error(`Error assigning team: ${response.message}`);
  };
  return (
    <div className="h-auto w-full mx-auto p-6 mb-8">
      <h1 className="text-4xl font-bold mb-2">Team Assignment</h1>
      {loading && <LoadingScreen />}
      <TeamAssignmentTable
        assign={assign}
        data={data}
        locations={locations}
        responsibilities={responsibilities}
        setSelectedTeam={setSelectedTeam}
      />
      {selectedTeam && (
        <TeamDetails
          selectedTeam={selectedTeam}
          closeTeamDetails={() => setSelectedTeam(null)}
          locations={locations}
          responsibilities={responsibilities}
          handleSelect={handleSelect}
          assign={assign}
        />
      )}
    </div>
  );
};

export default TeamAssignment;

TeamAssignment.propTypes = {
  currentEvent: PropTypes.object.isRequired,
};