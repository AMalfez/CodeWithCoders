require("dotenv").config();
const nodemailer = require("nodemailer");
const {User} = require('../Schemas/UserSchema')
const { createClient } = require("redis");
const redis_client = createClient({
  password: `${process.env.REDIS_PASS}`, // use your password here
  socket: {
    host: `${process.env.REDIS_HOST}`,
    port: process.env.REDIS_PORT,
  }
});
redis_client.on("error", (err) => console.log("Redis Client Error", err));
redis_client
  .connect()
  .then(() => {
    console.log("connected to redis");
  })
  .catch((err) => {
    console.log(err);
  });

const generateVerificationCode = () => {
  //generating a 4 digit code
  const code = Math.floor(1000 + Math.random() * 9000);
  return code.toString();
};

const sendVerificationEmail = (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.MY_EMAIL}`,
      pass: `${process.env.MY_PASS}`,
    },
  });

  const mailOpt = {
    from: `${process.env.MY_EMAIL}`,
    to: email,
    subject: "Verification email from ML-Sol",
    text: `Your verification code is ${verificationCode}`,
  };

  transporter.sendMail(mailOpt, (err, info) => {
    if (err) console.log("mail err: ", err);
    else {
      console.log("sent!");
    }
  });
};

const verifyOTP = async (req, res, next) => {
  const { email, verifyCode } = req.body;
  const verificationCode = await redis_client.get(`${email}`);
  if (parseInt(verificationCode) !== parseInt(verifyCode)) {
    res.send("Invalid OTP").status(403);
  }
  next();
};

const sendOTP = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    const verificationCode = generateVerificationCode();
    sendVerificationEmail(email, verificationCode);
    await redis_client.set(`${email}`, verificationCode);
    res.sendStatus(200)
  } else {
    res.status(409).json({ err: "user already exists" });
  }
};

module.exports = { verifyOTP, sendOTP };
