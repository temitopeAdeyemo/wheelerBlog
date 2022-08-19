const Logging = require("../../library/logging");

class headerMessage {
  static REQUEST_INF0(req) {
    Logging.info(
      `Incoming -> Method: [${req.method}] - url: [${req.url}] - Ip: [${req.socket.remoteAddress}]`
    );
  }
  static RESPONSE_INF0(req, res) {
    Logging.info(
      `Incoming -> Method: [${req.method}] - url: [${req.url}] - Ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
    );
  }
}
module.exports = headerMessage;
