import axios from "axios";

export const joinInDisaster = async (disasterId, userId) => {
  const body = {
    disaster_id: disasterId,
    user_id: userId,
  };
  try {
    const response = await axios.post(``, body);
    if (response.status === 200 || response.data.status === "success") {
      return { status: true, message: "Successfully joined in the disaster" };
    } else {
      return { status: false, message: "Failed to join disaster" };
    }
  } catch (error) {
    console.error("Error joining disaster:", error);
    return { status: false, message: "Error joining disaster" };
  }
};
