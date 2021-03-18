const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const clientsRouter = require("./routes/client");
const models = require("./models/index");

const port = 3001;

// Setting..
app.use(express.json());

// Route Start..
app.use((req, res, next) => {
  console.log("Every Api Process");
  next();
});

app.use("/", indexRouter);
app.use("/clients", clientsRouter);

// 에러 처리
app.use((err, req, res, next) => {
  console.log("Server.js Error");
  console.error(err);

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
