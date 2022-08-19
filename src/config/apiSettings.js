class headerSettings {
  static SET_ACCESS_CONTROL_ALLOW_ORIGIN(res) {
    return res.header("Access-Control-Allow-Origin", "*");
  }

  static SET_ACCESS_CONTROL_ALLOW_HEADERS(res) {
    return res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  }

  static SET_ACCESS_CONTROL_ALLOW_METHODS(res) {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
}

module.exports = headerSettings;
