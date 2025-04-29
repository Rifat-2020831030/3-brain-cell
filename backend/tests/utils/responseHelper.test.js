const { sendSuccessResponse, sendErrorResponse } = require('../../src/utils/responseHelper');

describe('responseHelper', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('sendSuccessResponse should set HTTP 200 and wrap data', () => {
    sendSuccessResponse(res, { foo: 'bar' }, 'All good');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'All good',
      data: { foo: 'bar' }
    });
  });

  it('sendErrorResponse should default to 500 and wrap message', () => {
    sendErrorResponse(res, 'Something broke');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Something broke'
    });
  });

  it('sendErrorResponse should respect custom status code', () => {
    sendErrorResponse(res, 'Bad input', 400);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Bad input'
    });
  });
});
