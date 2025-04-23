import { Eye, EyeOff } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const Input = ({ setting, handleChange, formData, error }) => {
  const { name, label, width, type, placeholder } = setting;

  const isPasswordField = label === "Password" || label === "Confirm Password";
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const numberInputClasses =
    type === "number"
      ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      : "";

  const showPasswordType = showPassword ? "text" : "password";

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      <div className={`${width || "w-full"} relative`}>
        <input
          id={name}
          type={isPasswordField ? showPasswordType : type}
          name={name}
          placeholder={placeholder || label}
          value={formData[name]}
          onChange={handleChange}
          className={`${width || "w-full"} max-md:w-60 p-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded mt-1 ${numberInputClasses}`}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 max-md:w-45"
          >
            {showPassword ? <Eye width={24} /> : <EyeOff width={24} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
export default Input;

Input.propTypes = {
  setting: PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    width: PropTypes.string,
    placeholder: PropTypes.string,
  }),
  handleChange: PropTypes.func,
  formData: PropTypes.object,
  error: PropTypes.string,
};
