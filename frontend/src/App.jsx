import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Tasks from "./pages/Tasks"

function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800">
        Welcome to TaskFlow
      </h2>

      <p className="mt-2 text-gray-600">
        Manage your tasks efficiently and stay organized.
      </p>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App