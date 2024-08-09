const express = require("express");
const { getAllDoctorsController, getAllUsersController} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const app = express.Router();

app.get("/getAllUsers", authMiddleware, getAllUsersController);

app.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

module.exports = app;