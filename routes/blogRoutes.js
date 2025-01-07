const express = require('express');
const router = express.Router();
const blogController = require('/Users/user/se-soucier-academy/controllers/blogController');

// Get all blog posts
router.get('/', blogController.getPosts);

// Create a new blog post
router.post('/create', blogController.createPost);

module.exports = router;
