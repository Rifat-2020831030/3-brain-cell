import axios from "axios";

const dummyData = [
  [
    {
      id: 1,
      organization_id: 101,
      organization_name: "Helping Hands",
      type: "Non-profit",
      sector: "Health",
      documentLink: "https://example.com/doc1.pdf",
      regNo: "ORG123",
      establishedDate: "2015-06-10",
      mission: "Helping people in need",
      secondaryContactName: "John Doe",
      secondaryContactTitle: "Manager",
      secondaryContactMail: "john@example.com",
      location: "Los Angeles",
      website: "https://helpinghands.org",
      socialMediaLink: "https://twitter.com/helpinghands",
      parentOrg: "None",
      approval_status: null,
    },
    {
      id: 2,
      organization_id: 102,
      organization_name: "Green Future",
      type: "Non-profit",
      sector: "Environment",
      documentLink: "https://example.com/doc2.pdf",
      regNo: "ORG124",
      establishedDate: "2012-03-15",
      mission: "Promoting sustainable practices",
      secondaryContactName: "Alice Smith",
      secondaryContactTitle: "Coordinator",
      secondaryContactMail: "alice@example.com",
      location: "San Francisco",
      website: "https://greenfuture.org",
      socialMediaLink: "https://twitter.com/greenfuture",
      parentOrg: "None",
      approval_status: true,
    },
    {
      id: 3,
      organization_id: 103,
      organization_name: "Tech Innovators",
      type: "For-profit",
      sector: "Technology",
      documentLink: "https://example.com/doc3.pdf",
      regNo: "ORG125",
      establishedDate: "2018-11-25",
      mission: "Innovate cutting-edge solutions",
      secondaryContactName: "Bob Lee",
      secondaryContactTitle: "Lead Engineer",
      secondaryContactMail: "bob@example.com",
      location: "New York",
      website: "https://techinnovators.com",
      socialMediaLink: "https://linkedin.com/company/techinnovators",
      parentOrg: "None",
      approval_status: true,
    },
    {
      id: 4,
      organization_id: 104,
      organization_name: "Arts United",
      type: "Non-profit",
      sector: "Arts",
      documentLink: "https://example.com/doc4.pdf",
      regNo: "ORG126",
      establishedDate: "2010-09-05",
      mission: "Empowering local artists",
      secondaryContactName: "Clara Johnson",
      secondaryContactTitle: "Art Director",
      secondaryContactMail: "clara@example.com",
      location: "Chicago",
      website: "https://artsunited.org",
      socialMediaLink: "https://facebook.com/artsunited",
      parentOrg: "None",
      approval_status: false,
    },
    {
      id: 5,
      organization_id: 105,
      organization_name: "EduCare",
      type: "Non-profit",
      sector: "Education",
      documentLink: "https://example.com/doc5.pdf",
      regNo: "ORG127",
      establishedDate: "2013-04-20",
      mission: "Providing quality education",
      secondaryContactName: "David Kim",
      secondaryContactTitle: "Program Manager",
      secondaryContactMail: "david@example.com",
      location: "Boston",
      website: "https://educare.org",
      socialMediaLink: "https://twitter.com/educare",
      parentOrg: "None",
      approval_status: true,
    },
    {
      id: 6,
      organization_id: 106,
      organization_name: "Global Relief",
      type: "Non-profit",
      sector: "Humanitarian",
      documentLink: "https://example.com/doc6.pdf",
      regNo: "ORG128",
      establishedDate: "2008-01-30",
      mission: "Delivering global aid",
      secondaryContactName: "Emma White",
      secondaryContactTitle: "Field Officer",
      secondaryContactMail: "emma@example.com",
      location: "Washington D.C.",
      website: "https://globalrelief.org",
      socialMediaLink: "https://twitter.com/globalrelief",
      parentOrg: "None",
      approval_status: true,
    },
  ],
];

export const getOrgList = async () => {
  // refactor the data
  const data = dummyData.flat().map((item) => {
    return {
      id: item.id,
      organization_id: item.organization_id,
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
  });
  console.log(data);
  return {
    status: true,
    data: data,
  };
};

export const orgApproved = async (org_id) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/coordinators/organizations/${org_id}/approve`
    );
    if (response.data.status === "success" || response.status === 200) {
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
    console.log("Error in org fetching in coor dashboard: ", error);
    return {
      status: false,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};
