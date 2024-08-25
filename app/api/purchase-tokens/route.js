const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/purchase-tokens', ClerkExpressWithAuth(), async (req, res) => {
  const { userId } = req.auth;
  const { tokenPackage } = req.body; // e.g., 10, 20, 100 tokens

  // Find the user in your database
  let user = await User.findOne({ clerkId: userId });

  // Define token packages and prices (in cents)
  const tokenPackages = {
    10: 1000,
    20: 1800,
    100: 8000,
  };

  // Ensure valid package
  if (!tokenPackages[tokenPackage]) {
    return res.status(400).json({ error: 'Invalid token package' });
  }

  // Create a Stripe payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: tokenPackages[tokenPackage],
    currency: 'usd',
    metadata: { userId: user.clerkId, tokens: tokenPackage },
  });

  res.json({ clientSecret: paymentIntent.client_secret });
});

// Webhook to handle payment confirmation
app.post('/api/webhook', async (req, res) => {
  const event = req.body;

  switch (event.type) {
    case 'payment_intent.succeeded':
      const { userId, tokens } = event.data.object.metadata;

      // Find the user and update their token balance
      let user = await User.findOne({ clerkId: userId });
      user.tokens += parseInt(tokens);
      await user.save();

      break;
    // Handle other event types if needed
  }

  res.json({ received: true });
});
