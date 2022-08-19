const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router = require("./src/routes/user.router");
const {
  accessControlSettings,
  requestInfo,
} = require("./src/middlewares/accessControl.middleware");
const { WELCOME } = require("./src/utils/constants/apiMessage");
const { notFoundApi, serverError } = require("./src/utils/error/generic");

const app = express();
app.use(requestInfo);
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(accessControlSettings);
//Routes
app.use("/api/v1", router);

app.use((req, res, next) => {
  return res.status(404).json({ ...notFoundApi });
});
app.use((err, req, res, next) => {
  console.log(err);
  return next(serverError);
  // return res.status(500).json({ ...serverError });
});
//Base Url
app.get("/", (req, res, next) => {
  return res.status(200).send(WELCOME);
});

module.exports = { app };
