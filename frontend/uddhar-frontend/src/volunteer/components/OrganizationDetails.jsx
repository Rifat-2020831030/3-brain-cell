import PropTypes from "prop-types";

function OrganizationDetails({ organization, setSelectedOrganization }) {
  return (
    <div className="items-center p-2  font-sans text-lg">
      <div className="max-w-3xl mx-auto rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
          {organization.name}
        </h1>
        <p className="mt-4">
          <strong>Type:</strong> {organization.type}
        </p>
        <p className="mt-2">
          <strong>Sector:</strong> {organization.sector}
        </p>
        <p className="mt-2">
          <strong>Established Date:</strong>{" "}
          {organization.establishedDate}
        </p>
        <p className="mt-2">
          <strong>Mission:</strong> {organization.mission}
        </p>
        <p className="mt-2">
          <strong>Location:</strong> {organization.location}
        </p>
        <p className="mt-2">
          <strong>Secondary Contact Email:</strong>{" "}
          <a
            href={`mailto:${organization.mail}`}
            className="text-blue-500 hover:underline"
          >
            {organization.mail}
          </a>
        </p>
        <p className="mt-2">
          <strong>Website:</strong>{" "}
          <a
            href={organization.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {organization.website}
          </a>
        </p>
        <p className="mt-2">
          <strong>Social Media:</strong>{" "}
          <a
            href={organization.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Social Media
          </a>
        </p>
        <div className="mt-6 flex justify-center">
          <button
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setSelectedOrganization(null)}
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrganizationDetails;

OrganizationDetails.propTypes = {
  organization: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    sector: PropTypes.string,
    establishedDate: PropTypes.string,
    mission: PropTypes.string,
    location: PropTypes.string,
    mail: PropTypes.string,
    website: PropTypes.string,
    socialMedia: PropTypes.string,
  }),
  setSelectedOrganization: PropTypes.func,
};
