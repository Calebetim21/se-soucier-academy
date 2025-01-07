const Subscriber = require('/Users/user/se-soucier-academy/models/Subscriber');

// Subscribe to the newsletter
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const newSubscriber = await Subscriber.create({ email });
    res.status(201).json({ message: 'Subscription successful!' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to subscribe. Email may already be registered.' });
  }
};
