const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Review = require('../models/Review');

class Controllers {
    constructor(db) {
        this.userModel = new User(db);
        this.reviewModel = new Review(db);
    }

    async register(req, res) {
        const { username, password } = req.body;
        try {
            const userId = await this.userModel.create(username, password);
            res.status(201).json({ message: 'User registered successfully', userId });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await this.userModel.findByUsername(username);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.json({ token, userId: user.id, userName: user.username });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async addReview(req, res) {
        const { postId, rating, description } = req.body;
        const userId = req.user.id;
        const userName = req.user.username; // Extracting username from the token payload
        try {
            const reviewId = await this.reviewModel.create(postId, userId, userName, rating, description);
            res.status(201).json({ message: 'Review added successfully', reviewId });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async getReviews(req, res) {
        const { postId } = req.params;
        try {
            const reviews = await this.reviewModel.findByPostId(postId);
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async deleteReview(req, res) {
        const { id } = req.params;
        try {
            await this.reviewModel.deleteById(id);
            res.json({ message: 'Review deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = Controllers;
