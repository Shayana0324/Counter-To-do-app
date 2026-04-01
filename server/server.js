import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import taskRoutes from  './routes/tasks.js';

dotenv.config();

const app = express();

// To run middleware on every request
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Backend running'});
});

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
// app.use('/llm', llmRoutes);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});