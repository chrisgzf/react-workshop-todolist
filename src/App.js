import { useState, useEffect } from "react";

import Header from "./components/Header";
import TaskManager from "./components/TaskManager";

import "./styles.css";

export default function App() {
  // Task state has to be lifted to be at the App level
  // because Header also needs to know the task state to display
  // no. of undone tasks. It cannot be contained within TaskManager
  // as child components cannot pass props to their parent components.
  const [tasks, setTasksState] = useState([]);

  function setTasks(newTasks) {
    setTasksState(newTasks);
    // localStorage can only store strings, so for us to store objects
    // we must first stringify the object into a JSON string
    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  useEffect(() => {
    // localStorage can only store strings, so we store our array of tasks
    // as a JSON string, and decode the JSON string into an array when we read it
    const savedTasks = JSON.parse(window.localStorage.getItem("tasks"));
    setTasksState(savedTasks ?? []);
  }, []);

  return (
    <div className="App">
      <Header tasks={tasks} />
      <main>
        <TaskManager tasks={tasks} setTasks={setTasks} />
      </main>
    </div>
  );
}
