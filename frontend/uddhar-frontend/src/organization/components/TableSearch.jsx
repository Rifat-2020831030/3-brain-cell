import PropTypes from 'prop-types';
import { Search as SearchIcon } from 'lucide-react';

const TableSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        type="text"
        placeholder="Search volunteers..."
        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

TableSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired
};

export default TableSearch;