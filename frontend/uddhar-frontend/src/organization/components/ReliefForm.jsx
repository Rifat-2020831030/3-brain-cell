import PropTypes from "prop-types";
import Button from "../../shared/components/Button";

const ReliefForm = ({ formData, handleFormDataChange, handleSubmission }) => {
  const inputClassName =
    "w-full border border-gray-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="flex flex-col gap-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="waterFiltrationTablets"
            className="block text-gray-700 font-medium mb-2 whitespace-nowrap"
          >
            Filtration Tab:
          </label>
          <input
            type="number"
            id="waterFiltrationTablets"
            name="waterFiltrationTablets"
            placeholder="Enter quantity (pcs)"
            className={inputClassName}
            value={formData["waterFiltrationTablets"] || ""}
            onChange={handleFormDataChange}
            required
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="rice"
            className="block text-gray-700 font-medium mb-2 whitespace-nowrap"
          >
            Rice:
          </label>
          <input
            type="number"
            id="rice"
            name="rice"
            placeholder="Enter quantity (kg)"
            className={inputClassName}
            value={formData["rice"] || ""}
            onChange={handleFormDataChange}
            required
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="flattenedRice"
            className="block text-gray-700 font-medium mb-2 whitespace-nowrap"
          >
            Flattened Rice:
          </label>
          <input
            type="number"
            id="flattenedRice"
            name="flattenedRice"
            placeholder="Enter quantity (kg)"
            className={inputClassName}
            value={formData["flattenedRice"] || ""}
            onChange={handleFormDataChange}
            required
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="puffedRice"
            className="block text-gray-700 font-medium mb-2 whitespace-nowrap"
          >
            Puffed Rice:
          </label>
          <input
            type="number"
            id="puffedRice"
            name="puffedRice"
            placeholder="Enter quantity (kg)"
            className={inputClassName}
            value={formData["puffedRice"] || ""}
            onChange={handleFormDataChange}
            required
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="potato"
            className="block text-gray-700 font-medium mb-2 whitespace-nowrap"
          >
            Potato:
          </label>
          <input
            type="number"
            id="potato"
            name="potato"
            placeholder="Enter quantity (kg)"
            className={inputClassName}
            value={formData["potato"] || ""}
            onChange={handleFormDataChange}
            required
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="onion"
            className="block text-gray-700 font-medium mb-2 whitespace-nowrap"
          >
            Onion:
          </label>
          <input
            type="number"
            id="onion"
            name="onion"
            placeholder="Enter quantity (kg)"
            className={inputClassName}
            value={formData["onion"] || ""}
            onChange={handleFormDataChange}
            required
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="sugar"
            className="block text-gray-700 font-medium mb-2 whitespace-nowrap"
          >
            Sugar:
          </label>
          <input
            type="number"
            id="sugar"
            name="sugar"
            placeholder="Enter quantity (kg)"
            className={inputClassName}
            value={formData["sugar"] || ""}
            onChange={handleFormDataChange}
            required
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="oil"
            className="block text-gray-700 font-medium mb-2 whitespace-nowrap"
          >
            Oil:
          </label>
          <input
            type="number"
            id="oil"
            name="oil"
            placeholder="Enter quantity (liters)"
            className={inputClassName}
            value={formData["oil"] || ""}
            onChange={handleFormDataChange}
            required
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="salt"
            className="block text-gray-700 font-medium mb-2 whitespace-nowrap"
          >
            Salt:
          </label>
          <input
            type="number"
            id="salt"
            name="salt"
            placeholder="Enter quantity (kg)"
            className={inputClassName}
            value={formData["salt"] || ""}
            onChange={handleFormDataChange}
            required
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="candles"
            className="block text-gray-700 font-medium mb-2 whitespace-nowrap"
          >
            Candle:
          </label>
          <input
            type="number"
            id="candles"
            name="candles"
            placeholder="Enter quantity (pcs)"
            className={inputClassName}
            value={formData["candles"] || ""}
            onChange={handleFormDataChange}
            required
            onWheel={(e) => e.target.blur()}
          />
        </div>
      </div>
      <Button onClick={handleSubmission}>Submit</Button>
    </div>
  );
};

export default ReliefForm;

ReliefForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleFormDataChange: PropTypes.func.isRequired,
  handleSubmission: PropTypes.func.isRequired,
};
