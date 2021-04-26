const mongoose = require("mongoose");
const enums = require("../utils/enums");
const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Default value",
  },
  projectId: {
    type: String,
    required: true,
  },
  subProjectId:{
    type: String,
    required: false
  },
  organizationId:{
    type:String,
    required: false
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    required: true,
    default: enums.TASK_STATUS.BACKLOG,
  },
  //User that created the task
  creator: {
    type: String,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  //Priority enum
  priority: {
    type: String,
    required: true,
    default: "LOW",
  },
  //Assigned
  assignedBy: {
    type: String,
    required: false,
  },
  assignedUser: {
    type: String,
    required: false,
  },
  //Enum of the task Type
  taskType: {
    type: String, //Enum should be there,
    required: true,
  },
  //Lables
  lables: {
    type: Array,
    required: false,
  },
  comments: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("tasks", taskSchema);
