const { AppDataSource } = require('../config/database');
const User = require('../models/User');
const Disaster = require('../models/Disaster');

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
      disaster_id: disaster.disaster_id,
      title: disaster.title,
      type: disaster.type,
      description: disaster.description,
      location: disaster.location,
      startDate: disaster.startDate,
      status: disaster.status, 
    }));
  };


  module.exports = {
    checkUserVerification,
    getOngoingDisasters
  };