const { validateRequestBody } = require('../../src/middlewares/validationMiddleware');
const Joi = require('joi');

describe('validateRequestBody', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next if validation passes', () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().integer().min(0).required()
    });

    mockReq.body = { name: 'John Doe', age: 30 };

    const middleware = validateRequestBody(schema);
    middleware(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it('should return 422 if validation fails', () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().integer().min(0).required()
    });

    mockReq.body = { name: 'John Doe' }; 

    const middleware = validateRequestBody(schema);
    middleware(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: '"age" is required'
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return the first validation error if multiple errors exist', () => {
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().integer().min(0).required()
    });

    mockReq.body = {}; 

    const middleware = validateRequestBody(schema);
    middleware(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: '"name" is required'
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle empty request body gracefully', () => {
    const schema = Joi.object({
      name: Joi.string().required()
    });

    mockReq.body = {}; 

    const middleware = validateRequestBody(schema);
    middleware(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(422);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: '"name" is required'
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});