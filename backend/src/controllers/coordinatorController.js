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

  const assignTeam = async (req, res) => {
    try {
      const teamRepository = AppDataSource.getRepository(Team);
      const { disasterId } = req.params;
      const { teamName, responsibility, location } = req.body;

      const newTeam = teamRepository.create({
        name: teamName,
        responsibility,
        location,
        disaster: { disaster_id: disasterId },
      });

      const savedTeam = await teamRepository.save(newTeam);
      return res.status(201).json({
        message: 'Team assigned successfully',
        team: savedTeam,
      });
    } catch (error) {
      console.error('assignTeam error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  
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
      SELECT COUNT(DISTINCT "organizationOrganizationId") AS "orgCount"
      FROM daily_reports
      WHERE "disasterDisasterId" = $1
    `, [disasterId]);


    return res.json({
      totalVolunteers: parseInt(stats.totalVolunteers || 0, 10),
      totalItems: parseInt(stats.totalItems || 0, 10),
      totalOrganizations: parseInt(orgStats.orgCount || 0, 10),
    });
  } catch (error) {
    console.error('getDisasterStats error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

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

  module.exports = {createDisaster, getDisasters, approveOrganization, getDisasterStats, sendEmergencyNotification, assignTeam}

