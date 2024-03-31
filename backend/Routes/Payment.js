require("dotenv").config();
const express = require("express");
const PaymentRoute = express.Router();
const { Payment } = require("../Schemas/PaymentSchema");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

PaymentRoute.post("/create-checkout-session", async (req, res) => {
  const { place, date, price } = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `Ticker for ${place}`,
            date
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  res.send({ url: session.url });
});

PaymentRoute.post("/success", async (req, res) => {
    const {place, userId, date, price, QRLink} = req.body;
  try {
    const payment = await Payment.create({
        userId,
        DateOfVisit:date,
        place,
        price,
        QRLink,
        payment_status:true
    })
    res.send(payment).status(200)
  } catch (error) {
    console.log(error);
  }
});

module.exports = PaymentRoute;