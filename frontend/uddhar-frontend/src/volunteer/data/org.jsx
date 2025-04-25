import axios from "axios";

export const getAllOrg = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/volunteers/organizations`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.status === "success" || response.status === 200) {
      let hasJoined = false;
      const organizationList = response.data.data.map((org) => {
        if (org.requestStatus === "approved") {
          hasJoined = true;
        }
        return {
          id: org.id,
          name: org.name,
          type: org.type,
          sector: org.sector,
          mission: org.mission,
          establishedDate: org.established_date,
          location: org.location,
          website: org.website,
          parentOrg: org.parentOrg,
          mail: org.mail,
          requestStatus: org.requestStatus,
        };
      });
      return {
        status: true,
        message: "Organizations fetched successfully",
        hasJoined,
        data: organizationList,
      };
    } else {
      return {
        status: false,
        message: response.data.message || "Failed to fetch organizations",
      };
    }
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return { status: false, message: "Failed to fetch organizations" };
  }
};

export const joinReq = async (orgId) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/volunteers/${orgId}/apply`
    );
    if (response.data.status === "success" || response.status === 200) {
      return {
        status: true,
        message: "Join request sent successfully",
      };
    } else {
      return {
        status: false,
        message: response.data.message || "Failed to send join request",
      };
    }
  } catch (error) {
    console.error("Error sending join request:", error);
    return { status: false, message: "Failed to send join request" };
  }
};
