const config = require('./env');
const axios = require('axios');

const getLocationKey = async (locationName) => {
    try {
      const response = await axios.get(
        `${config.weather.apiUrl}/locations/v1/cities/search?q=${locationName}&apikey=${config.weather.apiKey}`
      );
      if (response.data.length === 0) {
        throw new Error('Location not found');
      }
      return response.data[0].Key; 
    } catch (error) {
      throw new Error('Error fetching location key');
    }
  };

  const getLocationInfo = async (locationKey) => {
    try {
      const response = await axios.get(
        `${config.weather.apiUrl}/locations/v1/${locationKey}?apikey=${config.weather.apiKey}`
      );
      return response.data; 
    } catch (error) {
      throw new Error('Error fetching location information');
    }
  };


  module.exports = {
    getLocationKey,
    getLocationInfo,
  };