const mongoose = require("mongoose");
const ProjectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: false
    },
    projectManagerId: {
        type: String,
        required: false
    },
    currentSprint: {
        type: String,
        required: false
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    actualStartDate: {
        type: Date
    },
    actualEndDate: {
        type: Date
    }
});
module.exports = mongoose.model("projects", ProjectSchema);
