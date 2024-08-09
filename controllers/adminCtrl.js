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

module.exports = {getAllUsersController, getAllDoctorsController};