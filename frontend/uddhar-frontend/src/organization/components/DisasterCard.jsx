import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import DisasterSummary from '../components/DisasterSummary'

function DisasterCard( {ongoingDisaster}) {
  const [selectedDisaster, setSelectedDisaster] = React.useState(null);

  const handleCardClick = (disaster) => {
    setSelectedDisaster(disaster);
  };

  const handleClosePopup = () => {
    setSelectedDisaster(null);
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-6 ">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center my-6 leading-tight">
        Ongoing Disasters
      </h1>
      <div className="relative w-full max-w-3xl">
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex space-x-4">
            {ongoingDisaster.map((disaster, index) => (
              <div
                key={index}
                className="inline-block w-64 bg-white mb-2 rounded-xl shadow-md overflow-hidden"
              >
                <div>
                  <img
                    className="h-40 w-full object-cover"
                    src={disaster.image}
                    alt={disaster.title}
                  />
                  <h2 className="block text-md text-wrap leading-tight font-medium text-black text-center p-2">
                    {disaster.title.length > 25
                      ? `${disaster.title.substring(0, 25)}...`
                      : disaster.title}
                  </h2>
                  <div className="p-2 flex justify-start">
                    <FaMapMarkerAlt />
                    <p className="text-md font-serif text-gray-500 text-start ml-2">
                      {disaster.location === "Global"
                        ? "Location:Global"
                        : "Location:Local"}
                    </p>
                  </div>
                  <div className="p-3 flex  justify-center space-x-3">
                    <button
                      className="bg-blue-500 cursor-pointer text-white px-3 py-1.5 rounded hover:bg-blue-600"
                      onClick={() => handleCardClick(disaster)}
                    >
                      See Details
                    </button>
                    <button className="bg-green-500 cursor-pointer text-white px-3 py-1.5 rounded hover:bg-green-600">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedDisaster && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6">
            <img
              className="h-48 w-full object-cover rounded-t-lg"
              src={selectedDisaster.image}
              alt={selectedDisaster.title}
            />
            <h2 className="text-2xl font-bold mt-4">{selectedDisaster.title}</h2>
            <p className="text-gray-700 mt-2">{selectedDisaster.description}</p>
            <p className="text-gray-500 mt-2">
              <FaMapMarkerAlt className="inline-block mr-1" />
              {selectedDisaster.location}
            </p>
            <p className="text-gray-500 mt-2">Date: {selectedDisaster.date}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisasterCard;
