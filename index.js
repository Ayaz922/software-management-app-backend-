const express = require('express')
const app = express()
const {MongoDBClient} = require('mongodb')
const taskRoutes = require('./routes/task-routes')
const userRoutes = require('./routes/user-routes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
//MIDDLEWARE
app.use(bodyParser.json())
app.use(cors())

//ROUTES
app.use('/task',taskRoutes)
app.use('/user',userRoutes)

// //DB connection
// localURL = 'mongodb://127.0.0.1:27017/taskManagement'
// databaseURL = 'mongodb+srv://root:<password_root>@cluster0.lqkkn.mongodb.net/taskManagement?retryWrites=true&w=majority'
// mongoose.connect(localURL, { useUnifiedTopology: true, useNewUrlParser: true })

const uri = "mongodb+srv://admin:Password12345@taskmanagerapp.83vax.mongodb.net/task-manager?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
//Connection check
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});





//Listen    
app.listen(3000, ()=> console.log('Server started at Port 3000'))