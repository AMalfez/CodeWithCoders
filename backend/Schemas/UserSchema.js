const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email:{type:String, require: true},
    phone:{type:Number, required: true},
    address:{type:String, required:true},
    password:{type:String, required:true}
})

export const User = mongoose.model('User',UserSchema);