import React, { useEffect, useRef, useState } from "react"
import Header from "./components/Header"       // Top banner / title of the app
import TaskForm from "./components/TaskForm"   // Form to add new or completed tasks
import Summary from "./components/Summary"     // Stats summary: completed, active tasks, and total time
import TaskList from "./components/TaskList"   // List of all tasks with actions (edit, delete, toggle timer)

const App = () => {
  // State to store all tasks
  const [tasks, setTasks] = useState([])

  // Reference object to hold interval timers for each task, indexed by task ID
  const intervalRef = useRef({})

  // ADD TASK
  const handleAddTask = (newTask) => {
    // Generate a unique ID by taking the last task's ID + 1, or start from 1
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1

    // Convert any input hours and minutes to total elapsed seconds
    const elapsedSeconds = (newTask.hours || 0) * 3600 + (newTask.minutes || 0) * 60

    // Build the full task object
    const task = {
      ...newTask,
      id,
      status: newTask.status || "Not Started",  // Default to "Not Started"
      timerRunning: false,                      // By default, the timer is not running
      elapsedSeconds,                           // Initial time spent (in seconds)
    }

    // Add the task to the list
    setTasks([...tasks, task])
  }

  // START / STOP TASK TIMER
  const handleToggleTimer = (taskId) => {
    // Update task status and timerRunning flag
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              timerRunning: !task.timerRunning,
              // If it was running, we stop it → mark it "Completed"
              // If it's starting now, mark it "In Progress"
              status: task.timerRunning ? "Completed" : "In Progress",
            }
          : task
      )
    )

    // NOTE: This part uses stale state — could be improved with useEffect or useCallback
    const task = tasks.find((t) => t.id === taskId)

    if (!task?.timerRunning) {
      // START TIMER: store the interval ID for this task
      intervalRef.current[taskId] = setInterval(() => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId ? { ...t, elapsedSeconds: t.elapsedSeconds + 1 } : t
          )
        )
      }, 1000) // increment every 1 second
    } else {
      // STOP TIMER: clear interval and remove it from the ref
      clearInterval(intervalRef.current[taskId])
      delete intervalRef.current[taskId]
    }
  }

  // DELETE TASK
  const handleDeleteTask = (taskId) => {
    // Stop any running timer
    clearInterval(intervalRef.current[taskId])
    delete intervalRef.current[taskId]

    // Remove task from the list
    setTasks(tasks.filter((task) => task.id !== taskId))
  }


  // EDIT EXISTING TASK
  const handleEditTask = (taskId, updatedFields) => {
    // Recalculate total time (in seconds) from edited hours & minutes
    const updatedElapsed =
      (parseInt(updatedFields.hours) || 0) * 3600 +
      (parseInt(updatedFields.minutes) || 0) * 60

    // Update the task with new values
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updatedFields,          // Update name/status too
              elapsedSeconds: updatedElapsed,
            }
          : task
      )
    )
  }

  // CLEANUP ON UNMOUNT
  useEffect(() => {
    return () => {
      // When component unmounts, clear all running intervals to prevent memory leaks
      Object.values(intervalRef.current).forEach(clearInterval)
    }
  }, [])

  // RENDER COMPONENTS
  return (
    <>
      <Header />
      {/* Form to create new task (manual or tracked) */}
      <TaskForm onAdd={handleAddTask} />
      {/* Show summary statistics like task count and total time */}
      <Summary tasks={tasks}/>
      {/* Table of all tasks with actions */}
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
