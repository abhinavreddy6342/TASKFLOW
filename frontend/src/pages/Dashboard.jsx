import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  ListTodo,
  Plus,
  LogOut,
  RefreshCw,
  ChevronDown,
  Pencil,
  Trash2,
  X,
  Check,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getTasks,
  updateTask,
  deleteTask,
  logoutUser,
} from "../services/api";

import TaskModal from "../components/TaskModal";
import FlickerText from "../components/FlickerText";


/* ========================================================= */
/* DATE HELPERS                                               */
/* ========================================================= */

function getDateOnly(value) {
  if (!value) {
    return "";
  }

  const stringValue = String(value);

  if (/^\d{4}-\d{2}-\d{2}/.test(stringValue)) {
    return stringValue.substring(0, 10);
  }

  return "";
}


function createLocalDate(dateOnly) {
  if (!dateOnly) {
    return null;
  }

  const parts = dateOnly.split("-");

  if (parts.length !== 3) {
    return null;
  }

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return null;
  }

  const date = new Date(
    year,
    month - 1,
    day
  );

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}


function formatDueDate(dateValue) {
  const dateOnly = getDateOnly(dateValue);

  if (!dateOnly) {
    return "No due date";
  }

  const date = createLocalDate(dateOnly);

  if (!date) {
    return "No due date";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


function getTodayDateOnly() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function compareDateOnly(firstDate, secondDate) {
  if (!firstDate || !secondDate) {
    return 0;
  }

  if (firstDate < secondDate) {
    return -1;
  }

  if (firstDate > secondDate) {
    return 1;
  }

  return 0;
}


/* ========================================================= */
/* CYBERPUNK BACKGROUND                                       */
/* ========================================================= */

function CyberBackground() {
  /*
    Generate the particles only once.

    This prevents them from jumping around every render.
  */
  const particles = useMemo(() => {
    return Array.from(
      { length: 55 },
      (_, index) => ({
        id: index,

        left:
          Math.random() * 100,

        size:
          Math.random() * 3 + 1,

        duration:
          Math.random() * 12 + 10,

        delay:
          Math.random() * 12,

        drift:
          Math.random() * 100 - 50,

        opacity:
          Math.random() * 0.45 + 0.15,

        blur:
          Math.random() > 0.75
            ? 1
            : 0,
      })
    );
  }, []);


  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* ================================================= */}
      {/* BASE DARK BACKGROUND                              */}
      {/* ================================================= */}

      <div className="absolute inset-0 bg-[#030712]" />


      {/* ================================================= */}
      {/* CYAN AMBIENT GLOW                                */}
      {/* ================================================= */}

      <motion.div
        className="absolute -left-[180px] -top-[180px] h-[520px] w-[520px] rounded-full bg-cyan-500/[0.08] blur-[150px]"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* ================================================= */}
      {/* VIOLET AMBIENT GLOW                              */}
      {/* ================================================= */}

      <motion.div
        className="absolute -bottom-[180px] -right-[180px] h-[550px] w-[550px] rounded-full bg-violet-500/[0.08] blur-[160px]"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* ================================================= */}
      {/* CENTER CYAN GLOW                                  */}
      {/* ================================================= */}

      <motion.div
        className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.025] blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* ================================================= */}
      {/* DIGITAL GRID                                      */}
      {/* ================================================= */}

      <div
        className="
          absolute inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(34,211,238,1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,1)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />


      {/* ================================================= */}
      {/* SMALLER SECOND GRID                               */}
      {/* ================================================= */}

      <div
        className="
          absolute inset-0
          opacity-[0.018]
          [background-image:linear-gradient(rgba(139,92,246,1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,1)_1px,transparent_1px)]
          [background-size:16px_16px]
        "
      />


      {/* ================================================= */}
      {/* FALLING DIGITAL PARTICLES                         */}
      {/* ================================================= */}

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-300"
          style={{
            left: `${particle.left}%`,
            top: "-20px",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter:
              particle.blur
                ? "blur(1px)"
                : "none",
            boxShadow:
              particle.size > 2.2
                ? "0 0 8px rgba(34,211,238,0.8)"
                : "0 0 4px rgba(34,211,238,0.4)",
          }}
          animate={{
            y: [
              "0vh",
              "35vh",
              "70vh",
              "110vh",
            ],

            x: [
              0,
              particle.drift,
              particle.drift * -0.4,
              particle.drift * 0.6,
            ],

            opacity: [
              0,
              particle.opacity,
              particle.opacity * 0.7,
              0,
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}


      {/* ================================================= */}
      {/* VIOLET PARTICLES                                  */}
      {/* ================================================= */}

      {particles
        .filter(
          (_, index) =>
            index % 7 === 0
        )
        .map((particle) => (
          <motion.span
            key={`violet-${particle.id}`}
            className="absolute rounded-full bg-violet-300"
            style={{
              left: `${particle.left + 2}%`,
              top: "-20px",
              width: `${particle.size + 1}px`,
              height: `${particle.size + 1}px`,
              opacity: 0.25,
              boxShadow:
                "0 0 10px rgba(139,92,246,0.7)",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [
                0,
                particle.drift * -0.6,
                particle.drift,
              ],
              opacity: [
                0,
                0.4,
                0.15,
                0,
              ],
            }}
            transition={{
              duration:
                particle.duration + 4,
              delay:
                particle.delay + 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}


      {/* ================================================= */}
      {/* HORIZONTAL SCAN LINE                             */}
      {/* ================================================= */}

      <motion.div
        className="
          absolute left-0 right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-400/20
          to-transparent
        "
        animate={{
          top: [
            "-5%",
            "105%",
          ],
          opacity: [
            0,
            0.5,
            0,
          ],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
      />


      {/* ================================================= */}
      {/* SECOND SCAN LINE                                 */}
      {/* ================================================= */}

      <motion.div
        className="
          absolute left-0 right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-violet-400/10
          to-transparent
        "
        animate={{
          top: [
            "105%",
            "-5%",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />


      {/* ================================================= */}
      {/* VIGNETTE                                          */}
      {/* ================================================= */}

      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,transparent_30%,rgba(3,7,18,0.55)_100%)]
        "
      />

    </div>
  );
}


/* ========================================================= */
/* DASHBOARD                                                  */
/* ========================================================= */

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isTaskModalOpen, setIsTaskModalOpen] =
    useState(false);

  const [updatingTaskId, setUpdatingTaskId] =
    useState(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [priorityFilter, setPriorityFilter] =
    useState("ALL");


  /* ======================================================= */
  /* LOAD TASKS                                               */
  /* ======================================================= */

  const loadTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.error(
        "Failed to load tasks:",
        error
      );

      toast.error(
        "Unable to load your tasks."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadTasks();
  }, []);


  /* ======================================================= */
  /* TASK CREATED                                             */
  /* ======================================================= */

  const handleTaskCreated = (newTask) => {
    setTasks((previousTasks) => [
      newTask,
      ...previousTasks,
    ]);
  };


  /* ======================================================= */
  /* UPDATE TASK STATUS                                       */
  /* ======================================================= */

  const handleStatusChange = async (
    task,
    newStatus
  ) => {
    if (task.status === newStatus) {
      return;
    }

    try {
      setUpdatingTaskId(task.id);

      const updatedTask =
        await updateTask(task.id, {
          title: task.title,
          description: task.description,
          status: newStatus,
          priority: task.priority,
          due_date: task.due_date
            ? `${getDateOnly(
                task.due_date
              )}T00:00:00`
            : null,
        });

      setTasks((previousTasks) =>
        previousTasks.map(
          (currentTask) =>
            currentTask.id === task.id
              ? updatedTask
              : currentTask
        )
      );

      toast.success(
        "Task status updated."
      );
    } catch (error) {
      console.error(
        "Failed to update task:",
        error
      );

      toast.error(
        error?.response?.data?.detail ||
          "Unable to update task status."
      );
    } finally {
      setUpdatingTaskId(null);
    }
  };


  /* ======================================================= */
  /* EDIT TASK                                                */
  /* ======================================================= */

  const handleTaskUpdate = async (
    task,
    updatedData
  ) => {
    try {
      setUpdatingTaskId(task.id);

      const dueDatePayload =
        updatedData.due_date
          ? `${getDateOnly(
              updatedData.due_date
            )}T00:00:00`
          : null;

      const updatedTask =
        await updateTask(task.id, {
          title: updatedData.title,
          description:
            updatedData.description,
          status: updatedData.status,
          priority: updatedData.priority,
          due_date: dueDatePayload,
        });

      setTasks((previousTasks) =>
        previousTasks.map(
          (currentTask) =>
            currentTask.id === task.id
              ? updatedTask
              : currentTask
        )
      );

      toast.success(
        "Task updated successfully."
      );
    } catch (error) {
      console.error(
        "Failed to update task:",
        error
      );

      toast.error(
        error?.response?.data?.detail ||
          "Unable to update task."
      );
    } finally {
      setUpdatingTaskId(null);
    }
  };


  /* ======================================================= */
  /* DELETE TASK                                              */
  /* ======================================================= */

  const handleTaskDelete = async (
    task
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${task.title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingTaskId(task.id);

      await deleteTask(task.id);

      setTasks((previousTasks) =>
        previousTasks.filter(
          (currentTask) =>
            currentTask.id !== task.id
        )
      );

      toast.success(
        "Task deleted successfully."
      );
    } catch (error) {
      console.error(
        "Failed to delete task:",
        error
      );

      toast.error(
        error?.response?.data?.detail ||
          "Unable to delete task."
      );
    } finally {
      setUpdatingTaskId(null);
    }
  };


  /* ======================================================= */
  /* LOGOUT                                                   */
  /* ======================================================= */

  const handleLogout = () => {
    logoutUser();

    toast.success(
      "Logged out successfully."
    );

    navigate("/login");
  };


  /* ======================================================= */
  /* STATISTICS                                               */
  /* ======================================================= */

  const todoCount = tasks.filter(
    (task) =>
      task.status === "TODO"
  ).length;

  const progressCount = tasks.filter(
    (task) =>
      task.status === "IN_PROGRESS"
  ).length;

  const completedCount = tasks.filter(
    (task) =>
      task.status === "COMPLETED"
  ).length;


  /* ======================================================= */
  /* SEARCH + FILTERS                                         */
  /* ======================================================= */

  const filteredTasks = tasks.filter(
    (task) => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      const matchesSearch =
        !query ||
        task.title
          ?.toLowerCase()
          .includes(query) ||
        task.description
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" ||
        task.priority ===
          priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    }
  );


  /* ======================================================= */
  /* CLEAR FILTERS                                            */
  /* ======================================================= */

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
    setPriorityFilter("ALL");
  };


  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    statusFilter !== "ALL" ||
    priorityFilter !== "ALL";


  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* ================================================= */}
      {/* CYBER BACKGROUND                                  */}
      {/* ================================================= */}

      <CyberBackground />


      {/* ================================================= */}
      {/* MAIN CONTENT                                      */}
      {/* ================================================= */}

      <div className="relative z-10">


        {/* ================================================= */}
        {/* NAVBAR                                           */}
        {/* ================================================= */}

        <nav className="relative border-b border-white/10 bg-black/20 backdrop-blur-xl">

          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

            <div>

              <h1 className="font-display text-2xl tracking-wide">

                <FlickerText>
                  TASKFLOW
                </FlickerText>

              </h1>

              <p className="font-body mt-1 text-xs text-slate-500">
                Organize your work. Stay focused.
              </p>

            </div>


            <button
              onClick={handleLogout}
              className="
                group
                font-body
                relative
                flex
                items-center
                gap-2
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                px-4
                py-2.5
                text-sm
                text-slate-300
                transition
                hover:border-red-400/30
                hover:bg-red-400/10
                hover:text-red-300
              "
            >

              <LogOut className="h-4 w-4" />

              <FlickerText>
                Logout
              </FlickerText>

            </button>

          </div>

        </nav>


        {/* ================================================= */}
        {/* MAIN                                              */}
        {/* ================================================= */}

        <section className="relative mx-auto max-w-7xl px-6 py-10">


          {/* ================================================= */}
          {/* HEADER                                            */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
          >

            <div>

              <p className="font-body mb-2 text-sm text-cyan-300">
                Your workspace
              </p>

              <h2 className="font-display text-4xl tracking-wide sm:text-5xl">

                <FlickerText>
                  Dashboard
                </FlickerText>

              </h2>

              <p className="font-body mt-3 text-sm text-slate-400">
                Manage your tasks and keep your work moving forward.
              </p>

            </div>


            <div className="flex gap-3">

              {/* Refresh */}

              <button
                onClick={loadTasks}
                disabled={loading}
                className="
                  font-body
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-4
                  py-3
                  text-sm
                  text-slate-300
                  transition
                  hover:border-cyan-400/30
                  hover:bg-cyan-400/[0.06]
                  disabled:opacity-60
                "
              >

                <RefreshCw
                  className={`h-4 w-4 ${
                    loading
                      ? "animate-spin"
                      : ""
                  }`}
                />

                <FlickerText>
                  Refresh
                </FlickerText>

              </button>


              {/* New Task */}

              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  setIsTaskModalOpen(true)
                }
                className="
                  font-body
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-slate-950
                  transition
                  hover:bg-cyan-50
                  hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]
                "
              >

                <Plus className="h-4 w-4" />

                <FlickerText>
                  New Task
                </FlickerText>

              </motion.button>

            </div>

          </motion.div>


          {/* ================================================= */}
          {/* STATS                                             */}
          {/* ================================================= */}

          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              icon={
                <ListTodo className="h-5 w-5" />
              }
              label="Total Tasks"
              value={tasks.length}
            />

            <StatCard
              icon={
                <Clock3 className="h-5 w-5" />
              }
              label="To Do"
              value={todoCount}
            />

            <StatCard
              icon={
                <Clock3 className="h-5 w-5" />
              }
              label="In Progress"
              value={progressCount}
            />

            <StatCard
              icon={
                <CheckCircle2 className="h-5 w-5" />
              }
              label="Completed"
              value={completedCount}
            />

          </div>


          {/* ================================================= */}
          {/* TASKS                                             */}
          {/* ================================================= */}

          <section>

            <div className="mb-6 space-y-4">

              <div className="flex items-center justify-between">

                <h3 className="font-display text-xl">

                  <FlickerText>
                    Your Tasks
                  </FlickerText>

                </h3>

                <span className="font-body text-xs text-slate-500">

                  {filteredTasks.length} task
                  {filteredTasks.length !== 1
                    ? "s"
                    : ""}

                </span>

              </div>


              {/* Search + Filters */}

              <div className="grid gap-3 md:grid-cols-3">

                {/* Search */}

                <div className="relative">

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(
                        event.target.value
                      )
                    }
                    placeholder="Search tasks..."
                    className="
                      font-body
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.035]
                      px-4
                      py-3
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-600
                      hover:border-white/20
                      focus:border-cyan-400/50
                      focus:bg-white/[0.05]
                      focus:ring-4
                      focus:ring-cyan-400/5
                    "
                  />

                </div>


                {/* Status Filter */}

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value
                    )
                  }
                  className="
                    font-body
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0b1220]
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    transition
                    hover:border-cyan-400/30
                    focus:border-cyan-400/50
                  "
                >

                  <option value="ALL">
                    All Status
                  </option>

                  <option value="TODO">
                    To Do
                  </option>

                  <option value="IN_PROGRESS">
                    In Progress
                  </option>

                  <option value="COMPLETED">
                    Completed
                  </option>

                </select>


                {/* Priority Filter */}

                <select
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(
                      event.target.value
                    )
                  }
                  className="
                    font-body
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0b1220]
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    transition
                    hover:border-cyan-400/30
                    focus:border-cyan-400/50
                  "
                >

                  <option value="ALL">
                    All Priorities
                  </option>

                  <option value="LOW">
                    Low
                  </option>

                  <option value="MEDIUM">
                    Medium
                  </option>

                  <option value="HIGH">
                    High
                  </option>

                </select>

              </div>

            </div>


            {/* ================================================= */}
            {/* TASK STATES                                       */}
            {/* ================================================= */}

            {loading ? (

              <LoadingState />

            ) : tasks.length === 0 ? (

              <EmptyState
                onCreate={() =>
                  setIsTaskModalOpen(true)
                }
              />

            ) : filteredTasks.length === 0 ? (

              <NoResultsState
                onClear={clearFilters}
              />

            ) : (

              <div className="grid gap-4">

                {filteredTasks.map(
                  (task, index) => (

                    <TaskItem
                      key={task.id}
                      task={task}
                      index={index}
                      updating={
                        updatingTaskId ===
                        task.id
                      }
                      onStatusChange={
                        handleStatusChange
                      }
                      onTaskUpdate={
                        handleTaskUpdate
                      }
                      onTaskDelete={
                        handleTaskDelete
                      }
                    />

                  )
                )}

              </div>

            )}

          </section>

        </section>


        {/* ================================================= */}
        {/* TASK MODAL                                        */}
        {/* ================================================= */}

        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() =>
            setIsTaskModalOpen(false)
          }
          onTaskCreated={
            handleTaskCreated
          }
        />

      </div>

    </main>
  );
}


/* ========================================================= */
/* CYBERPUNK CORNERS                                          */
/* ========================================================= */

function CyberCorners() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[-2px_-2px_10px_rgba(34,211,238,0.7)]" />

      <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[2px_-2px_10px_rgba(34,211,238,0.7)]" />

      <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[-2px_2px_10px_rgba(34,211,238,0.7)]" />

      <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[2px_2px_10px_rgba(34,211,238,0.7)]" />
    </>
  );
}


/* ========================================================= */
/* STAT CARD                                                  */
/* ========================================================= */

function StatCard({
  icon,
  label,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.035]
        p-5
        backdrop-blur-xl
        transition
        duration-300
        hover:border-cyan-400/20
        hover:bg-white/[0.055]
        hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]
      "
    >

      <CyberCorners />

      <div className="relative z-10">

        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
          {icon}
        </div>

        <p className="font-body text-xs uppercase tracking-wider text-slate-500">
          {label}
        </p>

        <p className="font-display mt-2 text-3xl">
          {value}
        </p>

      </div>

    </motion.div>
  );
}


/* ========================================================= */
/* DUE DATE INFORMATION                                       */
/* ========================================================= */

function getDueDateInfo(
  dueDate,
  status
) {
  const dateOnly =
    getDateOnly(dueDate);

  if (!dateOnly) {
    return {
      label: "NO DUE DATE",
      date: null,
      type: "none",
    };
  }

  const today =
    getTodayDateOnly();

  const comparison =
    compareDateOnly(
      dateOnly,
      today
    );

  const formattedDate =
    formatDueDate(dateOnly);


  if (
    status !== "COMPLETED" &&
    comparison < 0
  ) {
    return {
      label: "OVERDUE",
      date: formattedDate,
      type: "overdue",
    };
  }


  if (comparison === 0) {
    return {
      label: "DUE TODAY",
      date: formattedDate,
      type: "today",
    };
  }


  return {
    label: "UPCOMING",
    date: formattedDate,
    type: "upcoming",
  };
}


/* ========================================================= */
/* TASK ITEM                                                   */
/* ========================================================= */

function TaskItem({
  task,
  index,
  updating,
  onStatusChange,
  onTaskUpdate,
  onTaskDelete,
}) {
  const dueDateInfo =
    getDueDateInfo(
      task.due_date,
      task.status
    );

  const [isEditing, setIsEditing] =
    useState(false);

  const [editTitle, setEditTitle] =
    useState(task.title);

  const [editDescription, setEditDescription] =
    useState(
      task.description || ""
    );

  const [editDueDate, setEditDueDate] =
    useState(
      getDateOnly(task.due_date)
    );


  const startEditing = () => {
    setEditTitle(
      task.title
    );

    setEditDescription(
      task.description || ""
    );

    setEditDueDate(
      getDateOnly(
        task.due_date
      )
    );

    setIsEditing(true);
  };


  const cancelEditing = () => {
    setEditTitle(
      task.title
    );

    setEditDescription(
      task.description || ""
    );

    setEditDueDate(
      getDateOnly(
        task.due_date
      )
    );

    setIsEditing(false);
  };


  const saveEditing = async () => {
    const trimmedTitle =
      editTitle.trim();

    if (!trimmedTitle) {
      toast.error(
        "Task title cannot be empty."
      );

      return;
    }

    await onTaskUpdate(
      task,
      {
        title: trimmedTitle,

        description:
          editDescription.trim(),

        status:
          task.status,

        priority:
          task.priority,

        due_date:
          editDueDate
            ? editDueDate
            : null,
      }
    );

    setIsEditing(false);
  };


  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.05,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.035]
        p-5
        backdrop-blur-xl
        transition
        duration-300
        hover:border-cyan-400/20
        hover:bg-white/[0.055]
        hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]
      "
    >

      <CyberCorners />


      <div className="relative z-10 flex flex-col gap-4">


        {/* ================================================= */}
        {/* TASK CONTENT                                      */}
        {/* ================================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">


          {/* Left side */}

          <div className="min-w-0 flex-1">


            {isEditing ? (

              <div className="space-y-3">


                {/* Edit Title */}

                <input
                  type="text"
                  value={editTitle}
                  onChange={(event) =>
                    setEditTitle(
                      event.target.value
                    )
                  }
                  maxLength={200}
                  autoFocus
                  className="
                    font-body
                    w-full
                    rounded-lg
                    border
                    border-cyan-400/30
                    bg-black/40
                    px-3
                    py-2
                    text-sm
                    text-white
                    outline-none
                    transition
                    focus:border-cyan-400/70
                    focus:ring-1
                    focus:ring-cyan-400/30
                  "
                  placeholder="Task title"
                />


                {/* Edit Description */}

                <textarea
                  value={
                    editDescription
                  }
                  onChange={(event) =>
                    setEditDescription(
                      event.target.value
                    )
                  }
                  rows={2}
                  className="
                    font-body
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-white/10
                    bg-black/40
                    px-3
                    py-2
                    text-sm
                    text-slate-300
                    outline-none
                    transition
                    focus:border-cyan-400/50
                  "
                  placeholder="Task description"
                />


                {/* Edit Due Date */}

                <div>

                  <label className="font-body mb-2 flex items-center gap-2 text-xs text-slate-400">

                    <CalendarDays className="h-3.5 w-3.5 text-cyan-300" />

                    Due date

                  </label>


                  <input
                    type="date"
                    value={
                      editDueDate
                    }
                    onChange={(event) =>
                      setEditDueDate(
                        event.target.value
                      )
                    }
                    className="
                      font-body
                      w-full
                      rounded-lg
                      border
                      border-white/10
                      bg-black/40
                      px-3
                      py-2
                      text-sm
                      text-white
                      outline-none
                      transition
                      hover:border-white/20
                      focus:border-cyan-400/50
                    "
                  />

                </div>

              </div>

            ) : (

              <>


                {/* Title */}

                <h4 className="font-display text-lg">

                  <FlickerText>
                    {task.title}
                  </FlickerText>

                </h4>


                {/* Description */}

                {task.description && (
                  <p className="font-body mt-2 text-sm text-slate-400">
                    {
                      task.description
                    }
                  </p>
                )}


                {/* Due Date */}

                <div
                  className={`mt-3 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 ${
                    dueDateInfo.type ===
                    "overdue"
                      ? "border-red-400/20 bg-red-400/10 text-red-300"
                      : dueDateInfo.type ===
                        "today"
                      ? "border-yellow-400/20 bg-yellow-400/10 text-yellow-300"
                      : dueDateInfo.type ===
                        "upcoming"
                      ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                      : "border-white/10 bg-white/[0.03] text-slate-500"
                  }`}
                >

                  <CalendarDays className="h-3.5 w-3.5" />

                  <span className="font-body text-xs">

                    {dueDateInfo.date
                      ? `${dueDateInfo.label} · ${dueDateInfo.date}`
                      : dueDateInfo.label}

                  </span>

                </div>

              </>

            )}

          </div>


          {/* ================================================= */}
          {/* CONTROLS                                           */}
          {/* ================================================= */}

          <div className="flex shrink-0 flex-wrap items-center gap-3">


            {/* Status */}

            <div className="relative">

              <select
                value={
                  task.status
                }
                disabled={
                  updating ||
                  isEditing
                }
                onChange={(event) =>
                  onStatusChange(
                    task,
                    event.target.value
                  )
                }
                className="
                  font-body
                  cursor-pointer
                  appearance-none
                  rounded-lg
                  border
                  border-white/10
                  bg-black/30
                  py-1.5
                  pl-3
                  pr-9
                  text-xs
                  text-slate-200
                  outline-none
                  transition
                  hover:border-cyan-400/30
                  focus:border-cyan-400/50
                  disabled:cursor-wait
                  disabled:opacity-60
                "
              >

                <option
                  value="TODO"
                  className="bg-slate-900"
                >
                  TODO
                </option>

                <option
                  value="IN_PROGRESS"
                  className="bg-slate-900"
                >
                  IN PROGRESS
                </option>

                <option
                  value="COMPLETED"
                  className="bg-slate-900"
                >
                  COMPLETED
                </option>

              </select>


              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />

            </div>


            {/* Priority */}

            <PriorityBadge
              priority={
                task.priority
              }
            />


            {/* Edit / Save */}

            {isEditing ? (

              <>

                {/* Save */}

                <button
                  onClick={
                    saveEditing
                  }
                  disabled={
                    updating
                  }
                  title="Save changes"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-emerald-400/20
                    bg-emerald-400/10
                    text-emerald-300
                    transition
                    hover:border-emerald-400/40
                    hover:bg-emerald-400/20
                    disabled:opacity-50
                  "
                >

                  <Check className="h-4 w-4" />

                </button>


                {/* Cancel */}

                <button
                  onClick={
                    cancelEditing
                  }
                  disabled={
                    updating
                  }
                  title="Cancel"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/10
                    bg-white/5
                    text-slate-400
                    transition
                    hover:border-white/20
                    hover:bg-white/10
                    hover:text-white
                    disabled:opacity-50
                  "
                >

                  <X className="h-4 w-4" />

                </button>

              </>

            ) : (

              <button
                onClick={
                  startEditing
                }
                disabled={
                  updating
                }
                title="Edit task"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-cyan-400/20
                  bg-cyan-400/10
                  text-cyan-300
                  transition
                  hover:border-cyan-400/40
                  hover:bg-cyan-400/20
                  disabled:opacity-50
                "
              >

                <Pencil className="h-4 w-4" />

              </button>

            )}


            {/* Delete */}

            {!isEditing && (
              <button
                onClick={() =>
                  onTaskDelete(
                    task
                  )
                }
                disabled={
                  updating
                }
                title="Delete task"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-red-400/20
                  bg-red-400/10
                  text-red-300
                  transition
                  hover:border-red-400/40
                  hover:bg-red-400/20
                  disabled:opacity-50
                "
              >

                <Trash2 className="h-4 w-4" />

              </button>
            )}

          </div>

        </div>


        {/* Editing Hint */}

        {isEditing && (
          <p className="font-body text-xs text-slate-500">
            Edit the task details and due date, then click the check icon to save.
          </p>
        )}

      </div>

    </motion.div>
  );
}


/* ========================================================= */
/* PRIORITY BADGE                                             */
/* ========================================================= */

function PriorityBadge({
  priority,
}) {
  const styles = {
    LOW:
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",

    MEDIUM:
      "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",

    HIGH:
      "border-red-400/20 bg-red-400/10 text-red-300",
  };

  return (
    <span
      className={`font-body rounded-lg border px-3 py-1.5 text-xs ${
        styles[priority] ||
        "border-white/10 bg-white/5 text-slate-400"
      }`}
    >
      {priority || "MEDIUM"}
    </span>
  );
}


/* ========================================================= */
/* LOADING STATE                                              */
/* ========================================================= */

function LoadingState() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-10 text-center backdrop-blur-xl transition duration-300 hover:border-cyan-400/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]">

      <CyberCorners />

      <div className="relative z-10">

        <RefreshCw className="mx-auto mb-4 h-6 w-6 animate-spin text-cyan-300" />

        <p className="font-body text-sm text-slate-400">
          Loading your tasks...
        </p>

      </div>

    </div>
  );
}


/* ========================================================= */
/* EMPTY STATE                                                */
/* ========================================================= */

function EmptyState({
  onCreate,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-dashed border-white/10 bg-white/[0.025] p-12 text-center backdrop-blur-xl transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.035] hover:shadow-[0_0_25px_rgba(34,211,238,0.06)]">

      <CyberCorners />

      <div className="relative z-10">

        <ListTodo className="mx-auto mb-4 h-10 w-10 text-slate-600" />

        <h4 className="font-display text-lg">
          No tasks yet
        </h4>

        <p className="font-body mt-2 text-sm text-slate-500">
          Create your first task and start organizing your work.
        </p>

        <button
          onClick={
            onCreate
          }
          className="
            font-body
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-white
            px-5
            py-3
            text-sm
            font-semibold
            text-slate-950
            transition
            hover:bg-cyan-50
            hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]
          "
        >

          <Plus className="h-4 w-4" />

          <FlickerText>
            Create your first task
          </FlickerText>

        </button>

      </div>

    </div>
  );
}


/* ========================================================= */
/* NO RESULTS STATE                                           */
/* ========================================================= */

function NoResultsState({
  onClear,
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-12 text-center backdrop-blur-xl">

      <CyberCorners />

      <div className="relative z-10">

        <ListTodo className="mx-auto mb-4 h-10 w-10 text-slate-600" />

        <h4 className="font-display text-lg">
          No matching tasks
        </h4>

        <p className="font-body mt-2 text-sm text-slate-500">
          Try changing your search or filters.
        </p>

        <button
          onClick={
            onClear
          }
          className="
            font-body
            mt-5
            rounded-xl
            border
            border-cyan-400/20
            bg-cyan-400/10
            px-5
            py-3
            text-sm
            text-cyan-300
            transition
            hover:border-cyan-400/40
            hover:bg-cyan-400/20
          "
        >
          Clear filters
        </button>

      </div>

    </div>
  );
}


export default Dashboard;