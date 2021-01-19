const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51I58RKEyH1fiHuqyBV03haLEHUMM3EihqGmX0jgHdr9qnXGfgMpseQ83NFWUqGlZm6ulAiKHZas7pHIqwoFbi0LQ00Sq9xPndg'
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes

app.post('/payments/create', async (request, response) => {
  const total = request.query.total; // get amount in subunits

  console.log('Payment Request Received ------>', total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // set subunits
    currency: 'eur',
  });
  //  created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// example endpoint

// http://localhost:5001/my-shop-bac8d/us-central1/api
