export const navLinks = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Disaster",
        path: "/disaster"
    },
    {
        name: "Survival Skill",
        path: "/survival-skill"
    },
    {
        name: "Sign In",
        path: "/sign-in"
    }
];

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