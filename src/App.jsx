// import { useState } from 'react'
import Counter from './Counter';
import Todo from './Todo';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Login from './Login';
import Signup from './Signup';
import ProtectedRoute from '../components/ProtectedRoute';

function Home() {
  return (
    <div>
      <h1>Welcome to your personalized To-Do App</h1>
      <Login />
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
        <Link to="/">Home</Link> | {" "}
        {/* <Link to="/counter">Counter</Link> | {" "} */}
        <Link to="/todo">To-Do</Link>
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
