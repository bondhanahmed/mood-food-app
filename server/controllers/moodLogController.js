const MoodLog = require('../models/MoodLog');

// POST /api/moodlogs
exports.createMoodLog = async (req, res) => {
    try {
        const { mood } = req.body;
        const newLog = new MoodLog({ mood });
        const saved = await newLog.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
