import axios from "axios";

export const getOrgList = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/coordinators/organizations`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.status === "success" || response.status === 200) {
      return {
        status: true,
        data: response.data.data.organizations.map((item) => {
          return {
            id: item.organization_id,
            name: item.organization_name,
            type: item.type,
            sector: item.sector,
            docLink: item.documentLink,
            regNo: item.regNo,
            estdate: item.establishedDate,
            mission: item.mission,
            contactName: item.secondaryContactName,
            title: item.secondaryContactTitle,
            contactMail: item.secondaryContactMail,
            location: item.location,
            website: item.website,
            socialMediaLink: item.socialMediaLink,
            parentOrg: item.parentOrg,
            status: item.approval_status,
          };
        }),
      };
    }
    return {
      status: false,
      message: response.data.message,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || "An error occured while fetching org data",
      error: error,
    };
  }
};

export const approveOrg = async (org_id, newStatus) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/coordinators/organizations/${org_id}/status-update`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in org fetching in coor dashboard: ", error);
    return {
      status: "error",
      message:
        error.message || "An error occurred while approving the organization",
    };
  }
};
