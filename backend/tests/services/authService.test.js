const { AppDataSource } = require('../../src/config/database');
const User = require('../../src/models/User');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const jwtConfig = require('../../src/config/jwtConfig');
const jwt = require('jsonwebtoken');
const { UserAlreadyExistsError, InvalidCredentialsError, UserDoesNotExistError, PasswordResetExpiredError } = require('../../src/utils/errors');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../../src/utils/emailHelper');
const {
  registerUser,
  loginUser,
  requestForgotPasswordReset,
  verifyUserEmail,
  resetPassword
} = require('../../src/services/authService');

const testEmail = process.env.TEST_EMAIL || 'testmail@gmail.com' ;
const testPassword = process.env.TEST_PASSWORD || '12345678';

jest.mock('../../src/config/database', () => ({
  AppDataSource: { getRepository: jest.fn() }
}));
jest.mock('../../src/models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('node:crypto');
jest.mock('../../src/utils/emailHelper');

describe('authService', () => {
  let repoMock;

  beforeEach(() => {
    repoMock = { findOne: jest.fn(), create: jest.fn(), save: jest.fn() };
    AppDataSource.getRepository.mockReturnValue(repoMock);
  });

  afterEach(jest.resetAllMocks);

  describe('registerUser', () => {
    it('throws UserAlreadyExistsError if user exists', async () => {
      repoMock.findOne.mockResolvedValue({ email: testEmail });
      await expect(registerUser({ email: testEmail }))
        .rejects.toBeInstanceOf(UserAlreadyExistsError);
    });

    it('creates a new user and sends verification email', async () => {
      repoMock.findOne.mockResolvedValue(null);
      crypto.randomInt.mockReturnValue(123456);
      bcrypt.hash.mockResolvedValue(testPassword);
      repoMock.create.mockReturnValue({ foo: 'bar' });
      repoMock.save.mockResolvedValue({ foo: 'bar' });

      await registerUser({
        name: 'Test User',
        email: testEmail,
        password: testPassword,
        role: 'volunteer'
      });

      expect(repoMock.create).toHaveBeenCalledWith(expect.objectContaining({
        email: testEmail,
        password: testPassword
      }));
      expect(sendVerificationEmail)
        .toHaveBeenCalledWith(testEmail, '123456');
    });
  });

  describe('loginUser', () => {
    it('throws InvalidCredentialsError on bad credentials', async () => {
      repoMock.findOne.mockResolvedValue(null);
      await expect(loginUser({ email: testEmail, password: testPassword }))
        .rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('returns JWT token on valid credentials', async () => {
      const fakeUser = { userId: 5, email: testEmail, role: 'volunteer', password: testPassword };
      repoMock.findOne.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('tok');

      const result = await loginUser({ email: testEmail, password: testPassword });
      expect(result).toEqual({ loginToken: 'tok' });
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 5, email: testEmail, role: 'volunteer' },
        jwtConfig.secret,
        { expiresIn: '6h' }
      );
    });
  });

  describe('requestForgotPasswordReset', () => {
    it('throws UserDoesNotExistError if user does not exist', async () => {
      repoMock.findOne.mockResolvedValue(null);
      await expect(requestForgotPasswordReset(testEmail))
        .rejects.toBeInstanceOf(UserDoesNotExistError);
    });

    it('generates reset code, saves hashed code and expiry, and sends reset email', async () => {
      const fakeUser = { userId: 5, email: testEmail, role: 'volunteer', password: testPassword, save: jest.fn() };
      repoMock.findOne.mockResolvedValue(fakeUser);
      crypto.randomInt.mockReturnValue(123456);
      bcrypt.hash.mockResolvedValue('hashedResetCode');
      repoMock.save.mockResolvedValue(fakeUser);

      await requestForgotPasswordReset(testEmail);

      expect(crypto.randomInt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
      expect(fakeUser.passwordResetToken).toEqual('hashedResetCode');
      expect(fakeUser.passwordResetExpires).toBeInstanceOf(Date);
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(testEmail, '123456');
    });
  });

  describe('verifyUserEmail', () => {
    it('throws UserDoesNotExistError if user does not exist', async () => {
      repoMock.findOne.mockResolvedValue(null);
      await expect(verifyUserEmail(testEmail, '123456'))
        .rejects.toBeInstanceOf(UserDoesNotExistError);
    });

    it('throws InvalidCredentialsError if verification code is invalid', async () => {
      const fakeUser = { userId: 5, email: testEmail, role: 'volunteer', emailVerificationCode: '654321' };
      repoMock.findOne.mockResolvedValue(fakeUser);
      await expect(verifyUserEmail(testEmail, '123456'))
        .rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('verifies email, nullifies verification code, and returns email verification token', async () => {
      const fakeUser = { userId: 5, email: testEmail, role: 'volunteer', emailVerificationCode: '123456', save: jest.fn() };
      repoMock.findOne.mockResolvedValue(fakeUser);
      jwt.sign.mockReturnValue('emailVerificationToken');

      const result = await verifyUserEmail(testEmail, '123456');

      expect(fakeUser.emailVerified).toBe(true);
      expect(fakeUser.emailVerificationCode).toBeNull();
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 5, email: testEmail, role: 'volunteer' },
        process.env.JWT_SECRET,
        { expiresIn: "30m" }
      );
      expect(result).toEqual({ emailVerificationToken: 'emailVerificationToken' });
    });
  });

  describe('resetPassword', () => {
    it('throws UserDoesNotExistError if user does not exist', async () => {
      repoMock.findOne.mockResolvedValue(null);
      await expect(resetPassword(testEmail, '123456', 'newPass', 'newPass'))
        .rejects.toBeInstanceOf(UserDoesNotExistError);
    });

    it('throws PasswordResetExpiredError if no reset token found or expired', async () => {
      const fakeUser = { userId: 5, email: testEmail, role: 'volunteer' };
      repoMock.findOne.mockResolvedValue(fakeUser);
      await expect(resetPassword(testEmail, '123456', 'newPass', 'newPass'))
        .rejects.toBeInstanceOf(PasswordResetExpiredError);
    });

    it('throws PasswordResetExpiredError if reset token has expired', async () => {
      const fakeUser = { userId: 5, email: testEmail, role: 'volunteer', passwordResetToken: 'token', passwordResetExpires: new Date(Date.now() - 1000) };
      repoMock.findOne.mockResolvedValue(fakeUser);
      await expect(resetPassword(testEmail, '123456', 'newPass', 'newPass'))
        .rejects.toBeInstanceOf(PasswordResetExpiredError);
    });

    it('throws InvalidCredentialsError if reset code is invalid', async () => {
      const fakeUser = { userId: 5, email: testEmail, role: 'volunteer', passwordResetToken: 'hashedCode', passwordResetExpires: new Date(Date.now() + 1000) };
      repoMock.findOne.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(false);
      await expect(resetPassword(testEmail, '123456', 'newPass', 'newPass'))
        .rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('throws InvalidCredentialsError if passwords do not match', async () => {
      const fakeUser = { userId: 5, email: testEmail, role: 'volunteer', passwordResetToken: 'hashedCode', passwordResetExpires: new Date(Date.now() + 1000) };
      repoMock.findOne.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(true);
      await expect(resetPassword(testEmail, '123456', 'newPass', 'differentPass'))
        .rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('resets password, nullifies reset token and expiry', async () => {
      const fakeUser = { userId: 5, email: testEmail, role: 'volunteer', passwordResetToken: 'hashedCode', passwordResetExpires: new Date(Date.now() + 1000), save: jest.fn() };
      repoMock.findOne.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(true);
      bcrypt.hash.mockResolvedValue('hashedNewPassword');

      await resetPassword(testEmail, '123456', 'newPass', 'newPass');

      expect(bcrypt.hash).toHaveBeenCalledWith('newPass', 10);
      expect(fakeUser.password).toEqual('hashedNewPassword');
      expect(fakeUser.passwordResetToken).toBeNull();
      expect(fakeUser.passwordResetExpires).toBeNull();
    });
  });
});