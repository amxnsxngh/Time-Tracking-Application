import React, { useEffect, useRef, useState } from "react"
import Header from "./components/Header"
import TaskForm from "./components/TaskForm"
import Summary from "./components/Summary"
import TaskList from "./components/TaskList"

const App = () => {
  const [tasks, setTasks] = useState([])
  const intervalRef = useRef({}) // Stores interval timers per task by ID

  const handleAddTask = (newTask) => {
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1
    const elapsedSeconds = (newTask.hours || 0) * 3600 + (newTask.minutes || 0) * 60

    const task = {
      ...newTask,
      id,
      status: newTask.status || "Not Started",
      timerRunning: false,
      elapsedSeconds,
    }

    setTasks([...tasks, task])
  }

  const handleToggleTimer = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              timerRunning: !task.timerRunning,
              status: task.timerRunning ? "Completed" : "In Progress",
            }
          : task
      )
    )

    const task = tasks.find((t) => t.id === taskId)

    if (!task?.timerRunning) {
      // Start timer
      intervalRef.current[taskId] = setInterval(() => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId ? { ...t, elapsedSeconds: t.elapsedSeconds + 1 } : t
          )
        )
      }, 1000)
    } else {
      // Stop timer
      clearInterval(intervalRef.current[taskId])
      delete intervalRef.current[taskId]
    }
  }

  const handleDeleteTask = (taskId) => {
    clearInterval(intervalRef.current[taskId])
    delete intervalRef.current[taskId]
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleEditTask = (taskId, updatedFields) => {
    const updatedElapsed =
      (parseInt(updatedFields.hours) || 0) * 3600 +
      (parseInt(updatedFields.minutes) || 0) * 60

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updatedFields,
              elapsedSeconds: updatedElapsed,
            }
          : task
      )
    )
  }

  useEffect(() => {
    return () => {
      // Clean up all intervals on unmount
      Object.values(intervalRef.current).forEach(clearInterval)
    }
  }, [])

  return (
    <>
      <Header />
      <TaskForm onAdd={handleAddTask} />
      <Summary tasks={tasks}/>
      <TaskList
        tasks={tasks}
        onEditSave={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleTimer={handleToggleTimer}
      />
    </>
  )
}

export default App
