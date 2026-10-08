import { useEffect, useState } from "react"
import API from "../services/api"

function Dashboard() {
  const [tasks, setTasks] = useState([])

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

  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length

  const mediumPriorityTasks = tasks.filter(
    (task) => task.priority === "Medium"
  ).length

  const lowPriorityTasks = tasks.filter(
    (task) => task.priority === "Low"
  ).length

  // Get the 5 most recently created tasks
  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
    )
    .slice(0, 5)

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100)

  const completedPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100)

  const pendingPercentage =
    totalTasks === 0
      ? 0
      : Math.round((pendingTasks / totalTasks) * 100)

  return (
    <main
  className="min-h-screen"
  style={{
    background: "#C9D8D4"
  }}
>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#272544] tracking-tight">
            Dashboard
          </h1>

          <p className="mt-2 text-base text-[#6F6878]">
            Here's an overview of your TaskFlow activity.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          {/* Total Tasks */}
          <div className="relative overflow-hidden bg-[#FCFAF7] border border-[#DDD8DF] rounded-3xl p-6 shadow-[0_8px_28px_rgba(47,43,66,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(47,43,66,0.12)]">

            {/* Decorative Shape */}
            <div className="absolute -right-10 -top-10 w-36 h-32 bg-[#D9D5E8] rounded-[45%_55%_60%_40%] rotate-12 opacity-90"></div>

            <p className="relative z-10 text-[#5A5366] text-sm uppercase tracking-[0.12em] font-medium">
              Total Tasks
            </p>

            <h2 className="relative z-10 text-5xl font-semibold text-[#272544] mt-4 tracking-tight">
              {totalTasks}
            </h2>

            <p className="relative z-10 mt-3 text-sm text-[#6F6878] max-w-[160px] leading-relaxed">
              Everything on your plate.
            </p>
          </div>

          {/* Completed */}
          <div className="relative overflow-hidden bg-[#FCFAF7] border border-[#DDD8DF] rounded-3xl p-6 shadow-[0_8px_28px_rgba(47,43,66,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(47,43,66,0.12)]">

            {/* Decorative Shape */}
            <div className="absolute -left-10 -bottom-10 w-36 h-32 bg-[#C8D2A0] rounded-[55%_45%_40%_60%] -rotate-12 opacity-80"></div>

            <p className="relative z-10 text-[#5A5366] text-sm uppercase tracking-[0.12em] font-medium">
              Completed
            </p>

            <h2 className="relative z-10 text-5xl font-semibold text-[#542F3B] mt-4 tracking-tight">
              {completedTasks}
            </h2>

            <p className="relative z-10 mt-3 text-sm text-[#6F6878] max-w-[180px] leading-relaxed">
              Nice work — you're making progress.
            </p>
          </div>

          {/* Pending */}
          <div className="relative overflow-hidden bg-[#FCFAF7] border border-[#DDD8DF] rounded-3xl p-6 shadow-[0_8px_28px_rgba(47,43,66,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(47,43,66,0.12)]">

            {/* Decorative Shape */}
            <div className="absolute -left-10 -top-10 w-36 h-32 bg-[#E8B9A6] rounded-[45%_55%_55%_45%] rotate-12 opacity-75"></div>

            <p className="relative z-10 text-[#5A5366] text-sm uppercase tracking-[0.12em] font-medium">
              Pending
            </p>

            <h2 className="relative z-10 text-5xl font-semibold text-[#684C68] mt-4 tracking-tight">
              {pendingTasks}
            </h2>

            <p className="relative z-10 mt-3 text-sm text-[#6F6878] max-w-[180px] leading-relaxed">
              A few things still waiting for you.
            </p>
          </div>

          {/* High Priority */}
          <div className="relative overflow-hidden bg-[#FCFAF7] border border-[#DDD8DF] rounded-3xl p-6 shadow-[0_8px_28px_rgba(47,43,66,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(47,43,66,0.12)]">

            {/* Decorative Shape */}
            <div className="absolute -right-10 -bottom-10 w-36 h-32 bg-[#D9A8AF] rounded-[55%_45%_60%_40%] -rotate-12 opacity-75"></div>

            <p className="relative z-10 text-[#5A5366] text-sm uppercase tracking-[0.12em] font-medium">
              High Priority
            </p>

            <h2 className="relative z-10 text-5xl font-semibold text-[#542F3B] mt-4 tracking-tight">
              {highPriorityTasks}
            </h2>

            <p className="relative z-10 mt-3 text-sm text-[#6F6878] max-w-[180px] leading-relaxed">
              These deserve your attention first.
            </p>
          </div>

        </div>

        {/* Completion Rate Hero */}

<div className="mt-6">

  <div className="relative overflow-hidden bg-[#FCFAF7] border border-[#DDD8DF] rounded-3xl p-8 shadow-[0_8px_28px_rgba(47,43,66,0.08)]">
    {/* Wisteria decorative shape */}
    <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-[#C9C1D8] opacity-55">
    </div>

    {/* Warm Honey decorative shape */}
    <div className="absolute right-28 -bottom-16 w-28 h-28 rounded-full bg-[#E8C49A] opacity-35">
    </div>

    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-10">

      {/* Completion Text */}

      <div className="w-full">

        <p className="text-[#8B4B3A] text-sm uppercase tracking-[0.14em] font-medium">
          Completion Rate
        </p>

        <h2 className="text-6xl font-semibold text-[#272544] mt-3 tracking-tight">
          {completionRate}%
        </h2>

        <p className="mt-3 text-sm text-[#756A68] max-w-[380px] leading-relaxed">
          Keep the momentum going. You're making steady progress.
        </p>

        <div className="mt-5 flex items-center gap-3">

          <div className="w-10 h-1 rounded-full bg-[#E8C49A]">
          </div>

          <span className="text-xs uppercase tracking-[0.12em] text-[#756A68]">
            Steady progress
          </span>

        </div>

      </div>


      {/* Circular Progress */}

      <div
        className="relative flex-shrink-0 w-36 h-36 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(
            #684C68 ${completionRate}%,
            #E7E1E8 ${completionRate}% 100%
          )`
        }}
      >

        {/* Inner Circle */}

        <div className="w-28 h-28 rounded-full bg-[#FCFAF7] flex items-center justify-center">

          <div className="text-center">

            <span className="block text-2xl font-semibold text-[#684C68]">
              {completionRate}%
            </span>

            <span className="block text-[10px] uppercase tracking-[0.12em] text-[#756A68] mt-1">
              Complete
            </span>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

        {/* Task Overview + Priority Overview */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

  {/* Task Overview */}
  <div className="relative overflow-hidden bg-[#FCFAF7] border border-[#DDD8DF] rounded-3xl p-7 shadow-[0_8px_28px_rgba(47,43,66,0.08)]">

    {/* Decorative Shape */}
    <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#D9D5E8] opacity-50"></div>

    <div className="relative z-10">

     <p className="text-[#765B6F] text-base font-serif italic tracking-[0.08em]">
  Task Overview
</p>
      <h2 className="text-2xl font-semibold text-[#272544] mt-2">
        Your progress
      </h2>

      <p className="text-sm text-[#6F6878] mt-2">
        A quick look at what's finished and what's still ahead.
      </p>

      {/* Completed */}
      <div className="mt-6">

        <div className="flex items-end justify-between mb-3">

          <div>
            <p className="text-sm font-medium text-[#3F3A4F]">
              Completed
            </p>

            <p className="text-xs text-[#8A8392] mt-1">
              Tasks you've finished
            </p>
          </div>

          <span className="text-xl font-semibold text-[#8B4B3A]">
            {completedTasks}
          </span>

        </div>

        <div className="w-full bg-[#E5E8E4] rounded-full h-2.5 overflow-hidden">

          <div
            className="bg-[#82905D] h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${completedPercentage}%` }}
          ></div>

        </div>

        <p className="text-xs text-[#8A8392] mt-2">
          {completedPercentage}% of all tasks
        </p>

      </div>

      {/* Pending */}
      <div className="mt-7">

        <div className="flex items-end justify-between mb-3">

          <div>
            <p className="text-sm font-medium text-[#3F3A4F]">
              Pending
            </p>

            <p className="text-xs text-[#8A8392] mt-1">
              Tasks still on your list
            </p>
          </div>

          <span className="text-xl font-semibold text-[#684C68]">
            {pendingTasks}
          </span>

        </div>

        <div className="w-full bg-[#E5E8E4] rounded-full h-2.5 overflow-hidden">

          <div
            className="bg-[#E8C49A] h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${pendingPercentage}%` }}
          ></div>

        </div>

        <p className="text-xs text-[#8A8392] mt-2">
          {pendingPercentage}% of all tasks
        </p>

      </div>

    </div>

  </div>


  {/* Priority Overview */}
  <div className="relative overflow-hidden bg-[#FCFAF7] border border-[#DDD8DF] rounded-3xl p-7 shadow-[0_8px_28px_rgba(47,43,66,0.08)]">

    {/* Decorative Shape */}
    <div className="absolute -left-16 -bottom-16 w-40 h-40 rounded-full bg-[#C9D8D4] opacity-80"></div>

    <div className="relative z-10">

     <p className="text-[#765B6F] text-base font-serif italic tracking-[0.08em]">
  Priority Overview
</p>

      <h2 className="text-2xl font-semibold text-[#272544] mt-2">
        What's calling for attention
      </h2>

      <p className="text-sm text-[#6F6878] mt-2">
        See how your workload is distributed by priority.
      </p>


      {/* High Priority */}
      <div className="flex items-center justify-between mt-6 p-4 rounded-2xl bg-[#F4E3E6] border border-[#E4C9CF]">

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-[#8B4B3A]"></div>

          <div>
            <p className="text-sm font-medium text-[#3F3A4F]">
              High Priority
            </p>

            <p className="text-xs text-[#8A8392] mt-1">
              Needs attention first
            </p>
          </div>

        </div>

        <span className="text-xl font-semibold text-[#8B4B3A]">
          {highPriorityTasks}
        </span>

      </div>


      {/* Medium Priority */}
      <div className="flex items-center justify-between mt-4 p-4 rounded-2xl bg-[#F7F0E2] border border-[#E8D9BC]">

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-[#E8C49A]"></div>

          <div>
            <p className="text-sm font-medium text-[#3F3A4F]">
              Medium Priority
            </p>

            <p className="text-xs text-[#8A8392] mt-1">
              Keep these moving
            </p>
          </div>

        </div>

        <span className="text-xl font-semibold text-[#684C68]">
          {mediumPriorityTasks}
        </span>

      </div>


      {/* Low Priority */}
      <div className="flex items-center justify-between mt-4 p-4 rounded-2xl bg-[#EDF1E7] border border-[#D9E0CF]">

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-[#82905D]"></div>

          <div>
            <p className="text-sm font-medium text-[#3F3A4F]">
              Low Priority
            </p>

            <p className="text-xs text-[#8A8392] mt-1">
              No immediate rush
            </p>
          </div>

        </div>

        <span className="text-xl font-semibold text-[#542F3B]">
          {lowPriorityTasks}
        </span>

      </div>

    </div>

  </div>

</div>
        {/* Recent Activity */}
<div className="relative overflow-hidden bg-[#FCFAF7] border border-[#DDD8DF] rounded-3xl p-8 shadow-[0_8px_28px_rgba(47,43,66,0.08)] mt-8">

  {/* Decorative shape */}
  <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#D9D5E8]/60"></div>

  <div className="relative">

    <p className="text-[#765B6F] text-base font-serif italic tracking-[0.08em]">
  Recent Activity
</p>

    <h2 className="text-2xl font-semibold text-[#272544] mt-1">
      Recent Tasks
    </h2>

    <p className="text-sm text-[#6F6875] mt-1">
      A quick look at what's been happening with your tasks.
    </p>

    <div className="mt-6 space-y-3">

      {recentTasks.length === 0 ? (
  <div className="py-10 text-center">
    <div className="mx-auto w-12 h-12 rounded-full bg-[#E7E1E8] flex items-center justify-center">
      <span className="text-xl text-[#684C68]">✦</span>
    </div>

    <h3 className="mt-4 text-base font-semibold text-[#272544]">
      Nothing here yet
    </h3>

    <p className="mt-1 text-sm text-[#6F6875]">
      Create your first task and it will appear here.
    </p>
  </div>
) : (
        recentTasks.map((task) => (
          <div
  key={task.id}
  className="group flex items-center justify-between gap-6 rounded-2xl border border-[#E5E0E4] bg-[#FAF8F6] px-6 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#D9D5E8] hover:bg-[#FCFAF7] hover:shadow-[0_12px_28px_rgba(47,43,66,0.10)]"
>

            {/* Task information */}
            <div className="flex items-center gap-4 min-w-0">

              {/* Status dot */}
             <div
  className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
    task.priority === "High"
      ? "bg-[#E7C0BD]"
      : task.priority === "Medium"
      ? "bg-[#F1D39F]"
      : "bg-[#D4DDBB]"
  }`}
>
  <span
  className={`${
    task.priority === "High"
  ? "text-lg font-bold text-[#8B4B3A]"
  : task.priority === "Medium"
  ? "text-lg font-bold text-[#A66A20]"
  : "text-[#667A3E]"
  }`}
>
  {task.priority === "High" ? (
    "!"
  ) : task.priority === "Medium" ? (
    "✦"
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M5 12.5L9.5 17L19 7" />
    </svg>
  )}
</span>
</div>
              <div className="min-w-0">

                <div className="flex items-center gap-2 min-w-0">
  <span className="w-1.5 h-1.5 rounded-full bg-[#684C68] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"></span>

  <h3 className="font-semibold text-base text-[#272544] truncate transition-colors duration-300 group-hover:text-[#684C68]">
    {task.title}
  </h3>
</div>

                <p className="text-sm text-[#6F6875] truncate">
  {task.description}
</p>

              </div>

            </div>

            {/* Task badges */}
            <div className="flex items-center gap-2 flex-shrink-0">

              {/* Priority */}
              <span
  className={`px-3 py-1.5 rounded-full text-xs font-medium ${
    task.priority === "High"
      ? "bg-[#E7C1BE] text-[#8B4B3A]"
      : task.priority === "Medium"
      ? "bg-[#F1D39F] text-[#76552E]"
      : "bg-[#D4DDBB] text-[#5E6B3F]"
  }`}
>
  {task.priority}
</span>

              {/* Status */}
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  task.completed
                    ? "bg-[#E1E7D5] text-[#687348]"
                    : "bg-[#F4E4C9] text-[#8A6335]"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>

            </div>

          </div>
        ))
      )}

    </div>

  </div>

</div>

      </div>
    </main> 
  )
}

export default Dashboard