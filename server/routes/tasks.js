import express from 'express';
import pool from '../db/index.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();
// All task routes are protected — verifyToken runs first on every one

// GET /tasks — get all tasks for logged-in user
router.get('/', verifyToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE user_id = $1 ORDER BY position ASC, created_at ASC', [req.user.id]   //req.user.id comes from JWT middleware
        );
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

//POST /tasks - add a new task
router.post('/', verifyToken, async (req, res) => {
    const { text } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (user_id, tasks_desc) VALUES ($1, $2) RETURNING  *', [req.user.id, text]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error'});
    }
});

//PATCH /tasks/:id - edit text or mark complete
router.patch('/:id', verifyToken, async (req, res) => {
    const { text, completed } = req.body;
    try {
        const result = await pool.query(
            `UPDATE tasks 
            SET tasks_desc = COALESCE($1, tasks_desc), 
            completed = COALESCE($2, completed) 
            WHERE id = $3 AND user_id = $4 
            RETURNING *`, 
            [text, completed, req.params.id, req.user.id]
        );
        // user_id check ensures users can only edit their OWN tasks
        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /tasks/:id - delete a specific task
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await pool.query(
            'DELETE FROM tasks WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]
        );
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;