"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get("code")

    if (code) {
      // Exchange code for user info
      fetch(`/api/auth/google-info?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.email && data.name) {
            // Send user data to parent window
            window.opener?.postMessage(
              {
                type: "GOOGLE_USER_DATA",
                email: data.email,
                name: data.name,
                image: data.picture,
              },
              window.location.origin,
            )
          }
          window.close()
        })
        .catch((error) => {
          console.error("Error getting Google user info:", error)
          window.close()
        })
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Getting your Google account info...</p>
      </div>
    </div>
  )
}
