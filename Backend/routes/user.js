const express = require('express');
const router = express.Router();
const pool = require('../db');

// 사용자 정보 조회
// GET /api/user/:username
router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const query = 'SELECT username, name, gender, age FROM users WHERE username = $1';
        const result = await pool.query(query, [username]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 에러가 발생했습니다.' });
    }
});

module.exports = router;
