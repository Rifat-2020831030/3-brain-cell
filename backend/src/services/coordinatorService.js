const { AppDataSource } = require('../config/database');
const Coordinator = require('../models/Coordinator');
const Disaster = require('../models/Disaster');
const Organization = require('../models/Organization');
const Team = require('../models/Team');
const socket = require('../socket/socket');
const ReportRepository = require('../repositories/reportRepository');
const config = require('./env');
const axios = require('axios');
const { 
    CoordinatorNotFoundError, 
    InvalidCoordinatorActionError, 
    OrganizationNotFoundError
 } = require('../utils/errors');

const createDisaster = async (coordinatorId, disasterData) => {
  const coordinatorRepository = AppDataSource.getRepository(Coordinator);
  const coordinator = await coordinatorRepository.findOne({
    where: { user: { userId: coordinatorId } }
  });
  if (!coordinator) {
    throw new CoordinatorNotFoundError();
  }
  const disasterRepository = AppDataSource.getRepository(Disaster);
  const newDisaster = disasterRepository.create({
    ...disasterData,
    coordinator: coordinator
  });
  const savedDisaster = await disasterRepository.save(newDisaster);
  
  const { coordinator: coordinatorData, ...disasterWithoutCoordinator } = savedDisaster;

  return disasterWithoutCoordinator; 

};

// Retrieve disasters 
const getDisasters = async (offset, limit) => {
    const disasterRepository = AppDataSource.getRepository(Disaster);
    const [disasters, total] = await disasterRepository.findAndCount({
      relations: ['coordinator'],
      skip: offset,
      take: limit,
    });
  
    const formattedDisasters = disasters.map(disaster => {
    
    const { coordinator, ...disasterWithoutCoordinator } = disaster;
      
    const coordinatorInfo = coordinator ? {
        coordinator_id: coordinator.coordinator_id,
        name: coordinator.user ? coordinator.user.name : null,
        officialContactNumber: coordinator.officialContactNumber,
        department: coordinator.department,
        region: coordinator.region,
      } : null;
  
      return {
        ...disasterWithoutCoordinator,
        coordinator: coordinatorInfo,
      };
    });
  
    return { total, disasters: formattedDisasters };
  };
  


const approveOrganization = async (orgId) => {
  const organizationRepository = AppDataSource.getRepository(Organization);
  const organization = await organizationRepository.findOne({
    where: { organization_id: orgId }
  });
  if (!organization) {
    throw new OrganizationNotFoundError();
  }
  organization.approval_status = true;
  const updatedOrg = await organizationRepository.save(organization);
  return updatedOrg;
};


const getAllTeams = async (offset, limit) => {
  const teamRepository = AppDataSource.getRepository(Team);
  const [teams, total] = await teamRepository.findAndCount({
    relations: ['organization', 'disaster', 'members', 'members.user'],
    skip: offset,
    take: limit
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
  return { total, teams: formattedTeams };
};

// Assign a team to a disaster
const assignDisasterToTeam = async (teamId, disasterId) => {
  const teamRepository = AppDataSource.getRepository(Team);
  const disasterRepository = AppDataSource.getRepository(Disaster);
  const team = await teamRepository.findOne({ where: { team_id: teamId } });
  if (!team) {
    throw new InvalidCoordinatorActionError('Team not found or already assigned.')
  }
  const disaster = await disasterRepository.findOne({ where: { disaster_id: disasterId } });
  if (!disaster) {
    throw new InvalidCoordinatorActionError('Disaster not found.');
  }
  team.disaster = disaster;
  team.assignmentStatus = 'assigned';
  const updatedTeam = await teamRepository.save(team);
  return updatedTeam;
};

// Get disaster statistics 
const getDisasterStats = async (disasterId) => {
  return await ReportRepository.getDisasterStats(disasterId);
};


const getLocationKeyByCity = async (locationName) => {
    try {
      const response = await axios.get(
        `${config.weather.apiUrl}/locations/v1/cities/search?q=${locationName}&apikey=${config.weather.apiKey}`
      );
      if (response.data && response.data.length > 0) {
        return response.data[0].Key; 
      }
      throw new Error('Location not found');
   
    } catch (error) {
      throw new Error('Error fetching location key');
    }
  };

  const getLocationInfoByKey  = async (locationKey) => {
    try {
      const response = await axios.get(
        `${config.weather.apiUrl}/locations/v1/${locationKey}?apikey=${config.weather.apiKey}`
      );
      return response.data; 
    } catch (error) {
      throw new Error('Error fetching location information');
    }
  };

// Send an emergency notification to all users
const sendEmergencyNotification = async (subject, message) => {
  const userRepository = AppDataSource.getRepository('User');
  const users = await userRepository.find();
  const notificationRepository = AppDataSource.getRepository('Notification');
  const notifications = users.map(user =>
    notificationRepository.create({ subject, message, user })
  );
  await notificationRepository.save(notifications);
  const io = socket.getIo();
  io.emit('emergencyNotification', {
    subject,
    message,
    date: new Date().toISOString(),
  });
  return { message: 'Emergency notification sent to all users' };
};

module.exports = {
  createDisaster,
  getDisasters,
  approveOrganization,
  getAllTeams,
  assignDisasterToTeam,
  getDisasterStats,
  ggetLocationKeyByCity,
  getLocationInfoByKey,
  sendEmergencyNotification,
};
