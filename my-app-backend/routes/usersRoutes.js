const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/register", usersController.register);

router.post("/login", usersController.login);

router.post("/reset-password", usersController.resetPassword);

router.post("/change-password", usersController.changePassword);

module.exports = router;
