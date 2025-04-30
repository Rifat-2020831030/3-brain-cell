require('dotenv').config();
const config = require('../../src/config/env');

describe('Environment Configuration', () => {
  it('should load the correct port from environment variables', () => {
    expect(config.port).toBe(process.env.PORT);
  });

  it('should load the correct JWT secret from environment variables', () => {
    expect(config.jwtSecret).toBe(process.env.JWT_SECRET);
  });

  describe('Database Configuration', () => {
    it('should load the correct database host', () => {
      expect(config.db.host).toBe(process.env.DB_HOST);
    });

    it('should load the correct database user', () => {
      expect(config.db.user).toBe(process.env.DB_USER);
    });

    it('should load the correct database password', () => {
      expect(config.db.password).toBe(process.env.DB_PASSWORD);
    });

    it('should load the correct database name', () => {
      expect(config.db.database).toBe(process.env.DB_NAME);
    });
  });

  describe('Email Configuration', () => {
    it('should load the correct email user', () => {
      expect(config.email.user).toBe(process.env.EMAIL_USER);
    });
  
    it('should load the correct email password', () => {
      const expectedMailpass = process.env.EMAIL_PASSWORD || 'defaultEmailPassword';
      expect(config.email.mailpass).toBe(expectedMailpass);
    });
  });

  describe('Weather API Configuration', () => {
    it('should load the correct AccuWeather API key', () => {
      const expectedWeatherKey = process.env.ACCUWEATHER_API_KEY || process.env.WEATHER_API_KEY;
      expect(config.weather.apiKey).toBe(expectedWeatherKey);
    });

    it('should have the static AccuWeather search URL', () => {
      expect(config.weather.apiUrlForKey).toBe('http://dataservice.accuweather.com/locations/v1/cities/search');
    });

    it('should have the static AccuWeather info URL', () => {
      expect(config.weather.apiUrlForInfo).toBe('http://dataservice.accuweather.com/currentconditions/v1');
    });
  });

  describe('Location API Configuration', () => {
    it('should have the static Upzilla API URL', () => {
      expect(config.location.apiUrlForUpzilla).toBe('https://bdapi.editboxpro.com/api/upazilas');
    });
  });
});
