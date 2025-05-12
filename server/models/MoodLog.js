const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema({
    mood: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoodLog', moodLogSchema);