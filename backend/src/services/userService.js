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


  const fetchOngoingDisasters = async () => {
    const disasterRepo = AppDataSource.getRepository(Disaster);
    const openDisasters = await disasterRepo.find({
      where: { status: 'Open' }
    });
  
    if (openDisasters.length === 0) {
      const err = new Error('No ongoing disasters found');
      err.statusCode = 404;
      throw err;
    }
  
    return openDisasters.map(d => ({
      disaster_id: d.disaster_id,
      title: d.title,
      type: d.type,
      description: d.description,
      location: d.location,
      startDate: d.startDate,
      status: d.status,
    }));
  };
  


  module.exports = {
    checkUserVerification,
    fetchOngoingDisasters
  };