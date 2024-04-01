require("dotenv").config();
const express = require("express");
const TicketRoute = express.Router();
const { Payments } = require("../Schemas/PaymentSchema");

TicketRoute.delete('/delete', async(req,res)=>{
    const {ticket_number} = req.query;
    try {
        const dlt = await Payments.findOneAndDelete({ticket_number});
        if(dlt) res.sendStatus(200)
        else res.sendStatus(403)
    } catch (error) {
        console.log(error);
    }

})

module.exports = TicketRoute