const express = require('express');
const router = express.Router();

// Placeholder user route
router.get('/', (req, res) => {
  res.json({ message: 'User API is working!' });
});

module.exports = router;
