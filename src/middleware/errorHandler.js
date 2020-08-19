const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err, msg: err.msg };

  console.log(err.stack);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.msg || "Server Error",
  });
};

module.exports = errorHandler;
