// Express application configuration
const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Default root route
app.get('/', (req, res) => {
  res.send('Mood-based Recipe API');
});

module.exports = app;
