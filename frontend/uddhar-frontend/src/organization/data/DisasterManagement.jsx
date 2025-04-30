import axios from "axios";

export const submitReport = async (disasterId, reportData) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/organizations/disasters/${disasterId}/reports`,
      reportData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status == 200 || response.data.status === "success") {
      return {
        status: true,
        message: response.data.message,
      };
    }
    return {
      status: false,
      message: response.data.message || "Failed to submit report",
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || error.response.data.message,
    };
  }
};
