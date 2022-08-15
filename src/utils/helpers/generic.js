const { response } = require("express");
const ApiError = require("../error/api.error");
const {
  SERVER_STARTED_MESSAGE,
  NOT_FOUND_API,
  WELCOME,
  FAIL,
} = require("../constants/apiMessage");
const Logging = require("../../library/logging");
const { notFoundApi, emailExists, serverError } = require("../error/generic");

class genericHelper {
  static createServer(app, PORT) {
    app.listen(PORT, () => {
      Logging.info(`${SERVER_STARTED_MESSAGE} ${PORT}`);
    });
  }

  static notFound(res) {
    return res.status(404).json(notFoundApi);
  }

  static badRequest(res) {
    return res.status(400).json(emailExists);
  }

  static baseUri(res) {
    return res.status(200).send(WELCOME);
  }

  static errorResponse(res, error) {
    const aggregateError = { ...serverError, ...error };
    return res.status(aggregateError.status).json({
      statusCode: aggregateError.status,
      message: aggregateError.message,
      errors: aggregateError.errors,
    });
  }

  static asyncWrapper(callback) {
    return (req, res, next) => {
      callback(req, res, next).catch(next);
    };
  }
}

module.exports = genericHelper;
