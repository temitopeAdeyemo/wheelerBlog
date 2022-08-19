const {
  SERVER_STARTED_MESSAGE,
  WELCOME,
} = require("../constants/apiMessage");
const Logging = require("../../library/logging");
const { serverError } = require("../error/generic");

class genericHelper {
  static createServer(app, PORT) {
    app.listen(PORT, () => {
      Logging.info(`${SERVER_STARTED_MESSAGE} ${PORT}`);
    });
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

  static successResponse(res, status, messageObject) {
    return res.status(status).json(messageObject);
  }

  static asyncWrapper(callback) {
    return (req, res, next) => {
      callback(req, res, next).catch(next);
    };
  }
}

module.exports = genericHelper;
