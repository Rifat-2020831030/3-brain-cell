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
  
  module.exports = {
    UserAlreadyExistsError,
    InvalidCredentialsError,
    UserDoesNotExistError,
    PasswordResetExpiredError,
    ValidationError
  };
  