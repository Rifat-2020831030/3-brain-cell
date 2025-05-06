import { fire, cyclone, flood, logo1, logo2, logo3, logo4, logo5, logo6, logo9, logo10 } from "../../assets/Assests";
// For Hero.jsx
export const texts = [
    {
      title: "Hell Fire in Bongo Bazar, Dhaka",
      subtitle:
        "Due to late reporting, it took roughly 75 hours to be completely extinguished the fire. The fire destroyed 3,845 stores and causing property damage estimated at approximately US$27.7 million",
    },
    {
      title: "Devastating Flood in Sylhet",
      subtitle:
        "In result of late poor pre-caution, more than 1.6 million people in Sylhet have lost their home in June 2024 in Sylhet. 20,000 people are forced to take shelter in school. 75% of the area was under water.",
    },
    {
      title: "Early Warning System in Cyclone",
      subtitle:
        "Gaps in early warning system, have increased the death tolls in cyclone. Just in 2024, 20 people lost their lives due to early warning.",
    },
  ];

export const heroImg = [fire, cyclone, flood]; // also used in PastDisaster.jsx

// For PastDisaster.jsx
export const ongoingDisaster = [
  {
    disaster_id: 1,
    title: "Flood in Sylhet",
    description: "Severe flooding in Sylhet region, affecting thousands.",
    location: "Sylhet",
    startDate: "2024-06-01",
    status: "Closed",
    type: "Flood",
    image: flood,
  },
  {
    disaster_id: 2,
    title: "Cyclone in Cox's Bazar",
    description: "Cyclone warning issued for coastal areas.",
    location: "Cox's Bazar",
    startDate: "2024-07-15",
    status: "Closed",
    type: "Cyclone",
    image: cyclone,
  },
  {
    disaster_id: 3,
    title: "Fire in Dhaka",
    description: "Massive fire broke out in a residential area.",
    location: "Dhaka",
    startDate: "2024-08-10",
    status: "Closed",
    type: "Fire",
    image: fire,
  }
];

export const memberList =[
    {
      id: 1,
      name: "Alice Johnson",
      role: 'Volunteer' ,
      location: "City A",
      skill: "Relief",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: 'Admin' ,
      location: "City B",
      skill: "First Aid",
    },
    {
      id: 3,
      name: "Will Smith",
      role: 'Volunteer' ,
      location: "City C",
      skill: "Rescue",
    },
    {
      id: 4,
      name: "Mehedi",
      role: 'Admin' ,
      location: "City xyz",
      skill: "First Aid",
    },
    {
      id: 5,
      name: "William",
      role: 'Admin' ,
      location: "City A",
      skill: "Relief",
    },
    {
      id: 6,
      name: "Rifat",
      role: 'Volunteer' ,
      location: "City CTG",
      skill: "First Aid",
    },
    {
      id: 7,
      name: "Alice",
      role: 'Organizer' ,
      location: "City sa",
      skill: "Relief",
    },
    {
      id: 8,
      name: "William",
      role: 'Admin' ,
      location: "City A",
      skill: "Relief",
    },
    {
      id: 9,
      name: "Rifat",
      role: 'Volunteer' ,
      location: "City CTG",
      skill: "First Aid",
    },
    {
      id: 10,
      name: "Alice",
      role: 'Organizer' ,
      location: "City sa",
      skill: "Relief",
    },
    {
      id: 11,
      name: "William",
      role: 'Admin' ,
      location: "City A",
      skill: "Relief",
    },
    {
      id: 12,
      name: "Rifat",
      role: 'Volunteer' ,
      location: "City CTG",
      skill: "First Aid",
    },
    {
      id: 13,
      name: "Alice",
      role: 'Organizer' ,
      location: "City sa",
      skill: "Relief",
    },
]

// For DisasterSummary.jsx
export const disasterUpdates = {
  earthquake: {
    title: "Earthquake Update",
    icon: "earthquake.png",
    details: [
      "Magnitude: 6.5, Epicenter: City A",
      "Affected Population: 1.2M",
      "Casualties: 150, Injuries: 500",
      "Structural Damage: Severe",
      "Volunteers: 2,000",
    ],
  },
  flood: {
    title: "Flood Update",
    icon: "flood.png",
    details: [
      "Water Level: 3.2m, Severity: High",
      "Affected Population: 500K",
      "Rainfall: 120mm in 24h",
      "Rescue Status: Ongoing",
      "Volunteers: 1,500",
    ],
  },
  cyclone: {
    title: "Cyclone Alert",
    icon: "cyclone.png",
    details: [
      "Wind Speed: 180 km/h, Category 4",
      "Landfall Expected: City B",
      "Affected Regions: Coastal Areas",
      "Rainfall & Storm Surge: Severe Warning",
      "Volunteers: 3,000",
    ],
  },
  fire: {
    title: "Fire Update",
    icon: "fire.png",
    details: [
      "Location: Forest Zone C",
      "Severity: Extreme",
      "Casualties: 10, Injuries: 30",
      "Evacuations: 5,000 people",
      "Update: Fire 60% contained",
    ],
  },
};

// For MapSection.jsx
export const geographicalData = [
  {
    id: 1,
    location: "Northside Flood Zone",
    details: "Severe flooding affected residential areas with water levels rising up to 5ft. Early prediction and alert system could save tons of crops.",
    // Coordinates as percentages relative to the map image container
    areaCoordinates: { top: '20%', left: '30%'},
  },
  {
    id: 2,
    location: "Downtown Cyclone Epicenter",
    details: "Every year, cyclones hit the coastal areas of in this region. Effecting houses, crops and shipment of containers in the port.",
    areaCoordinates: { top: '55%', left: '60%'},
  },
  {
    id: 3,
    location: "Coastal Storm Impact",
    details: "A powerful storm caused erosion along the shundarbans. Increased salinity in the soil and water of the shundari river.",
    areaCoordinates: { top: '65%', left: '30%'},
  },
];

// For countUp.jsx
export const stats = [
  {
    id: 1,
    number: 4500,
    subheading: "Total Registered Users",
  },
  {
    id: 2,
    number: 15000,
    subheading: "Total Active Volunteers",
  },
  {
    id: 3,
    number: 400,
    subheading: "Total Registered Organizations",
  },
]

// For LogoScroll.jsx
export const orgLogo = [
  {
    id: 1,
    name: "Assunah Foundation",
    logo: logo1,
  },
  {
    id: 2,
    name: "bd-clean",
    logo: logo2,
  },
  {
    id: 3,
    name: "bdrcs",
    logo: logo3,
  },
  {
    id: 4,
    name: "sab-a-sanabil",
    logo: logo4,
  },
  {
    id: 5,
    name: "shamsul-hoque",
    logo: logo5,
  },
  {
    id: 6,
    name: "ahc",
    logo: logo6,
  },
  {
    id: 7,
    name: "bd-clean",
    logo: logo2,
  },
  {
    id: 8,
    name: "bdrcs",
    logo: logo3,
  },
  {
    id: 9,
    name: "Care BD",
    logo: logo9,
  },
  {
    id: 10,
    name: "Islamic Relief",
    logo: logo10,
  },
];

// For VOM.jsx
export const topVolunteer = [
  {
    id: 1,
    name: "John Doe",
    location: "Dhaka, Bangladesh",
    role: "First Aid",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "Jane Doe",
    location: "Chittagong, Bangladesh",
    role: "Search & Rescue",
    image: "https://randomuser.me/api/portraits/men/10.jpg"
  },
  {
    id: 3,
    name: "John Smith",
    location: "Sylhet, Bangladesh",
    role: "Food Distribution",
    image: "https://randomuser.me/api/portraits/men/16.jpg"
  },
  {
    id: 4,
    name: "Jane Smith",
    location: "Khulna, Bangladesh",
    role: "Shelter Management",
    image: "https://randomuser.me/api/portraits/men/18.jpg"
  },
  {
    id: 5,
    name: "John Doe",
    location: "Dhaka, Bangladesh",
    role: "First Aid",
    image: "https://randomuser.me/api/portraits/men/42.jpg"
  },
  {
    id: 6,
    name: "Jane Doe",
    location: "Chittagong, Bangladesh",
    role: "Search & Rescue",
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 7,
    name: "John Smith",
    location: "Sylhet, Bangladesh",
    role: "Food Distribution",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 8,
    name: "Jane Smith",
    location: "Khulna, Bangladesh",
    role: "Shelter Management",
    image: "https://randomuser.me/api/portraits/men/40.jpg"
  },
];