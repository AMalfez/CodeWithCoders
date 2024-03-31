const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
    userId:{ type: String, required: true },
    payment_status: {type: Boolean, default:false},
    place: {type:String, required:true},
    price: {type:Number, required:true},
    QRLink: {type:String, required:true},
    DateOfVisit : {type:Date, required: true},
    ticket_number: {type:Number, default: new Date(Date.now()).getMilliseconds()%1000}
})

const Payments = mongoose.model('Payments', PaymentSchema);
module.exports = {Payments}
