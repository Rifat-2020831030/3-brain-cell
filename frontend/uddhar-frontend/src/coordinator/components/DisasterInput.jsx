import { useState } from "react";
import SearchOnMap from "./SearchOnMap";
import SingleSelection from "../../shared/components/SingleSelection";
import { createDisaster } from "../data/DisasterCreationApi";
import { useNavigate } from 'react-router-dom';

const DisasterInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    location: {},
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
      case "type":
        if (!value) error = "Type is required.";
        break;
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
      
      const response = createDisaster(formData);
      if(response.status) {
        navigate("/dashboard/coordinator");
      } else {
        alert("An error occurred while registering disaster. Please try again later.");
      }
    } else {
      // Set errors to state and show alert
      setErrors(newErrors);
      window.scrollTo(0, 0);
      // alert("Please fill in all required fields correctly.");
    }
  };


  return (
    <div className="flex items-center py-5 px-5 justify-center bg-gradient-to-b from-amber-200 to-gray-100 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-140">
        <h2 className="text-xl font-bold mb-4">Provide Required Data</h2>

        <form onSubmit={handleSubmit}>
          {/* title of the disaster */}
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-100 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.title ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
            {/* type selction */}
          <div className="mb-4">
            <SingleSelection
              options={[{ value: "Earthquake" }, { value: "Flood" }, { value: "Fire" }, {value: "Cyclone"}, {value: "Land Slide"}, {value: "Others"}]}
              selected={formData.type} 
              setSelected={(type) => setFormData({ ...formData, type })}
              setFormData={setFormData}
              label={"Select Disaster Type"}
            />
          </div>

          {/* description of the disaster */}
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

          {/* location of the disaster */}
          <div className="mb-20">
            <label className="block text-gray-700">Location</label>
            <div
              className="w-full h-100 flex items-center justify-center cursor-pointer"
            >
              <SearchOnMap setFormData={setFormData} />
            </div>
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>

          {/* time of the disaster */}
          <div className="mb-4 w-60">
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
          {/* submit button */}
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 cursor-pointer"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default DisasterInput;
