const express = require("express");
const { loginController, registerController, authController} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");


const app = express.Router();

app.post("/login", loginController);

app.post("/register", registerController);

app.post("/getUserData", authMiddleware,authController);

module.exports = app;