const express = require("express");
const dotenv = require("dotenv").config();
const pgsql = require("./src/database/pgsql");
const http = require("http");
const cors = require("cors"); //do npm i --save-dev @types/cors
const helmet = require("helmet");
const Logging = require("./src/library/logging");
const router = require("./src/routes/user.router")
const {
  SET_ACCESS_CONTROL_ALLOW_ORIGIN,
  SET_ACCESS_CONTROL_ALLOW_HEADERS,
  SET_ACCESS_CONTROL_ALLOW_METHODS,
} = require("./src/utils/helpers/header.settings");
const {
  REQUEST_INF0,
  RESPONSE_INF0,
} = require("./src/utils/constants/headerMessage");
const {
  SUCCESS_RESPONSE_MESSAGE,
  createServer,
  notFound,
  baseUri,
} = require("./src/utils/helpers/generic");
const {
  WELCOME,
  SERVER_STARTED_MESSAGE,
} = require("./src/utils/constants/apiMessage");
const { notFoundApi } = require("./src/utils/error/generic");
const PORT = process.env.PORT;
const app = express();

const connectDb = async () => {
  try {
    pgsql.connect();
    // startServer();
  } catch (error) {
    Logging.error(error);
  }
};
connectDb();

const startServer = () => {
  app.use((req, res, next) => {
    //logging request
    REQUEST_INF0(req);

    res.on("finish", () => {
      //logging the response
      console.log(res.statusCode)
      RESPONSE_INF0(req, res);
    });
    next();
  });
  app.use(cors());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use((req, res, next) => {
    SET_ACCESS_CONTROL_ALLOW_ORIGIN(res);
    SET_ACCESS_CONTROL_ALLOW_HEADERS(res);

    if (req.method == "OPTIONS") {
      SET_ACCESS_CONTROL_ALLOW_METHODS(res);
    }
    next();
  });
  //Routes
app.use("/api/v1", router)
  //Base Url
  app.get("/", (req, res, next) => {
    baseUri(res);
  });
  app.use((req, res, next) => {
    // notFound(res);
    next(notFoundApi);
  });
  createServer(app, PORT);
};
startServer();
