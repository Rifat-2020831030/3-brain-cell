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
