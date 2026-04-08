import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);         // logged in user
    const [tasks, setTasks] = useState([]);        // task list
    const [token, setToken] = useState(
        localStorage.getItem('token') || null       // persist across refresh
    );

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('token', userToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setTasks(null);
        localStorage.removeItem('token');
    };

    return (
        <AppContext.Provider value={{ user, tasks, setTasks, token, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook -- to let any component access global state in one line
export const useApp = () => useContext(AppContext);