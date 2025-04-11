import ContentSection from "../../components/Content";
import ScrollableEvent from "../../components/ScrollableEvent";
import { useState, useEffect } from React;

const DisasterControl = () => {
    const [activeEvent, setActiveEvent] = useState({});
  return (
    <>
      <div className="h-auto w-full mx-auto p-6 mb-8 border-2 rounded-lg">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Disaster Details</h1>
        <ContentSection
          title="Flood in Feni"
          dateTime="April 15, 2025 • 9:00 AM - 5:00 PM"
          location="Mohipal, Chagolnaiya, Lalpol, Feni"
          description="Join us for the biggest tech event of the year featuring industry leaders, innovative workshops, and networking opportunities. This year we'll focus on AI advancements, cloud computing, and the future of web development."
        />
      </div>
    </>
  );
};
export default DisasterControl;
