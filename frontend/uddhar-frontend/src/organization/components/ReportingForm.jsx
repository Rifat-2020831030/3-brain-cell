import { useState } from "react";

function ReportingForm({handleChange}) {

  const [formData, setFormData] = useState({
    description: "",
    teamType: "",
    details: "",
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
  };

  const renderDynamicField = () => {
    if (formData.teamType === "rescue") {
      return (
        <div className="mb-4">
          <label
            htmlFor="numRescued"
            className="block text-gray-700 font-medium mb-2"
          >
            Number of Rescued Members:
          </label>
          <input
            type="number"
            id="numRescued"
            name="numRescued"
            placeholder="Enter number of rescued members"
            className="w-full border  border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.numRescued || ""}
            onChange={handleDataChange}
            required
          />
        </div>
      );
    } else if (formData.teamType === "relief") {
      return (
        <div className="mb-4">
          <label
            htmlFor="numReliefDistributed"
            className="block text-gray-700 font-medium mb-2"
          >
            Number of Relief Items Distributed:
          </label>
          <input
            type="number"
            id="numReliefDistributed"
            name="numReliefDistributed"
            placeholder="Enter number of relief items distributed"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.numReliefDistributed || ""}
            onChange={handleDataChange}
            required
          />
        </div>
      );
    } else if (formData.teamType === "medical") {
      return (
        <div className="mb-4">
          <label
            htmlFor="numMedicalAidGiven"
            className="block text-gray-700 font-medium mb-2"
          >
            Number of Medical Aids Given:
          </label>
          <input
            type="number"
            id="numMedicalAidGiven"
            name="numMedicalAidGiven"
            placeholder="Enter number of medical aids given"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.numMedicalAidGiven || ""}
            onChange={handleDataChange}
            required
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-screen w-50% ml-20 items-center self-center " >
      <form
        className="bg-slate-100 shadow-lg rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Reporting Form
        </h2>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            className="w-full  bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={handleDataChange}
            required
          ></textarea>
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
            <option value="others">Others</option>
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
