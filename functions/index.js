const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const { setGlobalOptions } = require("firebase-functions");
require("dotenv").config();

// Stripe initialized using process.env (v2 recommended)
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

setGlobalOptions({maxInstances: 10});


app.use(cors({ origin: true }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Firebase backend is running",
  });
});

// Stripe Payment Intent
app.post("/payment/create", async (req, res) => {
  const total = req.query.total;

  if (!total || total <= 0) {
    return res.status(400).json({
      message: "Total must be greater than 0",
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      message: "Stripe error",
      error: error.message,
    });
  }
});

// Export Cloud Function
exports.api = onRequest(app);
