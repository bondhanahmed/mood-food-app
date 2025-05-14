const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getProfile,
    updateProfile,
    addFavourite,
    getFavourites,
} = require('../controllers/userController');

const protect = require('../middleware/authMiddleware');


router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

router.post('/favourites', protect, addFavourite);
router.get('/favourites', protect, getFavourites);

module.exports = router;
