import VolunteerDetails from "./VolunteerDetails";
import OrganizationDetails from "./OrganizationDetails";
import Proptypes from "prop-types";

const RoleDetails = ({ formData, setFormData, handleChange, handleNext }) => {
  // if the role is visitor, redirect to home page cz 3rd step is not needed
    if(formData.role === "visitor") {
        window.location.href = "/";
        return null;
    }
    return (
      <>
        {formData.role === "volunteer" && <VolunteerDetails location={formData.location} />}
        {formData.role === "organization" && <OrganizationDetails formData={formData} setFormData={setFormData} handleChange={handleChange} handleNext={handleNext} />}
      </>
      );
}

export default RoleDetails;

RoleDetails.propTypes = {
  formData: Proptypes.shape({
    role: Proptypes.string.isRequired,
    organization_name: Proptypes.string,
    type: Proptypes.string,
    location: Proptypes.string,
    secondaryContactName: Proptypes.string,
    secondaryContactTitle: Proptypes.string,
    secondaryContactMail: Proptypes.string,
    website: Proptypes.string,
  }).isRequired,
  setFormData: Proptypes.func,
  handleChange: Proptypes.func,
  handleNext: Proptypes.func,
};