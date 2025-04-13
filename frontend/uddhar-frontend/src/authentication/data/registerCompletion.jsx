import axios from "axios";

export const registerCompletion = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post( 
      `http://localhost:3000/profile/complete`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 || response.status === 201 || response.data.status === "success") {
      return {
        status: true,
        data: response.data,
      };
    } else {
      return {
        status: false,
        message: response.message,
      };
    }
  } catch (error) {
    return {
      message: "An error occured when completing registration",
      error: error,
      status: false,
    }
  }
};

export const volunteerRegistration = async (data) => {
  try {
    const response = await axios.post(`http://localhost:3000/profile/complete`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if(response.data.status === "success" || response.status === 200) {
      return {
        status: true,
        message: "Registration completed successfully",
        data: response.data,
      };
    }
    return {
      status: false,
      message: response.data.message,
    };
  } catch (error) {
    console.error("Error during volunteer registration:", error);
    return {
      status: false,
      message: "An error occurred during registration",
    };
  }
}