import VolunteerDetails from "./VolunteerDetails";
import OrganizationDetails from "./OrganizationDetails";
import PropTypes from "prop-types";

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
  formData: PropTypes.shape({
    role: PropTypes.string.isRequired,
    organization_name: PropTypes.string,
    type: PropTypes.string,
    location: PropTypes.string,
    secondaryContactName: PropTypes.string,
    secondaryContactTitle: PropTypes.string,
    secondaryContactMail: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func,
  handleChange: PropTypes.func,
  handleNext: PropTypes.func,
};