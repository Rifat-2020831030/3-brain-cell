import PropTypes from "prop-types";
import Avatar, { genConfig } from "react-nice-avatar";
import { useAuth } from "../../authentication/context/AuthContext";
import InputField from "../components/InputField";
import { FIELD_CONFIGS } from "../data/Data";

const ProfileComponent = ({
  profile,
  role = "general",
  isEditing = false,
  handleChange,
}) => {
  // Get fields based on role
  const fields = FIELD_CONFIGS[role] || FIELD_CONFIGS["general"];
  const { user } = useAuth();
  const config = genConfig(user?.email || "");

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Profile Image */}
        <div className="flex flex-col items-center mt-6">
          <div className="relative w-40 h-40 rounded-full bg-gray-100 mb-3 overflow-hidden">
            <Avatar className="w-full h-full object-cover" {...config} />
          </div>
        </div>

        {/* Profile Form */}
        <form className="p-6">
          <div className="space-y-4">
            {fields.map((field) => (
              <InputField
                key={field.name}
                label={field.label}
                type={field.type}
                name={field.name}
                value={profile[field.name] || ""}
                onChange={handleChange}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                disabled={!isEditing}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileComponent;

ProfileComponent.propTypes = {
  profile: PropTypes.object.isRequired,
  role: PropTypes.string,
  isEditing: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};
