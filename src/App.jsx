// import { useState } from 'react'
import Counter from './Counter'
import Todo from './Todo'
import './App.css'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'

function Home() {
  return <h1>Welcome to your personalized To-Do App</h1>;
}

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      {/* <div className="card"> */}
      {/* Navigation */ }
        <nav>
          <Link to="/">Home</Link> | {" "}
          {/* <Link to="/counter">Counter</Link> | {" "} */}
          <Link to="/todo">To-Do</Link>
        </nav>
      {/* </div> */}

      {/* Routing 
      Go here for reference -- https://www.w3schools.com/react/react_router.asp
      */ }
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/counter" element={<Counter />} />
        <Route path="/todo" element={<Todo />} >
          <Route path="add" element={< addTask />} />
          <Route path="remove" element={< removeTask />} />
        </Route>
      </Routes>
    </BrowserRouter>

    
  )
}

export default App;
