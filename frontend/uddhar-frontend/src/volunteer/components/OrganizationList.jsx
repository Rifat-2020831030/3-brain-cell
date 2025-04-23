import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { getAllOrg, joinReq } from "../data/org";
import OrganizationDetails from "./OrganizationDetails";
import OrgCard from "./OrgCard";

function OrganizationList({ handleNext }) {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(4);
  const [showArrows, setShowArrows] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [orgList, setOrgList] = useState([]);
  const [loadingJoinRequests, setLoadingJoinRequests] = useState({});

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
        const contentWidth = orgList.length * 320; // Approximate card width
        setShowArrows(contentWidth > containerWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [orgList.length]);

  // For fetching organizations
  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await getAllOrg();
      if (response.status) {
        setOrgList(response.data);
        console.log(response.data);
      } else {
        console.error(response.message);
        toast.error(response.message);
      }
    };
    fetchOrganizations();
  }, []);

  // Effect to handle next action using ref
  useEffect(() => {
    if (containerRef.current && handleNext) {
      containerRef.current.addEventListener('click', handleNext);
      return () => {
        containerRef.current?.removeEventListener('click', handleNext);
      };
    }
  }, [handleNext]);

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

  const handleJoinRequest = async (orgId) => {
    console.log(loadingJoinRequests[orgId]);
    if (loadingJoinRequests[orgId]) return; // Prevent multiple clicks

    setLoadingJoinRequests((prev) => ({ ...prev, [orgId]: true }));
    const response = await joinReq(orgId);
    setLoadingJoinRequests((prev) => ({ ...prev, [orgId]: false }));

    if (response.status) {
      toast.success(response.message);
      setOrgList((prevOrgs) =>
        prevOrgs.map((org) =>
          org.id === orgId ? { ...org, isApplied: true } : org
        )
      );
      console.log(orgList);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full max-w-[1150px] mx-auto px-5 py-10 relative ">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center my-5 leading-tight">
        Organization Lists
      </h3>
      <Toaster position="bottom-right" richColors closeButton />
      {selectedOrganization ? (
          <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
              <OrganizationDetails
                organization={selectedOrganization}
                setSelectedOrganization={setSelectedOrganization}
              />
            </div>
          </div>
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
          >
            {orgList.map((org, index) => (
              <OrgCard
                key={org.id || index}
                org={org}
                handleCardClick={handleCardClick}
                handleJoinRequest={handleJoinRequest}
                isLoading={loadingJoinRequests[org.id]}
              />
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

OrganizationList.propTypes = {
  handleNext: PropTypes.func,
};
