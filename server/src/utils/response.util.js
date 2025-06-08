/**
 * Gửi response thành công
 * @param {Response} res - đối tượng Express response
 * @param {Object|Array} data - dữ liệu trả về cho client
 * @param {String} message - thông báo kèm theo (mặc định: 'Success')
 * @param {Number} statusCode - HTTP status code (mặc định: 200)
 */
exports.success = (res, data = {}, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
};

/**
 * Gửi response lỗi
 * @param {Response} res - đối tượng Express response
 * @param {String} errorMessage - thông báo lỗi
 * @param {Number} statusCode - HTTP status code (mặc định: 500)
 * @param {Object} errorDetails - thông tin chi tiết lỗi (tuỳ chọn)
 */
exports.error = (res, errorMessage = 'Internal Server Error', statusCode = 500, errorDetails = null) => {
  const errorResponse = {
    status: 'error',
    error: {
      code: statusCode,
      message: errorMessage,
    }
  };

  if (errorDetails) {
    errorResponse.error.details = errorDetails;
  }

  return res.status(statusCode).json(errorResponse);
};
