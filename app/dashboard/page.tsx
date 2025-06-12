"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  User,
  Calendar,
  Edit3,
  Trash2,
  Check,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CustomDropdown } from "@/app/components/ui/custom-dropdown";
import { useTasks } from "@/app/hooks/use-tasks";
import type { CreateTaskData, UpdateTaskData } from "@/lib/api";
import check from "@/public/images/checked.png";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
  } = useTasks();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [newTask, setNewTask] = useState<Partial<CreateTaskData>>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    category: "",
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full relative z-10"
        />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  // Get unique categories from tasks
  const categories = Array.from(
    new Set(tasks.map((task) => task.category).filter(Boolean))
  );

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;
    const matchesCategory =
      filterCategory === "all" || task.category === filterCategory;
    return matchesSearch && matchesPriority && matchesCategory;
  });

  const handleCreateTask = async () => {
    if (!newTask.title?.trim()) return;

    try {
      await createTask(newTask as CreateTaskData);
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        category: "",
      });
      setShowCreateModal(false);
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category,
    });
    setShowCreateModal(true);
  };

  const handleUpdateTask = async () => {
    if (!editingTask || !newTask.title?.trim()) return;

    try {
      await updateTask(editingTask._id, newTask as UpdateTaskData);
      setEditingTask(null);
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        category: "",
      });
      setShowCreateModal(false);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    try {
      await toggleTaskComplete(taskId);
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-500/10";
      case "medium":
        return "border-yellow-500 bg-yellow-500/10";
      case "low":
        return "border-green-500 bg-green-500/10";
      default:
        return "border-white/20";
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-white";
    }
  };

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High Priority", color: "#ef4444" },
    { value: "medium", label: "Medium Priority", color: "#eab308" },
    { value: "low", label: "Low Priority", color: "#22c55e" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories
      .filter(
        (category): category is string =>
          typeof category === "string" && category.length > 0
      )
      .map((category) => ({ value: category, label: category })),
  ];

  const taskPriorityOptions = [
    { value: "low", label: "Low", color: "#22c55e" },
    { value: "medium", label: "Medium", color: "#eab308" },
    { value: "high", label: "High", color: "#ef4444" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="border-b border-white/10 bg-black/80 backdrop-blur-sm sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.h1
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
              }}
              className="text-2xl font-bold tracking-wider  flex items-center gap-2"
            >
              <img src={check.src} alt="Logo" className="w-8 h-8" />
              koro
            </motion.h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              Welcome, {session?.user?.name}
            </span>
            <Link href="/profile">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(168, 85, 247, 0.2)",
                  borderColor: "#a855f7",
                }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 border border-transparent"
              >
                <User size={20} />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6 relative z-10">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Your Tasks
          </h2>
          <p className="text-gray-400">Stay organized and get things done</p>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm backdrop-blur-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-3 mb-6"
        >
          {/* Search */}
          <motion.div className="relative flex-1" whileHover={{ scale: 1.02 }}>
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-purple-400/60 focus:outline-none transition-all duration-200 placeholder-gray-500 hover:border-white/40"
            />
          </motion.div>

          {/* Priority Filter */}
          <CustomDropdown
            options={priorityOptions}
            value={filterPriority}
            onChange={setFilterPriority}
            placeholder="Priority"
            className="w-full md:w-40"
          />

          {/* Category Filter */}
          <CustomDropdown
            options={categoryOptions}
            value={filterCategory}
            onChange={setFilterCategory}
            placeholder="Category"
            className="w-full md:w-40"
          />

          {/* Create Task Button */}
          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: "white",
              color: "black",
              boxShadow: "0 0 30px rgba(255,255,255,0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-semibold whitespace-nowrap"
          >
            <Plus size={16} />
            New Task
          </motion.button>
        </motion.div>

        {/* Tasks Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid gap-3"
        >
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: -300,
                  scale: 0.8,
                  transition: { duration: 0.4, ease: "easeInOut" },
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                }}
                whileHover={{
                  y: -3,
                  scale: 1.01,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}
                className={`p-4 border rounded-lg transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                  task.completed
                    ? "border-white/10 bg-white/5 opacity-60"
                    : "border-white/20 bg-white/5 hover:border-purple-400/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Checkbox */}
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleToggleComplete(task._id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        task.completed
                          ? "bg-purple-500 border-purple-500"
                          : "border-white/40 hover:border-purple-400"
                      }`}
                    >
                      {task.completed && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            duration: 0.6,
                          }}
                        >
                          <Check size={12} className="text-white" />
                        </motion.div>
                      )}
                    </motion.button>

                    {/* Task Content */}
                    <div className="flex-1">
                      <motion.h3
                        animate={
                          task.completed ? { opacity: 0.6 } : { opacity: 1 }
                        }
                        transition={{ duration: 0.3 }}
                        className={`text-base font-semibold mb-1 ${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </motion.h3>

                      {task.description && (
                        <motion.p
                          animate={
                            task.completed ? { opacity: 0.5 } : { opacity: 1 }
                          }
                          transition={{ duration: 0.3 }}
                          className={`text-gray-400 text-sm mb-2 ${
                            task.completed ? "line-through" : ""
                          }`}
                        >
                          {task.description}
                        </motion.p>
                      )}

                      <div className="flex items-center gap-3 text-xs">
                        {/* Priority */}
                        <span
                          className={`px-2 py-1 rounded-full border text-xs font-medium ${getPriorityColor(
                            task.priority
                          )} ${getPriorityTextColor(task.priority)}`}
                        >
                          {task.priority.toUpperCase()}
                        </span>

                        {/* Due Date */}
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-gray-400">
                            <Calendar size={12} />
                            <span>
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}

                        {/* Category */}
                        {task.category && (
                          <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300">
                            {task.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <motion.button
                      whileHover={{
                        scale: 1.15,
                        backgroundColor: "rgba(168, 85, 247, 0.2)",
                      }}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleEditTask(task)}
                      className="p-1.5 rounded-full hover:bg-purple-500/20 transition-all duration-200"
                    >
                      <Edit3 size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.15,
                        backgroundColor: "rgba(239, 68, 68, 0.2)",
                        rotate: [0, -10, 10, -10, 0],
                      }}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleDeleteTask(task._id)}
                      transition={{ duration: 0.3 }}
                      className="p-1.5 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredTasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-4xl mb-3"
              >
                <Sparkles className="mx-auto text-purple-400" size={48} />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
              <p className="text-gray-400 mb-4 text-sm">
                {searchQuery ||
                filterPriority !== "all" ||
                filterCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "Create your first task to get started"}
              </p>
              {!searchQuery &&
                filterPriority === "all" &&
                filterCategory === "all" && (
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(168, 85, 247, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 text-sm border border-purple-400/30 rounded-lg hover:border-purple-400/60 transition-all duration-200"
                  >
                    Create your first task
                  </motion.button>
                )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Create/Edit Task Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => {
              setShowCreateModal(false);
              setEditingTask(null);
              setNewTask({
                title: "",
                description: "",
                priority: "medium",
                dueDate: "",
                category: "",
              });
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-6 w-full max-w-md"
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {editingTask ? "Edit Task" : "Create New Task"}
              </h3>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <motion.input
                    whileHover={{ scale: 1.02 }}
                    type="text"
                    value={newTask.title || ""}
                    onChange={(e) =>
                      setNewTask((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Enter task title..."
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-purple-400/60 focus:outline-none transition-all duration-200 placeholder-gray-500 hover:border-white/40"
                    autoFocus
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <motion.textarea
                    whileHover={{ scale: 1.02 }}
                    value={newTask.description || ""}
                    onChange={(e) =>
                      setNewTask((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter task description..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-purple-400/60 focus:outline-none transition-all duration-200 placeholder-gray-500 resize-none hover:border-white/40"
                  />
                </div>

                {/* Priority & Due Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Priority
                    </label>
                    <CustomDropdown
                      options={taskPriorityOptions}
                      value={newTask.priority || "medium"}
                      onChange={(value) =>
                        setNewTask((prev) => ({
                          ...prev,
                          priority: value as "low" | "medium" | "high",
                        }))
                      }
                      placeholder="Select priority"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Due Date
                    </label>
                    <motion.input
                      whileHover={{ scale: 1.02 }}
                      type="date"
                      value={newTask.dueDate || ""}
                      onChange={(e) =>
                        setNewTask((prev) => ({
                          ...prev,
                          dueDate: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-purple-400/60 focus:outline-none transition-all duration-200 hover:border-white/40"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <motion.input
                    whileHover={{ scale: 1.02 }}
                    type="text"
                    value={newTask.category || ""}
                    onChange={(e) =>
                      setNewTask((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    placeholder="e.g., Work, Personal, Design..."
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-purple-400/60 focus:outline-none transition-all duration-200 placeholder-gray-500 hover:border-white/40"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02, borderColor: "#a855f7" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingTask(null);
                    setNewTask({
                      title: "",
                      description: "",
                      priority: "medium",
                      dueDate: "",
                      category: "",
                    });
                  }}
                  className="flex-1 px-4 py-3 border border-white/20 rounded-lg hover:border-purple-400/40 transition-all duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "white",
                    color: "black",
                    boxShadow: "0 0 20px rgba(255,255,255,0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={editingTask ? handleUpdateTask : handleCreateTask}
                  disabled={!newTask.title?.trim()}
                  className="flex-1 px-4 py-3 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingTask ? "Update Task" : "Create Task"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
