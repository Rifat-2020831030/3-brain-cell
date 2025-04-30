const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../../src/config/database');
const { verifyToken, requireRole } = require('../../src/middlewares/authMiddleware');

jest.mock('jsonwebtoken');
jest.mock('../../src/config/database', () => ({
  AppDataSource: { getRepository: jest.fn() }
}));

describe('authMiddleware', () => {
    let mockReq, mockRes, mockNext, userRepository;
  
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  
      mockReq = {
        headers: { authorization: 'Bearer mockToken' }
      };
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      mockNext = jest.fn();
  
      userRepository = {
        findOne: jest.fn()
      };
      AppDataSource.getRepository.mockReturnValue(userRepository);
    });
  
    afterEach(() => {
      jest.restoreAllMocks(); 
      jest.clearAllMocks();
    });

  describe('verifyToken', () => {
    it('should return 401 if token is missing', async () => {
      mockReq.headers.authorization = null;

      await verifyToken(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Unauthorized: Token missing' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', async () => {
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await verifyToken(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid token', error: 'Invalid token' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 if user is not found', async () => {
      jwt.verify.mockReturnValue({ id: 1 });
      userRepository.findOne.mockResolvedValue(null);

      await verifyToken(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid user.' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should set req.user and call next if token and user are valid', async () => {
      const mockUser = {
        userId: 1,
        role: 'admin',
        email: 'test@example.com',
        organization: { organization_id: 10 },
        volunteer: { volunteer_id: 20 },
        coordinator: { coordinator_id: 30 }
      };
      jwt.verify.mockReturnValue({ id: 1 });
      userRepository.findOne.mockResolvedValue(mockUser);

      await verifyToken(mockReq, mockRes, mockNext);

      expect(mockReq.user).toEqual({
        id: 1,
        role: 'admin',
        email: 'test@example.com',
        organizationId: 10,
        volunteerId: 20,
        coordinatorId: 30
      });
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('requireRole', () => {
    it('should return 403 if user role does not match', () => {
      mockReq.user = { role: 'user' };
      const middleware = requireRole('admin');

      middleware(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Forbidden: Incorrect role' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next if user role matches', () => {
      mockReq.user = { role: 'admin' };
      const middleware = requireRole('admin');

      middleware(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });
});