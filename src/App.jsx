// import { useState } from 'react'
import Counter from './Counter';
import Todo from './Todo';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ProtectedRoute from '../components/ProtectedRoute';
import { useApp } from '../context/AppContext';

function Home() {
  const { token, logout } = useApp();
  const navigate = useNavigate();

   const handleLogout = () => {
    logout();           // clear token from context & localstorage
    navigate('/');      // send user back to homepage
  }

  return (
    <div>
      <h1>Welcome to your personalized To-Do App</h1>
      <div>
        { token ? (
          // if user is logged in, show these instead of login button 
          <>
            <button className="login-trigger" onClick={() => navigate('/todo')}>
              Go to my tasks
            </button> <br />
            <button className="logoutBtn" onClick={handleLogout}>
              Log out!
            </button>
          </>
        ) : ( 
          // Show login button if the user is not logged in
          <Login />
        )}
      </div>
    </div>
  );
}

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      {/* <div className="card"> */}
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> 
        {/* <Link to="/counter">Counter</Link> | {" "} */}
        
      </nav>
      {/* </div> */}

      {/* Routing 
      Go here for reference -- https://www.w3schools.com/react/react_router.asp
      */ }

      {/* <Route path="/todo" element={<Todo />} >
          <Route path="add" element={< addTask />} />
          <Route path="remove" element={< removeTask />} />
        </Route> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />

        <Route path="/todo" element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App;
