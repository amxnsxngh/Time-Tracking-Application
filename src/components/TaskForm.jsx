import React, { useState } from "react"

const TaskForm = ({ onAdd }) => {
  // State for task name and time fields
  const [taskName, setTaskName] = useState("")
  const [isOldTask, setIsOldTask] = useState(false)
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Make sure task name isn't empty
    if (!taskName.trim()) {
      alert("Please enter a task name")
      return
    }

    // Validate minutes if this is an old task
    const mins = parseInt(minutes, 10)
    if (isOldTask && (isNaN(mins) || mins < 0 || mins > 59)) {
      alert("Minutes must be between 0 and 59")
      return
    }

    // Validate hours if this is an old task
    const hrs = parseInt(hours, 10)
    if (isOldTask && (isNaN(hrs) || hrs < 0)) {
      alert("Hours must be 0 or more")
      return
    }

    // Calculate total time only if this is an old task
    let timeTaken
    if (isOldTask) {
      timeTaken = hrs + mins / 60
    }

    // Create a task object
    const task = {
      taskName: taskName.trim(),
      isOld: isOldTask,
      status: isOldTask ? "Completed" : "Not Started",
      ...(isOldTask && { timeTaken }),
      hours: isOldTask ? hrs : undefined,
      minutes: isOldTask ? mins : undefined,
    }

    // Send task to parent if onAdd is a function
    if (typeof onAdd === "function") {
      onAdd(task)
    } else {
      console.log("onAdd prop is not a function; task:", task)
    }

    // Clear the form after submitting
    setTaskName("")
    setIsOldTask(false)
    setHours("")
    setMinutes("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-8 rounded-2xl shadow-sm max-w-md mx-auto"
    >
      <div>
        <label
          htmlFor="taskName"
          className="block text-gray-700 text-sm font-semibold mb-1"
        >
          Task Name
        </label>
        <input
          id="taskName"
          type="text"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="e.g. Hire Aman Singh"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="isOldTask"
          type="checkbox"
          checked={isOldTask}
          onChange={() => setIsOldTask(!isOldTask)}
          className="h-5 w-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-400"
        />
        <label
          htmlFor="isOldTask"
          className="text-gray-700 font-medium select-none"
        >
          Is this an old task (already completed)?
        </label>
      </div>

      {isOldTask && (
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Time Taken
          </label>
          <div className="flex gap-4">

            <div className="flex flex-col w-1/2">
              <input
                id="hours"
                type="number"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Hours"
                min="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col w-1/2">
              <input
                id="minutes"
                type="number"
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Minutes"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
      >
        Add Task
      </button>
    </form>
  )
}

export default TaskForm
