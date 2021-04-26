const jwt = require("jsonwebtoken");
const UserModel = require("./models/users");
const bcrypt = require("bcrypt");
require("dotenv").config();

//Custom middlewares
const setUserData = async (req, res, next) => {
  let thisUser = await UserModel.findOne({ username: req.body.username });
  if (!thisUser) return res.status(403).send("Incorrect Username or password");
  const user = {
    name: thisUser.name,
    username: thisUser.username,
    email: thisUser.email,
    userType: thisUser.userType,
    password: thisUser.password,
    assignedProjects: thisUser.assignedProjects,
  };
  req.user_data = user;
  next();
};

const authenticate = async (req, res, next) => {
  const password = req.body.password;
  const isAuthenticated = await bcrypt.compare(password, req.user_data.password);
  if (!isAuthenticated)
    return res.status(403).send("Incorrect username or password");
  delete req.user_data.password;
  console.log("Username and password authenticated");
  next();
};

const adminAccessRequired = async (req, res, next) => {
  if (req.user.userType != "ADMIN") {
    return res.sendStatus(403);
  }
  next();
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log('Token: '+token)
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
  setUserData,
  authenticate,
  adminAccessRequired,
};
