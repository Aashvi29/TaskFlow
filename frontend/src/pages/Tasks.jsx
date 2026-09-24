import { useEffect, useState } from "react"
import API from "../services/api"

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [editingTask, setEditingTask] = useState(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [toast, setToast] = useState("")

  useEffect(() => {
    getTasks()
  }, [])

  useEffect(() => {
  if (!toast) return

  const timer = setTimeout(() => {
    setToast("")
  }, 3000)

  return () => clearTimeout(timer)
}, [toast])

  const getTasks = async () => {
    try {
      const response = await API.get("/tasks")
      setTasks(response.data.data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }

  const addTask = async (event) => {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    try {
      const response = await API.post("/tasks", {
        title: title,
        description: description,
        priority: priority
      })

      setTasks((currentTasks) => [
        ...currentTasks,
        response.data.data
      ])

      setTitle("")
      setDescription("")
      setPriority("Medium")
      setToast("Task added successfully!")
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  const completeTask = async (id) => {
    try {
      const response = await API.put(`/tasks/${id}`, {
        completed: true
      })

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? response.data.data : task
        )
      )
      setToast("Task completed successfully!")
    } catch (error) {
      console.error("Error completing task:", error)
    }
  }

  const startEditing = (task) => {
    setEditingTask(task)
    setTitle(task.title || "")
    setDescription(task.description || "")
    setPriority(task.priority || "Medium")
  }

  const updateTask = async (event) => {
    event.preventDefault()

    if (!title.trim() || !editingTask) {
      return
    }

    try {
      const response = await API.put(`/tasks/${editingTask.id}`, {
        title: title,
        description: description,
        priority: priority
      })

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? response.data.data
            : task
        )
      )
      setToast("Task updated successfully!")

      cancelEditing()
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`)

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      )
      setToast("Task deleted successfully!")
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const cancelEditing = () => {
    setEditingTask(null)
    setTitle("")
    setDescription("")
    setPriority("Medium")
  }

  const getPriorityStyle = (taskPriority) => {
    switch (taskPriority) {
      case "High":
        return "bg-red-100 text-red-700"

      case "Low":
        return "bg-green-100 text-green-700"

      default:
        return "bg-orange-100 text-orange-700"
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = (task.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Pending" && !task.completed) ||
      (statusFilter === "Completed" && task.completed)

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <header>
        <h2 className="text-3xl font-bold text-gray-800">
          My Tasks
        </h2>

        <p className="mt-2 text-gray-600">
          Here you can manage all your tasks.
        </p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-3">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mt-3">
          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </header>

      <form
        onSubmit={editingTask ? updateTask : addTask}
        className="mt-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors"
          >
            {editingTask ? "Save Changes" : "Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={cancelEditing}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <section className="mt-8">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">
            No tasks found.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <article
              key={task.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 mb-5 shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {task.title}
                </h3>

                <span
                  className={`shrink-0 px-3 py-1 text-sm font-medium rounded-full ${
                    task.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>

              <p className="mt-3 text-gray-600 leading-relaxed">
                {task.description || "No description provided."}
              </p>

              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getPriorityStyle(
                    task.priority
                  )}`}
                >
                  {task.priority || "Medium"} Priority
                </span>
              </div>

              <div className="border-t border-gray-100 mt-5 pt-5">
                <div className="flex flex-wrap gap-2">
                  {!task.completed && (
                    <button
                      onClick={() => completeTask(task.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Complete
                    </button>
                  )}

                  <button
                    onClick={() => startEditing(task)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
      {toast && (
  <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-lg">
    {toast}
  </div>
)}

    </main>
  )
}

export default Tasks