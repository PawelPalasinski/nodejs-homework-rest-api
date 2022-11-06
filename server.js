// const app = require("./app");

// const PORT = 3000;

// app.listen(PORT, () =>
//   console.log(
//     `Server running. Use our API on http://localhost:${PORT}/api/contacts/`)
// );

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

// parse application/json
app.use(express.json());
// cors
app.use(cors());

const routerApi = require("./api");
app.use("/api/", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

// mongoose
//   .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT))
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
