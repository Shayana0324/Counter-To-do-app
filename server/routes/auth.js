import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/index.js';

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
            return res.status(400).json({error: 'Email already exists'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 : salt rounds - how difficult the password is to crack

        //Insert user details into DB
        const result = await pool.query('INSERT INTO user_details (user_name, user_email, password VALUES ($1, $2, $3', [name, email, hashedPassword]);

        const user = result.rows[0];

        //Create JWT Token
        const token = jwt.sign(
            { //// payload — data stored in token
                id: user_details.id,
                email: user_details.user_email
            },
            process.env.JWT_SECRET,
            {
                // token expires in 5 days
                expiresIn: '5d'
            }
        );

        res.status(201).json({ token, user });

    } catch (err) {
        res.status(500).json({ error: 'Server error', err });
    }
});