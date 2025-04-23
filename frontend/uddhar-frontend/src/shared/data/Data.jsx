import { Bell, MessageSquare, Settings, User, BookUser } from "lucide-react";

export const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Disaster",
    path: "/disaster",
  },
  {
    name: "Survival Skill",
    path: "/survival-skill",
  },
];

export const menuItems = [
  {
    id: "profile",
    label: "Profile",
    path: "",
    icon: <User className="w-5 h-5" />,
  },
  {
    id: "details",
    label: "Details",
    path: "/details",
    icon: <BookUser className="w-5 h-5" />,
  },
  {
    id: "messages",
    label: "Messages",
    path: "/messages",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    id: "notifications",
    label: "Notifications",
    path: "/notifications",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

// Field configurations for different roles
export const FIELD_CONFIGS = {
  general: [
    { name: "name", label: "Full Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "mobile", label: "Mobile Number", type: "tel" },
    { name: "password", label: "Password", type: "password" },
    { name: "location", label: "Primary Location", type: "text" },
  ],
  organization: [
    { name: "organization_name", label: "Full Name", type: "text" },
    { name: "regNo", label: "Registration No", type: "text" },
    { name: "establishedDate", label: "Establishment Date", type: "date" },
    { name: "mission", label: "Organization's Mission", type: "text" },
    { name: "secondaryContactName", label: "Secondary Contact Person", type: "text" },
    { name: "secondaryContactMail", label: "Mail", type: "text" },
    { name: "secondaryContactTitle", label: "Title", type: "text" },
    { name: "location", label: "Office Location of the Org", type: "text" },
    { name: "website", label: "Organization's Website", type: "text" },
    { name: "socialMediaLink", label: "Social Media's Link", type: "text" },
    { name: "parentOrg", label: "Parent Organization", type: "text" },
  ],
  coordinator: [
    { name: "department", label: "Department", type: "text" },
    { name: "region", label: "Region", type: "text" },
    { name: "officialContactNumber", label: "Mobile Number", type: "tel" },
-   { name: "bio", label: "Department", type: "textarea" },
+   { name: "bio", label: "Bio", type: "textarea" },
    { name: "location", label: "Location", type: "text" },
  ],
};