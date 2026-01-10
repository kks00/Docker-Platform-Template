const express = require('express');
const router = express.Router();
const pool = require('../db');

// 회원가입 (Sign Up)
// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { username, password, name, gender, age } = req.body;

    // 간단한 유효성 검사
    if (!username || !password || !name || !gender || !age) {
        return res.status(400).json({ error: '모든 필드를 입력해주세요. (username, password, name, gender, age)' });
    }

    try {
        // 아이디 중복 확인
        const checkUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (checkUser.rows.length > 0) {
            return res.status(409).json({ error: '이미 존재하는 아이디입니다.' });
        }

        // 사용자 추가
        const insertQuery = `
            INSERT INTO users (username, password, name, gender, age)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING username, name, gender, age
        `;
        const newUser = await pool.query(insertQuery, [username, password, name, gender, age]);

        res.status(201).json({
            message: '회원가입 성공',
            user: newUser.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 에러가 발생했습니다.' });
    }
});

module.exports = router;
