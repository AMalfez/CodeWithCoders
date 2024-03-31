require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./Routes/Auth");
const mongoose = require("mongoose");
app.enable("trust proxy");

mongoose.set("strictQuery", false);
mongoose
.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to db!");
  });
  
  app.use(cookieParser());
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world").status(200);
});

app.use("/auth", AuthRoute);

app.listen(process.env.PORT, () => {
  console.log("Listening.");
});