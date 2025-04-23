import PropTypes from "prop-types";
const Button = ({
    children = 'Send', // default text
    type = 'button',
    onClick,
    className = '',
    disabled = false,
    variant = 'primary', // default variant
    size = 'medium', // default size
    fullWidth = false,
    ...props
  }) => {
    // Base styles
    const baseStyles = "rounded-md cursor-pointer transition-colors duration-200";
    
    // Variant styles
    const variants = {
      primary: "bg-amber-300 text-black hover:bg-amber-400",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      danger: "bg-red-500 text-white hover:bg-red-600",
      success: "bg-green-500 text-white hover:bg-green-600",
      outline: "border-2 border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black"
    };
  
    // Size styles
    const sizes = {
      small: "px-3 py-1 text-sm",
      medium: "px-5 py-2",
      large: "px-6 py-3 text-lg"
    };
  
    // Disabled styles
    const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  
    // Full width style
    const widthStyle = fullWidth ? "w-full" : "";
  
    // Combine all styles
    const buttonStyles = `
      ${baseStyles}
      ${variants[variant]}
      ${sizes[size]}
      ${disabledStyles}
      ${widthStyle}
      ${className}
    `.trim();
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={buttonStyles}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;

  Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'outline']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fullWidth: PropTypes.bool
  };