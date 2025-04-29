import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Stat = ({ number, subheading }) => {
    const ref = useRef(null);
    const isInView = useInView(ref);
  
    useEffect(() => {
      if (!isInView) return;
  
      animate(0, number, {
        duration: 2.5,
        onUpdate(value) {
          if (!ref.current) return;
  
          ref.current.textContent = value.toFixed();
        },
      });
    }, [number, isInView]);
  
    return (
      <div className="flex w-72 flex-col items-center py-8 sm:py-0">
        <p className="mb-2 text-center text-7xl font-semibold sm:text-6xl">
          <span ref={ref}></span>
        </p>
        <p className="max-w-48 text-center text-neutral-600">{subheading}</p>
      </div>
    );
  };

export default Stat;

Stat.propTypes = {
  number: PropTypes.number,
  subheading: PropTypes.string,
};