const { AppDataSource } = require('../config/database');
const Organization = require('../models/Organization');
const Volunteer = require('../models/Volunteer');
const VolunteerApplication = require('../models/VolunteerApplication');
const Team = require('../models/Team');
const DailyReport = require('../models/DailyReport');
const { OrganizationNotFoundError, OrganizationAlreadyApprovedError } = require('../utils/errors');

// Volunteer applies to an organization
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
  
  const newApplication = applicationRepository.create({
    volunteer: { volunteer_id: volunteer.volunteer_id },
    organization: { organization_id: organization.organization_id },
    status: 'pending'
  });
  
  const savedApplication = await applicationRepository.save(newApplication);
  return savedApplication;
};

// Update volunteer application status
const updateApplicationStatus = async (applicationId, status) => {
  const applicationRepository = AppDataSource.getRepository(VolunteerApplication);
  const application = await applicationRepository.findOne({ 
    where: { application_id: applicationId },
    relations: ['volunteer', 'organization']
  });
  if (!application) {
    const error = new Error('Application not found');
    error.statusCode = 404;
    throw error;
  }
  application.status = status;
  const updatedApplication = await applicationRepository.save(application);
  
  if (status === 'approved') {
    const volunteerRepository = AppDataSource.getRepository(Volunteer);
    const volunteer = await volunteerRepository.findOne({
      where: { volunteer_id: application.volunteer.volunteer_id }
    });
    if (volunteer) {
      volunteer.organization = { organization_id: application.organization.organization_id };
      await volunteerRepository.save(volunteer);
    }
  }
  return updatedApplication;
};

// Get all applications for the organization
const getOrganizationApplications = async (organizationId) => {
  const applicationRepository = AppDataSource.getRepository(VolunteerApplication);
  const applications = await applicationRepository.find({
    where: { organization: { organization_id: organizationId } },
    relations: ['volunteer']
  });
  return applications;
};


const getOrganizationVolunteers = async (organizationId) => {
  const volunteerRepository = AppDataSource.getRepository(Volunteer);
  const volunteers = await volunteerRepository
    .createQueryBuilder('volunteer')
    .innerJoinAndSelect('volunteer.user', 'user')
    .leftJoinAndSelect('volunteer.teams', 'team')
    .innerJoinAndSelect('volunteer.volunteerApplications', 'application')
    .where('application.organizationOrganizationId = :organizationId', { organizationId })
    .andWhere('application.status = :status', { status: 'approved' })
    .getMany();
  return volunteers;
};

// Create a team with member volunteers
const createTeamWithMembers = async (organizationId, teamData) => {
  const { teamName, responsibility, location, memberIds } = teamData;
  const teamRepository = AppDataSource.getRepository(Team);
  const volunteerRepository = AppDataSource.getRepository(Volunteer);
  
  const approvedVolunteers = await volunteerRepository
    .createQueryBuilder('volunteer')
    .innerJoinAndSelect('volunteer.user', 'user')
    .where('volunteer.volunteer_id IN (:...memberIds)', { memberIds })
    .getMany();
  
  if (approvedVolunteers.length === 0) {
    const error = new Error('No approved volunteers found for provided IDs');
    error.statusCode = 404;
    throw error;
  }
  
  const newTeam = teamRepository.create({
    name: teamName,
    responsibility,
    location,
    organization: { organization_id: organizationId },
    members: approvedVolunteers
  });
  
  const savedTeam = await teamRepository.save(newTeam);
  return savedTeam;
};

// Get all teams associated with the organization
const getOrganizationTeams = async (organizationId) => {
  const teamRepository = AppDataSource.getRepository(Team);
  const teams = await teamRepository.find({
    where: { organization: { organization_id: organizationId } },
    relations: ['members', 'members.user']
  });
  return teams;
};

// Submit a daily report for a disaster by the organization
const submitDailyReport = async (organizationId, disasterId, reportData) => {
  const reportRepository = AppDataSource.getRepository(DailyReport);
  const { description, volunteersCount, itemsDistributed } = reportData;
  
  const newReport = reportRepository.create({
    organization: { organization_id: organizationId },
    disaster: { disaster_id: disasterId },
    description,
    volunteersCount,
    itemsDistributed
  });
  const savedReport = await reportRepository.save(newReport);
  return savedReport;
};

module.exports = {
  applyToOrganization,
  updateApplicationStatus,
  getOrganizationApplications,
  getOrganizationVolunteers,
  createTeamWithMembers,
  getOrganizationTeams,
  submitDailyReport,
};
