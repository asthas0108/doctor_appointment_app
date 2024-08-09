const express = require("express");
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController,deleteAllNotificationController} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");


const app = express.Router();

app.post("/login", loginController);

app.post("/register", registerController);

app.post("/getUserData", authMiddleware,authController);

app.post("/apply-doctor", authMiddleware,applyDoctorController);

app.post("/get-all-notification", authMiddleware,getAllNotificationController); 

app.post("/delete-all-notification", authMiddleware,deleteAllNotificationController);

module.exports = app;