import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import OngoingEvent from "./OngoingEvent";
import PropTypes from "prop-types";

const ScrollableEvent = ({
  ongoingEventData,
  heading,
  onClickEventHandler,
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -280 : 280,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div className="flex justify-between align-middle">
        <p className="text-3xl">{heading}</p>
        <button
          onClick={() =>{
            window.location.href = "/create-a-event";
          }}
          className="bg-[#FF0800] blinking px-10 py-2 rounded cursor-pointer font-bold hover:-translate-y-0.5 hover:bg-[#FF0800] hover:text-white hover:font-extrabold"
        >
          Open an Event
        </button>
      </div>
      <div className="relative w-full max-w-[800px] mx-auto ">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-[-25px] top-1/2 -translate-y-1/2 bg-blue-200 p-2 rounded-full shadow-md"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Ongoing Event */}
        <div
          ref={scrollRef}
          className="flex gap-4 py-5 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {ongoingEventData.map((data) => (
            <OngoingEvent
              key={data.id}
              info={data}
              bg={"bg-green-200"}
              onClickEventHandler={onClickEventHandler}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-[-25px] top-1/2 -translate-y-1/2 bg-blue-200 p-2 rounded-full shadow-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </>
  );
};
export default ScrollableEvent;

ScrollableEvent.propTypes = {
  ongoingEventData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      name: PropTypes.string,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  heading: PropTypes.string,
  onClickEventHandler: PropTypes.func,
};