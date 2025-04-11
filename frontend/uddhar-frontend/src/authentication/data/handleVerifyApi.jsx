import axios from "axios";

export const verify = async (data) => {
  // console.log("logging from handleverifyapi : ",data);
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/verify-email",
      data
    );
    // console.log("logging from handleverifyapi : ",response);
    if(response.status === 200 || response.status === 201 || response.data.status === "success") {
      localStorage.setItem("token", response.data.data.emailVerificationToken);
      // console.log("logging from handleverifyapi. token: ",response.data.data.emailVerificationToken);
      return {
        status: true,
        data: response.data,
      }
    }
    else {
      return {
        status: false,
        message: response.data.message || "Verification failed",
      }
    }
  } catch (error) {
    return {
      status: false,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};
