const jwt = require('jsonwebtoken')
const UserModel = require('./models/users')
const bcrypt = require('bcrypt')
require('dotenv').config()

//Custom middlewares
const setUserData = async (req, res, next) => {
    console.log(req.body)
    let thisUser = await UserModel.find({ username: req.body.username });
    console.log(thisUser)
    thisUser = thisUser[0];
    console.log(thisUser)
    if (!thisUser) return res.status(403).send("Incorrect Username or password");
    const user = {
      name: thisUser.name,
      username: thisUser.username,
      email: thisUser.email,
      userType: thisUser.userType,
      password: thisUser.password,
    };
    req.user = user;
    next();
  };
  
  const authenticate = async (req, res, next) => {
    const password = req.body.password;
    const isAuthenticated = await bcrypt.compare(password, req.user.password);
    if (!isAuthenticated)
      return res.status(403).send("Incorrect username or password");
    delete req.user.password;
    console.log('Username and password authenticated')
    next();
  };

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if(token == null) return res.sendStatus(401)
    jwt.verify(token,process.env.AUTH_SECRET_KEY,(err,user)=>{
      if(err) return res.sendStatus(403)
      req.user = user
      console.log('Token authenticated')
      next()
    })
  }

module.exports = {
    authenticateToken,
    setUserData,
    authenticate
}