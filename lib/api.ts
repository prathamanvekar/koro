"use client"

export interface Task {
  _id: string
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  dueDate?: string
  completed: boolean
  createdAt: string
  updatedAt: string
  category?: string
  userId: string
}

export interface CreateTaskData {
  title: string
  description?: string
  priority?: "low" | "medium" | "high"
  dueDate?: string
  category?: string
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  completed?: boolean
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `/api${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Network error" }))
      throw new Error(error.error || "Something went wrong")
    }

    return response.json()
  }

  // Task methods
  async getTasks(): Promise<Task[]> {
    return this.request<Task[]>("/tasks")
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    return this.request<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteTask(id: string): Promise<void> {
    return this.request<void>(`/tasks/${id}`, {
      method: "DELETE",
    })
  }

  // User methods
  async getProfile(): Promise<any> {
    return this.request<any>("/user/profile")
  }

  async updateProfile(data: { name?: string; email?: string; image?: string }): Promise<any> {
    return this.request<any>("/user/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    return this.request<void>("/user/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async deleteAccount(): Promise<void> {
    return this.request<void>("/user/delete-account", {
      method: "DELETE",
    })
  }

  async signUp(data: { name: string; email: string; password: string }): Promise<void> {
    return this.request<void>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

export const api = new ApiClient()
