import PropTypes from 'prop-types';

const TableFilters = ({ 
  locationFilter, 
  skillFilter, 
  uniqueLocations, 
  uniqueSkills, 
  onLocationChange, 
  onSkillChange 
}) => {
  return (
    <div className="flex gap-4">
      <select
        className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={locationFilter}
        onChange={(e) => onLocationChange(e.target.value)}
      >
        {uniqueLocations.map(location => (
          <option key={`locations-${location}`} value={location}>
            {location === 'all' ? 'All Locations' : location}
          </option>
        ))}
      </select>

      <select
        className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={skillFilter}
        onChange={(e) => onSkillChange(e.target.value)}
      >
        {uniqueSkills.map((skill) => (
          <option key={skill} value={skill}>
            {skill === 'all' ? 'All Skills' : skill}
          </option>
        ))}
      </select>
    </div>
  );
};

TableFilters.propTypes = {
  locationFilter: PropTypes.string.isRequired,
  skillFilter: PropTypes.string.isRequired,
  uniqueLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
  uniqueSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLocationChange: PropTypes.func.isRequired,
  onSkillChange: PropTypes.func.isRequired
};

export default TableFilters;