import { BadgeMinus, BadgePlus } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import VolunteerTable from "../../shared/components/VolunteerTable";
import { assignTeam } from "../data/TeamManagement";

const TeamAssignment = () => {
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: "Hasan Ali",
      experience: "5 years",
      skills: "First Aid",
      organization: "Red Cross",
      location: "Akhalia",
    },
    {
      id: 2,
      name: "Hamza Khan",
      experience: "3 years",
      skills: "Logistics",
      organization: "UNICEF",
      location: "Modina market",
    },
    {
      id: 3,
      name: "Ali Raza",
      experience: "2 years",
      skills: "First Aid",
      organization: "Red Cross",
      location: "Akhalia",
    },
  ]);

  const [assignedVolunteers, setAssignedVolunteers] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");


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
    const teamData = JSON.stringify({
        memberIds: assignedVolunteers.map((volunteer) => volunteer.id),
    });
    const response = assignTeam(teamData); // returns a promise
    toast.promise(response, {
      loading: "Assigning volunteers...",
    });

    const result = await response;
    if (result.success) {
      toast.success("Volunteers assigned successfully", {
        cancel: {
          label: "Cancel",
        },
      });
      setAssignedVolunteers([]);
    } else {
      toast.error(result.message || "An error occurred while assigning team");
    }
  };

  const filteredVolunteers = volunteers.filter((volunteer) =>
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen w-full">
      <div className="flex justify-end w-full mb-4 gap-x-3">
        <button
          onClick={createTeam}
          className="bg-green-500 text-white px-6 py-2 hover:bg-green-600 transition duration-200 cursor-pointer"
        >
          Create
        </button>
      </div>
      <div className="w-full flex justify-start">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-green-300 max-w-50"
        />
      </div>
      <div className="flex w-full min-w-4xl">
        <div className="w-1/2 mr-4">
          <VolunteerTable
            title="Available Volunteers"
            volunteers={filteredVolunteers}
            selectedVolunteers={selectedVolunteers}
            toggleSelectVolunteer={toggleSelectVolunteer}
            isSelectable={true}
          />
        </div>

        <div className="flex flex-col justify-center items-center mx-4">
          <button
            onClick={addSelectedVolunteers}
            className="bg-blue-300 text-black cursor-pointer p-2 rounded mb-2 hover:bg-blue-500 transition duration-200"
          >
            <BadgePlus />
          </button>
          <button
            onClick={removeSelectedVolunteers}
            className="rounded text-red-500 cursor-pointer p-2 hover:text-red-700 transition duration-200"
          >
            <BadgeMinus />
          </button>
        </div>

        <div className="w-1/2">
          <VolunteerTable
            title="Assigned Volunteers"
            volunteers={assignedVolunteers}
            selectedVolunteers={selectedVolunteers}
            toggleSelectVolunteer={toggleSelectVolunteer}
            isSelectable={true}
          />
        </div>
        <Toaster position="bottom-right" />
      </div>
    </div>
  );
};

export default TeamAssignment;
