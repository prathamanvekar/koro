"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Save, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import check from "@/public/images/checked.png";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Load profile data
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setProfile({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session, status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
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

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.updateProfile({
        name: profile.name,
        email: profile.email,
      });

      // Update the session
      await update({
        name: profile.name,
        email: profile.email,
      });

      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      setError("New passwords don't match");
      return;
    }

    if (passwords.new.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await api.changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });

      setShowPasswordChange(false);
      setPasswords({ current: "", new: "", confirm: "" });
      setSuccess("Password changed successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to change password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const isGoogleUser = session?.user?.email && session?.user?.image;

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
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(168, 85, 247, 0.2)",
                  rotate: -5,
                }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Profile
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(239, 68, 68, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut size={16} />
              Sign Out
            </motion.button>

            {/* <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "white",
                color: "black",
                boxShadow: "0 0 20px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-semibold disabled:opacity-50"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                />
              ) : (
                <Save size={16} />
              )}
              {isLoading ? "Saving..." : "Save Changes"}
            </motion.button> */}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Success/Error Messages */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm text-center backdrop-blur-sm"
          >
            {success}
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center backdrop-blur-sm"
          >
            {error}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Profile Header */}
          <div className="text-center">
            <motion.h2
              whileHover={{ scale: 1.02 }}
              className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            >
              {profile.name}
            </motion.h2>
            <p className="text-gray-400 text-lg">{profile.email}</p>
            {isGoogleUser && (
              <p className="text-xs text-gray-500 mt-2">Google Account</p>
            )}
          </div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Personal Information</h3>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <motion.input
                  whileHover={{}}
                  type="text"
                  value={profile.name}
                  disabled
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg opacity-60 cursor-not-allowed"
                />
              </div>

                {/* Email */}
                <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <motion.input
                  whileHover={{}}
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg opacity-60 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
                </div>

              {/* Password */}
              {!isGoogleUser && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="flex sm:flex-row flex-col items-center gap-3">
                    <input
                      type="password"
                      value="••••••••••••"
                      disabled
                      className="flex-1 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg opacity-60"
                    />
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(168, 85, 247, 0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowPasswordChange(true)}
                      className="px-6 py-3 border border-white/20 rounded-lg hover:border-purple-400/40 transition-all duration-200"
                    >
                      Change
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Account Settings</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div>
                  <h4 className="font-medium">Account Type</h4>
                  <p className="text-sm text-gray-400">
                    {isGoogleUser
                      ? "Google OAuth Account"
                      : "Email & Password Account"}
                  </p>
                </div>
                <span className="text-sm text-gray-400">
                  {isGoogleUser ? "OAuth" : "Credentials"}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div>
                  <h4 className="font-medium">Member Since</h4>
                  <p className="text-sm text-gray-400">Recently joined</p>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="font-medium text-red-400">Delete Account</h4>
                  <p className="text-sm text-gray-400">
                    Permanently delete your account and all data
                  </p>
                </div>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    if (
                      confirm(
                        "Are you sure you want to delete your account? This action cannot be undone and will delete all your tasks."
                      )
                    ) {
                      try {
                        setIsLoading(true);
                        await api.deleteAccount();
                        await signOut({ callbackUrl: "/" });
                      } catch (err) {
                        setError(
                          err instanceof Error
                            ? err.message
                            : "Failed to delete account"
                        );
                        setIsLoading(false);
                      }
                    }
                  }}
                  className="px-4 py-2 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-200"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Password Change Modal */}
      {showPasswordChange && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowPasswordChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Change Password
            </h3>

            <div className="space-y-4 mb-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <motion.input
                    whileHover={{ scale: 1.02 }}
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        current: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 pr-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-purple-400/60 focus:outline-none transition-all duration-200 hover:border-white/40"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  New Password
                </label>
                <div className="relative">
                  <motion.input
                    whileHover={{ scale: 1.02 }}
                    type={showNewPassword ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords((prev) => ({ ...prev, new: e.target.value }))
                    }
                    className="w-full px-4 py-3 pr-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-purple-400/60 focus:outline-none transition-all duration-200 hover:border-white/40"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </motion.button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <motion.input
                    whileHover={{ scale: 1.02 }}
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        confirm: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 pr-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:border-purple-400/60 focus:outline-none transition-all duration-200 hover:border-white/40"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02, borderColor: "#a855f7" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowPasswordChange(false);
                  setPasswords({ current: "", new: "", confirm: "" });
                  setError("");
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
                onClick={handleChangePassword}
                disabled={
                  !passwords.current ||
                  !passwords.new ||
                  !passwords.confirm ||
                  isLoading
                }
                className="flex-1 px-4 py-3 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Changing..." : "Change Password"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
