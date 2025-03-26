class BaseError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  class UserAlreadyExistsError extends BaseError {
    constructor(message = 'User with this email already exists.') {
      super(message, 400);
    }
  }
  
  class InvalidCredentialsError extends BaseError {
    constructor(message = 'Invalid username or password.') {
      super(message, 401);
    }
  }
  
  class UserDoesNotExistError extends BaseError {
    constructor(message = 'User does not exist.') {
      super(message, 404);
    }
  }
  
  class PasswordResetExpiredError extends BaseError {
    constructor(message = 'Password reset token has expired.') {
      super(message, 400);
    }
  }

  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
      this.statusCode = 422;
    }
  }

  class CoordinatorNotFoundError extends BaseError {
    constructor(message = 'Coordinator profile not found.') {
      super(message, 404);
    }
  }
  
  class InvalidCoordinatorActionError extends BaseError {
    constructor(message = 'Invalid action performed by the coordinator.') {
      super(message, 400);
    }
  }


  class OrganizationNotFoundError extends BaseError {
    constructor(message = 'Organization not found.') {
      super(message, 404);
    }
  }
  
  class OrganizationAlreadyApprovedError extends BaseError {
    constructor(message = 'Organization is already approved.') {
      super(message, 400);
    }
  }

  class VolunteerAlreadyInTeamError extends BaseError {
    constructor(message = 'The volunteer is already assigned to a team.') {
      super(message, 400);
    }
  }
  
  class MissingUserError extends BaseError {
    constructor(message = 'Volunteer is missing user data.') {
      super(message, 404);
    }
  }
  
  module.exports = {
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
    MissingUserError
  };
  