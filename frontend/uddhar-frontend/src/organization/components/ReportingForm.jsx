import { useState } from "react";

function ReportingForm({ handleNext }) {
  const [formData, setFormData] = useState({
    description: "",
    teamType: "",
    details: "",
    reportDate: "",
  });

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    window.location.href = "/dashboard/organization/reporting";
  };

  const renderDynamicField = () => {
    if (formData.teamType === "rescue" || formData.teamType === "shelter") {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="  ">
        <label
          htmlFor="numMenRescued"
          className="block text-gray-700 font-medium mb-2"
        >
          Men Rescued:
        </label>
        <input
          type="number"
          id="numMenRescued"
          name="numMenRescued"
          placeholder="Enter number of men rescued"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.numMenRescued || ""}
          onChange={handleDataChange}
          required
        />
          </div>
          <div className="   ">
        <label
          htmlFor="numWomenRescued"
          className="block text-gray-700 font-medium mb-2"
        >
          Women Rescued:
        </label>
        <input
          type="number"
          id="numWomenRescued"
          name="numWomenRescued"
          placeholder="Enter number of women rescued"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.numWomenRescued || ""}
          onChange={handleDataChange}
          required
        />
          </div>
          <div className="   ">
        <label
          htmlFor="numChildrenRescued"
          className="block text-gray-700 font-medium mb-2"
        >
          Children Rescued:
        </label>
        <input
          type="number"
          id="numChildrenRescued"
          name="numChildrenRescued"
          placeholder="Enter number of children rescued"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.numChildrenRescued || ""}
          onChange={handleDataChange}
          required
        />
          </div>
        </div>
      );
    } else if (formData.teamType === "relief") {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
        <label
          htmlFor="waterFiltrationTab"
          className="block text-gray-700 font-medium mb-2 whitespace-nowrap"
        >
          Filtration Tab:
        </label>
        <input
          type="number"
          id="waterFiltrationTab"
          name="waterFiltrationTab"
          placeholder="Enter quantity (pcs)"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.waterFiltrationTab || ""}
          onChange={handleDataChange}
          required
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
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.rice || ""}
          onChange={handleDataChange}
          required
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
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.flattenedRice || ""}
          onChange={handleDataChange}
          required
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
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.puffedRice || ""}
          onChange={handleDataChange}
          required
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
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.potato || ""}
          onChange={handleDataChange}
          required
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
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.onion || ""}
          onChange={handleDataChange}
          required
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
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.sugar || ""}
          onChange={handleDataChange}
          required
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
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.oil || ""}
          onChange={handleDataChange}
          required
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
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.salt || ""}
          onChange={handleDataChange}
          required
        />
          </div>
          <div className="flex flex-col">
        <label
          htmlFor="candle"
          className="block text-gray-700 font-medium mb-2 whitespace-nowrap"
        >
          Candle:
        </label>
        <input
          type="number"
          id="candle"
          name="candle"
          placeholder="Enter quantity (pcs)"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.candle || ""}
          onChange={handleDataChange}
          required
        />
          </div>
        </div>
      );
    } else if (formData.teamType === "medical") {
      return (
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
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.saline || ""}
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
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.paracetamol || ""}
          onChange={handleDataChange}
          required
        />
          </div>
          <div className="flex flex-col">
        <label
          htmlFor="bandage"
          className="block text-gray-700 font-medium mb-2"
        >
          Bandage:
        </label>
        <input
          type="number"
          id="bandage"
          name="bandage"
          placeholder="Enter quantity (pcs)"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.bandage || ""}
          onChange={handleDataChange}
          required
        />
          </div>
          <div className="flex flex-col">
        <label
          htmlFor="pad"
          className="block text-gray-700 font-medium mb-2"
        >
          Pad:
        </label>
        <input
          type="number"
          id="pad"
          name="pad"
          placeholder="Enter quantity (pcs)"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.pad || ""}
          onChange={handleDataChange}
          required
        />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex ml-100 self-center w-fit h-full m-2">
      <form
        className="bg-slate-100 shadow-lg rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Reporting Form
        </h2>
        <div className="grid-row-2 mb-4">
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows="2"
              cols="50"
              className="w-full  bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={handleDataChange}
              placeholder="Enter the description"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="reportDate"
              className="block text-gray-700 font-medium mb-2"
            >
              Report Date:
            </label>
            <input
              type="date"
              id="reportDate"
              name="reportDate"
              className="w-full border bg-white border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.reportDate || ""}
              onChange={handleDataChange}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="teamType"
            className="block text-gray-700 font-medium mb-2"
          >
            Type of Team:
          </label>
          <select
            id="teamType"
            name="teamType"
            className="w-full border bg-white border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.teamType}
            onChange={handleDataChange}
            required
          >
            <option value="">Select a team type</option>
            <option value="rescue">Rescue</option>
            <option value="relief">Relief Distribution</option>
            <option value="medical">Medical Assistance</option>
            <option value="shelter">shelter</option>
            <option value="others">others</option>
          </select>
        </div>
        {renderDynamicField()}
        <div className="mb-4">
          <label
            htmlFor="details"
            className="block text-gray-700 font-medium mb-2"
          >
            Details:
          </label>
          <input
            type="text"
            id="details"
            name="details"
            placeholder="Enter details based on team type"
            className="w-full border bg-white border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.details}
            onChange={handleDataChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReportingForm;
