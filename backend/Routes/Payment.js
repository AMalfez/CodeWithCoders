require("dotenv").config();
const express = require("express");
const PaymentRoute = express.Router();
const { Payments } = require("../Schemas/PaymentSchema");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

PaymentRoute.post("/create-checkout-session", async (req, res) => {
  const { place, date, price, userId } = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `Ticker for ${place}`,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success?place=${place}&date=${date}&price=${price}&userId=${userId}`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  res.json({ id: session.id });
});

PaymentRoute.post("/success", async (req, res) => {
    const {place, userId, date, price} = req.body;
  try {
    const payment = await Payments.create({
        userId,
        DateOfVisit:date,
        place,
        price,
        payment_status:true
    })
    res.send(payment).status(200)
  } catch (error) {
    console.log(error);
  }
});

module.exports = PaymentRoute;