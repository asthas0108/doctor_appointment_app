const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");

const getDoctorInfoController = async(req, res)=>{
    try{
        const doctor =await doctorModel.findOne({userId:req.body.userId});
        res.status(200).send({
            success:true,
            message:"doctor data fecth successfull",
            data:doctor,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in fetching doctor details",
            error,
        })
    }
}


const updateProfileController = async(req,res)=>{
    try{
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId}, req.body);
        res.status(201).send({
            success:true,
            message:"doctor profile update",
            data:doctor,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in updating doctor details",
            error,
        })
    }
}


const getDoctorByIdController = async (req,res)=>{
    try{
        const doctor = await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({
            success:true,
            message:"single doctor info fetched",
            data:doctor,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            error,
            success:false,
            message:"error in doctor info"
        })
    }
}

const doctorAppointmentsController = async (req,res)=> {
    try{
        const doctor = await doctorModel.findOne({userId:req.body.userId});
        const appointments = await appointmentModel.find({doctorId:doctor._id});
        res.status(200).send({
            success:true,
            message:"doctor appointments fetched successfully",
            data:appointments,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error in doctor appointments",
        })
    }
};

const updateStatusController = async (req,res) => {
    try{
        const {appointmentId, status} = req.body;
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentId, {status})
        
        const user =await userModel.findOne({_id:appointments.userId});

        const notification= user.notification;

        notification.push({
          type:"status updated",
          message: `your appointment has been updated ${status}`,
          onClickPath:"/doctor-appointments",
        })
        await user.save();
        res.status(200).send({
            success:true,
            message:"updated status successfully",
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error in doctor appointments",
        })
    }
}
  

module.exports = {getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController};