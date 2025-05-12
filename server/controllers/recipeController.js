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

// New recipe
exports.createRecipe = async (req, res) => {
  const newRecipe = new Recipe(req.body);

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Recipes by mood tag
exports.getRecipesByMood = async (req, res) => {
    const { mood } = req.params;
  
    try {
      const recipes = await Recipe.find({ moodTags: mood });
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    console.log("Backend received recipe ID:", req.params.id);

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

