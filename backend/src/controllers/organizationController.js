const { AppDataSource } = require('../config/database');
const Volunteer = require('../models/Volunteer');
const Organization = require('../models/Organization');
const VolunteerApplication = require('../models/VolunteerApplication');
const Team = require('../models/Team');
const DailyReport = require('../models/DailyReport');


const applyToOrganization = async (req, res) => {
  try {
    const { orgId } = req.params;
    const organizationRepository = AppDataSource.getRepository(Organization);
    const volunteerRepository = AppDataSource.getRepository(Volunteer);
    const applicationRepository = AppDataSource.getRepository(VolunteerApplication);
    
   
    const organization = await organizationRepository.findOne({ where: { organization_id: orgId } });
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    
    const volunteer = await volunteerRepository.findOne({ where: { user: { userId: req.user.id } } });
    if (!volunteer) {
      return res.status(403).json({ message: "Only volunteers can apply" });
    }
    
    const newApplication = applicationRepository.create({
      volunteer: { volunteer_id: volunteer.volunteer_id },
      organization: { organization_id: organization.organization_id },
      status: "pending",
    });
    
    const savedApplication = await applicationRepository.save(newApplication);
    return res.status(201).json({ message: "Application submitted", application: savedApplication });
    
  } catch (error) {
    console.error("applyToOrganization error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status provided." });
    }
    
    const applicationRepository = AppDataSource.getRepository(VolunteerApplication);
    const application = await applicationRepository.findOne({ 
      where: { application_id: applicationId },
      relations: ['volunteer', 'organization']
    });
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }
    
    application.status = status;
    const updatedApplication = await applicationRepository.save(application);
    
    if (status === "approved") {
      const volunteerRepository = AppDataSource.getRepository(Volunteer);
      const volunteer = await volunteerRepository.findOne({ 
        where: { volunteer_id: application.volunteer.volunteer_id } 
      });
      if (volunteer) {
        volunteer.organization = { organization_id: application.organization.organization_id };
        await volunteerRepository.save(volunteer);
      }
    }
    
    return res.status(200).json({
      message: `Application ${status} successfully.`,
      application: {
        application_id: updatedApplication.application_id,
        status: updatedApplication.status,
        createdAt: updatedApplication.createdAt,
        volunteer: {
          volunteer_id: updatedApplication.volunteer.volunteer_id,
          skills: updatedApplication.volunteer.skills,
          work_location: updatedApplication.volunteer.work_location
        }
      },
    });
  } catch (error) {
    console.error("updateApplicationStatus error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const getOrganizationApplications = async (req, res) => {
  try {
    const applicationRepository = AppDataSource.getRepository(VolunteerApplication);
    const organizationId = req.user.organizationId

    const applications = await applicationRepository.find({
      where: { organization: { organization_id: organizationId } },
      relations: ['volunteer'],
    });

    return res.status(200).json({
      applications: applications.map(app => ({
        application_id: app.application_id,
        status: app.status,
        createdAt: app.createdAt,
        volunteer: {
          volunteer_id: app.volunteer.volunteer_id,
          skills: app.volunteer.skills,
          work_location: app.volunteer.work_location,
        },
      })),
    });
  } catch (error) {
    console.error('getOrganizationApplications error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getOrganizationVolunteers = async (req, res) => {
  try {
    const volunteerRepository = AppDataSource.getRepository(Volunteer);
    const organizationId = req.user.organizationId;

    const volunteers = await volunteerRepository
    .createQueryBuilder("volunteer")
    .innerJoinAndSelect("volunteer.user", "user") 
    .leftJoinAndSelect("volunteer.teams", "team") 
    .innerJoinAndSelect("volunteer.volunteerApplications", "application") 
    .where("application.organizationOrganizationId = :organizationId", { organizationId })
    .andWhere("application.status = :status", { status: "approved" }) 
    .getMany();


    return res.status(200).json({
      volunteers: volunteers.map(v => ({
        volunteer_id: v.volunteer_id,
        name: v.user.name,
        email: v.user.email,
        mobile: v.user.mobile,
        skills: v.skills,
        work_location: v.work_location,
        teams: v.teams.map(t => ({
          team_id: t.team_id,
          name: t.name,
        })),
      })),
    });
  } catch (error) {
    console.error("getOrganizationVolunteers error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



const createTeamWithMembers = async (req, res) => {
  try {
    const teamRepository = AppDataSource.getRepository(Team);
    const volunteerRepository = AppDataSource.getRepository(Volunteer);
    const organizationId = req.user.organizationId;
    const { teamName, responsibility, location, memberIds } = req.body;

    if (!memberIds || memberIds.length === 0) {
      return res.status(400).json({ message: 'At least one volunteer ID must be provided' });
    }

    const approvedVolunteers = await volunteerRepository
      .createQueryBuilder("volunteer")
      .innerJoinAndSelect("volunteer.user", "user")  
      .leftJoinAndSelect("volunteer.teams", "team") 
      .where("volunteer.volunteer_id IN (:...memberIds)", { memberIds })  
      .getMany();

    const volunteersWithDetails = approvedVolunteers.map(v => ({
      volunteer_id: v.volunteer_id,
      name: v.user.name,      
      email: v.user.email,
      mobile: v.user.mobile,
      skills: v.skills,
      work_location: v.work_location
    }));

    const newTeam = teamRepository.create({
      name: teamName,
      responsibility,
      location,
      organization: { organization_id: organizationId },
      members: approvedVolunteers,  
    });

    
    const savedTeam = await teamRepository.save(newTeam);

    const teamWithMembers = await teamRepository.findOne({
      where: { team_id: savedTeam.team_id },
      relations: ['members'],  
    });

    
    return res.status(201).json({
      message: 'Team created with members successfully',
      team: {
        team_id: teamWithMembers.team_id,
        name: teamWithMembers.name,
        responsibility: teamWithMembers.responsibility,
        location: teamWithMembers.location,
        createdAt: teamWithMembers.createdAt,
        members: volunteersWithDetails  
      },
    });
  } catch (error) {
    console.error('createTeamWithMembers error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getOrganizationTeams = async (req, res) => {
  try {
    const teamRepository = AppDataSource.getRepository(Team);
    const organizationId = req.user.organizationId;

   
    const teams = await teamRepository.find({
      where: { organization: { organization_id: organizationId } },
      relations: ['members', 'members.user'],  
    });

    const result = teams.map(team => ({
      team_id: team.team_id,
      name: team.name,
      responsibility: team.responsibility,
      location: team.location,
      createdAt: team.createdAt,
      members: team.members.map(member => ({
        volunteer_id: member.volunteer_id,
        name: member.user.name,       
        email: member.user.email,     
        mobile: member.user.mobile,   
        skills: member.skills,        
        work_location: member.work_location,  
      })),
    }));

    return res.status(200).json({
      message: 'Teams fetched successfully',
      teams: result,
    });
  } catch (error) {
    console.error('getOrganizationTeams error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


const submitDailyReport = async (req, res) => {
  try {
    const reportRepository = AppDataSource.getRepository(DailyReport);
    const  organizationId  = req.user.organizationId
    const { disasterId } = req.params;
    const { description, volunteersCount, itemsDistributed } = req.body;
    
    const newReport = reportRepository.create({
      organization: { organization_id: organizationId },
      disaster: { disaster_id: disasterId },
      description,
      volunteersCount,
      itemsDistributed,
    });
    
    const savedReport = await reportRepository.save(newReport);
    return res.status(201).json({
      message: 'Daily report submitted successfully',
      report: savedReport,
    });
  } catch (error) {
    console.error("submitDailyReport error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { applyToOrganization, updateApplicationStatus, getOrganizationApplications, getOrganizationVolunteers, getOrganizationTeams, createTeamWithMembers, submitDailyReport };
