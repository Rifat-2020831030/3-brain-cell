import { registerCompletion } from "../data/registerCompletion";
import { Selection } from "../../shared/ImportShared";

const VolunteerDetails = ({ formData, handleChange, handleNext }) => {
    const addSkill = (e) => {
      const newSkill = e.target.value;
      if (newSkill && !formData.skills.includes(newSkill)) {
        handleChange({
          target: {
            name: "skills",
            value: [...formData.skills, newSkill],
          },
        });
      }
      // Reset select to initial placeholder
      e.target.value = "";
    };

    const removeSkill = (skillToRemove) => {
      handleChange({
        target: {
          name: "skills",
          value: formData.skills.filter((skill) => skill !== skillToRemove),
        },
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await registerCompletion(formData);
      if(response.status) {
        window.location.href = "/dashboard/volunteer";
      }
      else {
        alert(response.message);
      }
    }

    return (
      <form>
        <label htmlFor="skills" className="block mb-2">
          Skills
        </label>
        <select
          id="skills"
          name="skills"
          onChange={addSkill}
          className="p-2 border rounded w-full mb-4"
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
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    );
}

export default VolunteerDetails;