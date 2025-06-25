import React from "react"

const Summary = ({ tasks = [] }) => {
  // Filter tasks that are marked as "Completed"
  const completedTasks = tasks.filter((task) => task.status === "Completed")

  // Filter tasks that are currently "In Progress"
  const activeTasks = tasks.filter((task) => task.status === "In Progress")

  // Get only tasks that have logged time — either completed or actively running
  const tasksWithTime = tasks.filter(
    (task) => task.status === "Completed" || task.status === "In Progress"
  )

  // Calculate total time spent in seconds across all tracked tasks
  const totalSeconds = tasksWithTime.reduce(
    (acc, task) => acc + task.elapsedSeconds,
    0
  )

  // Convert total time from seconds to a rounded minute count
  const totalMinutes = Math.round(totalSeconds / 60)

  // Then break that into hours and remaining minutes
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60

  // Render 3 cards: completed count, in-progress count, and total time
  return (
    <div className="max-w-4xl mx-auto mt-6 flex flex-col md:flex-row justify-center gap-4">
      {/* Completed Tasks Card */}
      <div className="flex-1 bg-white rounded-2xl shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Tasks Completed
        </h3>
        <p className="text-2xl font-bold text-blue-600">
          {completedTasks.length}
        </p>
      </div>

      {/* In Progress Tasks Card */}
      <div className="flex-1 bg-white rounded-2xl shadow p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Tasks In Progress
        </h3>
        <p className="text-2xl font-bold text-yellow-600">
          {activeTasks.length}
        </p>
      </div>

      {/* Total Time Worked Card */}
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
