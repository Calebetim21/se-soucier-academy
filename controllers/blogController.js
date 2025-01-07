const BlogPost = require('/Users/user/se-soucier-academy/models/BlogPost');

// Get all blog posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await BlogPost.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve blog posts.' });
  }
};

// Create a new blog post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = await BlogPost.create({ title, content, author });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create a new blog post.' });
  }
};
