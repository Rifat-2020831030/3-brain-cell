import Proptypes from "prop-types";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  const isDisabled = name === "email" || disabled;
  const grayedClass = isDisabled ? "bg-gray-300 text-black cursor-not-allowed" : "bg-white hover:border-gray-400 placeholder-gray-400";

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6">
        <label className="block text-gray-700 text-sm font-medium min-w-[140px] pt-2">
          {label}
        </label>
        <div className="flex-1">
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={isDisabled}
            className={`w-full px-4 py-2.5 text-gray-800 text-sm border border-gray-300 rounded-lg shadow-xs transition-all
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${grayedClass}`}
          />
          {/* Optional error message would go here */}
        </div>
      </div>
    </div>
  );
};

export default InputField;

InputField.propTypes = {
  label: Proptypes.string.isRequired,
  type: Proptypes.string,
  name: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  placeholder: Proptypes.string,
  disabled: Proptypes.bool,
};