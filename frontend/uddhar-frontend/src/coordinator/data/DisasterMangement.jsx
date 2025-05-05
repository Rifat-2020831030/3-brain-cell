import axios from "axios";

export const getOngoingDisasters = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/coordinators/disasters`,
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
    } 
    return {
        status: false,
        message: response.data.message,
    };
  } catch (error) {
    console.error("Error fetching ongoing disasters:", error);
    return {
      status: false,
      message: "Error fetching ongoing disasters",
    };
  }
};

export const endDisaster = async (disaster_id) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/coordinators/disasters/${disaster_id}/close`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.status === "success") {
      return {
        status: true,
        message: response.data.message,
      };
    } 
    return {
        status: false,
        message: response.data.message,
    };
  } catch (error) {
    console.error("Error ending disaster:", error);
    return {
      status: false,
      message: "Error ending disaster",
    };
  }
};

export const getStat = async (disaster_id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/coordinators/disasters/${disaster_id}/stats`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200 || response.data.status === "success") {
      return {
        status: true,
        data: {
          totalReports: response.data.data.totalReports,
          totalVolunteers: response.data.data.totalVolunteers,
          volunteersCount: response.data.data.reports.reduce((acc, report) => acc + report.volunteersCount, 0),
          rescueShelter: {
            men: response.data.data.reports.reduce((acc, report) => acc + (report.rescueShelter?.men || 0), 0),
            women: response.data.data.reports.reduce((acc, report) => acc + (report.rescueShelter?.women || 0), 0),
            children: response.data.data.reports.reduce((acc, report) => acc + (report.rescueShelter?.children || 0), 0),
            totalRescued: response.data.data.reports.reduce((acc, report) => acc + (report.rescueShelter?.totalRescued || 0), 0),
          },
          reliefDistribution: response.data.data.reports[0]?.reliefDistribution || {},
          medicalAid: response.data.data.reports[0]?.medicalAid || {},
        }
      };
    } else {
      return {
        status: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error("Error fetching disaster stats:", error);
    return {
      status: false,
      message: "Error fetching disaster stats",
    };
  }
};

export const editDisaster = async (disaster_id, data) => {
  const body = {
    title: data.title,
    description: data.description,
  }
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/coordinators/disasters/${disaster_id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing disaster:", error);
    return {
      status: false,
      message: error.message || "Error editing disaster",
    };
  }
};
