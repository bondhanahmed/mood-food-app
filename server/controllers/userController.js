const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Recipe = require('../models/Recipe');
const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashed });

        res.status(201).json({ token: generateToken(user), user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({ token: generateToken(user), user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Could not fetch profile' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { dietaryPreferences, useDietaryFilter } = req.body;

        if (dietaryPreferences) user.dietaryPreferences = dietaryPreferences;
        if (typeof useDietaryFilter === 'boolean') user.useDietaryFilter = useDietaryFilter;

        await user.save();

        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating profile', error: err.message });
    }
};

// Adds recipe to favourites
exports.addFavourite = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const user = await User.findById(req.user.id);

        if (!user.favourites.includes(recipeId)) {
            user.favourites.push(recipeId);
            await user.save();
        }

        res.json({ message: 'Recipe added to favourites' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add to favourites', error: err.message });
    }
};

// Gets user's saved favourite recipes
exports.getFavourites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favourites');
        res.json(user.favourites);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch favourites', error: err.message });
    }
};