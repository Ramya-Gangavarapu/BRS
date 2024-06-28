const express = require('express');
const jwt = require('jsonwebtoken');
const Controllers = require('../controllers/Controllers');

function setupRoutes(db) {
    const router = express.Router();
    const controllers = new Controllers(db);

    router.post('/register', controllers.register.bind(controllers));
    router.post('/login', controllers.login.bind(controllers));
    router.post('/reviews', authenticateToken, controllers.addReview.bind(controllers));
    router.get('/reviews/:postId', controllers.getReviews.bind(controllers));
    router.delete('/reviews/:id', authenticateToken, controllers.deleteReview.bind(controllers)); // Ensure this route is defined

    return router;
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = setupRoutes;
