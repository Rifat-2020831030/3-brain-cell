const { userRegistrationSchema, userLoginSchema, resetPasswordSchema } = require('../../src/validation/authValidation');

describe('Auth Validation Schemas', () => {
  describe('userRegistrationSchema', () => {
    it('should validate a valid registration payload', () => {
      const validPayload = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        mobile: '01234567890',
        password: 'Password123!',
        location: 'Dhaka',
        role: 'volunteer'
      };

      const { error } = userRegistrationSchema.validate(validPayload);
      expect(error).toBeUndefined();
    });

    it('should fail if required fields are missing', () => {
      const invalidPayload = {
        email: 'john.doe@example.com',
        password: 'Password123!'
      };

      const { error } = userRegistrationSchema.validate(invalidPayload);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('"name" is required');
    });

    it('should fail if email format is invalid', () => {
      const invalidPayload = {
        name: 'John Doe',
        email: 'invalid-email',
        mobile: '01234567890',
        password: 'Password123!',
        location: 'Dhaka',
        role: 'volunteer'
      };

      const { error } = userRegistrationSchema.validate(invalidPayload);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('"email" must be a valid email');
    });

    it('should fail if role is invalid', () => {
      const invalidPayload = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        mobile: '01234567890',
        password: 'Password123!',
        location: 'Dhaka',
        role: 'invalidRole'
      };

      const { error } = userRegistrationSchema.validate(invalidPayload);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('"role" must be one of [volunteer, organization, coordinator, visitor]');
    });
  });

  describe('userLoginSchema', () => {
    it('should validate a valid login payload', () => {
      const validPayload = {
        email: 'john.doe@example.com',
        password: 'Password123!'
      };

      const { error } = userLoginSchema.validate(validPayload);
      expect(error).toBeUndefined();
    });

    it('should fail if email is missing', () => {
      const invalidPayload = {
        password: 'Password123!'
      };

      const { error } = userLoginSchema.validate(invalidPayload);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('"email" is required');
    });

    it('should fail if password is missing', () => {
      const invalidPayload = {
        email: 'john.doe@example.com'
      };

      const { error } = userLoginSchema.validate(invalidPayload);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('"password" is required');
    });
  });

  describe('resetPasswordSchema', () => {
    it('should validate a valid reset password payload', () => {
      const validPayload = {
        resetCode: '123456',
        email: 'john.doe@example.com',
        newPassword: 'NewPassword123!',
        confirmPassword: 'NewPassword123!'
      };

      const { error } = resetPasswordSchema.validate(validPayload);
      expect(error).toBeUndefined();
    });

    it('should fail if resetCode is missing', () => {
      const invalidPayload = {
        email: 'john.doe@example.com',
        newPassword: 'NewPassword123!',
        confirmPassword: 'NewPassword123!'
      };

      const { error } = resetPasswordSchema.validate(invalidPayload);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('"resetCode" is required');
    });

    it('should not enforce confirmPassword matching newPassword', () => {
      const invalidPayload = {
        resetCode: '123456',
        email: 'john.doe@example.com',
        newPassword: 'NewPassword123!',
        confirmPassword: 'DifferentPassword123!'
      };

      const { error } = resetPasswordSchema.validate(invalidPayload);
      expect(error).toBeUndefined(); 
    });

    it('should fail if email format is invalid', () => {
      const invalidPayload = {
        resetCode: '123456',
        email: 'invalid-email',
        newPassword: 'NewPassword123!',
        confirmPassword: 'NewPassword123!'
      };

      const { error } = resetPasswordSchema.validate(invalidPayload);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain('"email" must be a valid email');
    });
  });
});