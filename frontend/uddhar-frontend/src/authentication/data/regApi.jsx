import axios from "axios";

export const register = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/register",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
