import PropTypes from "prop-types";

const FilterComponent = ({ filters, setFilters, uniqueValues }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="flex gap-4 mb-4">
      <select
        name="assignedLocation"
        value={filters.assignedLocation}
        onChange={handleFilterChange}
        className="border rounded px-2 py-1 cursor-pointer"
      >
        <option value="">All Locations</option>
        {uniqueValues.assignedLocation.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <select
        name="responsibility"
        value={filters.responsibility}
        onChange={handleFilterChange}
        className="border rounded px-2 py-1 cursor-pointer"
      >
        <option value="">All Responsibilities</option>
        {uniqueValues.responsibility.map((responsibility) => (
          <option key={responsibility} value={responsibility}>
            {responsibility}
          </option>
        ))}
      </select>
      <select
        name="organisation"
        value={filters.organisation}
        onChange={handleFilterChange}
        className="border rounded px-2 py-1 cursor-pointer"
      >
        <option value="">All Organisations</option>
        {uniqueValues.organisation.map((organisation) => (
          <option key={organisation} value={organisation}>
            {organisation}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterComponent;

FilterComponent.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  uniqueValues: PropTypes.shape({
    assignedLocation: PropTypes.array.isRequired,
    responsibility: PropTypes.array.isRequired,
    organisation: PropTypes.array.isRequired,
  }).isRequired,
};
