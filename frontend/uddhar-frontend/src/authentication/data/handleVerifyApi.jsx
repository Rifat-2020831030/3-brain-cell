import axios from "axios";

export const verify = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/verify-email",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
