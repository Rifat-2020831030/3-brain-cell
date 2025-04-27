import axios from "axios";

const dummyresponse = {
  response: {
    status: "success",
    message: "Teams retrieved successfully",
    response: {
      total: 2,
      teams: [
        {
          team_id: 4,
          name: "Rescue Team",
          teamLeader: "Mehedi",
          responsibility: "Medical assistance",
          location: "Akhalia, Sylhet",
          createdAt: "2025-04-23T20:50:04.233Z",
          assignmentStatus: "unassigned",
          organization: {
            organization_id: 7,
            organization_name: "Helping Hands 2",
            type: "Non-profit",
            sector: "Health",
            documentLink: "https://example.com/doc.pdf",
            regNo: "ORG123",
            establishedDate: "2015-06-10",
            mission: "Helping people in need",
            secondaryContactName: "John Doe",
            secondaryContactTitle: "Manager",
            secondaryContactMail: "john@example.com",
            location: "Los Angeles",
            website: "https://helpinghands.org",
            socialMediaLink: "https://twitter.com/helpinghands",
            parentOrg: "none",
            approval_status: "pending",
          },
          disaster: null,
          members: [
            {
              volunteer_id: 1,
              name: "Mehedi",
              email: "mhdian93@gmail.com",
              mobile: "01704718964",
              skills: ["first aid", "rescue"],
              work_location: "Dhaka",
            },
          ],
        },
        {
          team_id: 5,
          name: "Rescue Team",
          teamLeader: "Mehedi",
          responsibility: "Rescue and relief operations",
          location: "Akhalia, Sylhet",
          createdAt: "2025-04-23T20:50:04.233Z",
          assignmentStatus: "assigned",
          organization: {
            organization_id: 7,
            organization_name: "Helping Hands 2",
            type: "Non-profit",
            sector: "Health",
            documentLink: "https://example.com/doc.pdf",
            regNo: "ORG123",
            establishedDate: "2015-06-10",
            mission: "Helping people in need",
            secondaryContactName: "John Doe",
            secondaryContactTitle: "Manager",
            secondaryContactMail: "john@example.com",
            location: "Los Angeles",
            website: "https://helpinghands.org",
            socialMediaLink: "https://twitter.com/helpinghands",
            parentOrg: "none",
            approval_status: "pending",
          },
          disaster: null,
          members: [
            {
              volunteer_id: 1,
              name: "Mehedi",
              email: "mhdian93@gmail.com",
              mobile: "01704718964",
              skills: ["first aid", "rescue"],
              work_location: "Dhaka",
            },
          ],
        },
      ],
    },
  },
};

export const getCoordinates = async (location) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${location}`,
    );
    console.log("Coordinates response: ", response.data);
    console.log("Location: ", location);
    if (response.data.length > 0) {
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
    if (response.status === 200 || response.response.status === "success") {

      const teamDetails = dummyresponse.response.response.teams;
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
