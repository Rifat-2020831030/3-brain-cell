import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import OngoingEvent from "./OngoingEvent";

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
      <p className="text-3xl">{heading}</p>
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
          {ongoingEventData.map((data, index) => (
            <OngoingEvent
              key={index}
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
