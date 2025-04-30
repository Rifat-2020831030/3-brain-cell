import { useEffect, useState } from "react";
import TeamAssignment from "../components/AssignTeam";
import Sidebar from "../components/Sidebar";
import { getVolunteers } from "../data/TeamManagement";

const TeamCreation = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      const response = await getVolunteers();
      console.log('volunteer list: ',response);
      response.status && setVolunteers(response.data);
      response.status || console.log(response.message);
    };
    fetchVolunteers();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <TeamAssignment volunteers={volunteers} setVolunteers={setVolunteers} />
      </div>
    </div>
  );
};

export default TeamCreation;
