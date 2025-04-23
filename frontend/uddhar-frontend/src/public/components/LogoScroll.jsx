import { motion } from "framer-motion";
import PropTypes from "prop-types";

const VerticalLogoScroll = ({ orgLogo }) => {
  const scrollAnimation = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="h-100 my-10 mx-5">
      <p className="mb-8 text-center text-black font-extrabold text-5xl max-sm:text-xl md:mb-16">
        Organization Working with Us
      </p>
      <div className="relative overflow-hidden">
        <motion.div {...scrollAnimation} className="flex">
          <div className="flex space-x-10 mx-10">
            {orgLogo.map((org) => (
              <div
                key={`${org.id}`}
                className="flex-shrink-0 w-24 h-24 rounded-full bg-blue-300 flex items-center justify-center shadow-md"
              >
                <img
                  src={org.logo}
                  alt={`Organization ${org.id} logo`}
                  className="w-3/4 h-3/4 object-contain"
                  title={org.name}
                />
              </div>
            ))}
          </div>
          <div className="flex space-x-10">
            {orgLogo.map((org) => (
              <div
                key={`${org.id}`}
                className="flex-shrink-0 w-24 h-24 rounded-full bg-blue-300 flex items-center justify-center shadow-md"
              >
                <img
                  src={org.logo}
                  alt={`Organization ${org.id} logo`}
                  className="w-3/4 h-3/4 object-contain"
                  title={org.name}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerticalLogoScroll;

VerticalLogoScroll.propTypes = {
  orgLogo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      logo: PropTypes.string,
    })
  ),
};