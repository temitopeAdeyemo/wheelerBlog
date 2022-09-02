const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRouter = require("./src/routes/user.router");
const adminRouter = require("./src/routes/admin.router");
const postRouter = require("./src/routes/post.router");
const ApiError = require("./src/utils/error/api.error");
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

app.get("/", (req, res, next) => {
  return res.status(200).send(WELCOME);
});

app.use("/api/v1", userRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", postRouter);

app.use((req, res, next) => {
  return next(notFoundApi);
});

app.use((err, req, res, next) => {
  console.log(err)
  let statusCode = err.status || 500;
  err.status == 404 ? (message = err.message) : (message = "server error");
  return res.status(statusCode).json({ message, statusCode });
});

module.exports = { app };
