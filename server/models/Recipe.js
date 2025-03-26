const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [String],
  instructions: String,
  moodTags: [String],
  nutrients: {
    calories: Number,
    protein: Number,
    fat: Number,
    carbs: Number
  },
  image: String
});

module.exports = mongoose.model('Recipe', recipeSchema);
