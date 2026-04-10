import { useEffect, useState } from 'react';
import '../css/Todo.css';
import { getTasks, addTask, deleteTask } from '../api/api';
import { useApp } from '../context/AppContext.jsx';

const Todo = () => {
  const {tasks, setTasks} = useApp();         
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(true); // loading state while fetching tasks

  // Load tasks from DB when component mounts
  useEffect(() => {
    getTasks()
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Bug 2 fixed: one single addTask function
  const handleAddTask = async () => {
    if (!showInput) {
      setShowInput(true);
      return;
    }
    if (input.trim() === "") return;

    const newTask = await addTask(input);        // saves to DB, returns { id, text, ... }
    setTasks([...tasks, newTask]);               // Bug 3 fixed: use tasks not TaskSignal
    setInput("");
    setShowInput(false);
  };

  // Bug 4 fixed: takes id from each task row
  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));   // filters by id not index
  };

  const handleResetList = async () => {
    // deletes all tasks one by one then clears UI
    await Promise.all(tasks.map(t => deleteTask(t.id)));
    setTasks([]);
  };

  const handleSuggest = async () => {
    // placeholder — will call /llm/suggest once that route is built
    console.log("LLM suggest coming soon");
  };

  return (
    <div className="inputContainer">
      <h1>My Day</h1>

      {showInput && (
        <div className="inputBox">
          <label>What needs to get done?</label>
          <input
            name="add"
            className="addTodo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            autoFocus
          />
        </div>
      )}

      <div className="tasks">
        <button className="addTask" onClick={handleAddTask}>
          + New Task
        </button>
        <button className="suggest" onClick={handleSuggest}>
          ✦ Suggest Tasks
        </button>
        <button className="resetlist" onClick={handleResetList}>
          ↺ Clear All
        </button>
      </div>

      {loading && <p className="statusText">Loading your tasks...</p>}

      {!loading && tasks.length === 0 && (
        <p className="statusText">No tasks yet. Add one above!</p>
      )}

      {tasks.length > 0 && (
        <div className="taskListSection">
          <label>Today's List</label>
          <div className="boxTodo">
            {tasks.map((t, index) => (
              <div key={t.id} className="taskRow">  {/* key is t.id not index — more stable */}
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{t.text}</span>  {/* Bug 5 fixed: t.text not t */}
                <button
                  className="deleteTask"
                  onClick={() => handleDeleteTask(t.id)}  // passes DB id not index
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
};

export default Todo;