const { string } = require("joi");
const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
    projectName:{
        type:String,
        required:true,
    },
    projectDescription:{
        type:String,
        required:false
    },
    projectManagerId:{
        type:String,
        required:false
    },
    currentSprint:{
        type:String,
        required:false
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    actualStartDate:{
        type:Date
    },
    actualEndDate:{
        type:Date
    },
    key:{
        required:true,
        type:String
    },
    category:{
        required:false,
        type:String,
        default:'Basic Software'
    },
    currentSprint:{
        required:false,
        type:String,
        default:'S_0'
    }

});

module.exports = mongoose.model("projects", ProjectSchema);
