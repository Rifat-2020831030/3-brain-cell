import axios from "axios";

export const getApplicants = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/organizations/applications`,
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
      `http://localhost:3000/organizations/applications/${id}/status`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
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
      `http://localhost:3000/organizations/create-teams`,
      teamData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.status === "success" || response.status === 200) {
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
      `http://localhost:3000/organizations/volunteers`,
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
          const id = volunteer.volunteer_id;
          const name = volunteer.name;
          const experience = volunteer.experience;
          const skills = volunteer.skills.map((skill) =>
            skill.replace(/_/g, " ").replace(/^./, (char) => char.toUpperCase())
          );
          const organization = volunteer.organization_name;
          const location = volunteer.work_location;
          return {
            id: id,
            name: name,
            experience: experience,
            skills: skills,
            organization: organization,
            location: location,
          };
        }),
      };
    } else {
      return {
        status: false,
        message: response.data.message || "Failed to fetch volunteers",
      };
    }
  } catch (error) {
    return {
      status: false,
      message:
        error.response.data.message ||
        "An error occurred while fetching volunteers",
    };
  }
};
