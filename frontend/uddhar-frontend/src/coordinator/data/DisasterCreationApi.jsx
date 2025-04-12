import axios from "axios";
import { CheckRole } from "../../authentication/services/CheckRole";

const createDisaster = async (disaster) => {
  try {
    const token = localStorage.getItem("token");

    const roleCheck = CheckRole("coordinator");
    if (!roleCheck.result) {
      return {
        status: false,
        message: roleCheck.message,
      };
    }

    const response = await axios.post('http://localhost:3000/coordinators/disasters', disaster, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    if (response.data.status === "success") {
      return {
        status: true,
        message: response.data.message,
        data: response.data.data,
      };
    } else {
      return {
        status: false,
        message:
          response.data.message ||
          "An error occurred while creating disaster. Please try again later.",
      };
    }
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

export const affectedLocation = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/locations`, {
    // dummy
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (response.status === 200 || response.status === 201) {
    return {
      success: true,
      data: data,
    };
  } else {
    return {
      success: false,
      message:
        data.message ||
        "An error occurred while fetching locations. Please try again later.",
    };
  }
};
