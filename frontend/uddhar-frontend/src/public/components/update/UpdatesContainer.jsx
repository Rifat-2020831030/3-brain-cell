import PropTypes from "prop-types";

const UpdatesContainer = ({
  message,
  bgColor = "bg-amber-400",
  textColor = "text-indigo-800",
}) => {
  const scrollStyle = {
    animation: "scroll 50s linear infinite",
    display: "inline-block",
  };
  const keyframesStyle = `
    @keyframes scroll {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div
        className={`h-[30px] w-full ${bgColor} flex items-center overflow-hidden ${textColor} absolute`}
      >
        <div className="whitespace-nowrap w-full relative">
          <div style={scrollStyle}>{message}</div>
        </div>
      </div>
    </>
  );
};

export default UpdatesContainer;

UpdatesContainer.propTypes = {
  message: PropTypes.object.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};
