const mongoose = require('mongoose')
require('dotenv').config()

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
};
module.exports  = {connectDatabase}