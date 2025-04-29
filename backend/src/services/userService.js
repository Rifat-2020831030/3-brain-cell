const { AppDataSource } = require('../config/database');
const User = require('../models/User');
const Disaster = require('../models/Disaster');
const Team = require('../models/Team');
const config = require('../config/env');
const axios = require('axios');

const checkUserVerification = async (userId) => {
    const userRepository = AppDataSource.getRepository(User);
    
    const user = await userRepository.findOne({
      where: { userId: userId }
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return user.emailVerified; 
  };


  const fetchOngoingDisasters = async (offset , limit) => {
    const disasterRepo = AppDataSource.getRepository(Disaster);
    const [openDisasters, totalCount] = await disasterRepo.findAndCount({
      where: { status: 'Open' },
      skip: offset,
      take: limit
    });
  
    if (openDisasters.length === 0) {
      const err = new Error('No ongoing disasters found');
      err.statusCode = 404;
      throw err;
    }
  
    const disasters = openDisasters.map(d => ({
      disaster_id: d.disaster_id,
      title: d.title,
      type: d.type,
      description: d.description,
      location: d.location,
      startDate: d.startDate,
      status: d.status,
    }));
  
    return { total: totalCount, disasters };
  };


  
  const fetchTeamSummariesByDisaster = async (disasterId, offset , limit) => {
    const teamRepo = AppDataSource.getRepository(Team);
    
    const [teamList, totalCount] = await teamRepo.findAndCount({
      where: { disaster: { disaster_id: disasterId } },
      relations: ['organization', 'disaster', 'members', 'members.user'],
      skip: offset,
      take: limit
    });
    
    const summarizedTeams = teamList.map(team => {
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
        organization: team.organization ? { name: team.organization.organization_name } : null,
        disaster: team.disaster,
        members: team.members.map(member => ({
          volunteer_id: member.volunteer_id,
          name: member.user ? member.user.name : null,
          skills: member.skills,
          work_location: member.work_location
        }))
      };
    });
    
    return { total: totalCount, teams: summarizedTeams };
  };

  const getLocationKeyByCity = async (city) => {
    try {
      const response = await axios.get(`${config.weather.apiUrlForKey}`, {
        params: {
          q: city,
          apikey: config.weather.apiKey,
        }
      });
  
      if (response.data.length === 0) {
        throw new Error('City not found');
      }
      return response.data[0].Key;
    } catch (error) {
      throw new Error(`Error fetching location key: ${error.message}`);
    }
  };
  
  
  const getLocationInfoByKey = async (locationKey) => {
    try {
      const response = await axios.get(`${config.weather.apiUrlForInfo}/${locationKey}`, {
        params: {
          details: true,
          apikey: config.weather.apiKey,
        }
      });
  
      return response.data;  
    } catch (error) {
      throw new Error(`Error fetching location info: ${error.message}`);
    }
  };

  module.exports = {
    checkUserVerification,
    fetchOngoingDisasters,
    fetchTeamSummariesByDisaster,
    getLocationKeyByCity,
    getLocationInfoByKey,
  };