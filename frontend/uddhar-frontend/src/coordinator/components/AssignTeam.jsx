import { BadgeMinus, BadgePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import SingleSelection from "../../shared/components/SingleSelection";
import VolunteerTable from "../../shared/components/VolunteerTable";
import { assignTeam } from "../data/TeamManagement";
import { effectedLocation, responsibility } from "../data/DisasterCreationApi";

const TeamAssignment = () => {
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: "John Doe",
      experience: "5 years",
      skills: "First Aid",
      organization: "Red Cross",
      location: "New York",
    },
    {
      id: 2,
      name: "Jane Smith",
      experience: "3 years",
      skills: "Logistics",
      organization: "UNICEF",
      location: "Los Angeles",
    },
    {
      id: 3,
      name: "Alice Johnson",
      experience: "2 years",
      skills: "First Aid",
      organization: "Red Cross",
      location: "Chicago",
    },
  ]);

  const [assignedVolunteers, setAssignedVolunteers] = useState([]);
  const [assignedLocation, setAssignedLocation] = useState("");
  const [assignedResponsibility, setAssignedResponsibility] = useState("");
  const [selectedVolunteers, setSelectedVolunteers] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      const locations = await effectedLocation();
        if (locations.success) {
            setLocations(locations.data);
        } else {
            toast.error(locations.message || "An error occurred while fetching locations");
        }
    }

    async function fetchResponsibilities() {
      const responsibilities = await responsibility();
        if (responsibilities.success) {
            setResponsibilities(responsibilities.data);
        } else {
            toast.error(responsibilities.message || "An error occurred while fetching responsibilities");
        }
    }

    fetchLocations();
    fetchResponsibilities();
  }, []);

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
  const assignVolunteers = async () => {
    const teamData = JSON.stringify({
      location: assignedLocation,
      responsibility: assignedResponsibility,
      volunteers: assignedVolunteers.map((volunteer) => volunteer.id),
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
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-end w-full max-w-4xl mb-4 gap-x-3">
        {/* Responsibility selection */}
        <SingleSelection
          options={[
            { value: "", label: "Select a responsibility" },
            { value: "Rescue", label: "Rescue Operation" },
            { value: "Distribution", label: "Food Distribution" },
            { value: "Management", label: "Operation Management" },
            { value: "Medical", label: "Medical Assistance" },
            { value: "Logistics", label: "Logistics" },
          ]}
          label="Assigned Responsibility"
          setValue={setAssignedResponsibility}
        />
        {/* Location selection */}
        <SingleSelection
          options={[
            { value: "", label: "Select a location" },
            { value: "AKhalia", label: "Akhalia, Sylhet" },
            { value: "Modina Market", label: "Modina Market" },
            { value: "Amborkhana", label: "Amborkhana" },
          ]}
          label="Assigned Location"
          setValue={setAssignedLocation}
        />
        <button
          onClick={assignVolunteers}
          className="bg-green-500 text-white px-6 py-2 hover:bg-green-600 transition duration-200"
        >
          Assign
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
      <div className="flex w-full max-w-4xl">
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
