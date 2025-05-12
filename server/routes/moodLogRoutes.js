const express = require('express');
const router = express.Router();
const moodLogController = require('../controllers/moodLogController');

router.post('/', moodLogController.createMoodLog);

module.exports = router;