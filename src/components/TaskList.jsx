import React, { useState } from "react"
import { FaPlay, FaStop, FaTrash, FaEdit } from "react-icons/fa"

// Utility function to format seconds into a readable "Xh Ym" string
const formatTime = (seconds) => {
  const mins = Math.round(seconds / 60)
  const hrs = Math.floor(mins / 60)
  const remainingMins = mins % 60
  return `${hrs}h ${remainingMins}m`
}

const TaskList = ({ tasks = [], onEditSave, onDelete, onToggleTimer }) => {
  // This state holds the ID of the task currently being edited
  const [editingTaskId, setEditingTaskId] = useState(null)

  // Local state for the form inputs when editing a task
  const [editedTask, setEditedTask] = useState({})

  // Called when user clicks the "Edit" button — sets the editing state
  const startEditing = (task) => {
    setEditingTaskId(task.id)
    // Pre-fill input fields with current task values
    setEditedTask({
      taskName: task.taskName,
      status: task.status,
      hours: Math.floor(task.elapsedSeconds / 3600),
      minutes: Math.floor((task.elapsedSeconds % 3600) / 60),
    })
  }

  // Resets editing state when user clicks "Cancel"
  const cancelEditing = () => {
    setEditingTaskId(null)
    setEditedTask({})
  }

  // Updates local editedTask state when inputs change
  const handleInputChange = (field, value) => {
    setEditedTask({ ...editedTask, [field]: value })
  }

  // Triggers parent handler to save edited task, then exits edit mode
  const saveEdit = () => {
    onEditSave(editingTaskId, {
      taskName: editedTask.taskName,
      status: editedTask.status,
      hours: editedTask.hours,
      minutes: editedTask.minutes,
    })
    cancelEditing()
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 mt-8 mb-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Tasks List</h2>

      {/* If no tasks exist, show a fallback message */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks added yet.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 px-4">#</th>
              <th className="border-b py-2 px-4">Task Name</th>
              <th className="border-b py-2 px-4">Status</th>
              <th className="border-b py-2 px-4">Time</th>
              <th className="border-b py-2 px-4">Timer</th>
              <th className="border-b py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through tasks and display each one */}
            {tasks.map((task, index) => {
              const isEditing = task.id === editingTaskId

              return (
                <tr key={task.id || index} className="border-b hover:bg-gray-50">
                  {/* Task number (index + 1) */}
                  <td className="py-2 px-4">{index + 1}</td>

                  {/* Task Name — editable input or plain text */}
                  <td className="py-2 px-4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedTask.taskName}
                        onChange={(e) => handleInputChange("taskName", e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      task.taskName
                    )}
                  </td>

                  {/* Task Status — dropdown if editing */}
                  <td className="py-2 px-4">
                    {isEditing ? (
                      <select
                        value={editedTask.status}
                        onChange={(e) => handleInputChange("status", e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      >
                        <option>Not Started</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    ) : (
                      task.status
                    )}
                  </td>

                  {/* Time — editable fields or formatted time */}
                  <td className="py-2 px-4">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="0"
                          value={editedTask.hours}
                          onChange={(e) => handleInputChange("hours", e.target.value)}
                          className="w-16 border px-2 py-1 rounded"
                        />
                        <input
                          type="number"
                          min="0"
                          max="59"
                          value={editedTask.minutes}
                          onChange={(e) => handleInputChange("minutes", e.target.value)}
                          className="w-16 border px-2 py-1 rounded"
                        />
                      </div>
                    ) : (
                      formatTime(task.elapsedSeconds)
                    )}
                  </td>

                  {/* Timer Button — toggles between Play and Stop */}
                  <td className="py-2 px-4">
                    <button
                      onClick={() => onToggleTimer(task.id)}
                      className={`p-2 rounded text-white ${task.timerRunning ? "bg-red-500" : "bg-green-600"
                        }`}
                    >
                      {task.timerRunning ? <FaStop size={14} /> : <FaPlay size={14} />}
                    </button>
                  </td>

                  {/* Actions — Edit/Delete or Save/Cancel depending on mode */}
                  <td className="py-2 px-4 space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          className="text-green-600 hover:underline"
                          onClick={saveEdit}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-500 hover:underline"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(task)}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Edit task"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(task.id)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete task"
                        >
                          <FaTrash size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TaskList
