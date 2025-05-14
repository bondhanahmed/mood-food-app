const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dietaryPreferences: { type: [String], default: [] },
    useDietaryFilter: { type: Boolean, default: false },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});

module.exports = mongoose.model('User', userSchema);
