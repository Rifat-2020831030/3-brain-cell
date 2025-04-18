import axios from "axios";

export const assignATeam = async (teamId, userId, teamData) => {
  console.log("Assigning team: ", teamId, " to user: ", userId);
  try {
    const response = await axios.post(``, teamData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    if (response.status === 200 || response.data.status === "success") {
      return {
        status: true,
        message: "Team assigned successfully",
      };
    } else {
      console.error("Error assigning team: ", response.data.message);
      return {
        status: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error("Error assigning team: ", error);
    return { status: false, message: "Error assigning team" };
  }
};
