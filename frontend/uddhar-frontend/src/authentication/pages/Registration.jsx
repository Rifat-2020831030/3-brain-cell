import React, { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    location: "",
    role: "",
    code: "",
    skills: "",
    work_location: "",
    organization_name: "",
    type: "",
    sector: "",
    documentLink: "",
    regNo: "",
    establishedDate: "",
    mission: "",
    secondaryContactName: "",
    secondaryContactTitle: "",
    secondaryContactMail: "",
    org_location: "",
    website: "",
    socialMediaLink: "",
    parentOrg: "",
  });
  const handleReister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Password didn't Matched!");
      return ;
    }
    try {
      const { name, email, mobile, password, location, role } = formData;
      await axios.post("http://localhost:3000/auth/register", {
        name,
        email,
        mobile,
        password,
        location,
        role,
      });
      handleNext();
    } catch (error) {
      console.error("An error occured", error);
    }
  };
  const handleVerify = async () => {

    try {
      const { email, code } = formData;
      await axios.post("http://localhost:3000/auth/verify-email", {
        email,
        code,
      });
      handleNext();
    } catch (error) {
      setError("Invalid Code");
      console.error("Error sending code:", error);
    }
  };
  const handleNext = () => {
    setStep(step + 1);
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex flex-col p-10 items-center justify-center bg-gradient-to-r from-gray-100 shadow-lg to-yellow-200 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex">
          {step === 2 && (
            <>
              <div className="w-1/2 flex flex-col ">
                <h2 className="text-2xl font-bold mb-4 flex justify-center ">
                  Create account
                </h2>
                <ul className="space-y-4 ">
                  <li className="flex items-center ">
                    <span
                      className={`w-6 h-6 ${
                        step >= 1 ? "bg-green-500" : "bg-gray-300"
                      } rounded-full flex items-center justify-center text-white`}
                    >
                      1
                    </span>
                    <span className="ml-2">Personal Details</span>
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-6 h-6 ${
                        step >= 2 ? "bg-green-500" : "bg-gray-300"
                      } rounded-full flex items-center justify-center text-white`}
                    >
                      2
                    </span>
                    <span className="ml-2">Email Verification</span>
                  </li>
                  <li className="flex items-center">
                    <span
                      className={`w-6 h-6 ${
                        step >= 3 ? "bg-green-500" : "bg-gray-300"
                      } rounded-full flex items-center justify-center text-white`}
                    >
                      3
                    </span>
                    <span className="ml-2">Role wise Details</span>
                  </li>
                </ul>
              </div>
            </>
          )}
          <div className="w-full pl-8">
            {step === 1 && (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Your Personal Details
                </h3>
                <form >
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    >
                      <option value="">Select Role</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="member">Member</option>
                      <option value="organization">Organization</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-blue-500 text-white p-2 rounded"
                      onClick={ () => {
                        handleReister();
                       }}
                    >
                      Next
                    </button>
                  </div>
                </form>
              </>
            )}
            {step === 2 && (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Email Verification
                </h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                      placeholder="Enter the code sent to your email"
                    />
                  </div>
                  {error && (
                      <div className="text-red-500 text-sm md:text-lg font-sans mt-2">
                        {error}
                      </div>
                    )}
                  <div className="flex justify-center ">
                    <button
                      type="button"
                      className="w-1/2 bg-blue-500 text-white p-2 rounded "
                      onClick={() => {
                        handleVerify();
                      }}
                    >
                      Next
                    </button>
                  </div>
                </form>
              </>
            )}
            {step === 3 && (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Role wise Details
                </h3>
                {role === "volunteer" && (
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700">Skills</label>
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">
                        Work Location
                      </label>
                      <input
                        type="text"
                        name="workLocation"
                        value={formData.work_location}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={handleNext}
                      >
                        <Link to='/'>
                          Complete
                        </Link>
                      </button>
                    </div>
                  </form>
                )}
                {role === "organization" && (
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        name="organizationName"
                        value={formData.organization_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Type</label>
                      <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Sector</label>
                      <input
                        type="text"
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Sector</label>
                      <input
                        type="text"
                        name="documentLink"
                        value={formData.documentLink}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Sector</label>
                      <input
                        type="text"
                        name="regNo"
                        value={formData.regNo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">
                        Established Date
                      </label>
                      <input
                        type="date"
                        name="establishedDate"
                        value={formData.establishedDate}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mission</label>
                      <input
                        type="text"
                        name="mission"
                        value={formData.mission}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mission</label>
                      <input
                        type="text"
                        name="secondaryContactName"
                        value={formData.secondaryContactName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mission</label>
                      <input
                        type="text"
                        name="secondaryContactTitle"
                        value={formData.secondaryContactTitle}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mission</label>
                      <input
                        type="text"
                        name="secondaryContactMail"
                        value={formData.secondaryContactMail}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Mission</label>
                      <input
                        type="text"
                        name="secondaryContactMail"
                        value={formData.secondaryContactMail}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.org_location}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">
                        Parent Organization
                      </label>
                      <input
                        type="text"
                        name="socialMediaLink"
                        value={formData.socialMediaLink}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">
                        Social Media Link
                      </label>
                      <input
                        type="url"
                        name="parentOrg"
                        value={formData.parentOrg}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={handleNext}
                      >
                        Complete
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
