const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true
    },
    employeeId:{
        type: String,
        required: false
    },
    designation:{
        type:String,
        required: false
    },
    assignedProjects:{
        type: Array,
        required: false
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: Date,

    //Enum of the user Type
    userType:{
      type: String, //Enum should be there,
      required: true
    }
});

module.exports = mongoose.model('users', userSchema)