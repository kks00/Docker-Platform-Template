require('dotenv').config();
const express = require('express');
const http = require('http');
const pool = require('./db');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.BACKEND_PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router setup
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Basic route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Create HTTP server
const server = http.createServer(app);

// Database Initialization
const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                name VARCHAR(50) NOT NULL,
                gender VARCHAR(10),
                age INTEGER
            )
        `);
        console.log('Database table "users" is ready or already exists.');
    } catch (err) {
        console.error('Error initializing database table:', err);
    }
};

// Start server
initDB().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

// Graceful Shutdown Logic
const gracefulShutdown = (signal) => {
    console.log(`${signal} signal received: closing HTTP server`);
    server.close(() => {
        console.log('HTTP server closed');
        pool.end(() => {
            console.log('Database pool closed');
            process.exit(0);
        });
    });
};

// Handle interrupts
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
