const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// GET all recipes
router.get('/', recipeController.getAllRecipes);

// POST new recipe
router.post('/', recipeController.createRecipe);

// GET recipes filtered by mood
router.get('/mood/:mood', recipeController.getRecipesByMood);

module.exports = router;
