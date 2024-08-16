const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

const getAllUsersController = async(req,res) =>{
    try{
        const users = await userModel.find({});
        res.status(200).send({
            message:"users data",success:true,data:users
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"error while fetching users",success:false,error
        });
    }
}

const getAllDoctorsController = async(req,res) =>{
    try{
        const doctors = await doctorModel.find({});
        res.status(200).send({
            message:"doctors data",success:true,data:doctors
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"error while fetching doctors",success:false,error
        });
    }
}

//doctor account status change
const changeAccountStatusController = async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
      const user = await userModel.findOne({ _id: doctor.userId });
      const notification = user.notification;
      notification.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account Request Has ${status} `,
        onClickPath: "/notification",
      });
      user.isDoctor = status === "approved" ? true : false;
      await user.save();
      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Account Status",
        error,
      });
    }
  };

module.exports = {getAllUsersController, getAllDoctorsController, changeAccountStatusController};