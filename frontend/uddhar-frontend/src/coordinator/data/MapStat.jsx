import axios from "axios";

export const getCoordinates = async (location) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${location}`,
    );
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
      `${import.meta.env.VITE_BACKEND_URL}/coordinators/teams/${disasterId}`,
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
      const centerLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
      const centerLon = (parseFloat(maxLon) + parseFloat(minLon)) / 2;
      const radius = Math.min(
        Math.abs(parseFloat(maxLat) - parseFloat(minLat)),
        Math.abs(parseFloat(maxLon) - parseFloat(minLon))
      ) / 2;
      
      const points = 32; // number of points to approximate circle
      const coordinates = [[...Array(points + 1)].map((_, i) => {
        const angle = (2 * Math.PI * i) / points;
        return [
          centerLon + radius * Math.cos(angle),
          centerLat + radius * Math.sin(angle)
        ];
      })];

      return {
        type: "Polygon",
        coordinates: coordinates
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching polygon data:", error);
    return null;
  }
};