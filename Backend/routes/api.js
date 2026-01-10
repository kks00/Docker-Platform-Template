const express = require('express');
const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello from API Router!' });
});

// POST /api/data
router.post('/data', (req, res) => {
    const data = req.body;
    res.json({ 
        message: 'Data received',
        receivedData: data 
    });
});

module.exports = router;
