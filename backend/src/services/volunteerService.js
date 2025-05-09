const { AppDataSource } = require('../config/database');
const Volunteer = require('../models/Volunteer');
const Organization = require('../models/Organization');
const Disaster = require('../models/Disaster');
const VolunteerApplication = require('../models/VolunteerApplication');
const {OrganizationNotFoundError} = require('../utils/errors');


const applyToOrganization = async (organizationId, volunteerId) => {
  const organizationRepository = AppDataSource.getRepository(Organization);
  const volunteerRepository = AppDataSource.getRepository(Volunteer);
  const applicationRepository = AppDataSource.getRepository(VolunteerApplication);
  
  const organization = await organizationRepository.findOne({ where: { organization_id: organizationId } });
  if (!organization) {
    throw new OrganizationNotFoundError();
  }
  
  const volunteer = await volunteerRepository.findOne({ where: { user: { userId: volunteerId } } });
  if (!volunteer) {
    const error = new Error('Only volunteers can apply');
    error.statusCode = 403;
    throw error;
  }

  const existingApprovedApplication = await applicationRepository.findOne({
    where: {
      volunteer: { volunteer_id: volunteer.volunteer_id },
      status: 'approved',
    },
  });

  if (existingApprovedApplication) {
    const error = new Error('Volunteer is already approved by another organization');
    error.statusCode = 400;
    throw error; 
  }

  const newApplication = applicationRepository.create({
    volunteer: { volunteer_id: volunteer.volunteer_id },
    organization: { organization_id: organization.organization_id },
    status: 'pending',
  });
  
  const savedApplication = await applicationRepository.save(newApplication);

  return {
    status: savedApplication.status,
    createdAt: savedApplication.createdAt,
  };
};



const getOrganizationsForVolunteer = async (volunteerId, offset , limit) => {
  const volunteerRepository = AppDataSource.getRepository(Volunteer);
  const volunteer = await volunteerRepository.findOne({
    where: { user: { userId: volunteerId } },
    relations: ['organization'],
  });
  if (!volunteer) {
    const error = new Error('Volunteer not found');
    error.statusCode = 404;
    throw error;
  }

  const organizationRepository = AppDataSource.getRepository(Organization);
  const organizations = await organizationRepository.find({
    where: { approval_status: "approved" },
    skip: offset,
    take: limit
  });

  const applicationRepository = AppDataSource.getRepository(VolunteerApplication);
  const applications = await applicationRepository.find({
    where: { volunteer: { volunteer_id: volunteer.volunteer_id } },
    relations: ['organization'],
  });

  const availableOrganizations = organizations.map((org) => {
    const application = applications.find(app => app.organization.organization_id === org.organization_id);
    return {
      id: org.organization_id,
      name: org.organization_name,
      type: org.type,
      sector: org.sector,
      mission: org.mission,
      established_date: org.establishedDate,
      location: org.location,
      website: org.website,
      social_media: org.socialMedialink,
      parentOrg: org.parentOrg,
      mail: org.secondaryContactMail,
      requestStatus: application ? application.status : null
    };
  });
  
  return availableOrganizations;
};


const getOngoingDisasters = async (offset, limit) => {
  const disasterRepository = AppDataSource.getRepository(Disaster);
  const [disasters, totalCount] = await disasterRepository.findAndCount({
    where: { status: 'Open' },
    skip: offset,
    take: limit
  });
  
  if (disasters.length === 0) {
    const error = new Error('No ongoing disasters found');
    error.statusCode = 404;
    throw error;
  }
  
  const formattedDisasters = disasters.map(disaster => ({ 
    disaster_id: disaster.disaster_id,
    title: disaster.title,
    type: disaster.type,
    description: disaster.description,
    location: disaster.location,
    startDate: disaster.startDate,
    status: disaster.status, 
  }));
  
  return { total: totalCount, disasters: formattedDisasters };
};


const leaveOrganization = async (volunteerId) => {
  const volunteerRepository = AppDataSource.getRepository(Volunteer);
  
  const volunteer = await volunteerRepository.findOne({
    where: { user: { userId: volunteerId } },
    relations: ['organization']
  });
  
  if (!volunteer) {
    throw new Error('Volunteer not found');
  }
  
  if (!volunteer.organization) {
    throw new Error('Volunteer is not a member of any organization');
  }
  
  volunteer.organization = null;
  
  await volunteerRepository.save(volunteer);
  
  return { message: 'Volunteer has successfully left the organization' };
};


module.exports = {
  getOrganizationsForVolunteer,
  getOngoingDisasters,
  applyToOrganization,
  leaveOrganization 
};

