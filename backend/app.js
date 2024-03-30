require("dotenv").config();
const express = require("express")
const app = express();
const cors = require("cors")
const helmet = require("helmet");
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.get('/',(req,res)=>{
    res.send("Hello world").status(200);
})

app.listen(process.env.PORT, ()=>{
    console.log("Listening.");
})