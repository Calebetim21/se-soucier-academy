const express = require('express');
const router = express.Router();
const contactController = require('/Users/user/se-soucier-academy/controllers/contactController');

// Handle contact form submission
router.post('/submit', contactController.submitContactForm);

module.exports = router;
