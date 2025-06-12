"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle,
  Zap,
  Target,
  Brain,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
} from "lucide-react";
import check from "../public/images/checked.png";
import { Navigation } from "./components/ui/Navbar";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroText = "Organize your life with koro";

  useEffect(() => {
    if (isLoading) {
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 1;
          }
          clearInterval(progressTimer);
          setTimeout(() => setIsLoading(false), 500);
          return prev;
        });
      }, 30);

      return () => clearInterval(progressTimer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const textTimer = setInterval(() => {
        setTextIndex((prev) => {
          if (prev < heroText.length) {
            return prev + 1;
          }
          clearInterval(textTimer);
          return prev;
        });
      }, 100);

      return () => clearInterval(textTimer);
    }
  }, [isLoading, heroText.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
        {[...Array(50)].map((_, i) => (
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
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
        }}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
          >
            {/* Black overlay that grows with progress and contains the counter */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.1, ease: "linear" }}
              className="fixed inset-0 bg-black origin-left flex items-center justify-center"
              style={{ zIndex: 10 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-6xl font-bold text-white"
              >
                {progress}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
        <Navigation />
          {/* Navigation
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-white/10"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(255,255,255,0.5)",
                }}
                className="text-2xl font-bold tracking-wider cursor-pointer flex items-center gap-2"
              >
                <img src={check.src} alt="koro logo" className="w-8 h-8" />
                koro
              </motion.div>

              <div className="flex items-center gap-6">
                <Link href="https://portfolio-opal-three-ipfcqivmmp.vercel.app/">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      color: "#a855f7",
                      textShadow: "0 0 10px rgba(168,85,247,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-white hover:text-purple-400 transition-colors duration-200"
                  >
                    Contact
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      color: "#a855f7",
                      textShadow: "0 0 10px rgba(168,85,247,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-white hover:text-purple-400 transition-colors duration-200"
                  >
                    About
                  </motion.button>
                </Link>
                <Link href="/pricing">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      color: "#a855f7",
                      textShadow: "0 0 10px rgba(168,85,247,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-white hover:text-purple-400 transition-colors duration-200"
                  >
                    Pricing
                  </motion.button>
                </Link>
                <Link href="/signin">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      color: "#a855f7",
                      textShadow: "0 0 10px rgba(168,85,247,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-white hover:text-purple-400 transition-colors duration-200"
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link href="/signup">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(168, 85, 247, 0.2)",
                      borderColor: "#a855f7",
                      boxShadow: "0 0 20px rgba(168,85,247,0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 border border-white rounded-full hover:bg-white/10 transition-all duration-200"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.nav> */}

          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="min-h-screen flex items-center justify-center px-6 pt-20 relative"
          >
            <div className="text-center max-w-4xl mx-auto relative">
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight relative"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                whileHover={{
                  scale: 1.02,
                  textShadow: "0 0 30px rgba(168,85,247,0.5)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                >
                  {heroText.slice(0, textIndex)}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      duration: 0.8,
                      repeat:
                        textIndex < heroText.length
                          ? Number.POSITIVE_INFINITY
                          : 0,
                      ease: "easeInOut",
                    }}
                    className="inline-block w-1 h-20 md:h-28 lg:h-36 bg-gradient-to-b from-purple-400 to-blue-400 ml-2 align-top"
                  />
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
                whileHover={{
                  scale: 1.02,
                  color: "#e5e7eb",
                }}
              >
                Simple, powerful, and beautiful task management for the modern
                world
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                <Link href="/signup">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "white",
                      color: "black",
                      boxShadow: "0 0 40px rgba(255,255,255,0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-12 py-4 text-xl font-semibold border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20"
                      whileHover={{ opacity: 0.2 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="py-32 px-6 relative"
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                whileHover={{
                  scale: 1.02,
                  textShadow: "0 0 30px rgba(168,85,247,0.5)",
                }}
              >
                Why koro?
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Minimal",
                    desc: "Clean interface that gets out of your way",
                    icon: <Sparkles size={40} />,
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    title: "Fast",
                    desc: "Lightning quick performance and sync",
                    icon: <Zap size={40} />,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    title: "Focused",
                    desc: "Built for productivity, not distraction",
                    icon: <Target size={40} />,
                    color: "from-teal-500 to-green-500",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{
                      y: -20,
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2,
                    }}
                    viewport={{ once: true }}
                    className="group text-center p-8 border border-white/20 rounded-lg hover:border-white/40 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    <motion.div
                      className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-6`}
                      whileHover={{
                        rotate: 360,
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 relative z-10">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-lg relative z-10">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Task Management Benefits Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="py-32 px-6 relative"
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent"
              >
                Why Task Management Matters
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
              >
                In today's fast-paced world, effective task management isn't
                just helpful—it's essential for success and well-being.
              </motion.p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Brain size={32} />,
                    title: "Reduce Mental Load",
                    desc: "Free your mind from remembering everything by capturing tasks externally",
                    stat: "40%",
                    statDesc: "less stress",
                  },
                  {
                    icon: <Clock size={32} />,
                    title: "Save Time",
                    desc: "Prioritize effectively and focus on what truly matters most",
                    stat: "2.5hrs",
                    statDesc: "saved daily",
                  },
                  {
                    icon: <CheckCircle size={32} />,
                    title: "Boost Productivity",
                    desc: "Complete more tasks with better organization and clear priorities",
                    stat: "60%",
                    statDesc: "more productive",
                  },
                  {
                    icon: <Users size={32} />,
                    title: "Better Collaboration",
                    desc: "Coordinate with teams and share progress transparently",
                    stat: "3x",
                    statDesc: "better teamwork",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 50, rotateY: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    whileHover={{
                      y: -10,
                      rotateY: 5,
                      scale: 1.02,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300 relative overflow-hidden"
                  >
                    <motion.div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                    <motion.div
                      className="text-purple-400 mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {benefit.icon}
                    </motion.div>

                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{benefit.desc}</p>

                    <motion.div
                      className="border-t border-white/20 pt-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-2xl font-bold text-purple-400">
                        {benefit.stat}
                      </div>
                      <div className="text-xs text-gray-500">
                        {benefit.statDesc}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* The Science Behind Productivity Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="py-32 px-6 relative"
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent"
              >
                The Science Behind Productivity
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-8"
              >
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Research shows that our brains can only hold{" "}
                  <span className="text-purple-400 font-semibold">
                    7±2 items
                  </span>{" "}
                  in working memory at once. When we try to remember everything,
                  we create cognitive overload that reduces our ability to think
                  clearly and make decisions.
                </p>

                <motion.div
                  className="grid md:grid-cols-3 gap-6 mt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {[
                    { label: "Decision Fatigue", value: "Reduced by 50%" },
                    { label: "Focus Time", value: "Increased 3x" },
                    { label: "Task Completion", value: "Up 85%" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-teal-400">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-xl text-gray-300"
              >
                That's why external task management systems like{" "}
                <span className="text-purple-400">koro</span> are so
                powerful—they free your mind to focus on what matters most.
              </motion.p>
            </div>
          </motion.section>

          {/* Final CTA Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="py-32 px-6 text-center relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-teal-900/20"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent relative z-10"
            >
              Start Your Productivity Journey
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto relative z-10"
            >
              Join thousands of users who have transformed their productivity
              with koro's simple yet powerful task management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10"
            >
              <Link href="/signup">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "white",
                    color: "black",
                    boxShadow: "0 0 40px rgba(255,255,255,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 text-xl font-semibold bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  Start Free Today
                </motion.button>
              </Link>

              <Link href="/about">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    borderColor: "#a855f7",
                    boxShadow: "0 0 20px rgba(168,85,247,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 text-xl font-semibold border-2 border-white rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </Link>

              <Link href="https://portfolio-opal-three-ipfcqivmmp.vercel.app/">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "white",
                    color: "black",
                    boxShadow: "0 0 40px rgba(255,255,255,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 text-xl font-semibold bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  Contact
                </motion.button>
              </Link>
            </motion.div>
          </motion.section>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="border-t border-white/20 py-12 px-6 text-center relative"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(255,255,255,0.5)",
                }}
                className="text-3xl font-bold mb-4 cursor-pointer"
              >
                koro
              </motion.div>
              <p className="text-gray-400">
                © 2024 koro. Simple task management for everyone.
              </p>
            </div>
          </motion.footer>
        </>
      )}
    </div>
  );
}
