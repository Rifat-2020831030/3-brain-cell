import axios from "axios";

export const getCoordinates = async (location) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${location}`,
    );
    console.log("Coordinates response: ", response.data);
    console.log("Location: ", location);
    if (response.data?.length > 0) {
      const result = {
        lat: parseFloat(response.data[0].lat),
        lon: parseFloat(response.data[0].lon),
      };
      return result;
    }
  } catch (error) {
    console.error("Error converting text to coordinates:", error);
    return null;
  }
};

export const getTeamDetails = async (disasterId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/coordinators/teams/${disasterId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.status === "success") {

      const teamDetails = response.data.data.teams;
      // filter assigned teams
      const assignedTeam = teamDetails.filter(
        (team) => team.assignmentStatus === "assigned"
      );
      // return team details with coordinates
    const teamDataPromises = assignedTeam.map(async (team) => {
      const location = team.location;
      const coordinates = await getCoordinates(location);
      return {
        ...team,
        coordinates: coordinates,
      };
    });
    const teamData = await Promise.all(teamDataPromises);
    return {
      status: true,
      response: teamData,
    };
    }
    return {
      status: false,
      message: response.response.message,
    };
  } catch (error) {
    console.error("Error fetching team details:", error);
    return {
      status: false,
      message: "Error fetching team details",
    };
  }
};

export const fetchPolygonData = async (locationName) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(locationName)}&polygon_geojson=1&format=jsonv2`
    );
    const data = await response.json();
    console.log("Polygon data: ", data);

    // Try to find polygon data first
    const areaWithPolygon = data.find((item) => 
      item.geojson?.type === "Polygon" || item.geojson?.type === "MultiPolygon"
    );

    if (areaWithPolygon) {
      return areaWithPolygon.geojson;
    }

    // Fallback to bounding box if no polygon found
    const areaWithBbox = data[0];
    if (areaWithBbox?.boundingbox) {
      const [minLat, maxLat, minLon, maxLon] = areaWithBbox.boundingbox;
      return {
        type: "Polygon",
        coordinates: [[
          [parseFloat(minLon), parseFloat(minLat)],
          [parseFloat(maxLon), parseFloat(minLat)],
          [parseFloat(maxLon), parseFloat(maxLat)],
          [parseFloat(minLon), parseFloat(maxLat)],
          [parseFloat(minLon), parseFloat(minLat)] // Close the loop
        ]]
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching polygon data:", error);
    return null;
  }
};