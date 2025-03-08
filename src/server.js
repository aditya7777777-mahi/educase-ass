const express = require('express');
const cors = require('cors');
const { initDb } = require('./config/db');
const { seedDatabase } = require('./config/seed');
const schoolRoutes = require('./routes/schoolRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', schoolRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the School Management API'
  });
});

// Seed database route (for development/testing only)
app.post('/api/seed-database', async (req, res) => {
  try {
    await seedDatabase();
    res.status(200).json({
      success: true,
      message: 'Database seeded successfully with sample data'
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to seed database'
    });
  }
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database
    await initDb();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API Documentation available at: http://localhost:${PORT}`);
      console.log(`To seed the database with sample data, make a POST request to: http://localhost:${PORT}/api/seed-database`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();