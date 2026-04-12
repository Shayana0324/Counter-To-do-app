const BASE_URL = "http://localhost:5000";

const getToken = () => localStorage.getItem('token');

// Auth
export const registerUser = (data) => 
    fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json());

export const loginUser = (data) => 
    fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json());

// Tasks - all need the token in the header
export const getTasks = () =>
    fetch(`${BASE_URL}/tasks`, {
        headers: { Authorization: `Bearer ${getToken()}` }
    }).then(res => res.json());

export const addTask = (text) => 
    fetch(`${BASE_URL}/tasks/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` 
        },
        body: JSON.stringify({ text })
    }).then(res => res.json());

export const deleteTask = (id) => 
    fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
    }).then(res => res.json());

export const updateTask = (id, data) =>
    fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json());

export const getSuggestions = (prompt, existingTasks) => 
    fetch('https://localhost:5000/llm/suggest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ prompt, existingTasks })
    }).then(res => res.json());

