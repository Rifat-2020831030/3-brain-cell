import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Proptypes from "prop-types";

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

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      <div className={`${width ? width : "w-full"} relative`}>
        <input
          id={name}
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          name={name}
          placeholder={placeholder ? placeholder : label}
          value={formData[name]}
          onChange={handleChange}
          className={`${width ? width : "w-full"} max-md:w-60 p-2 border ${
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
  setting: Proptypes.shape({
    label: Proptypes.string,
    type: Proptypes.string,
    name: Proptypes.string,
    width: Proptypes.string,
    placeholder: Proptypes.string,
  }),
  handleChange: Proptypes.func,
  formData: Proptypes.object,
  error: Proptypes.string,
};
