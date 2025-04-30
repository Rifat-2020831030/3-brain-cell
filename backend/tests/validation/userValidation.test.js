const { validateCityName } = require('../../src/validation/userValidation');

describe('validateCityName Schema', () => {
  it('should validate a valid city name', () => {
    const validPayload = { city: 'Dhaka' };

    const { error } = validateCityName.validate(validPayload);
    expect(error).toBeUndefined();
  });

  it('should fail if city name is missing', () => {
    const invalidPayload = {};

    const { error } = validateCityName.validate(invalidPayload);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('"city" is required');
  });

  it('should fail if city name is too short', () => {
    const invalidPayload = { city: 'D' };

    const { error } = validateCityName.validate(invalidPayload);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('"city" length must be at least 2 characters long');
  });

  it('should fail if city name is too long', () => {
    const invalidPayload = { city: 'A'.repeat(101) };

    const { error } = validateCityName.validate(invalidPayload);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('"city" length must be less than or equal to 100 characters long');
  });

  it('should fail if city name is not a string', () => {
    const invalidPayload = { city: 12345 };

    const { error } = validateCityName.validate(invalidPayload);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain('"city" must be a string');
  });
});