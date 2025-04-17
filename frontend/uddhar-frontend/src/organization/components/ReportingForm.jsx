import { useState } from "react";

function ReportingForm({ handleNext }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    description: "",
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

  const handleTeamSelect = (teamType) => {
    setFormData(prev => ({...prev, teamType}));
    setStep(2);
  };

  const renderTeamSelection = () => {
    return (
      <div className="grid grid-cols-3 gap-4 p-4 h-20 mt-60 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
        <button
          onClick={() => handleTeamSelect("rescue")}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl font-semibold tracking-wide flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Rescue Team
        </button>
        <button
          onClick={() => handleTeamSelect("relief")}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl font-semibold tracking-wide flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          Relief Team
        </button>
        <button
          onClick={() => handleTeamSelect("medical")}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl font-semibold tracking-wide flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Medical Team
        </button>
      </div>
    );
  };

  const renderDynamicField = () => {
    if (formData.teamType === "rescue" || formData.teamType === "shelter") {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="  ">
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.rescuedMen || ""}
              onChange={handleDataChange}
              required
            />
          </div>
          <div className="   ">
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.rescuedWomen || ""}
              onChange={handleDataChange}
              required
            />
          </div>
          <div className="   ">
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.rescuedChildren || ""}
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.waterFiltrationTablets || ""}
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.candles || ""}
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.bandages || ""}
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
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.sanitaryPads || ""}
              onChange={handleDataChange}
              required
            />
          </div>
        </div>
      );
    }
    return null;
  };

  const renderForm = () => {
    return (
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
              className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={handleDataChange}
              placeholder="Enter the description"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-2"
            >
              Report Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full border bg-white border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.date || ""}
              onChange={handleDataChange}
              required
            />
          </div>
        </div>
        {renderDynamicField()}
        
        <button
          type="submit"
          className="w-full mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 font-medium"
        >
          Submit
        </button>
      </form>
    );
  };

  return (
    <div className="flex ml-100 self-center w-fit h-full m-5">
      {step === 1 ? renderTeamSelection() : renderForm()}
    </div>
  );
}

export default ReportingForm;
