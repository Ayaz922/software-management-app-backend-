const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("./models/users");
const { connectDatabase } = require("./database/connect-database");
const { setUserData, authenticate } = require("./authMiddlewares");
const cors = require('cors')
app.use(express.json());
app.use(cors())



app.post("/login", setUserData, authenticate, (req, res) => {
  const accessToken = jwt.sign(req.user_data, process.env.AUTH_SECRET_KEY);
  return res
    .status(200)
    .send({ loggedIn: true, accessToken, username: req.user_data.username });
});

const validateRegisterBody = (body) => {
  if (
    !body.name ||
    !body.username ||
    !body.password ||
    !body.email ||
    !body.userType
  )
    return false;
  return true;
};

app.post("/register", async (req, res) => {
  if (!validateRegisterBody(req.body))
    return res
      .status(401)
      .send("Invalid request, please provide all the required info");

  const alreadyExist = await UserModel.find({ username: req.body.email });
  if (!alreadyExist.length == 0) {
    return res.status(401).send("Username already exists");
  }

  const password = await bcrypt.hash(req.body.password, 10);
  const userDetail = new UserModel({
    ...req.body,
    password,
  });

  try {
    let savedUser = await userDetail.save();
    delete savedUser.password;
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(404).send("Failed: " + err);
  }
});

//Connect to database
connectDatabase();

//Listen
const port = process.env.AUTHPORT || 8001;
app.listen(port, () =>
  console.log(`Authentication server live at Port ${port}`)
);

