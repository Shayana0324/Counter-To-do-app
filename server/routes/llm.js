import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import verifyToken from '../middleware/auth.js';

const router = express.Router();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// POST 
router.post('/suggest', verifyToken, async (req, res) => {
    const { prompt, existingTasks } = req.body;

    if(!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const message = await client.messages.create({
            model: 'claude-opus-4-5',
            max_tokens: 1024,
            messages: [
                {
                    role: 'user',
                    content: `You are a helpful productivity assistant. The user wants help with their to-do list.
                    User's existing tasks: ${existingTasks?.length > 0 ? existingTasks.join(', ') : 'none'}
                    
                    User's request: "${prompt}"
                    
                    Your job:
                    - Suggest a clear, actionable to-do list based on the request
                    - Prioritize the tasks by importance (high, medium, low)
                    - Keep each task short and specific (under 15 words)
                    - Return ONLY a JSON array, no explanation, no markdown

                    Format: 
                    [
                        { "text": "task description", "priority": "high" },
                        { "text": "task description", "priority": "medium" },
                        { "text": "task description", "priority": "low" }
                    ]
                    `
                }
            ]
        });

        // Parse JSON returned by array Claude
        const raw = message.content[0].text.trim();
        const suggestions = JSON.parse(raw);

        res.json({ suggestions });
    } catch (err) {
        console.error('LLM error:', err);
        res.status(500).json({ error: 'Failed to get suggestions' });
    }
});

export default router;