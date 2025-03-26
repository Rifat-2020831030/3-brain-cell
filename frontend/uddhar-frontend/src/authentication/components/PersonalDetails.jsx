import Input from "../../shared/components/Input";
import { validateText } from "../../shared/components/InputValidation";

const PersonalDetails = ({ userData, handleChange, handleRegister }) => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Your Personal Details</h3>
      <form>
        <Input
          handleChange={handleChange}
          formData={userData}
          setting={{
            label: "Name",
            type: "text",
            name: "name",
            width: "w-100",
          }}
        />
        <span>Enter a valid text</span>
        <Input
          handleChange={handleChange}
          formData={userData}
          setting={{
            label: "Email",
            type: "email",
            name: "email",
            width: "w-100",
          }}
        />
        <Input
          handleChange={handleChange}
          formData={userData}
          setting={{
            label: "Mobile",
            type: "text",
            name: "mobile",
            width: "w-100",
          }}
        />
        <Input
          handleChange={handleChange}
          formData={userData}
          setting={{
            label: "Password",
            type: "password",
            name: "password",
            width: "w-100",
          }}
        />
        <Input
          handleChange={handleChange}
          formData={userData}
          setting={{
            label: "Confirm Password",
            type: "password",
            name: "confirmPassword",
            width: "w-100",
          }}
        />
        <Input
          handleChange={handleChange}
          formData={userData}
          setting={{
            label: "Location",
            type: "text",
            name: "location",
            width: "w-100",
          }}
        />
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-100 p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select Role</option>
            <option value="visitor">Member</option>
            <option value="volunteer">Volunteer</option>
            <option value="organization">Organization</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-amber-500 text-white px-10 py-3 rounded cursor-pointer"
            onClick={handleRegister}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalDetails;
