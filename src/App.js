import React, { useEffect, useState } from "react";
import { FaPencilAlt } from 'react-icons/fa';
import './App.css';

function App() {

  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  const [toDoList, setToDoList] = useState(savedTasks || []);
  const [input, setInput] = useState('')

  useEffect(() => {
    let tasks = JSON.parse(localStorage.getItem("tasks"))
    let savedTasks = []
    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        savedTasks.push(tasks[i])
      }
      setToDoList(savedTasks)
    }
  }, [])

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: input, completed: false }]))
  // },[input])

  // const loadTasks = () => {
  //   if (localStorage.getItem("tasks") == null) return;
  //   let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")))
  //   setToDoList(tasks)
  // }

  const addItem = (e) => {
    e.preventDefault()
    if (input === '') return;
    setToDoList([...toDoList, { taskName: input, complete: false }])
    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { taskName: input, completed: false }]));
    setInput('')
  }

  const deleteItem = index => {
    const updateList = [...toDoList]
    updateList.splice(index, 1)
    setToDoList(updateList)
  };

  const completeItem = index => {
    const updateList = [...toDoList];
    if (updateList[index].complete === false) {
      updateList[index].complete = true;
    } else {
      updateList[index].complete = false
    }
    setToDoList(updateList);
  }

  const deleteCompleted = () => {
    let list = [...toDoList];
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].complete === true) {
        list.splice(i, 1)
      }
    }
    setToDoList(list)
  }

  // window.onload = loadTasks;

  return (
    <div className="App">
      <h1>To Do List <FaPencilAlt /></h1>
      <div className="newItem">
        <form onSubmit={addItem}>

          <input value={input} onChange={e => setInput(e.target.value)}></input>
          <button className="addButton">Add</button>
        </form>
      </div>
      <div className="toDoItems">
        {toDoList.map((item) => {
          return (
            <div className="task">
              <p className={item.complete ? "strike" : "notStrike"}>{item.taskName}</p>
              <div className="buttons">
                <button className="taskButton" onClick={() => { completeItem(toDoList.indexOf(item)) }}>Complete</button>
                <button className="taskButton" onClick={() => { deleteItem(toDoList.indexOf(item)) }}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
      <button className="deleteAll" onClick={deleteCompleted}>Delete All Completed Tasks</button>
    </div>
  );
}

export default App;
