require("dotenv").config();
const {
  sendOTP, verifyOTP
} = require("../MiddleWares/OTP");
const express = require("express");
const { User } = require("../Schemas/UserSchema");
const bcrypt = require("bcrypt");
const AuthRoute = express.Router();
const { sign, verify } = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
AuthRoute.use(cookieParser());
AuthRoute.get("/logout", async (req, res) => {
res.clearCookie("jsonwebtoken")
res.sendStatus(200)
});

AuthRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (req.cookies.jsonwebtoken) res.clearCookie("jsonwebtoken");
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.send([]).status(403);
    } else {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) console.log("hash compare err: ", err);
        if (result) {
          const jsonwebtoken = sign(
            { userId: user._id },
            `${process.env.SECRET}`,
            { expiresIn: "48h" }
          );
          res.cookie("jsonwebtoken", jsonwebtoken, {
            httpOnly: true,
            maxAge: 24*60*60*2*1000,
          });
          res.send(user).status(200);
        } else {
          res.send([]).status(403);
        }
      });
    }
  } catch (error) {
    console.log("error: ", error);
  }
});

AuthRoute.post("/signup", verifyOTP, async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  const user = await User.findOne({email});
  if (req.cookies.jsonwebtoken) res.clearCookie("jsonwebtoken");
  if(user) res.send("user already exist").status(404);
  else{ 
  try {
    bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS),
      async (err, hash) => {
        // Store hash in your password DB.
        if (err) console.log("hash err: ", err);
        else {
          const result = await User.create({
            name,
            email,
            phone,
            password: hash,
            address,
          });
          //include payment here
          const jsonwebtoken = sign(
            { userId: result._id },
            `${process.env.SECRET}`,
            { expiresIn: "48h" }
          );
          res.cookie("jsonwebtoken", jsonwebtoken, {
            httpOnly: true,
            maxAge: 24*60*60*2*1000,
          });
          res.send(result);
        }
      }
    );
  } catch (error) {
    // res.sendStatus(404);
    console.log("error");
  }}
});

AuthRoute.post("/verify-email", sendOTP);

AuthRoute.get("/", (req, res) => {
  if (req.cookies.jsonwebtoken) {
    const token = req.cookies.jsonwebtoken;
    verify(token, `${process.env.SECRET}`, async (err, decoded) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        const userId = decoded.userId;
        const user = await User.findById(userId);
        res.status(200).send(user);
      }
    });
  } else {
    res.status(404).send([]);
  }
});

module.exports = AuthRoute;
