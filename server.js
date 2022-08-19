const dotenv = require("dotenv").config();
const pgsql = require("./src/database/pgsql");
const Logging = require("./src/library/logging");
const { app } = require("./app");
const { SERVER_STARTED_MESSAGE } = require("./src/utils/constants/apiMessage");
const PORT = process.env.PORT;
const connectDb = async () => {
  try {
    await pgsql.connect();
    startServer();
  } catch (error) {
    Logging.error(error);
  }
};
connectDb();

const startServer = () => {
  app.listen(PORT, () => {
    Logging.info(`${SERVER_STARTED_MESSAGE} ${PORT}`);
  });
};
