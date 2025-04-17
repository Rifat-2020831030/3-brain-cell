import axios from "axios";

export const assignATeam = async (teamId, userId, teamData) => {
  console.log("Assigning team: ", teamId, " to user: ", userId);
  return {
    status: "success",
    message: "Team assigned successfully",
  }
};
