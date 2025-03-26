import ImportShared from "../../shared/ImportShared";
const { Input, Selection } = ImportShared;
import {useState} from "react";
import {registerCompletion} from "../data/registerCompletion";

const OrganizationDetails = () => {
    const [formData, setFormData] = useState({
        organization_name: "",
        type: "",
        sector: [],
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

    const submitHandler = async (e) => {
        // console.log(formData);
        e.preventDefault();
        const response = await registerCompletion(formData);
        if(response.status) {
            window.location.href = "/dashboard/organization";
        }
        else {
            alert(response.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log("name: ",name,"value: ", value);
        setFormData({ ...formData, [name]: value });
        // console.log(formData);
      };

    return (
        <form>
            <h3 className="text-xl font-semibold mb-4 text-center">Organization Details</h3>
            <Input
                setting={{
                    name: "organization_name",
                    label: "Organization Name",
                    width: "w-100",
                    type: "text",
                }}
                handleChange={handleChange}
                formData={formData}
            />
            <div className="mb-4 w-100">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Organization Type</option>
                <option value="Non-Profit">Non-Profit</option>
                <option value="NGO">NGO</option>
                <option value="Government">Government</option>
                <option value="Social Welfare">Social Welfare</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>
            <Selection
                setting={{
                    name: "sector",
                    label: "Sector",
                    width: "w-100",
                }}
                options={["Health", "Education", "Awareness", "Social Wellfare", "Environment", "Human Rights"]}
                formData={formData}
                setFormData={setFormData}
            />
            <Input
                setting={{
                    name: "location",
                    label: "Office Location",
                    width: "w-100",
                    type: "text",
                }}
                handleChange={handleChange}
                formData={formData}
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
            />
            <div className="flex flex-col">
            <label htmlFor="mission">Mission of the Organization</label>
            <textarea name="mission" id="mission" cols="50" rows="3" className="resize-none border p-3 my-5" onChange={handleChange}></textarea>
            </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-amber-500 text-black px-5 py-2 rounded cursor-pointer hover:bg-amber-600 hover:-translate-y-1"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </form>
      );
}

export default OrganizationDetails;