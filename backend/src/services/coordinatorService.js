const { AppDataSource } = require('../config/database');
const Coordinator = require('../models/Coordinator');
const Disaster = require('../models/Disaster');
const Organization = require('../models/Organization');
const Team = require('../models/Team');
const socket = require('../socket/socket');
const DailyReport = require('../models/DailyReport');
const config = require('../config/env');
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
  
  if (!disasterData.area) {
    disasterData.area = [];
  }
  
  const newDisaster = disasterRepository.create({
    ...disasterData,
    coordinator: coordinator
  });
  
  const savedDisaster = await disasterRepository.save(newDisaster);
  
  
  const disasterWithoutCoordinator = (({ coordinator, ...rest }) => rest)(savedDisaster);
  
  let responseDisaster = { ...disasterWithoutCoordinator };
  
  if (responseDisaster.coordinates) {
    const [lat, lng] = responseDisaster.coordinates.split(',');
    responseDisaster.coordinates = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng)
    };
  }
  
  return responseDisaster;
};

const updateDisaster = async (coordinatorId, disasterId, updates) => {
  const repo = AppDataSource.getRepository(Disaster);
  const disaster = await repo.findOne({
    where: { disaster_id: disasterId },
    relations: ['coordinator', 'coordinator.user']
  });
  if (!disaster) throw new Error('Disaster not found');
  if (disaster.coordinator.user.userId !== coordinatorId) {
    throw new InvalidCoordinatorActionError('Not authorized');
  }

  Object.assign(disaster, updates);
  const saved = await repo.save(disaster);
  delete saved.coordinator;
  return saved;
};

const deleteDisaster = async (coordinatorId, disasterId) => {
  const repo = AppDataSource.getRepository(Disaster);
  const disaster = await repo.findOne({
    where: { disaster_id: disasterId },
    relations: ['coordinator', 'coordinator.user']
  });
  if (!disaster) throw new Error('Disaster not found');
  if (disaster.coordinator.user.userId !== coordinatorId) {
    throw new InvalidCoordinatorActionError('Not authorized');
  }
  await repo.remove(disaster);
  return { message: `Disaster ${disasterId} deleted` };
};

// Retrieve disasters 
const getDisasters = async (offset, limit) => {
    const disasterRepository = AppDataSource.getRepository(Disaster);
    const [disasters, total] = await disasterRepository.findAndCount({
      relations: ['coordinator',  'coordinator.user'],
      skip: offset,
      take: limit,
    });
  
    const formattedDisasters = disasters.map(disaster => {
    
    const disasterWithoutCoordinator = (({ coordinator, ...rest }) => rest)(disaster);
      
    const coordinatorInfo = disaster.coordinator ? {
        coordinator_id: disaster.coordinator.coordinator_id,
        name: disaster.coordinator.user ? disaster.coordinator.user.name : null,
        officialContactNumber: disaster.coordinator.officialContactNumber,
        department: disaster.coordinator.department,
        region: disaster.coordinator.region,
      } : null;
  
      return {
        ...disasterWithoutCoordinator,
        coordinator: coordinatorInfo,
      };
    });
  
    return { total, disasters: formattedDisasters };
  };
  
  //Close a Disaster Event
const closeDisaster = async (coordinatorId, disasterId) => {
    const disasterRepository = AppDataSource.getRepository(Disaster);
    
    const disaster = await disasterRepository.findOne({
      where: { disaster_id: disasterId },
      relations: ['coordinator', 'coordinator.user']
    });
  
    if (!disaster) {
      throw new Error('Disaster not found');
    }
  
    if (disaster.coordinator.user.userId !== coordinatorId) {
      throw new InvalidCoordinatorActionError('Coordinator not authorized to turn off this disaster.');
    }
    
    if (disaster.status === 'Closed') {
      throw new InvalidCoordinatorActionError('Disaster is already closed.');
    }
    
    disaster.status = 'Closed';
    disaster.endDate = new Date();
  
    const updatedDisaster = await disasterRepository.save(disaster);
  
    const disasterWithoutCoordinator = (({ coordinator, ...rest }) => rest)(updatedDisaster);
    
    return disasterWithoutCoordinator;
};


const approveOrganization = async (orgId,status) => {
  const organizationRepository = AppDataSource.getRepository(Organization);
  const organization = await organizationRepository.findOne({
    where: { organization_id: orgId }
  });
  if (!organization) {
    throw new OrganizationNotFoundError();
  }
  organization.approval_status = status;
  const updatedOrg = await organizationRepository.save(organization);
  return updatedOrg;
};

// Get all organizations
const getAllOrganizations = async (offset, limit) => {
  const organizationRepository = AppDataSource.getRepository(Organization);
  const [organizations, total] = await organizationRepository.findAndCount({
    skip: offset,
    take: limit,
  });
  
  return { total, organizations };
};


const getTeamsByDisasterId = async (disasterId, offset , limit) => {
  const teamRepository = AppDataSource.getRepository(Team);
  
  const [teams, total] = await teamRepository.findAndCount({
    where: { disaster: { disaster_id: disasterId } },
    relations: ['organization', 'disaster', 'members', 'members.user'],
    skip: offset,
    take: limit
  });
  
  const formattedTeams = teams.map(team => {
    let leaderName = team.leader?.user?.name;
    if (!leaderName) {
      const leaderMember = team.members.find(member => member.volunteer_id === team.teamLeader);
      leaderName = leaderMember?.user?.name || team.teamLeader;
    }
    
    return {
      team_id: team.team_id,
      name: team.name,
      teamLeader: leaderName,
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
    };
  });
  return { total, teams: formattedTeams };
};



const getUpazilaData = async (location) => {
  try {
    const response = await axios.get(config.location.apiUrlForUpzilla);
    const allUpazilas = response.data;
    const filteredUpazilas = allUpazilas.filter(upazila => 
      upazila.district_name.toLowerCase() === location.toLowerCase() ||
      upazila.division_name.toLowerCase() === location.toLowerCase()
    );
    return filteredUpazilas;
  } catch (error) {
    console.error("Error fetching upazila data:", error.message);
    return null;
  }
};

const assignTeamLocation = async (teamId, location, responsibility = null) => {
  const teamRepository = AppDataSource.getRepository(Team);
  const volunteerRepository = AppDataSource.getRepository('Volunteer'); 

  const team = await teamRepository.findOne({ 
    where: { team_id: teamId },
    relations: ['disaster'] 
  });
  
  if (!team) {
    throw new Error('Team not found');
  }
  
  if (!team.disaster) {
    throw new Error('Team is not associated with any disaster');
  }
  
  team.location = location;
  if (responsibility) {
    team.responsibility = responsibility;
  }
  team.assignmentStatus = 'assigned';
  team.assignedAt = new Date();
  
  const updatedTeam = await teamRepository.save(team);

  const leaderVolunteer = await volunteerRepository.findOne({
    where: { volunteer_id: updatedTeam.teamLeader },
    relations: ['user']
  });
  
  updatedTeam.teamLeader = leaderVolunteer?.user?.name ?? updatedTeam.teamLeader;
  
  const upazilaData = await getUpazilaData(location);
  
  return { ...updatedTeam, upazilaData };
};


const updateTeam = async (teamId, updates) => {
  const repo = AppDataSource.getRepository(Team);
  const team = await repo.findOne({ where: { team_id: teamId } });
  if (!team) throw new Error('Team not found');
  Object.assign(team, updates);
  return await repo.save(team);
};


const deleteTeam = async (teamId) => {
  const repo = AppDataSource.getRepository(Team);
  const team = await repo.findOne({ where: { team_id: teamId } });
  if (!team) throw new Error('Team not found');
  await repo.remove(team);
  return { message: `Team ${teamId} deleted` };
};


const getDisasterStats = async (disasterId) => {
  const reportRepository = AppDataSource.getRepository(DailyReport);
  
  const reports = await reportRepository.find({
    where: { disaster: { disaster_id: disasterId } },
    relations: ['organization'],
    order: { date: 'DESC' }
  });

  const stats = {
    totalReports: reports.length,
    totalVolunteers: 0,
    reports: []
  };

  reports.forEach(report => {
    const formattedReport = {
      report_id: report.report_id,
      organization_id: report.organization.organization_id,
      date: report.date,
      createdAt: report.createdAt
    };

    // Add volunteersCount if exists
    if (report.volunteersCount) {
      formattedReport.volunteersCount = report.volunteersCount;
      stats.totalVolunteers += report.volunteersCount;
    }

    // Process rescue/shelter data
    const rescueData = {
      ...(report.rescuedMen && { men: report.rescuedMen }),
      ...(report.rescuedWomen && { women: report.rescuedWomen }),
      ...(report.rescuedChildren && { children: report.rescuedChildren })
    };

    if (Object.keys(rescueData).length > 0) {
      const totalRescued = (report.rescuedMen || 0) + 
                          (report.rescuedWomen || 0) + 
                          (report.rescuedChildren || 0);
      if (totalRescued > 0) {
        formattedReport.rescueShelter = {
          ...rescueData,
          totalRescued
        };
      }
    }

    // Process relief items
    const reliefItems = {};
    const itemFields = [
      'waterFiltrationTablets', 'rice', 'flattenedRice', 'puffedRice',
      'potato', 'onion', 'sugar', 'oil', 'salt', 'candles'
    ];

    itemFields.forEach(field => {
      if (report[field]) {
        reliefItems[field] = report[field];
      }
    });

    if (Object.keys(reliefItems).length > 0) {
      formattedReport.reliefDistribution = {
        ...reliefItems,
        totalItems: report.itemsDistributed || 0
      };
    }

    // Process medical items
    const medicalItems = {};
    ['saline', 'paracetamol', 'bandages', 'sanitaryPads'].forEach(field => {
      if (report[field]) {
        medicalItems[field] = report[field];
      }
    });

    if (Object.keys(medicalItems).length > 0) {
      formattedReport.medicalAid = medicalItems;
    }

    // Only add report if it has data beyond basic fields
    if (Object.keys(formattedReport).length > 4) { // More than just id, org_id, date, createdAt
      stats.reports.push(formattedReport);
    }
  });

  return stats;
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
  updateDisaster,
  deleteDisaster,
  getDisasters,
  closeDisaster,
  approveOrganization,
  getAllOrganizations,
  getTeamsByDisasterId,
  assignTeamLocation,
  updateTeam,
  deleteTeam,
  getDisasterStats,
  sendEmergencyNotification,
};
