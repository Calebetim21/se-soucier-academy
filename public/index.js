// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./config/db'); // Sequelize instance for database connection

// Import route files
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

// Initialize Express app
const app = express();

// Middleware setup
app.use(helmet({ contentSecurityPolicy: false }));// Security headers
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type'], // Allow specific headers
}));
 // Enable CORS for all origins (customize if needed)
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Use the routes
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
console.log("Contact route mounted on /api/contact");
app.use('/api/newsletter', newsletterRoutes);

// Dynamic View rendering for static HTML files
app.get('/:page?', (req, res) => {
  const { page = 'index' } = req.params; // Default to 'index'
  const filePath = path.join(__dirname, 'views', `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) res.status(404).send('Page Not Found');
  });
});

// Error handling middleware
app.use((req, res, next) => res.status(404).json({ message: 'Page Not Found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server Error', details: err.message });
});

// Import models for database synchronization
const BlogPost = require('./models/BlogPost');
const Contact = require('./models/Contact');
const Subscriber = require('./models/Subscriber');

// Connect to the database and start the server
const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true }) // Sync database schema; use `force: true` for development
  .then(() => {
    console.log('Database connected and synchronized...');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
