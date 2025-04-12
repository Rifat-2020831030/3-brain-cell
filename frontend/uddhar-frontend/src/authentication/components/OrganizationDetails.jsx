import { useState } from "react";
import {
  validateDate,
  validateEmail,
  validateOrganizationType,
  validateOrgForm,
  validateRegNo,
  validateSocialMedia,
  validateText,
  validateWebsite,
} from "../../shared/components/InputValidation";
import ImportShared from "../../shared/ImportShared";
import { registerCompletion } from "../data/registerCompletion";

const { Input } = ImportShared;

const OrganizationDetails = () => {
  const [formData, setFormData] = useState({
    organization_name: "",
    type: "",
    sector: "",
    secondaryContactName: "",
    secondaryContactTitle: "",
    secondaryContactMail: "",
    location: "",
    website: "",
    socialMediaLink: "",
    parentOrg: "",
    documentLink: "",
    regNo: "",
    establishedDate: "",
    mission: "",
  });

  const [errors, setErrors] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateOrgForm(formData, setErrors)) {
      window.scrollTo(0, 0);
      return;
    }

    try {
      const response = await registerCompletion(formData);
      if (response.status) {
        window.location.href = "/dashboard/organization";
      } else {
        setErrors((prev) => ({
          ...prev,
          form: response.message,
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: "An error occurred during submission",
      }));
      console.error("Error during submission:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = null;

    switch (name) {
      case "organization_name":
        error = validateText(value, true);
        break;
      case "type":
        error = validateOrganizationType(value, true);
        break;
      case "location":
        error = validateText(value, true);
        break;
      case "secondaryContactName":
        error = validateText(value, true);
        break;
      case "secondaryContactTitle":
        error = validateText(value, true);
        break;
      case "secondaryContactMail":
        error = validateEmail(value, true);
        break;
      case "website":
        error = validateWebsite(value, true);
        break;
      case "socialMediaLink":
        error = validateSocialMedia(value, true);
        break;
      case "regNo":
        error = validateRegNo(value, true);
        break;
      case "establishedDate":
        error = validateDate(value, true);
        break;
      default:
        break;
    }

    if (error) {
      window.location.href = "#top";
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };

  const sectors = [
    {
      name: "Disaster Relief",
      value: "Disaster Relief",
    },
    {
      name: "Education",
      value: "Education",
    },
    {
      name: "Health",
      value: "Health",
    },
  ];

  return (
    <form onSubmit={submitHandler}>
      <h3 className="text-xl font-semibold mb-4 text-center">
        Organization Details
      </h3>

      {errors.form && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <span className="block sm:inline">{errors.form}</span>
        </div>
      )}

      <Input
        setting={{
          name: "organization_name",
          label: "Organization Name",
          width: "w-100",
          type: "text",
        }}
        handleChange={handleChange}
        formData={formData}
        error={errors.organization_name}
      />
      {/* type */}
      <div>
        <label htmlFor="type">Organization Type</label>
        <div className="flex gap-5 my-5">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="Government"
              name="type"
              value="Government"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="Government">Government</label>
            <input
              type="radio"
              id="Private"
              name="type"
              value="Private"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="Private">Private</label>
            <input
              type="radio"
              id="Non-profit"
              name="type"
              value="Non-profit"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="Non-profit">Non-profit</label>
          </div>
        </div>
      </div>
      {/* sector */}
      <div className="w-full max-w-xs">
        <label
          htmlFor="sector"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Sector
        </label>
        <select
          id="sector"
          name="sector"
          onChange={handleChange}
          className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select a sector
          </option>
          {sectors.map((sector) => (
            <option key={sector.value} value={sector.value}>
              {sector.name}
            </option>
          ))}
        </select>
      </div>
      <Input
        setting={{
          name: "location",
          label: "Office Location",
          width: "w-100",
          type: "text",
        }}
        handleChange={handleChange}
        formData={formData}
        error={errors.location}
      />
      <Input
        setting={{
          name: "secondaryContactName",
          label: "Contact Person Name",
          width: "w-100",
          type: "text",
        }}
        handleChange={handleChange}
        formData={formData}
        error={errors.secondaryContactName}
      />
      <Input
        setting={{
          name: "secondaryContactTitle",
          label: "Position in Organization",
          width: "w-100",
          type: "text",
        }}
        handleChange={handleChange}
        formData={formData}
        error={errors.secondaryContactTitle}
      />
      <Input
        setting={{
          name: "secondaryContactMail",
          label: "Mail Address",
          width: "w-100",
          type: "text",
        }}
        handleChange={handleChange}
        formData={formData}
        error={errors.secondaryContactMail}
      />
      <Input
        setting={{
          name: "website",
          label: "Official Website",
          width: "w-100",
          type: "text",
        }}
        handleChange={handleChange}
        formData={formData}
        error={errors.website}
      />
      <Input
        setting={{
          name: "socialMediaLink",
          label: "Social Media Link",
          width: "w-100",
          type: "text",
        }}
        handleChange={handleChange}
        formData={formData}
        error={errors.socialMediaLink}
      />
      <Input
        setting={{
          name: "parentOrg",
          label: "Parent Organization",
          width: "w-100",
          type: "text",
        }}
        handleChange={handleChange}
        formData={formData}
      />
      <Input
        setting={{
          name: "regNo",
          label: "Govt Registration Number",
          width: "w-100",
          type: "number",
        }}
        handleChange={handleChange}
        formData={formData}
        error={errors.regNo}
      />
      <Input
        setting={{
          name: "documentLink",
          label: "Provide Registration Document Link",
          width: "w-100",
          type: "text",
        }}
        handleChange={handleChange}
        formData={formData}
      />
      <Input
        setting={{
          name: "establishedDate",
          label: "Established Date",
          width: "w-100",
          type: "date",
        }}
        handleChange={handleChange}
        formData={formData}
        error={errors.establishedDate}
      />
      <div className="flex flex-col mb-4">
        <label htmlFor="mission">Mission of the Organization</label>
        <textarea
          name="mission"
          id="mission"
          cols="50"
          rows="3"
          className={`resize-none border p-3 my-5 ${
            errors.mission ? "border-red-500" : "border-gray-300"
          }`}
          onChange={handleChange}
        ></textarea>
        {errors.mission && (
          <p className="text-red-500 text-xs mt-1">{errors.mission}</p>
        )}
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-amber-500 text-black px-5 py-2 rounded cursor-pointer hover:bg-amber-600 hover:-translate-y-1"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default OrganizationDetails;
