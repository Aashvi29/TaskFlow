import { useEffect, useState } from "react"
import API from "../services/api"

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    getTasks()
  }, [])

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
        description: description
      })

      setTasks([...tasks, response.data.data])

      setTitle("")
      setDescription("")
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  const completeTask = async (id) => {
    try {
      const response = await API.put(`/tasks/${id}`, {
        completed: true
      })

      setTasks(
        tasks.map((task) =>
          task.id === id ? response.data.data : task
        )
      )
    } catch (error) {
      console.error("Error completing task:", error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`)

      setTasks(
        tasks.filter((task) => task.id !== id)
      )
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <h2 className="text-3xl font-bold text-gray-800">
        My Tasks
      </h2>

      <p className="mt-2 text-gray-600">
        Here you can manage all your tasks.
      </p>

      <form onSubmit={addTask} className="mt-6 space-y-4">

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Task
        </button>

      </form>

      <div className="mt-8">

        {tasks.length === 0 ? (
          <p className="text-gray-500">
            No tasks found.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="border rounded-lg p-4 mb-3"
            >
              <h3 className="text-lg font-semibold">
                {task.title}
              </h3>

              <p className="text-gray-600">
                {task.description}
              </p>

              <p className="mt-2 text-sm">
                Status: {task.completed ? "Completed" : "Pending"}
              </p>

              {!task.completed && (
                <button
                  onClick={() => completeTask(task.id)}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Complete
                </button>
              )}

              <button
                onClick={() => deleteTask(task.id)}
                className="mt-3 ml-2 bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </main>
  )
}

export default Tasks