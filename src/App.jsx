import React, { useState } from "react"
import Header from "./components/Header"
import TaskForm from "./components/TaskForm"
import Summary from "./components/Summary"
import TaskList from "./components/TaskList"

const App = () => {

  return (
    <>
      <Header />
      <TaskForm onAdd={handleAddTask} />
      <Summary/>
      <TaskList/>
    </>
  )
}

export default App
