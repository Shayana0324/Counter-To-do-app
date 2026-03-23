import React from 'react'
import { useState } from 'react';
import './Todo.css'

const Todo = () => {
  const [input, setInput] = useState("");
  // const [showInput, setShowInput] = useState(true);
  const [ showInput ] = useState(true);
  const [task, setTask] = useState([]);

  const addTask = () => {
    // setInput(true);
    if (input.trim() === "") return;

    setTask([...task, input]);    //to add task
    setInput("");                 //to clear input
    // setShowInput(false);
  }

  const removeTask = (indexToRemove) => {
    setTask(task.filter((_, index) => index !== indexToRemove));
  }

  const resetList = () => {
    setTask([]);
  }

  const suggestTask = () => {

  }

  return (
    <div className="inputContainer">
      <h1>My Day</h1>
      {showInput && (
        <div>
          <label>What needs to get done?<br /></label>
          <input name="add"
            className='addTodo'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
        </div>
      )}


      <div className="tasks">
        <button className="addTask" onClick={addTask}>
          Add Task
        </button>
        <button className="removetask" onClick={removeTask}>
          Remove Task
        </button>
        <button className="resetlist" onClick={resetList}>
          CLEAR
        </button>
        <button className="suggest" onClick={suggestTask}>
          Suggest Tasks
        </button>
      </div>


      {task.length > 0 && (
        <div>
          <label>Today's List</label>
          <div className='boxTodo'>
            {task.map((t, index) => (
              <div key={index} className="taskRow">
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{t}</span>
                <button
                  className="deleteTask"
                  onClick={() => removeTask(index)} 
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
}

export default Todo