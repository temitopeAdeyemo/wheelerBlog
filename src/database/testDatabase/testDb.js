const Logging = require("../../library/logging");
const { Pool } = require("pg");
const { poolQuery } = require("../queries/dbConnection.js");
const testConfig = require("./testDb.config");

const testPool = new Pool(testConfig);

const testConnectionLog = (err, res) => {
  if (!err) {
    console.log("connected to Test Database.");
  } else {
    console.log(err.message);
  }
};
testPool.query(poolQuery, testConnectionLog);

module.exports = testPool;
