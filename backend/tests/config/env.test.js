const config = require('../../src/config/env');

describe('Environment Configuration', () => {
  it('should load the correct port from environment variables', () => {
    expect(config.port).toBe('3000');
  });

  it('should load the correct JWT secret from environment variables', () => {
    expect(config.jwtSecret).toBe('5d6f7g8h9j1kL1M2N3O4P5Q6R7S8T9U0V1W2X3Y4Z5a6b7c8d9');
  });

  describe('Database Configuration', () => {
    it('should load the correct database host', () => {
      expect(config.db.host).toBe('localhost');
    });

    it('should load the correct database user', () => {
      expect(config.db.user).toBe('postgres');
    });

    it('should load the correct database password', () => {
      expect(config.db.password).toBe('postgress');
    });

    it('should load the correct database name', () => {
      expect(config.db.database).toBe('uddhar');
    });
  });

  describe('Email Configuration', () => {
    it('should load the correct email user', () => {
      expect(config.email.user).toBe('mhdian93@gmail.com');
    });
  
    it('should load the correct email password', () => {
      expect(config.email.mailpass).toBe('ewoecyuqzzhmhikl');  
    });
  });

  describe('Weather API Configuration', () => {
    it('should load the correct AccuWeather API key', () => {
      expect(config.weather.apiKey).toBe('Ov26hywzG1Wl9DbE7ZUoS3GRXClppGFV');
    });

    it('should load the correct AccuWeather API URL for key', () => {
      expect(config.weather.apiUrlForKey).toBe('http://dataservice.accuweather.com/locations/v1/cities/search');
    });

    it('should load the correct AccuWeather API URL for info', () => {
      expect(config.weather.apiUrlForInfo).toBe('http://dataservice.accuweather.com/currentconditions/v1');
    });
  });

  describe('Location API Configuration', () => {
    it('should load the correct Upzilla API URL', () => {
      expect(config.location.apiUrlForUpzilla).toBe('https://bdapi.editboxpro.com/api/upazilas');
    });
  });
});