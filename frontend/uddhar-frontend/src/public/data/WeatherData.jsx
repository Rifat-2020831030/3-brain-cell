import axios from "axios";

export const getLocationKey = async (location) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/city/${location}`);
    return response;
  } catch (error) {
    console.error("Error fetching location key:", error);
    return error.response;
  }
};

export const getWeatherData = async (currentEvent) => {
  try {
    const response = await getLocationKey(currentEvent.location || 'Dhaka');
    const cityKey = response.data?.data?.locationKey || 29075;
    const response2 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/key/${cityKey}`);

    if (response2.data.status === "success" || response2.status === 200) {
      return {
        status: true,
        data: response2.data.data,
      };
    }
    return response2;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return error.response;
  }
};
