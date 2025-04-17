import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";
import { useRef } from "react";
import LoadingScreen from "./LoadingScreen";
import OngoingEvent from "./OngoingEvent";

const ScrollableEvent = ({
  ongoingEventData,
  heading,
  onClickEventHandler,
  currentEvent,
  loading = false,
  isCoordinator = false,
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
      {/* heading and disaster creation for coordinator*/}
      {isCoordinator && (
        <div className="flex justify-between align-middle">
          <p className="text-3xl">{heading}</p>
          <button
            onClick={() => {
              window.location.href = "/create-a-event";
            }}
            className="bg-[#FF0800] blinking px-10 py-2 rounded cursor-pointer font-bold hover:-translate-y-0.5 hover:bg-[#FF0800] hover:text-white hover:font-extrabold"
          >
            Open an Event
          </button>
        </div>
      )}
      
      {/* ongoing event card */}
      <div className="relative w-full max-w-[850px] mx-auto ">
        {/* if not coordinator */}
        {!isCoordinator && (
          <p className="text-3xl text-left">{heading}</p>
        )}
        {/* Scrollable Container */}
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
          {loading && (<LoadingScreen />)}
          {ongoingEventData.length === 0 ? (
            <p className="text-2xl w-full text-center">No Ongoing Events</p>
          ) : (
            ongoingEventData.map((data) => (
              <OngoingEvent
                key={data.disaster_id}
                info={data}
                bg={"bg-green-200"}
                onClickEventHandler={onClickEventHandler}
                currentEvent={currentEvent}
              />
            ))
          )}
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
      disaster_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      location: PropTypes.string,
      title: PropTypes.string,
      startDate: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  heading: PropTypes.string,
  onClickEventHandler: PropTypes.func,
  currentEvent: PropTypes.shape({
    disaster_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    location: PropTypes.string,
    title: PropTypes.string,
    startDate: PropTypes.string,
    type: PropTypes.string,
  }),
  loading: PropTypes.bool,
  isCoordinator: PropTypes.bool,
};
