import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";

const SearchOnMap = ({setFormData}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
    );
    const data = await response.json();
    if (data.length > 0) {
      setSearchQuery(data[0].display_name);
      setSelectedLocation({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), display_name: data[0].display_name });
      setFormData((prev) => ({ ...prev, location: { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), display_name: data[0].display_name } }));
    }
  };

  return (
    <div className="w-full h-full mt-4">
      {/* Search Input */}
      <div className="mb-4 flex gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Search for a place..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-amber-500 text-white cursor-pointer rounded-md hover:bg-amber-600"
        >
          Search
        </button>
      </div>

      {/* Map */}
      <MapContainer
        center={[23.7634, 90.3892]}
        zoom={13}
        className="w-full h-full rounded-md shadow-md"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler setSelectedLocation={setSelectedLocation} setFormData={setFormData} setSearchQuery={setSearchQuery}/>
        {selectedLocation && (
          <>
            <RecenterMap center={[selectedLocation.lat, selectedLocation.lon]} />
            <Marker position={[selectedLocation.lat, selectedLocation.lon]}>
              <Popup>{selectedLocation.display_name}</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};

SearchOnMap.propTypes = {
  setFormData: PropTypes.func.isRequired,
};
export default SearchOnMap;

function RecenterMap({ center }) {
  const map = useMap();
  const lastCenterRef = useRef(null);
  useEffect(() => {
    if (!lastCenterRef.current || lastCenterRef.current[0] !== center[0] || lastCenterRef.current[1] !== center[1]) {
      map.setView(center, 13, { animate: true, duration: 5 });
      lastCenterRef.current = center;
    }
  }, [center, map]);

  return null;
}

RecenterMap.propTypes = {
  center: PropTypes.array,
};

function ClickHandler({ setSelectedLocation, setFormData, setSearchQuery }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setSearchQuery(`Coordinates: ${lat}, ${lng}`);
      setSelectedLocation({ lat: e.latlng.lat, lon: e.latlng.lng, display_name: `Coordinates: ${e.latlng.lat}, ${e.latlng.lng}` });
      setFormData((prev) => ({ ...prev, location: { lat: lat, lon: lng, display_name: `Coordinates: ${lat}, ${lng}` } }));
    },
  });
  return null;
}

ClickHandler.propTypes = {
  setSelectedLocation: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func,
};
