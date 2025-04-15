import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import LoadingScreen from "../../shared/components/LoadingScreen";
import { getApplicants, updateApplicantStatus } from "../data/TeamManagement";
import TableFilters from "./TableFilter";
import TablePagination from "./TablePagination";
import TableSearch from "./TableSearch";


const VolunteerReqList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [reqLoading, setReqLoading] = useState({});

  const handleStatusChange = async (id, newStatus) => {
    if(reqLoading[id]) {
      console.log("Already processing request for id:", id);
      return;
    }
    setReqLoading((prev) => ({ ...prev, [id]: true }));
    console.log("Clicked for index:", id);
    console.log("Reqloading", reqLoading);

    // update on database
    const response = await updateApplicantStatus(id, newStatus);

    if(response.status) {
      // if success, update locally
      const updatedData = applicants.map((applicant)=>{
        if (applicant.id === id) {
          return { ...applicant, status: newStatus };
        }
        return applicant;
      })
      console.log("updatedData", updatedData);
      setApplicants(updatedData);
      toast.success(`Status updated successfully for id: ${id}`);
    } else {
      toast.error(response.message || response.error);
    }
    setReqLoading((prev) => ({ ...prev, [id]: false }));
    
  };

  // Fetch applicants data on page load
  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      const response = await getApplicants();
      if (response.status) {
        setApplicants(response.data);
      } else {
        toast.info(response.message || response.error);
      }
      setLoading(false);
    };
    fetchApplicants();
  }, []);
  // Get unique locations and skills
  const uniqueLocations = [
    "all",
    ...new Set(applicants.map((item) => item.location)),
  ];
  const uniqueSkills = [
    "all",
    ...new Set(applicants.map((item) => item.skill)),
  ];

  // Filter and search logic
  useEffect(() => {
    let result = [...applicants];

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (locationFilter !== "all") {
      result = result.filter((item) => item.location === locationFilter);
    }

    if (skillFilter !== "all") {
      result = result.filter((item) => item.skills.includes(skillFilter));
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [searchTerm, locationFilter, skillFilter, applicants]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="flex flex-col w-full relative">
        <Toaster position="top-center" richColors closeButton />
        {loading && <LoadingScreen />}
        <h1 className="p-4 text-2xl text-gray-800 font-semibold">
          Volunteer Requests
        </h1>
        {/* Search and filter section */}
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap gap-4">
            <TableSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            <TableFilters
              locationFilter={locationFilter}
              skillFilter={skillFilter}
              uniqueLocations={uniqueLocations}
              uniqueSkills={uniqueSkills}
              onLocationChange={setLocationFilter}
              onSkillChange={setSkillFilter}
            />
          </div>
        </div>
        {/* table section */}
        <div className="overflow-x-auto p-4 w-full">
          <table className="min-w-full border-[0.1px] border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Volunteer Name</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Skill</th>
                <th className="p-3 text-center">Approval</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user, index) => {
                let skillsText = "";
                if (Array.isArray(user.skills)) {
                  skillsText = user.skills.join(", ");
                } else {
                  skillsText = user.skills;
                }

                let buttonText = "";
                if (user.status === "approved") {
                  buttonText = "Cancel";
                } else {
                  buttonText = "Reject";
                }

                return (
                  <tr key={index} className="border-b-1 border-gray-300">
                    <td className="p-3">
                      <div className="font-semibold">{user.name}</div>
                    </td>
                    <td className="p-3">{user.location}</td>
                    <td className="p-3">{skillsText}</td>
                    <td className="p-3 flex justify-center items-center">
                      <button
                        disabled={user.status === "approved"}
                        onClick={() => handleStatusChange(user.id, "approved")}
                        className={`border-2 rounded-[5px] bg-green-200 hover:bg-green-700 hover:text-white p-1 cursor-pointer text-green-500 mr-1 ${
                          user.status === "Accepted"
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(user.id, "rejected")}
                        className="border-2 rounded-[5px] bg-red-200 hover:bg-red-700 hover:text-white p-1 cursor-pointer text-red-500"
                      >
                        {buttonText}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination section */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          startIndex={startIndex}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </>
  );
};

export default VolunteerReqList;
