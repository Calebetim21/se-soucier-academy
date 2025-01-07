// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const path = require('path');
const sequelize = require('./config/db'); // Sequelize instance for database connection

// Import route files
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// View rendering for static HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'views', 'blog.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html')));
app.get('/newsletter', (req, res) => res.sendFile(path.join(__dirname, 'views', 'newsletter.html')));

// Use the routes
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Error handling middleware for unknown routes
app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
  });
  
  // Error handling middleware for server errors
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
  });

// Connect to the database and start the server
const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
