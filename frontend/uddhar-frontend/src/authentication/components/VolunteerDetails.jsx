import { useState } from "react";
import { validateSkills } from "../../shared/components/InputValidation";
import { volunteerRegistration } from "../data/registerCompletion";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const VolunteerDetails = ({location}) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    skills: [],
    location: location,
  });
  const navigate = useNavigate();

  // console.log("Location in VolunteerDetails:", location);


  const addSkill = (e) => {
    const newSkill = e.target.value;
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));

      // Clear error when skills are added
      if (errors.skills) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.skills;
          return newErrors;
        });
      }
    }
    // Reset select to initial placeholder
    e.target.value = "";
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = formData.skills.filter(
      (skill) => skill !== skillToRemove
    );
    setFormData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));

    // Validate skills after removal
    if (updatedSkills.length === 0) {
      setErrors((prev) => ({
        ...prev,
        skills: "Please select at least one skill",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const skillsError = validateSkills(formData.skills);
    if (skillsError) {
      newErrors.skills = skillsError.message;
    }

    setErrors(newErrors);
    for (const key in newErrors) {
      if (newErrors[key]) {
        return false; // Form is invalid
      }
    }
    return true; // Form is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (validateForm()===false) {
      return;
    }

    try {
      const response = await volunteerRegistration(formData);
      if (response.status) {
        toast.success(response.message);
        navigate("/dashboard/volunteer");
      } else {
        setErrors((prev) => ({
          ...prev,
          form: response.message,
        }));
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setErrors((prev) => ({
        ...prev,
        form: "An error occurred during submission",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toaster position="bottom-right" richColors />
      {errors.form && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <span className="block sm:inline">{errors.form}</span>
        </div>
      )}

      <label htmlFor="skills" className="block mb-2">
        Skills
      </label>
      <select
        id="skills"
        name="skills"
        onChange={addSkill}
        className={`p-2 border rounded w-full mb-4 ${
          errors.skills ? "border-red-500" : "border-gray-300"
        }`}
        defaultValue=""
      >
        <option value="" disabled>
          Select a skill
        </option>
        <option value="first_aid">First Aid</option>
        <option value="water_rescue">Fire Rescue</option>
        <option value="search_and_rescue">Search and Rescue</option>
        <option value="logistics">Logistics</option>
        <option value="food_distribution">Food Distribution</option>
      </select>
      {errors.skills && (
        <p className="text-red-500 text-xs mb-4">{errors.skills}</p>
      )}

      <div className="mb-4">
        {formData.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center bg-gray-200 rounded px-2 py-1 mr-2 mb-2"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 text-red-500 cursor-pointer"
            >
              &#x2715;
            </button>
          </span>
        ))}
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer">
          Submit
        </button>
      </div>
    </form>
  );
};

export default VolunteerDetails;

VolunteerDetails.propTypes = {
  location: PropTypes.string.isRequired
};