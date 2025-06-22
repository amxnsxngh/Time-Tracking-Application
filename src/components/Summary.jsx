import React from "react"

const Summary = ({ tasks = [] }) => {
  // Filter out completed and in-progress tasks
  const completedTasks = tasks.filter((task) => task.status === "Completed")
  const activeTasks = tasks.filter((task) => task.status === "In Progress")

  // Get all tasks that have tracked time (either done or currently running)
  const tasksWithTime = tasks.filter(
    (task) => task.status === "Completed" || task.status === "In Progress"
  )

  // Add up total time spent in seconds
  const totalSeconds = tasksWithTime.reduce(
    (acc, task) => acc + task.elapsedSeconds,
    0
  )

  // Convert total seconds into minutes and hours
  const totalMinutes = Math.round(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60

  return (
    <div className="max-w-4xl mx-auto mt-6 flex flex-col md:flex-row justify-center gap-4">

      <div className="flex-1 bg-white rounded-2xl shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Tasks Completed
        </h3>
        <p className="text-2xl font-bold text-blue-600">
          {completedTasks.length}
        </p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Tasks In Progress
        </h3>
        <p className="text-2xl font-bold text-yellow-600">
          {activeTasks.length}
        </p>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Total Time Worked
        </h3>
        <p className="text-2xl font-bold text-green-600">
          {totalHours}h {remainingMinutes}m
        </p>
      </div>
    </div>
  )
}

export default Summary
