const { AppDataSource } = require('../config/database');
const Coordinator = require('../models/Coordinator');
const Disaster = require('../models/Disaster');
const Organization = require('../models/Organization');
const Team = require('../models/Team');
const Notification = require('../models/Notification');


  const createDisaster = async (req, res) => {
    try {
      const coordinatorRepository = AppDataSource.getRepository(Coordinator);
      const disasterRepository = AppDataSource.getRepository(Disaster);

      const coordinator = await coordinatorRepository.findOne({
        where: { user: { userId: req.user.id } },
      });
      if (!coordinator) {
        return res.status(403).json({ message: 'No coordinator profile found.' });
      }

      const { title, description, location, startDate } = req.body;

      const newDisaster = disasterRepository.create({
        title,
        description,
        location,
        startDate,
        coordinator,
      });

      const savedDisaster = await disasterRepository.save(newDisaster);
      return res.status(201).json({
        message: 'Disaster created successfully',
        disaster: savedDisaster,
      });
    } catch (error) {
      console.error('createDisaster error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }


  const getDisasters = async (req, res) => {
    try {
      const disasterRepository = AppDataSource.getRepository(Disaster);
      const { id } = req.params;
      let disasters;

      if (id) {
        const singleDisaster = await disasterRepository.findOne({
          where: { disaster_id: id },
          relations: ['coordinator'], 
        });
        if (!singleDisaster) {
          return res.status(404).json({ message: 'Disaster not found' });
        }
        return res.json(singleDisaster);
      } else {
        disasters = await disasterRepository.find({
          relations: ['coordinator'],
        });
        return res.json(disasters);
      }
    } catch (error) {
      console.error('getDisasters error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }


  const approveOrganization = async (req, res) => {
    try {
      const organizationRepository = AppDataSource.getRepository(Organization);
      const { orgId } = req.params;

      const organization = await organizationRepository.findOne({
        where: { organization_id: orgId },
      });
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }

     
      organization.approval_status = true;
      const updatedOrg = await organizationRepository.save(organization);

      return res.json({
        message: 'Organization approved successfully',
        organization: updatedOrg,
      });
    } catch (error) {
      console.error('approveOrganization error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }


  const getAllTeams = async (req, res) => {
    try {
      const teamRepository = AppDataSource.getRepository(Team);
      
      const teams = await teamRepository.find({
        relations: ['organization', 'disaster', 'members', 'members.user']
      });
      
      const formattedTeams = teams.map(team => ({
        team_id: team.team_id,
        name: team.name,
        responsibility: team.responsibility,
        location: team.location,
        createdAt: team.createdAt,
        assignmentStatus: team.assignmentStatus,
        organization: team.organization, 
        disaster: team.disaster,
        members: team.members.map(member => ({
          volunteer_id: member.volunteer_id,
          name: member.user ? member.user.name : null,
          email: member.user ? member.user.email : null,
          mobile: member.user ? member.user.mobile : null,
          skills: member.skills,
          work_location: member.work_location
          
        }))
      }));
      
      return res.status(200).json({ teams: formattedTeams });
    } catch (error) {
      console.error('getAllTeams error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
   

  const assignDisasterToTeam = async (req, res) => {
    try {
      const { teamId, disasterId } = req.body;

      const teamRepository = AppDataSource.getRepository(Team);
      const disasterRepository = AppDataSource.getRepository(Disaster);

      const team = await teamRepository.findOne({ where: { team_id: teamId } });
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }

      const disaster = await disasterRepository.findOne({ where: { disaster_id: disasterId } });
      if (!disaster) {
        return res.status(404).json({ message: 'Disaster not found' });
      }

      team.disaster = disaster;
      team.assignmentStatus = 'assigned';
      const updatedTeam = await teamRepository.save(team);

      return res.status(200).json({
        message: 'Disaster assigned to team successfully',
        team: updatedTeam,
      });
    } catch (error) {
      console.error('assignDisasterToTeam error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  module.exports = { assignDisasterToTeam };

  
  const getDisasterStats = async (req, res) => {
    try {
      const { disasterId } = req.params;
      const reportRepo = AppDataSource.getRepository('DailyReport');
      
      const [stats] = await reportRepo.query(`
        SELECT 
          SUM("volunteersCount") AS "totalVolunteers",
          SUM("itemsDistributed") AS "totalItems"
        FROM daily_reports
        WHERE "disasterDisasterId" = $1
      `, [disasterId]);
    
      const [orgStats] = await reportRepo.query(`
        SELECT COUNT(DISTINCT o.organization_id) AS "orgCount"
        FROM organizations o
        JOIN daily_reports dr ON dr."organizationOrganizationId" = o.organization_id
        WHERE dr."disasterDisasterId" = $1
      `, [disasterId]);
    
      const [teamStats] = await reportRepo.query(`
        SELECT COUNT(DISTINCT t.team_id) AS "teamCount"
        FROM teams t
        WHERE t."disasterDisasterId" = $1
      `, [disasterId]);
    
      const organizations = await reportRepo.query(`
        SELECT DISTINCT o.organization_id, o.organization_name, o.mission
        FROM organizations o
        JOIN daily_reports dr ON dr."organizationOrganizationId" = o.organization_id
        WHERE dr."disasterDisasterId" = $1
      `, [disasterId]);
    
      const teams = await reportRepo.query(`
        SELECT DISTINCT t.team_id, t.name, t.responsibility
        FROM teams t
        WHERE t."disasterDisasterId" = $1
      `, [disasterId]);
    
      return res.json({
        totalVolunteers: parseInt(stats.totalVolunteers || 0, 10),
        totalItems: parseInt(stats.totalItems || 0, 10),
        totalOrganizations: parseInt(orgStats.orgCount || 0, 10),
        totalTeams: parseInt(teamStats.teamCount || 0, 10),
        organizations,  
        teams,          
      });
    } catch (error) {
      console.error('getDisasterStats error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };  
  

  const sendEmergencyNotification = async (req, res) => {
    try {
      const { message, subject } = req.body;
      if (!message) {
        return res.status(400).json({ message: 'Message is required' });
      }
     
      return res.status(200).json({ message: 'Emergency notification sent.' });
    } catch (error) {
      console.error('sendEmergencyNotification error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  module.exports = { createDisaster, getDisasters, approveOrganization, getDisasterStats, getAllTeams, assignDisasterToTeam, sendEmergencyNotification }

