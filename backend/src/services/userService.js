const { AppDataSource } = require('../config/database');
const User = require('../models/User');

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


  module.exports = {
    checkUserVerification,
  };