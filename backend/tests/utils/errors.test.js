const {
    UserAlreadyExistsError,
    InvalidCredentialsError,
    UserDoesNotExistError,
    PasswordResetExpiredError,
    ValidationError,
    CoordinatorNotFoundError,
    InvalidCoordinatorActionError,
    OrganizationNotFoundError,
    OrganizationAlreadyApprovedError,
    VolunteerAlreadyInTeamError,
    MissingUserError,
  } = require('../../src/utils/errors');
  
  describe('Custom Error Classes', () => {
    it('should create a UserAlreadyExistsError with default message and status code', () => {
      const error = new UserAlreadyExistsError();
      expect(error.message).toBe('User with this email already exists.');
      expect(error.statusCode).toBe(400);
      expect(error).toBeInstanceOf(UserAlreadyExistsError);
      expect(error).toBeInstanceOf(Error);
    });
  
    it('should create an InvalidCredentialsError with default message and status code', () => {
      const error = new InvalidCredentialsError();
      expect(error.message).toBe('Invalid username or password.');
      expect(error.statusCode).toBe(401);
      expect(error).toBeInstanceOf(InvalidCredentialsError);
      expect(error).toBeInstanceOf(Error);
    });
  
    it('should create a UserDoesNotExistError with default message and status code', () => {
      const error = new UserDoesNotExistError();
      expect(error.message).toBe('User does not exist.');
      expect(error.statusCode).toBe(404);
      expect(error).toBeInstanceOf(UserDoesNotExistError);
      expect(error).toBeInstanceOf(Error);
    });
  
    it('should create a PasswordResetExpiredError with default message and status code', () => {
      const error = new PasswordResetExpiredError();
      expect(error.message).toBe('Password reset token has expired.');
      expect(error.statusCode).toBe(400);
      expect(error).toBeInstanceOf(PasswordResetExpiredError);
      expect(error).toBeInstanceOf(Error);
    });
  
    it('should create a ValidationError with custom message and status code', () => {
      const error = new ValidationError('Invalid input data.');
      expect(error.message).toBe('Invalid input data.');
      expect(error.statusCode).toBe(422);
      expect(error.name).toBe('ValidationError');
      expect(error).toBeInstanceOf(ValidationError);
      expect(error).toBeInstanceOf(Error);
    });
  
    it('should create a CoordinatorNotFoundError with default message and status code', () => {
      const error = new CoordinatorNotFoundError();
      expect(error.message).toBe('Coordinator profile not found.');
      expect(error.statusCode).toBe(404);
      expect(error).toBeInstanceOf(CoordinatorNotFoundError);
      expect(error).toBeInstanceOf(Error);
    });
  
    it('should create an InvalidCoordinatorActionError with default message and status code', () => {
      const error = new InvalidCoordinatorActionError();
      expect(error.message).toBe('Invalid action performed by the coordinator.');
      expect(error.statusCode).toBe(400);
      expect(error).toBeInstanceOf(InvalidCoordinatorActionError);
      expect(error).toBeInstanceOf(Error);
    });
  
    it('should create an OrganizationNotFoundError with default message and status code', () => {
      const error = new OrganizationNotFoundError();
      expect(error.message).toBe('Organization not found.');
      expect(error.statusCode).toBe(404);
      expect(error).toBeInstanceOf(OrganizationNotFoundError);
      expect(error).toBeInstanceOf(Error);
    });
  
    it('should create an OrganizationAlreadyApprovedError with default message and status code', () => {
      const error = new OrganizationAlreadyApprovedError();
      expect(error.message).toBe('Organization is already approved.');
      expect(error.statusCode).toBe(400);
      expect(error).toBeInstanceOf(OrganizationAlreadyApprovedError);
      expect(error).toBeInstanceOf(Error);
    });
  
    it('should create a VolunteerAlreadyInTeamError with default message and status code', () => {
      const error = new VolunteerAlreadyInTeamError();
      expect(error.message).toBe('The volunteer is already assigned to a team.');
      expect(error.statusCode).toBe(400);
      expect(error).toBeInstanceOf(VolunteerAlreadyInTeamError);
      expect(error).toBeInstanceOf(Error);
    });
  
    it('should create a MissingUserError with default message and status code', () => {
      const error = new MissingUserError();
      expect(error.message).toBe('Volunteer is missing user data.');
      expect(error.statusCode).toBe(404);
      expect(error).toBeInstanceOf(MissingUserError);
      expect(error).toBeInstanceOf(Error);
    });
  });