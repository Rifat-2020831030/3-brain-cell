import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CgAlbum } from "react-icons/cg";
import OrganizationDetails from "./OrganizationDetails";

function OrganizationList({ organizations, handleNext }) {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(4);
  const [showArrows, setShowArrows] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1324) setVisibleItems(4);
      else if (width >= 1024) setVisibleItems(3);
      else if (width >= 700) setVisibleItems(2);
      else setVisibleItems(1);

      // Check if we need to show arrows
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = organizations.length * 320; // Approximate card width
        setShowArrows(contentWidth > containerWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [organizations.length]);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -50 : 50;
      containerRef.current.scrollBy({
        left: scrollAmount * visibleItems,
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (org) => {
    setSelectedOrganization(org);
  };

  return (
    <div className="w-full max-w-[1150px] mx-auto px-5 py-10 relative ">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center my-5 leading-tight">
        Organization Lists
      </h3>

      {selectedOrganization ? (
        <>
          <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
              <OrganizationDetails
                organization={selectedOrganization}
                setSelectedOrganization={setSelectedOrganization}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="relative">
          {/* Left Arrow */}
          {showArrows && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
          )}

          {/* Cards Container */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth px-4 py-4"
            onClick={() => handleNext}
          >
            {organizations.map((org, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 p-6 flex flex-col items-center border border-gray-200"
                onClick={() => handleCardClick(org)}
              >
                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                  <CgAlbum className="w-16 h-16 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {org.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="text-blue-600 font-medium">Location:</span>{" "}
                  {org.location}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="text-blue-600 font-medium">Type:</span>{" "}
                  {org.type}
                </p>
                <div className="flex justify-center gap-3 mt-4">
                  <button className="px-5 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 text-sm md:text-base transition">
                    Join Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {showArrows && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default OrganizationList;
