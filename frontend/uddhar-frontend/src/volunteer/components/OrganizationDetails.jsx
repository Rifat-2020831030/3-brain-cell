import React from 'react'


function OrganizationDetails({ organization,setSelectedOrganization }) {
    return (
        <div className="items-center p-2  font-sans text-lg">
            <div className="max-w-3xl mx-auto rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">{organization.name}</h1>
                <p className="mt-4"><strong>Type:</strong> {organization.type}</p>
                <p className="mt-2"><strong>Sector:</strong> {organization.detail.sector}</p>
                <p className="mt-2"><strong>Registration Number:</strong> {organization.detail.regNo}</p>
                <p className="mt-2"><strong>Established Date:</strong> {organization.detail.establishedDate}</p>
                <p className="mt-2"><strong>Mission:</strong> {organization.detail.mission}</p>
                <p className="mt-2"><strong>Location:</strong> {organization.detail.location}</p>
                <p className="mt-2">
                    <strong>Secondary Contact Email:</strong>{" "}
                    <a href={`mailto:${organization.detail.contactEmail}`} className="text-blue-500 hover:underline">{organization.detail.secondaryContactMail}</a>
                </p>
                <p className="mt-2">
                    <strong>Website:</strong>{" "}
                    <a href={organization.detail.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{organization.detail.website}</a>
                </p>
                <p className="mt-2">
                    <strong>Social Media:</strong>{" "}
                    <a href={organization.detail.socialMedia} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Social Media</a>
                </p>
                <p className="mt-2">
                    <strong>Document:</strong>{" "}
                    <a href={organization.detail.documentLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Document</a>
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


export default OrganizationDetails
