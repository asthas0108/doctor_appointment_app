const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName:{
        type:String,
        required:[true,"First Name is required"],
    },
    lastName:{
        type:String,
        required:[true,"Last Name is required"],
    },
    phone:{
        type:String,
        required:[true,"phone no. is needed"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
    },
    website:{
        type:String,
    },
    specialization:{
        type:String,
        required:[true,"specialization is required"],
    },
    address:{
        type:String,
        required:[true,"address is required"],
    },
    experiences:{
        type:String,
        required:[true,"experience is required"],
    },
    feesperConsultation:{
        type:Number,
        required:[true,"feesperConsultation is required"],
    },
    status:{
        type:String,
        default:"pending",
    },
    timings:{
        type:Object,
        required:[true,"timing is required"],
    },
},{timestamps:true}
);

const doctorModel = mongoose.model("doctors",doctorSchema);
module.exports = doctorModel ;