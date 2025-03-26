const Recipe = require('../models/Recipe');

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
  const newRecipe = new Recipe(req.body);

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get recipes by mood tag
exports.getRecipesByMood = async (req, res) => {
    const { mood } = req.params;
  
    try {
      const recipes = await Recipe.find({ moodTags: mood });
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  