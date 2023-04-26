const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/api.js");
const fccTestingRoutes = require("./routes/fcctesting.js");
const errorHandler = require("./utils/errorHandler.js");

const app = express();

app.use("/public", express.static(`${__dirname}/public`));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/").get((req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

fccTestingRoutes(app);
app.use("/api", apiRoutes);

app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});
app.use(errorHandler);

module.exports = app;
