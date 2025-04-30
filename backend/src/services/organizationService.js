const { AppDataSource } = require('../config/database');
const Organization = require('../models/Organization');
const Volunteer = require('../models/Volunteer');
const VolunteerApplication = require('../models/VolunteerApplication');
const Team = require('../models/Team');
const DailyReport = require('../models/DailyReport');
const { OrganizationNotFoundError } = require('../utils/errors');
const { getAssociatedDisaster , fetchAndValidateVolunteers} = require('../repositories/teamCreationRepository')
const { formatDailyReport } = require('../repositories/formalDailyReportRepository');


const joinDisaster = async (organizationId, disasterId) => {
  const organizationRepository = AppDataSource.getRepository('Organization');
  const disasterRepository = AppDataSource.getRepository('Disaster');

  const organization = await organizationRepository.findOne({
    where: { organization_id: organizationId }
  });
  if (!organization) {
    throw new Error(`Organization with id ${organizationId} not found`);
  }

  const disaster = await disasterRepository.findOne({
    where: { disaster_id: disasterId },
    relations: ['organizations']
  });
  
  if (!disaster) {
    throw new Error(`Disaster with id ${disasterId} not found`);
  }

  disaster.organizations = disaster.organizations || [];

  const alreadyJoined = disaster.organizations.some(org => org.organization_id === organization.organization_id);

  if (!alreadyJoined) {
    disaster.organizations.push(organization);
  }

  const savedDisaster = await disasterRepository.save(disaster);

  return {
    message: `Organization ${organizationId} successfully joined disaster ${disasterId}`,
    disaster: {
      disaster_id: savedDisaster.disaster_id,
      title: savedDisaster.title,
      organizations: savedDisaster.organizations.map(org => ({
        organization_id: org.organization_id,
        name: org.name,
      }))
    }
  };
};


const updateApplicationStatus = async (applicationId, status) => {
  const applicationRepository = AppDataSource.getRepository(VolunteerApplication);
  const application = await applicationRepository.findOne({ 
    where: { application_id: applicationId },
    relations: ['volunteer', 'volunteer.user', 'organization']
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


  const responseData = {
    application_id: updatedApplication.application_id,
    status: updatedApplication.status,
    createdAt: updatedApplication.createdAt,
    volunteer: {
      name: application.volunteer.user.name, 
      mobile: application.volunteer.user.mobile, 
      skills: application.volunteer.skills,
      work_location: application.volunteer.work_location, 
    }
  };

  return responseData;
};


const getOrganizationApplications = async (organizationId, offset , limit) => {
  const applicationRepository = AppDataSource.getRepository(VolunteerApplication);
  const applications = await applicationRepository.find({
    where: { organization: organizationId },
    relations: ['volunteer', 'volunteer.user'],
    skip: offset,
    take: limit,
  });

  const result = applications.map(application => ({
    application_id: application.application_id,
    status: application.status,
    createdAt: application.createdAt,
    volunteer: {
      name: application.volunteer.user ? application.volunteer.user.name : null,
      mobile: application.volunteer.user ? application.volunteer.user.mobile : null,
      skills: application.volunteer.skills,
      work_location: application.volunteer.work_location,
    }
  }));

  return result;
};



const getOrganizationVolunteers = async (organizationId, offset , limit) => {
  const volunteerRepository = AppDataSource.getRepository(Volunteer);
  const volunteers = await volunteerRepository
    .createQueryBuilder('volunteer')
    .innerJoinAndSelect('volunteer.user', 'user')
    .leftJoinAndSelect('volunteer.teams', 'team')
    .innerJoinAndSelect('volunteer.volunteerApplications', 'application')
    .where('application.organizationOrganizationId = :organizationId', { organizationId })
    .andWhere('application.status = :status', { status: 'approved' })
    .skip(offset)
    .take(limit)
    .getMany();
  const formattedVolunteers = volunteers.map(volunteer => ({
    volunteers: {
      memberId: volunteer.volunteer_id,
      name: volunteer.user.name, 
      mobile: volunteer.user.mobile,
      skills: volunteer.skills,
      work_location: volunteer.work_location, 
    },
    teams: volunteer.teams.map(team => ({
      team_id: team.team_id,
      name: team.name,
      responsibility: team.responsibility
    })),
    volunteerApplications: volunteer.volunteerApplications.map(application => ({
      application_id: application.application_id,
      status: application.status,
      createdAt: application.createdAt,
    }))
  }));

  return formattedVolunteers;
};



const createTeamWithMembers = async (organizationId, teamData) => {
  const organizationRepository = AppDataSource.getRepository(Organization);
  const volunteerRepository = AppDataSource.getRepository(Volunteer);
  const teamRepository = AppDataSource.getRepository(Team);

  const organization = await organizationRepository.findOne({
    where: { organization_id: organizationId },
    relations: ['disasters']
  });

  if (!organization) throw new OrganizationNotFoundError();

  const name = teamData.teamName;
  const memberIds = teamData.memberIds || [];

  if (!name) throw new Error("Team name is required");
  if (memberIds.length === 0) throw new Error("At least one team member is required");

  const associatedDisaster = getAssociatedDisaster(organization, teamData.disasterId);
  const volunteers = await fetchAndValidateVolunteers(memberIds, organizationId, volunteerRepository);

  let teamLeader = null;
  if (teamData.teamLeader) {
    teamLeader = volunteers.find(v => v.volunteer_id === teamData.teamLeader);
    if (!teamLeader) throw new Error("Team leader must be one of the team members");
  }

  const newTeam = teamRepository.create({
    name: name,
    teamLeader: teamLeader ? teamLeader.volunteer_id : null,
    organization,
    disaster: associatedDisaster,
    assignmentStatus: 'unassigned',
    members: volunteers
  });

  const savedTeam = await teamRepository.save(newTeam);

  return {
    team_id: savedTeam.team_id,
    teamName: savedTeam.name,
    teamLeader: teamLeader ? {
      volunteer_id: teamLeader.volunteer_id,
      name: teamLeader.user?.name ?? null
    } : null,
    organization: {
      organization_id: organization.organization_id,
      name: organization.name
    },
    members: volunteers.map(v => ({
      volunteer_id: v.volunteer_id,
      name: v.user?.name ?? null,
      email: v.user?.email ?? null
    })),
    disaster: {
      disaster_id: associatedDisaster.disaster_id,
      name: associatedDisaster.name
    },
    assignmentStatus: 'unassigned'
  };
};


// Get all teams associated with the organization
const getOrganizationTeams = async (organizationId, offset, limit) => {
  const teamRepository = AppDataSource.getRepository(Team);
  
  const teams = await teamRepository.find({
    where: { organization: { organization_id: organizationId } },
    relations: ['members', 'members.user'],
    skip: offset,
    take: limit
  });

  const formattedTeams = teams.map(team => ({
    team_id: team.team_id,
    name: team.name,
    createdAt: team.createdAt,
    assignedAt: team.assignedAt,
    assignmentStatus: team.assignmentStatus,
    members: team.members.map(volunteer => ({
      volunteer: {
        name: volunteer.user.name, 
        mobile: volunteer.user.mobile,
        skills: volunteer.skills, 
        work_location: volunteer.work_location 
      }
    }))
  }));

  return formattedTeams;
};



const submitDailyReport = async (organizationId, disasterId, reportData) => {
  const reportRepository = AppDataSource.getRepository(DailyReport);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existingReport = await reportRepository.findOne({
    where: {
      organization: { organization_id: organizationId },
      disaster: { disaster_id: disasterId },
      date: today
    }
  });

  const itemFields = [
    'waterFiltrationTablets', 'rice', 'flattenedRice', 'puffedRice',
    'potato', 'onion', 'sugar', 'oil', 'salt', 'candles',
    'saline', 'paracetamol', 'bandages', 'sanitaryPads'
  ];

  const itemsDistributed = itemFields.reduce((total, field) => 
    total + (reportData[field] || 0), 0);

  const reportFields = {
    organization: { organization_id: organizationId },
    disaster: { disaster_id: disasterId },
    date: today,
    ...(reportData.description && { description: reportData.description }),
    ...(reportData.volunteersCount && { volunteersCount: reportData.volunteersCount }),
    ...(itemsDistributed > 0 && { itemsDistributed }),
    ...itemFields.reduce((acc, field) => {
      if (reportData[field]) acc[field] = reportData[field];
      return acc;
    }, {}),
    ...(reportData.rescuedMen && { rescuedMen: reportData.rescuedMen }),
    ...(reportData.rescuedWomen && { rescuedWomen: reportData.rescuedWomen }),
    ...(reportData.rescuedChildren && { rescuedChildren: reportData.rescuedChildren })
  };

  let savedReport;
  if (existingReport) {
    Object.assign(existingReport, reportFields);
    savedReport = await reportRepository.save(existingReport);
  } else {
    const newReport = reportRepository.create(reportFields);
    savedReport = await reportRepository.save(newReport);
  }

  return formatDailyReport(savedReport, itemFields, itemsDistributed);
};


module.exports = {
  joinDisaster,
  updateApplicationStatus,
  getOrganizationApplications,
  getOrganizationVolunteers,
  createTeamWithMembers,
  getOrganizationTeams,
  submitDailyReport,
};
