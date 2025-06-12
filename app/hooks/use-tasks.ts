"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { api, type Task, type CreateTaskData, type UpdateTaskData } from "@/lib/api"

export function useTasks() {
  const { data: session, status } = useSession()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = async () => {
    if (status !== "authenticated") return

    try {
      setLoading(true)
      const fetchedTasks = await api.getTasks()
      setTasks(fetchedTasks)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [status])

  const createTask = async (data: CreateTaskData) => {
    try {
      const newTask = await api.createTask(data)
      setTasks((prev) => [newTask, ...prev])
      return newTask
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task")
      throw err
    }
  }

  const updateTask = async (id: string, data: UpdateTaskData) => {
    try {
      // Optimistic update
      setTasks((prev) => prev.map((task) => (task._id === id ? { ...task, ...data } : task)))

      const updatedTask = await api.updateTask(id, data)

      // Update with server response
      setTasks((prev) => prev.map((task) => (task._id === id ? updatedTask : task)))

      return updatedTask
    } catch (err) {
      // Revert optimistic update on error
      fetchTasks()
      setError(err instanceof Error ? err.message : "Failed to update task")
      throw err
    }
  }

  const deleteTask = async (id: string) => {
    try {
      // Optimistic update
      setTasks((prev) => prev.filter((task) => task._id !== id))

      await api.deleteTask(id)
    } catch (err) {
      // Revert optimistic update on error
      fetchTasks()
      setError(err instanceof Error ? err.message : "Failed to delete task")
      throw err
    }
  }

  const toggleTaskComplete = async (id: string) => {
    const task = tasks.find((t) => t._id === id)
    if (!task) return

    return updateTask(id, { completed: !task.completed })
  }

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    refetch: fetchTasks,
  }
}
