const express = require("express");
const indexRouter = require("./routes/index");
const clientsRouter = require("./routes/client");
const models = require("./models/index");
const path = require("path");
const moment = require("moment");
// using swagger..
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
// logger..
const morgan = require("morgan");
const { logger, stream } = require("./config/winston");

const app = express();
const port = 3001;

// Setting..
app.use(morgan("combined", { stream }));
app.use(express.json());

// Route Start..
app.use((req, res, next) => {
  // console.log("Every Api Process");
  next();
});

app.use("/", indexRouter);
app.use("/clients", clientsRouter);

// 에러 처리
app.use((err, req, res, next) => {
  console.log("Server.js Error");
  console.error(err);

  let errObj = {
    req: {
      headers: req.headers,
      query: req.query,
      body: req.body,
      route: req.route,
    },
    error: {
      message: err.message,
      stack: err.stack,
      status: err.status,
    },
    user: req.user,
  };

  logger.error(`${moment().format("YYYY-MM-DD HH:mm:ss")}`, errObj);
  res.status(err.status || 500).json({
    message: err.message || "처리할 수 없습니다.",
  });
});

// Server Start..
app.listen(port, () => {
  console.log(`Start Server : localhost:${port}`);
});

models.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공!");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

// using Swagger..
const swaggerSpec = yaml.load(path.join(__dirname, "./swagger/build.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
