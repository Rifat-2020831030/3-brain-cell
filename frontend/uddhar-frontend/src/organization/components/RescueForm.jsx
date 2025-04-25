import PropTypes from "prop-types";
import Button from "../../shared/components/Button";

const RescueForm = ({ formData, handleFormDataChange, handleSubmission }) => {
  const hideNumberInputSpinners =
    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="flex flex-col gap-y-5">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label
            htmlFor="rescuedMen"
            className="block text-gray-700 font-medium mb-2"
          >
            Men Rescued:
          </label>
          <input
            type="number"
            id="rescuedMen"
            name="rescuedMen"
            placeholder="Enter number of men rescued"
            className={`w-full border border-gray-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${hideNumberInputSpinners}`}
            value={formData["rescuedMen"] || ""}
            onChange={handleFormDataChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="rescuedWomen"
            className="block text-gray-700 font-medium mb-2"
          >
            Women Rescued:
          </label>
          <input
            type="number"
            id="rescuedWomen"
            name="rescuedWomen"
            placeholder="Enter number of women rescued"
            className={`w-full border border-gray-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${hideNumberInputSpinners}`}
            value={formData["rescuedWomen"] || ""}
            onChange={handleFormDataChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="rescuedChildren"
            className="block text-gray-700 font-medium mb-2"
          >
            Children Rescued:
          </label>
          <input
            type="number"
            id="rescuedChildren"
            name="rescuedChildren"
            placeholder="Enter number of children rescued"
            className={`w-full border border-gray-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${hideNumberInputSpinners}`}
            value={formData["rescuedChildren"] || ""}
            onChange={handleFormDataChange}
            required
          />
        </div>
      </div>
      <Button onClick={handleSubmission}>Submit</Button>
    </div>
  );
};

export default RescueForm;

RescueForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleFormDataChange: PropTypes.func.isRequired,
  handleSubmission: PropTypes.func.isRequired,
};
