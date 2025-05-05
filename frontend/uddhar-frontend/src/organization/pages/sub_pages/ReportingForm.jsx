import PropTypes from "prop-types";
import { useState } from "react";
import MedicalForm from "../../components/MedicalForm";
import ReliefForm from "../../components/ReliefForm";
import RescueForm from "../../components/RescueForm";
import { submitReport } from "../../data/DisasterManagement";
import { Toaster, toast } from "sonner";
import Button from "../../../shared/components/Button";

const ReportingForm = ({ setActiveSection, selectedDisaster }) => {
  const [reportType, setReportType] = useState("");
  const [formData, setFormData] = useState({
    description: "Operation successful",
    volunteersCount: 10,
  });
  const handleChanges = (e) => {
    setReportType(e.target.value);
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    // console.log(
    //   "Form submitted with data:",
    //   formData,
    //   " selectedDisaster: ",
    //   selectedDisaster
    // );
    const response = await submitReport(selectedDisaster, formData);
    if (response.status) {
      toast.success(response.message);
      window.location.reload();
    }
    
  };
  return (
    <div className="relative flex flex-col items-center justify-center bg-gray-100 shadow-md shadow-gray-200 p-6 rounded-lg">
      <Toaster richColors position="top-center" />
      <Button className="absolute left-10 top-10 bg-gray-800 border-1 border-white hover:bg-gray-800/70 hover:font-bold text-white" onClick={()=> setActiveSection('')}>Go back</Button>
      <p className="text-center text-3xl bg-gray-800 text-white p-4 w-full mb-6 rounded-t-lg">
        Submit Your Report
      </p>
      <div className="border border-gray-600 rounded-lg px-10 py-5 bg-blue-200 shadow-md">
        <div className="w-100 flex justify-center items-center gap-x-2">
          <p>Select Report Type</p>
          <select
            value={reportType}
            onChange={handleChanges}
            className="w-[60%] p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent my-10"
          >
            <option value="" disabled >
              Select disaster type
            </option>
            <option value="rescue">Rescue Report</option>
            <option value="medical">Medical Report</option>
            <option value="relief">Relief Report</option>
          </select>
        </div>
        {reportType === "rescue" && (
          <RescueForm
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            handleSubmission={handleSubmission}
          />
        )}
        {reportType === "relief" && (
          <ReliefForm
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            handleSubmission={handleSubmission}
          />
        )}
        {reportType === "medical" && (
          <MedicalForm
            formData={formData}
            handleDataChange={handleFormDataChange}
            handleSubmission={handleSubmission}
          />
        )}
      </div>
    </div>
  );
};
export default ReportingForm;

ReportingForm.propTypes = {
  setActiveSection: PropTypes.func.isRequired,
  selectedDisaster: PropTypes.number.isRequired,
};
