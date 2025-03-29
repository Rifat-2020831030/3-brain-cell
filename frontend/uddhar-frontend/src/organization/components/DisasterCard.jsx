import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";


function DisasterCard( {ongoingDisaster}) {
  return (
    <div className="flex flex-col items-center px-4 md:px-6 ">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center my-6 leading-tight">
        Ongoing Disasters
      </h1>
      <div className="relative w-full max-w-3xl  ">
        <div className="overflow-x-auto whitespace-nowrap  scrollbar-hide">
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
                  <FaMapMarkerAlt  />
                  <p className="text-md font-serif text-gray-500 text-start ml-2">
                    {disaster.location === "Global" ? "Location:Global" : "Location:Local"}
                  </p>
                  </div>
                  <div className="p-3 flex justify-center space-x-3">
                    <button className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600">
                      See Details
                    </button>
                    <button className="bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisasterCard;
