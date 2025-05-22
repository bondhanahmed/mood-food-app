// Express application configuration
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();
const moodLogRoutes = require('./routes/moodLogRoutes');
const externalRecipeRoutes = require('./routes/externalRecipeRoutes');
const nlpRoutes = require('./routes/nlpRoutes');


app.use(cors());
app.use(express.json());

// Mounted routes
app.use('/api/nlp', nlpRoutes);
app.use('/api/moodlogs', moodLogRoutes);
app.use('/api/external-recipes', externalRecipeRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('Mood-based Recipe API');
});

module.exports = app;
