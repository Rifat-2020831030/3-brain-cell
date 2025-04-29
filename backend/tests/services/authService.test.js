const { AppDataSource } = require('../../src/config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');
const jwtConfig = require('../../src/config/jwtConfig');
const emailHelper = require('../../src/utils/emailHelper');
const {
  registerUser,
  loginUser,
} = require('../../src/services/authService');
const {
  UserAlreadyExistsError,
  InvalidCredentialsError
} = require('../../src/utils/errors');

const testEmail = process.env.TEST_EMAIL ;
const testPassword = process.env.TEST_PASSWORD ;

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
        name: 'X',
        email: testEmail,
        password: testPassword,
        role: 'volunteer'
      });

      expect(repoMock.create).toHaveBeenCalledWith(expect.objectContaining({
        email: testEmail,
        password: testPassword
      }));
      expect(emailHelper.sendVerificationEmail)
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
});