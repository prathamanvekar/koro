"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { api } from "@/lib/api"

export function useProfile() {
  const { data: session, status, update } = useSession()
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    if (status !== "authenticated") return

    try {
      setLoading(true)
      const profileData = await api.getProfile()
      setProfile({
        name: profileData.name || "",
        email: profileData.email || "",
        image: profileData.image || "",
      })
      setError(null)
    } catch (err) {
      // If API fails, fall back to session data
      if (session?.user) {
        setProfile({
          name: session.user.name || "",
          email: session.user.email || "",
          image: session.user.image || "",
        })
      }
      setError(err instanceof Error ? err.message : "Failed to fetch profile")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [status])

  const updateProfile = async (data: { name?: string; email?: string; image?: string }) => {
    try {
      const updatedProfile = await api.updateProfile(data)

      setProfile({
        name: updatedProfile.name || "",
        email: updatedProfile.email || "",
        image: updatedProfile.image || "",
      })

      // Update the session
      await update({
        name: updatedProfile.name,
        email: updatedProfile.email,
        image: updatedProfile.image,
      })

      return updatedProfile
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
      throw err
    }
  }

  const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
    try {
      await api.changePassword(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password")
      throw err
    }
  }

  const deleteAccount = async () => {
    try {
      await api.deleteAccount()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete account")
      throw err
    }
  }

  return {
    profile,
    setProfile,
    loading,
    error,
    updateProfile,
    changePassword,
    deleteAccount,
    refetch: fetchProfile,
  }
}
