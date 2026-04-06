import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/index.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

//POST /auth/register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if email already exists
        const emailExists = await pool.query(
            'SELECT id FROM user_details WHERE user_email = $1', [email]
        );
        if (emailExists.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 : salt rounds - how difficult the password is to crack

        //Insert user details into DB
        const result = await pool.query('INSERT INTO user_details (user_name, user_email, password) VALUES ($1, $2, $3) RETURNING user_name, user_email, password', [name, email, hashedPassword]);

        const user = result.rows[0];

        //Create JWT Token
        const token = jwt.sign(
            { // payload — data stored in token
                name: user.user_name,
                email: user.user_email
            },
            process.env.JWT_SECRET,
            {
                // token expires in 5 days
                expiresIn: '5d'
                //token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCBVc2VyIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzc1NDIzNDM3LCJleHAiOjE3NzU4NTU0Mzd9.2noRrH4JtgVOEYE5wn1KDy0lTLYWtI2cdilE36HmG8E
            }
        );

        res.status(201).json({ token, user });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        //Find user by email
        const result = await pool.query(
            'SELECT * FROM user_details WHERE user_email = $1', [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];

        // Compare password with stored hash
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.user_name,
                email: user.user_email
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;