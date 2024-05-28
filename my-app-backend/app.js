require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/usersRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const cors = require("cors");
const authenticateToken = require("./auth/authenticateToken");
const refreshToken = require("./auth/refreshToken");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.json("Home");
});

app.get("/verify-token", authenticateToken, (req, res) => {
  res.sendStatus(200);
});

app.listen(5001, () => {
  console.log("Hello World");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/api/users", usersRoutes);
app.use("/api/categories", authenticateToken, categoriesRoutes);

app.post("/refresh-token", refreshToken);
