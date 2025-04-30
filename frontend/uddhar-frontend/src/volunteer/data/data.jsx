import axios from "axios";

export const ongoingDisasterForVolunteer = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/volunteers/disasters`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200 || response.data.status === "success") {
      const disasterList = response.data.data.disasters.map((disaster) => ({
        disaster_id: disaster.disaster_id,
        location: disaster.location,
        title: disaster.title,
        description: disaster.description,
        startDate: disaster.startDate,
        type: disaster.type,
      }));
      return {
        status: true,
        message: "Disaster updated successfully",
        data: disasterList,
      };
    } else {
      return {
        status: false,
        message: response.data.message || "Failed to fetch ongoing disasters.",
        data: []
      };
    }
  } catch (error) {
    console.error("Error fetching ongoing disasters:", error);
    return { status: false, message: "Failed to fetch ongoing disasters." };
  }
};
