class Review {
    constructor(db) {
        this.db = db;
    }

    static initialize(db) {
        return new Promise((resolve, reject) => {
            db.run(`CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                postId TEXT,
                userId INTEGER,
                userName TEXT,
                rating INTEGER,
                description TEXT,
                FOREIGN KEY(userId) REFERENCES users(id)
            )`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    create(postId, userId, userName, rating, description) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO reviews (postId, userId, userName, rating, description) VALUES (?, ?, ?, ?, ?)',
                [postId, userId, userName, rating, description],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                }
            );
        });
    }

    findByPostId(postId) {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM reviews WHERE postId = ?', [postId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    deleteById(id) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM reviews WHERE id = ?', [id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = Review;
