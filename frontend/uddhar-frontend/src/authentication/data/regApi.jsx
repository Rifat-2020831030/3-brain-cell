import axios from "axios";

export const register = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
      data
    );
    const isSuccess =
      [200].includes(response.status) ||
      response.data.status === "success";
    if(isSuccess) {
      return {
        status: true,
        data: response.data,
      }
    }
    return {
      status: false,
      message: response.message || response.data?.message ,
    }
  } catch (error) {
    console.log("logging from register", error);
    return {
      status: false,
      message: error.response ? error.response.data.message : error.message,
    }
  }
};
