import express from 'express';
import Groq from 'groq-sdk';
import verifyToken from '../middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// POST 
router.post('/suggest', verifyToken, async (req, res) => {
    const { prompt, existingTasks } = req.body;

    if(!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const completion = await client.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            max_tokens: 1024,
            messages: [
                {
                    role: 'system',
                    content: `You are a helpful productivity assistant. 
                    When given a user request, return ONLY a JSON array of task objects.
                    No explanation, no markdown, no code blocks - raw JSON only.
                    Each object must have exactly two fields: "text" and "priority".
                    Priority must be one of: "high", "medium", or "low".
                    Example: [{"text":"Buy groceries","priority":"high"},{"text":"Call dentist","priority":"medium"}]
                    `
                }, {
                    role: 'user',
                    content: `My existing tasks: 
                    ${existingTasks?.length > 0 ? existingTasks.join(', ') : 'none'}
                    My request: "${prompt}"

                    Give me a prioritized to-do list for this.`
                }
            ],
            temperature: 0.7,
        });

        const raw = completion.choices[0].message.content.trim();
        
        // Safety net - strip markdown code blocks if model wraps response in them
        const cleaned = raw
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        const suggestions = JSON.parse(cleaned);
        res.json({ suggestions });
    
    } catch (err) {
        console.error('LLM error:', err);
        res.status(500).json({ error: 'Failed to get suggestions' });
    }
});

export default router;