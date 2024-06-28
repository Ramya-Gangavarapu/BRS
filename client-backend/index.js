require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/config');
const setupRoutes = require('./routes/routes');
const User = require('./models/User');
const Review = require('./models/Review');

const app = express();
app.use(cors());
app.use(bodyParser.json());

User.initialize(db)
    .then(() => {
        console.log('User table created');
        return Review.initialize(db);
    })
    .then(() => {
        console.log('Review table created');
        app.use('/api', setupRoutes(db));

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error initializing tables:', err);
    });
