const express = require('express')
const app = express()
const taskRoutes = require('./routes/task-routes')
const userRoutes = require('./routes/user-routes')
const cors = require('cors')
const { connectDatabase } = require('./database/connect-database')
require('dotenv').config()
//MIDDLEWARE
app.use(express.json())
app.use(cors())
//ROUTES
app.use('/task',taskRoutes)
app.use('/user',userRoutes)

connectDatabase()

//Listen    
port = process.env.PORT || 8000
app.listen(port, ()=> console.log(`Application server started at Port ${port}`))