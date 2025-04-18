import axios from 'axios';

export const getApplicants = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/organizations/applications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if(response.status === 200 || response.data.status === "success") {
      const applicants = response.data.data.map((applicant) => {
        const id = applicant.application_id;
        const status = applicant.status;
        // Capitalizing first letter and replacing underscores with spaces in skills
        const transformedSkills = applicant.volunteer.skills.map(
          (skill) =>
            skill.replace(/_/g, " ").replace(/^./, (char) => char.toUpperCase())
        );
        return {
          id: id,
          status: status,
          name: applicant.volunteer.name,
          mobile: applicant.volunteer.mobile,
          skills: transformedSkills,
          location: applicant.volunteer.work_location,
        }
      })
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
}

export const updateApplicantStatus = async (id, newStatus) => {
  const body = { status: newStatus };
  try {
    const response = await axios.patch(`http://localhost:3000/organizations/applications/${id}/status`,
      body,
      {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    console.log(response);
    if(response.status === 200 || response.data.status === "success") {
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
}

export const assignTeam = async (teamData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return {
      success: false,
      message: "You are not authorized to perform this action",
    };
  }
  try {
    const response = await fetch(
      "http://localhost:3000/organizations/create-teams",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: teamData,
      }
    );
    console.log(response);
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while assigning team",
      error: error,
    };
  }
};
