import { useState, useEffect } from "react";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

import { createContext } from "react";
export const taskContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  // Fetch Data from JSON server
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  },[]);
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3001/tasks");
    const data = await res.json();
    return data;
  };
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // Delete task
  const deleteTask = async (id) => {    
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });
    res.status === 200 
     ? setTasks(tasks.filter((task)=> task.id !== id))
     :alert("Error Deleting the task");    
  };

  // Update Task (Toggle Reminder) ---
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    setTasks(tasks.map((task)=> task.id === id ? {...task, reminder: data.reminder}: task));
  };


  return (
    <div className="container">
      <Header 
        title="Tracker"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      { showAddTask && <AddTask onAdd={addTask}/> }

      <taskContext.Provider value={{ deleteTask,toggleReminder  }}>
        {
          tasks.length > 0 ? 
          <Tasks 
            tasks={tasks} 
          /> : <h1>'No Tasks To Show'</h1> 
        }
      </taskContext.Provider> 
      
    </div>
  );
}

export default App;
