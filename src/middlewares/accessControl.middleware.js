const {
  SET_ACCESS_CONTROL_ALLOW_ORIGIN,
  SET_ACCESS_CONTROL_ALLOW_HEADERS,
  SET_ACCESS_CONTROL_ALLOW_METHODS,
} = require("../config/apiSettings");
const {
  REQUEST_INF0,
  RESPONSE_INF0,
} = require("../utils/constants/headerMessage");

class headers {
  static accessControlSettings(req, res, next) {
    SET_ACCESS_CONTROL_ALLOW_ORIGIN(res);
    SET_ACCESS_CONTROL_ALLOW_HEADERS(res);

    if (req.method == "OPTIONS") {
      SET_ACCESS_CONTROL_ALLOW_METHODS(res);
    }
    next();
  }

  static requestInfo(req, res, next) {
    REQUEST_INF0(req);
    res.on("finish", () => {
      RESPONSE_INF0(req, res);
    });
    next();
  }
}

module.exports = headers;
