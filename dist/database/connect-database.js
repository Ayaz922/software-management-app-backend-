const mongoose = require("mongoose");
const RoleSchema = require("../models/roles");
const { createRoles } = require("./generateRoles");
require("dotenv").config();
const connectDatabase = () => {
    const databaseURI = process.env.DATABASE_URI;
    mongoose.connect(databaseURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    //Connection check
    const connection = mongoose.connection;
    connection.once("open", function () {
        console.log("MongoDB database connection established successfully");
    });
    RoleSchema.find({}, function (err, users) {
        if (err)
            console.log(err);
        else if (users.length === 0)
            createRoles();
    });
};
module.exports = { connectDatabase };
