import { useState } from 'react';
import { getSuggestions } from '../api/api';
import { useApp } from '../context/AppContext';
import { addTask } from '../api/api';

const priorityConfig = {
    high: {label: 'High', color: '#b85c5c', bg: '#fdf0f0'},
    medium: { label: 'Medium', color: '#c17f4a', bg: '#f0e6d8'},
    low: { label: 'Low', color: '#9c9489', bg: 'f5f2ee'},
};

const LLMPanel = ({ onClose }) => {
    const { tasks, setTasks } = useApp();
    const [prompt, setPrompt] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [added, setAdded] = useState(new Set());          // to track which suggestions were added

    const handleSuggest = async () => {
        if(prompt.trim() === '') return;
        setLoading(true);
        setError('');
        setSuggestions([]);
        setAdded(new Set());

        try {
            const existingTasks = tasks.map(t => t.text);
            const data = await getSuggestions(prompt, existingTasks);

            if (data.error) {
                setError(data.error);
                return;
            }

            setSuggestions(data.suggestions);
        } catch (err) {
            console.log(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddSuggestion = async (suggestions, index) => {
        try {
            const newTask = await addTask(suggestions.text);
            setTasks(prev => [...prev, newTask]);
            setAdded(prev => new Set([...prev, index]));
        } catch (err) {
            console.log(err);
            setError('Failed to add task.');
        }
    };

    const handleAddAll = async () => {
        const unadded = suggestions.filter((_, i) => !added.has(i));
        for (const suggestion of unadded) {
            const newTask = await addTask(suggestion.text);
            setTasks(prev => [...prev, newTask]);
        }

        // To mark all as added
        setAdded(new Set(suggestions.map((_, i) => i)));
    };

    return (
        <div className="llmPanel">
            <div className="llmHeader">
                <div>
                    <h2>✦ AI Assitant</h2>
                    <p className="llmSubtitle">Describe what you need to get done</p>
                </div>
                <button className="llmClose">X</button>
            </div>

            {/* to prompt input */}
            <div className="llmInputRow">
                <textarea 
                    className="llmTextarea"
                    placeholder={`e.g. "Plan my week for a product launch or "Help me prepare for a job interview"`}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSuggest();
                        }
                    }}
                    rows={3}
                />
                <button
                    className="llmSubmit"
                    onClick={handleSuggest}
                    disabled={loading || prompt.trim() === ''}
                >
                    {loading ? '...' : '→'}
                </button>
            </div>

            {/* Error */}
            {error && <p className="llmError">{error}</p>}

            {/* Loading state */}
            {loading && (
                <div className="llmLoading">
                    <span className="llmDot" />
                    <span className="llmDot" />
                    <span className="llmDot" />
                    <p>Thinking.....</p>
                </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
            <div className="llmSuggestions">
                <div className="llmSuggestionsHeader">
                    <label>Suggested Tasks</label>
                    <button className="llmAddAll" onClick={handleAddAll}>
                        + Add All
                    </button>
                </div>
                {suggestions.map((s, index) => {
                    const config = priorityConfig[s.priority] || priorityConfig.low;
                    const isAdded = added.has(index);

                    return (
                        <div key={index} className={`llmRow ${isAdded} ? 'llmRowAdded' : ''`}>
                            <span 
                                className="llmPriority"
                                style={{ color: config.color, background: config.bg }}
                            >
                                {config.label}
                            </span>
                            <span className="llmTaskText">{s.text}</span>
                            <button className={`llmAddBtn ${isAdded ? 'llmAddBtnDone' : ''}`}
                            onClick={() => !isAdded && handleAddSuggestion(s, index)}
                            disabled={isAdded}
                            >
                                {isAdded ? '✓' : '+'}
                            </button>
                        </div>
                    );
                })}
            </div>
            )}
        </div>
    );
};

export default LLMPanel;