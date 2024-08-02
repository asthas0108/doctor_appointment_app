const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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


const loginController = () => {}


module.exports = {loginController, registerController};