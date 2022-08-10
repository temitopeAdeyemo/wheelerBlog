const Logging = require("../library/logging");
const { Pool } = require("pg");
const { poolQuery } = require("./queries/dbConnection.js");
const config = require("./db.config");

    const pool = new Pool(config);

    const connectionLog = (err, res) => {
      if (!err) {
        Logging.db("connected to PGsql");
      } else {
        Logging.warn(err.message);
      }
    };
    pool.query(poolQuery, connectionLog);

module.exports = pool;
