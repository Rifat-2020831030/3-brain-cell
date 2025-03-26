import { useEffect, useState } from "react";
import {Eye, EyeOff} from "lucide-react";

const Input = ({setting, handleChange, formData}) => {

  const { name, label, width, type, placeholder } = setting;

  const isPasswordField = label === "Password" || label === "Confirm Password";
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <div className={`${width? width : "w-full"} relative`}>
        <input
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          name={name}
          placeholder={placeholder ? placeholder : label}
          value={formData[name]}
          onChange={handleChange}
          className={`${width? width: "w-full"} max-md:w-60 p-2 border border-gray-300 rounded mt-1 ${type === "number" ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none": ""}`}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
          >
            {showPassword ? <Eye width={24}/> : <EyeOff width={24}/>}
          </button>
        )}
      </div>
    </div>
  );
};
export default Input;
