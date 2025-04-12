const sendSuccessResponse = (res, data, message = 'Operation successful') => {
    return res.status(200).json({
      status: 'success',
      message,
      data,
    });
  };
  
  const sendErrorResponse = (res, message = 'Something went wrong', statusCode = 500) => {
    return res.status(statusCode).json({
      status: 'error',
      message,
    });
  };
  
  module.exports = { sendSuccessResponse, sendErrorResponse };
  