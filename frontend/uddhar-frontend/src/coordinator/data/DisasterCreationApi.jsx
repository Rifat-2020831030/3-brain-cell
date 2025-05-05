import axios from "axios";

const createDisaster = async (disaster) => {
  try {const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/coordinators/disasters`, disaster, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    if (response.data.status === "success") {
      return {
        status: true,
        message: response.data.message,
        data: response.data.data,
      };
    } 
    return {
      status: false,
      message:
        response.data.message ||
        "An error occurred while creating disaster. Please try again later.",
    };
  } catch (error) {
    console.error("Error creating disaster:", error);
    return {
      status: false,
      message:
        "An error occurred while creating the disaster. Please try again later.",
    };
  }
};
export { createDisaster };

