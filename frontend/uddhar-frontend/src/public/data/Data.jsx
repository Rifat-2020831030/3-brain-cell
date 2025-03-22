// For Hero.jsx
export const texts = [
    {
      title: "Devastating Flood in Sylhet",
      subtitle:
        "In result of late poor pre-caution, more than 1.6 million people in Sylhet have lost their home in June 2024 in Sylhet. 20,000 people are forced to take shelter in school. 75% of the area was under water.",
    },
    {
      title: "Hell Fire in Bongo Bazar, Dhaka",
      subtitle:
        "Due to late reporting, it took roughly 75 hours to be completely extinguished the fire. The fire destroyed 3,845 stores and causing property damage estimated at approximately US$27.7 million",
    },
    {
      title: "Early Warning System in Cyclone",
      subtitle:
        "Gaps in early warning system, have increased the death tolls in cyclone. Just in 2024, 20 people lost their lives due to early warning.",
    },
  ];

import { fire, cyclone, flood } from "../../assets/Assests";
export const heroImg = [fire, cyclone, flood]; // also used in PastDisaster.jsx

// For PastDisaster.jsx
export const ongoingDisaster = [
  {
    category: "Flood",
    title:
      "Devastating Flood in Feni, Bangladesh",
    image: flood,
  },
  {
    category: "Cyclone",
    title:
      "Cyclone Amphan hits Coastal Areas of Bangladesh",
    image: cyclone,
  },
  {
    category: "Fire",
    title:
      "Fire in the Bongo Bazar Market",
    image: fire,
  },
];

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
import {logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10} from "../../assets/Assests";
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
    logo: logo7,
  },
  {
    id: 8,
    name: "bdrcs",
    logo: logo8,
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