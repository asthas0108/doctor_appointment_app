const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel.js");
const appointmentModel = require("../models/appointmentModel.js");
const moment = require("moment");


const registerController = async(req,res) => {
    try{
        //checking whether user already exists or not
        const existingUser = await userModel.findOne({email:req.body.email});
        if(existingUser){
            return res.status(200).send({success:false, message:"user already exists"});
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password=hashPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({message:"register success",success:true});
    }catch(error){
        console.log(error);
        res.status(500).send({success:false, message: `Register ctrl ${err.msg}`});
    }
}


const loginController = async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(200).send({ message: "user not found", success: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(200).send({ message: "Invalid Email or Password", success: false });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1d"});
      res.status(200).send({ message: "Login Success", success: true, token });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
  };

  const authController = async (req, res) => {
    try {
      const user = await userModel.findOne({_id: req.body.userId});
      user.password = undefined;
      if (!user) {
        return res.status(200).send({ message: "User not found", success: false });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Auth error", success: false, error });
    }
  };
  
  const applyDoctorController = async (req, res) => {
    try {
      const newDoctor = await doctorModel({ ...req.body, status: "pending" });
      await newDoctor.save();
      
      const adminUser = await userModel.findOne({ isAdmin: true });
      
      const notification = adminUser.notification ; // Ensure notification array exists
      notification.push({
        type: "apply-doctor-request",
        message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
        data: {
          doctorId: newDoctor._id,
          name: newDoctor.firstName+" "+newDoctor.lastName,
          onClickPath: "/admin/doctors",
        },
      });
  
      await userModel.findByIdAndUpdate(adminUser._id, { notification });
  
      res.status(201).send({
        success: true,
        message: "Doctor application processed and notification sent.",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error, message: "Error while applying for doctor" });
    }
  };


  const getAllNotificationController = async (req,res) => {
    try{
      const user = await userModel.findOne({_id:req.body.userId});
      const seennotification = user.seennotification;
      const notification = user.notification;

      seennotification.push(...notification);
      user.notification = [];
      user.seennotification=notification;
      const updatedUser = await user.save();
      res.status(200).send({
        message:"all read",
        success:true,
        data:updatedUser,
      })
    }catch(error){
      console.log(error);
      res.status(500).send({
        message:"error in notification",
        success:false,
        error
      })
    }
  };

  const deleteAllNotificationController = async (req,res)=>{
    try{

      const user = await userModel.findOne({_id:req.body.userId});
      user.notification=[];
      user.seennotification=[];
      const updatedUser = await user.save();
      updatedUser.password=undefined;
      res.status(200).send({
        success:true,
        message:"notification deleted successfully",
        data:updatedUser,
      })

    }catch(error){
      console.log(error);
      res.status(500).send({
        success:false,
        message:"unable to delete all notifications",
        error,
      })
    }
  }
  

  const getAllDoctorsController = async(req,res)=>{
    try{
      const doctors = await doctorModel.find({status:"approved"});
      res.status(200).send({
        success:true,
        message:"doctors list fetched successfully",
        data:doctors,
      })
    }catch(error){
      console.log(error);
      res.status(500).send({
        success:false,
        message:"error while fetching doctor",
        error,
      })
    }
  }

  const bookAppointmentController = async (req,res)=>{
      try{
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();
        req.body.status = "pending";
        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save();

        const user =await userModel.findOne({_id:req.body.userId});
        user.notification.push({
          type:"new-appointment-request",
          message: `A new appointment from ${req.body.userInfo.name}`,
          onClickPath:"/user/appointments",
        })

        await user.save();

        res.status(200).send({
          success:true,
          message:"appointment booked succesfully",
        })

      }catch(error){
        console.log(error);
        res.status(500).send({
          success:false,
          error,
          message:"error in booking appointment",
        })
      }
  }

const bookingAvailController = async( req, res )=> {
  try{
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm").subtract(1,"hours").toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1,"hours").toISOString();

    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time:{
        $gte:fromTime, $lte:toTime,
      }
    })

    if(appointments.length > 0){
      return res.status(200).send({
        success:true,
        message:"appointments not available",
      })
    }else{
      return res.status(200).send({
        success:true,
        message:"appointments available",
      })
    }

  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message:"error in booking",
    })
  }
}

const userAppointmentsController = async (req,res)=> {
  try{
    const appointments = await appointmentModel.find({userId:req.body.userId});
    res.status(200).send({
      success:true,
      message:"user appointments fetch sucessfully",
      data:appointments,
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      error,
      success:true,
      messsage:"error in user appointments"
    })
  }
}


module.exports = {loginController, registerController, authController, applyDoctorController,getAllNotificationController,deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailController, userAppointmentsController};