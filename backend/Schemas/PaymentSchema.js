const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email:{type:String, require: true},
    phone:{type:Number, required: true},
    address:{type:String, required:true},
})

const Payments = mongoose.model('Payments', PaymentSchema);
module.exports = {Payments}
