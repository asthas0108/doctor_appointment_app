const express = require("express");
const { getAllDoctorsController, getAllUsersController, changeAccountStatusController} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const app = express.Router();

app.get("/getAllUsers", authMiddleware, getAllUsersController);

app.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

app.post("/changeAccountStatus", authMiddleware, changeAccountStatusController);

module.exports = app;