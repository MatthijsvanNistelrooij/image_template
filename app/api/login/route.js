const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

app.post('/api/login', ClerkExpressWithAuth(), async (req, res) => {
  const { userId } = req.auth;

  let user = await User.findOne({ clerkId: userId });

  if (!user) {
    user = new User({ clerkId: userId });
    await user.save();
  }

  res.json({ tokens: user.tokens });
});