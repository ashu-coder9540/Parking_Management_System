const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status ? err.status : `${statusCode}`.startsWith("4") ? "fail" : "error";
  const message = err.message || "Internal Server Error";
  const extraDetails = err.extraDetails || null;
  
  const errorResponse = {
    success: false,
    status,
    message,
  };

  if (extraDetails) {
    errorResponse.extraDetails = extraDetails;
  }

  res.status(statusCode).json({
    ...errorResponse,
  });
};

export default errorHandler;