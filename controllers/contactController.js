const Contact = require('/Users/user/se-soucier-academy/models/Contact');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = await Contact.create({ name, email, message });
    res.status(201).json({ message: 'Thank you for reaching out!' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to submit contact form.' });
  }
};
