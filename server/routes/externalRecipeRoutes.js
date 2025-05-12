const express = require('express');
const axios = require('axios');
const router = express.Router();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

console.log('Spoonacular API Key:', SPOONACULAR_API_KEY);


router.get('/:keyword', async (req, res) => {
  const keyword = req.params.keyword;

  const cuisine = req.query.cuisine;
  const maxTime = req.query.maxTime;
  const diet = req.query.diet;

  const mappedKeyword = decodeURIComponent(keyword);

  try {
    const params = {
      query: mappedKeyword,
      number: 500,
      addRecipeInformation: true,
      instructionsRequired: true,
      apiKey: SPOONACULAR_API_KEY
    };

    if (cuisine) params.cuisine = cuisine;
    if (maxTime) params.maxReadyTime = maxTime;
    if (diet) params.diet = diet;

    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params
    });

    console.log('Mapped keyword:', mappedKeyword);
    console.log('Spoonacular response:', response.data);

    res.json(response.data.results);
  }
  catch (err) {
    console.error('Spoonacular API error:', err.response?.data || err.message);
    res.status(500).json({
      message: 'Failed to fetch recipes from Spoonacular',
      error: err.response?.data || err.message
    });
  }
});

module.exports = router;
