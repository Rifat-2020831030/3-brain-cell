import { useState } from "react";
import { useAuth } from "../../authentication/context/AuthContext";
import ProfileComponent from "../components/ProfileComponent";
import ProfileHeader from "../components/ProfileHeader";
import SideMenu from "../components/SideMenu";

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Profile saved:", profile);
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideMenu activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 justify-start items-start">
        <ProfileHeader
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSubmit={handleSubmit}
        />
        {activeTab === "profile" && (
          <ProfileComponent
            profile={profile}
            role={'general'}
            isEditing={isEditing}
            handleChange={handleChange}
          />
        )}
        {activeTab === "details" && (
          <ProfileComponent
            role={user.role}
            profile={profile}
            isEditing={isEditing}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
