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



const getOrganizationsForVolunteer = async (volunteerId) => {
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
    where: { approval_status: true },
  });

  const availableOrganizations = organizations
    .filter((org) => !volunteer.organization || org.organization_id !== volunteer.organization.organization_id)
    .map((org) => ({
      organization_name: org.organization_name,
      type: org.type,
      sector: org.sector,
      mission: org.mission,
    }));

  return availableOrganizations;
};


const getOngoingDisasters = async () => {
  const disasterRepository = AppDataSource.getRepository(Disaster);
  const disasters = await disasterRepository.find({
    where: { status: 'Open' }
  });
  if (disasters.length === 0) {
    const error = new Error('No ongoing disasters found');
    error.statusCode = 404;
    throw error;
  }
  return disasters.map(disaster => ({ 
    id: disaster.disaster_id,
    title: disaster.title,
    type: disaster.type,
    description: disaster.description,
    location: disaster.location,
    startDate: disaster.startDate,
    status: disaster.status, 
  }));
};

module.exports = {
  getOrganizationsForVolunteer,
  getOngoingDisasters,
  applyToOrganization
};
