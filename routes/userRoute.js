const express = require("express");
const { loginController, registerController} = require("../controllers/userCtrl");


const app = express.Router();

app.post("/login", loginController);

app.post("/register", registerController);

module.exports = app;