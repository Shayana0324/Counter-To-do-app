import { StrictMode } from 'react';
import { createRoot, ReactDOM } from 'react-dom/client';
import { AppProvider } from '../context/AppContext.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <App />
  </AppProvider>
);
