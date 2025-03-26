import React, { useState } from "react";

const DisasterInput = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
  });

  const [wordCount, setWordCount] = useState(0);

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "title": {
        const titleRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
        if (!value) error = "Title is required.";
        else if (!titleRegex.test(value))
          error = "Title must contain only letters and spaces.";
        break;
      }
      case "description":
        if (!value) error = "Description is required.";
        else if (value.length < 10)
          error = "Description must be at least 10 characters long.";
        else if (value.length > 200)
          error = "Description must not exceed 200 characters.";
        break;
      case "location":
        if (!value) error = "Location is required.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the input
    const error = validate(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });

    // Update word count for description
    if (name === "description") setWordCount(value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with form submission
      console.log("Form submitted:", formData);
    } else {
      // Set errors to state and show alert
      setErrors(newErrors);
      alert("Please fill in all required fields correctly.");
    }
  };

  const handleMapClick = (location) => {
    // Placeholder function for map click
    setFormData({
      ...formData,
      location,
    });
    setErrors({
      ...errors,
      location: "", // Clear location error if any
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-amber-200 to-gray-100 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-120">
        <h2 className="text-xl font-bold mb-4">Provide Required Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.title ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none resize-none focus:ring-2 ${
                errors.description ? "border-red-500" : "focus:ring-blue-500"
              }`}
              rows="4" 
            />
            <p className="text-right text-gray-500">
                {wordCount}/200 characters
            </p>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <div
              className="w-full h-32 bg-gray-200 flex items-center justify-center cursor-pointer"
              onClick={() => handleMapClick("New Location")}
            >
              <p>Select location from map</p>
            </div>
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate} // Adjusting for datetime-local input
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.startDate ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default DisasterInput;
