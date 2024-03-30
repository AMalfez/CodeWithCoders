require("dotenv").config();
const express = require("express")
const AuthRoute = express.Router();

const User = require('../Schemas/UserSchema')

AuthRoute.post('/login', checkIfUserExist, async (req,res)=>{

})

export default AuthRoute;