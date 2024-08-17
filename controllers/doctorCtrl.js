const doctorModel = require("../models/doctorModel");

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

module.exports = {getDoctorInfoController, updateProfileController, getDoctorByIdController};