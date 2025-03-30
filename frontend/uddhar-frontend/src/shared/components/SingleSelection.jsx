import PropTypes from "prop-types";

const SingleSelection = ({ options, setValue, setFormData, label }) => {

  const handleSelect = (e) => {
    if(setValue) {
      setValue(e.target.value);
    } else if(setFormData) {
      setFormData((prev) => ({ ...prev, type: e.target.value }));
    }
    else{
      console.error("setValue or setFormData is required");
    }
  }

  return (
    <>
      <label htmlFor="slc" className="block mb-2">
        {label? label : "Select an option"}
      </label>
      <select id="slc" onChange={handleSelect} className="border px-5 py-1 rounded">
        <option value="" disabled>{options[0].value}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label? option.label : option.value}
          </option>
        ))}
      </select>
    </>
  );
};
export default SingleSelection;

SingleSelection.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string,
    })
  ).isRequired,
  setValue: PropTypes.func,
  setFormData: PropTypes.func,
  label: PropTypes.string,
};
