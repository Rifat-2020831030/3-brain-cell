import PropTypes from "prop-types";
import Button from "../../shared/components/Button";

const MedicalForm = ({ formData, handleDataChange, handleSubmission }) => {
  const inputClassName =
    "w-full border border-gray-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="flex flex-col gap-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="saline"
            className="block text-gray-700 font-medium mb-2"
          >
            Saline:
          </label>
          <input
            type="number"
            id="saline"
            name="saline"
            placeholder="Enter quantity (pcs)"
            className={inputClassName}
            value={formData["saline"] || ""}
            onChange={handleDataChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="paracetamol"
            className="block text-gray-700 font-medium mb-2"
          >
            Paracetamol:
          </label>
          <input
            type="number"
            id="paracetamol"
            name="paracetamol"
            placeholder="Enter quantity (pcs)"
            className={inputClassName}
            value={formData["paracetamol"] || ""}
            onChange={handleDataChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="bandages"
            className="block text-gray-700 font-medium mb-2"
          >
            Bandage:
          </label>
          <input
            type="number"
            id="bandages"
            name="bandages"
            placeholder="Enter quantity (pcs)"
            className={inputClassName}
            value={formData["bandages"] || ""}
            onChange={handleDataChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="sanitaryPads"
            className="block text-gray-700 font-medium mb-2"
          >
            Pad:
          </label>
          <input
            type="number"
            id="sanitaryPads"
            name="sanitaryPads"
            placeholder="Enter quantity (pcs)"
            className={inputClassName}
            value={formData["sanitaryPads"] || ""}
            onChange={handleDataChange}
            required
          />
        </div>
      </div>
      <Button onClick={handleSubmission}>Submit</Button>
    </div>
  );
};
export default MedicalForm;

MedicalForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleDataChange: PropTypes.func.isRequired,
  handleSubmission: PropTypes.func.isRequired,
};
