const express = require('express');
const router = express.Router();
const { analyseMoodText } = require('../utils/googleNLP');

router.post('/mood-description', async (req, res) => {
  const { description } = req.body;

  try {
    const keywords = await analyseMoodText(description);
    res.json({ keywords });
  } catch (err) {
    console.error('NLP analysis error:', err.message);
    res.status(500).json({ message: 'Failed to analyse description' });
  }
});

module.exports = router;
