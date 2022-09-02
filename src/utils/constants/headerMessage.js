const Logging = require("../../library/logging");

class HeaderMessage {
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
module.exports = HeaderMessage;
