import axios from "axios";

export const getApplicants = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/organizations/applications`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200 || response.data.status === "success") {
      const applicants = response.data.data.map((applicant) => {
        const id = applicant.application_id;
        const status = applicant.status;
        // Capitalizing first letter and replacing underscores with spaces in skills
        const transformedSkills = applicant.volunteer.skills.map((skill) =>
          skill.replace(/_/g, " ").replace(/^./, (char) => char.toUpperCase())
        );
        return {
          id: id,
          status: status,
          name: applicant.volunteer.name,
          mobile: applicant.volunteer.mobile,
          skills: transformedSkills,
          location: applicant.volunteer.work_location,
        };
      });
      return {
        status: true,
        message: "Applicants fetched successfully",
        data: applicants,
      };
    } else {
      return {
        status: false,
        message: response.data.message || "Failed to fetch applicants",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "An error occurred while fetching applicants",
      error: error,
    };
  }
};

export const updateApplicantStatus = async (id, newStatus) => {
  const body = { status: newStatus };
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/organizations/applications/${id}/status`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200 || response.data.status === "success") {
      return {
        status: true,
        message: "Applicant status updated successfully",
      };
    }
    return {
      status: false,
      message: response.data.message || "Failed to update applicant status",
    };
  } catch (error) {
    return {
      status: false,
      message: "An error occurred while updating applicant status",
      error: error,
    };
  }
};

export const assignTeam = async (teamData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/organizations/create-teams`,
      teamData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const isSuccess = response.data.status === "success" || response.status === 200;
    if (isSuccess) {
      return {
        status: true,
        message: "Team assigned successfully",
      };
    }
    return {
      status: false,
      message: response.data.message,
    };
  } catch (error) {
    return {
      status: false,
      message: error.response.data.message,
      error: error,
    };
  }
};

export const getVolunteers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/organizations/volunteers`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.status === "success" || response.status === 200) {
      return {
        status: true,
        message: "Volunteers fetched successfully",
        data: response.data.data.map((volunteer) => {
          const volunteerInfo = volunteer.volunteers;
          const id = volunteerInfo.memberId;
          const name = volunteerInfo.name;
          const mobile = volunteerInfo.mobile;
          const skills = volunteerInfo.skills.map((skill) =>
          skill.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
          );
          const location = volunteerInfo.work_location;
          return {
            id: id,
            name: name,
            mobile: mobile,
            skills: skills,
            location: location,
          };
        }),
      };
    } 
    return {
      status: false,
      message: response.data.message || "Failed to fetch volunteers",
    };
  } catch (error) {
    return {
      status: false,
      message:
        "An error occurred while fetching volunteers",
      error: error,
    };
  }
};
