import React, { useState } from "react";

function DisasterStat() {
    const [searchQuery, setSearchQuery] = useState("");
    const [mapSrc, setMapSrc] = useState("https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=XYZ%20Region");

    const handleSearch = () => {
      if (searchQuery.trim() !== "") {
        const encodedQuery = encodeURIComponent(searchQuery);
        const newMapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&q=${encodedQuery}`;
        setMapSrc(newMapSrc);
      }
    };

    return (
      <div className="justify-center">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center border-b-2 border-blue-500 pb-4">
            Disaster Statistics
          </h1>
          <div className="space-y-5">
            <p className="text-lg flex items-center">
              <strong className="font-semibold text-gray-800 w-48">
                Title:
              </strong>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg shadow-sm">
                Flood in XYZ Region
              </span>
            </p>
            <p className="text-lg flex items-center">
              <strong className="font-semibold text-gray-800 w-48">
                Location:
              </strong>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg shadow-sm">
                XYZ Region
              </span>
            </p>
            <p className="text-lg flex items-center">
              <strong className="font-semibold text-gray-800 w-48">
                Number of People Affected:
              </strong>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-lg shadow-sm">
                10,000
              </span>
            </p>
            <p className="text-lg flex ">
              <strong className="font-semibold text-gray-800 w-90">
                Description:
              </strong>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg shadow-sm">
                Severe flooding caused by heavy rainfall has affected the XYZ
                region, displacing thousands of people and causing significant
                damage to infrastructure.
              </span>
            </p>
            <p className="text-lg flex items-center">
              <strong className="font-semibold text-gray-800 w-48">
                Number of People Rescued:
              </strong>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg shadow-sm">
                7,500
              </span>
            </p>
            <p className="text-lg flex items-center">
              <strong className="font-semibold text-gray-800 w-48">
                Relief Distributed:
              </strong>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg shadow-sm">
                Food, water, and blankets have been distributed to 8,000 people.
              </span>
            </p>
            <p className="text-lg flex items-center">
              <strong className="font-semibold text-gray-800 w-48">
                Medical Aid Given:
              </strong>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg shadow-sm">
                Medical teams have treated 2,000 individuals for injuries and
                illnesses.
              </span>
            </p>
            <p className="text-lg flex items-center">
              <strong className="font-semibold text-gray-800 w-55">
                Other Information:
              </strong>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg shadow-sm">
                Efforts are ongoing to restore power and provide temporary
                shelters to affected families.
              </span>
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center border-b-2 border-blue-500 pb-4">
              Location Heatmap
            </h2>
            <div className="mb-4 flex">
              <input
                type="text"
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-4 py-2 border border-blue-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
            <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg border-2 border-blue-300">
              <iframe
                title="Disaster Location Heatmap"
                src={mapSrc}
                width="100%"
                height="100%"
                className="rounded-lg"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
export default DisasterStat;
