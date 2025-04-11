import { CalendarClock, MapPin } from "lucide-react";
import Proptypes from "prop-types";

const ContentSection = ({ title, dateTime, location, description }) => {
  return (
    <section className="w-full h-auto mx-auto p-6 mb-8 border-2 rounded-lg relative">
      <button className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white px-8 py-2 rounded cursor-pointer">
        End
      </button>
      <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
        {title}
      </h1>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-4 text-gray-600 dark:text-gray-300">
        {dateTime && (
          <p className="flex justify-center gap-2">
            <CalendarClock /> {dateTime}
          </p>
        )}
        {location && (
          <p className="flex justify-center gap-2">
            <MapPin /> {location}
          </p>
        )}
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
        {description}
      </p>
    </section>
  );
};

export default ContentSection;

ContentSection.propTypes = {
  title: Proptypes.string,
  dateTime: Proptypes.string,
  location: Proptypes.string,
  description: Proptypes.string,
};
