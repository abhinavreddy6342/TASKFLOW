import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { createTask } from "../services/api";
import FlickerText from "./FlickerText";

function TaskModal({ isOpen, onClose, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    due_date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter a task title.");
      return;
    }

    try {
      setLoading(true);

      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status,
        priority: formData.priority,
        due_date: formData.due_date
          ? new Date(formData.due_date).toISOString()
          : null,
      };

      const newTask = await createTask(taskData);

      toast.success("Task created successfully.");

      setFormData({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        due_date: "",
      });

      onTaskCreated(newTask);
      onClose();
    } catch (error) {
      console.error("Create task error:", error);

      const message =
        error?.response?.data?.detail ||
        "Unable to create task.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="group relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#080d19]/95 p-6 shadow-2xl shadow-black/60 backdrop-blur-2xl transition duration-300 hover:border-cyan-400/20 hover:shadow-[0_0_35px_rgba(34,211,238,0.08)] sm:p-8"
          >
            {/* ================================================== */}
            {/* CYBERPUNK CORNER ACCENTS */}
            {/* ================================================== */}

            {/* Top Left */}
            <span
              className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-cyan-400 opacity-70 shadow-[-3px_-3px_10px_rgba(34,211,238,0.35)] transition-all duration-300 group-hover:h-8 group-hover:w-8 group-hover:opacity-100"
            />

            {/* Top Right */}
            <span
              className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-cyan-400 opacity-70 shadow-[3px_-3px_10px_rgba(34,211,238,0.35)] transition-all duration-300 group-hover:h-8 group-hover:w-8 group-hover:opacity-100"
            />

            {/* Bottom Left */}
            <span
              className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-cyan-400 opacity-70 shadow-[-3px_3px_10px_rgba(34,211,238,0.35)] transition-all duration-300 group-hover:h-8 group-hover:w-8 group-hover:opacity-100"
            />

            {/* Bottom Right */}
            <span
              className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-cyan-400 opacity-70 shadow-[3px_3px_10px_rgba(34,211,238,0.35)] transition-all duration-300 group-hover:h-8 group-hover:w-8 group-hover:opacity-100"
            />

            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 -left-32 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

            {/* Header */}
            <div className="relative mb-7 flex items-start justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/10">
                    <Plus className="h-4 w-4 text-cyan-300" />
                  </div>

                  <span className="font-body text-xs uppercase tracking-wider text-cyan-300">
                    <FlickerText>
                      New Task
                    </FlickerText>
                  </span>
                </div>

                {/* Create a task */}
                <h2 className="font-display text-2xl tracking-wide">
                  <FlickerText>
                    Create a task
                  </FlickerText>
                </h2>

                <p className="font-body mt-2 text-sm text-slate-400">
                  Add something you want to accomplish.
                </p>
              </div>

              {/* Close */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                type="button"
                onClick={onClose}
                className="group/close relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-cyan-300"
              >
                <X className="h-4 w-4 transition-transform duration-300 group-hover/close:rotate-90" />
              </motion.button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="relative space-y-5"
            >
              {/* Title */}
              <div>
                <label className="font-body mb-2 block text-sm font-medium text-slate-300">
                  Task title
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="What needs to be done?"
                  autoFocus
                  className="font-body w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-cyan-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-cyan-400/5"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-body mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Add some details about this task..."
                  className="font-body w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-cyan-400/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-cyan-400/5"
                />
              </div>

              {/* Status + Priority */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Status */}
                <div>
                  <label className="font-body mb-2 block text-sm font-medium text-slate-300">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="font-body w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3.5 text-sm text-white outline-none transition duration-300 hover:border-white/20 focus:border-cyan-400/50"
                  >
                    <option
                      value="TODO"
                      className="bg-[#0b1220]"
                    >
                      To Do
                    </option>

                    <option
                      value="IN_PROGRESS"
                      className="bg-[#0b1220]"
                    >
                      In Progress
                    </option>

                    <option
                      value="COMPLETED"
                      className="bg-[#0b1220]"
                    >
                      Completed
                    </option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="font-body mb-2 block text-sm font-medium text-slate-300">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="font-body w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3.5 text-sm text-white outline-none transition duration-300 hover:border-white/20 focus:border-cyan-400/50"
                  >
                    <option
                      value="LOW"
                      className="bg-[#0b1220]"
                    >
                      Low
                    </option>

                    <option
                      value="MEDIUM"
                      className="bg-[#0b1220]"
                    >
                      Medium
                    </option>

                    <option
                      value="HIGH"
                      className="bg-[#0b1220]"
                    >
                      High
                    </option>
                  </select>
                </div>
              </div>

              {/* Due date */}
              <div>
                <label className="font-body mb-2 block text-sm font-medium text-slate-300">
                  Due date
                </label>

                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                  <input
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                    type="date"
                    className="font-body w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition duration-300 hover:border-white/20 focus:border-cyan-400/50 focus:bg-white/[0.05]"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                {/* Cancel */}
                <motion.button
                  whileHover={{
                    scale: 1.015,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="button"
                  onClick={onClose}
                  className="font-body rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-slate-300 transition duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-200"
                >
                  <FlickerText>
                    Cancel
                  </FlickerText>
                </motion.button>

                {/* Create */}
                <motion.button
                  whileHover={{
                    scale: loading ? 1 : 1.015,
                  }}
                  whileTap={{
                    scale: loading ? 1 : 0.98,
                  }}
                  disabled={loading}
                  type="submit"
                  className="font-body group/create relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-cyan-50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-slate-950" />

                      <FlickerText>
                        Creating...
                      </FlickerText>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 transition-transform duration-300 group-hover/create:rotate-90" />

                      <FlickerText>
                        Create Task
                      </FlickerText>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskModal;