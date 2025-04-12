import axios from "axios";

export const getOngoingDisasters = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/coordinators/disasters",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.status === "success") {
      const data = response.data.data.disasters;
      // Filter out disasters that are not ongoing
      const ongoingDisasters = data.filter(
        (disaster) => disaster.status === "Open"
      );
      console.log("Ongoing disasters: ", ongoingDisasters);
      return {
        status: true,
        disasters: ongoingDisasters.map((disaster) => ({
          disaster_id: disaster.disaster_id,
          location: disaster.location,
          title: disaster.title,
          startDate: disaster.startDate.split("T")[0],
          type: disaster.type,
          description: disaster.description,
          status: disaster.status,
        })),
      };
    } else {
        return {
          status: false,
          message: response.data.message,
        };
    }
  } catch (error) {
    console.error("Error fetching ongoing disasters:", error);
    return {
      status: false,
      message: "Error fetching ongoing disasters",
    };
  }
};

export const getWeatherData = async (info) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/coordinators/city/${info.location}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log("city key response: ", response.data.data.locationKey);
    if (response.data.status === "success") {
      const cityKey = response.data.data.locationKey;
      const response2 = await axios.get(`http://localhost:3000/coordinators/key/${cityKey}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("weather data response: ", response2.data.data.DailyForecasts[0].Temperature);
      
      if (response2.status === "success") {
        const weatherData = {
          weatherText: response2?.data?.WeatherText,
          temp: response2?.data?.Temperature?.Metric?.Value,
          realtemp: response2?.data?.RealFeelTemperature?.Metric?.Value,
          humadity: response2?.data?.RelativeHumidity,
          wind: response2?.data?.Wind?.Speed?.Metric?.Value,
          windDirection: response2?.data?.Wind?.Direction?.Degrees,
          pressure: response2?.data?.Pressure?.Metric?.Value,
          pressureUnit: response2?.data?.Pressure?.Metric?.Unit,
        };
        return {
          status: true,
          data: weatherData,
        };
      }

      console.error("Error fetching weather data:", response2);
      return response2;
    } else {
      return response;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return error.response;
  }
};

export const endDisaster = async (disaster_id) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/coordinators/disasters/${disaster_id}/close`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if(response.data.status === "success"){
      return {
        status: true,
        message: response.data.message,
      };
    } else {
      return {
        status: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error("Error ending disaster:", error);
    return {
      status: false,
      message: "Error ending disaster",
    };
  }
}