const createAppError = (message, statusCode = 500, source = "unknown") => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  error.isOperational = true;
  error.source = source;

  Error.captureStackTrace(error, createAppError);

  return error;
};

module.exports = createAppError;
