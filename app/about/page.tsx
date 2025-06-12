"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Code, BookOpen, Rocket, Coffee, Github, Linkedin, Mail } from "lucide-react"
import check from "@/public/images/checked.png"

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const skills = [
    { name: "React & Next.js", level: 85, color: "from-blue-500 to-cyan-500" },
    { name: "TypeScript", level: 80, color: "from-purple-500 to-pink-500" },
    { name: "Node.js", level: 75, color: "from-green-500 to-teal-500" },
    { name: "MongoDB", level: 70, color: "from-orange-500 to-red-500" },
    { name: "UI/UX Design", level: 65, color: "from-indigo-500 to-purple-500" },
  ]

  const projects = [
    {
      name: "koro",
      description: "A beautiful task management app with modern animations",
      tech: ["Next.js", "MongoDB", "Framer Motion", "NextAuth"],
      status: "In Progress",
    },
    {
      name: "Portfolio Website",
      description: "Personal portfolio showcasing my development journey",
      tech: ["React", "Tailwind CSS", "Three.js"],
      status: "Completed",
    },
    {
      name: "AI Medical Vision Bot",
      description: "An AI-powered chatbot for medical consultations",
      tech: ["Python", "Grok API", "Streamlit"],
      status: "Completed",
    },
  ]

const learningGoals = [
    { icon: <Code size={24} />, title: "Full-Stack Mastery", desc: "Becoming proficient in end-to-end development" },
    { icon: <Rocket size={24} />, title: "Modern Frameworks", desc: "Exploring cutting-edge technologies and tools" },
    {
        icon: <Code size={24} />,
        title: "DSA & LeetCode",
        desc: "Solved 100+ problems to strengthen my data structures and algorithms skills",
    },
]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background - Same as Homepage */}
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

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  rotate: -5,
                }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>
            <motion.div
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
              }}
              className="text-2xl font-bold tracking-wider flex items-center gap-2"
              >
                <img src={check.src} alt="koro logo" className="w-8 h-8" />
              koro
            </motion.div>
          </div>

          <div className="flex items-center gap-4">
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
      </motion.nav>

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
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight relative"
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 40px rgba(168,85,247,0.6)",
            }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Hi, I'm Prathamesh
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            A passionate developer on a journey to master full-stack development by building real-world projects like
            koro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {[
              { icon: <Code size={20} />, text: "Full-Stack Developer" },
              { icon: <Coffee size={20} />, text: "Coffee Enthusiast" },
              { icon: <BookOpen size={20} />, text: "Continuous Learner" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/20"
              >
                <span className="text-purple-400">{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: <Github size={20} />, href: "#", label: "GitHub" },
              { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
              { icon: <Mail size={20} />, href: "mailto:prathamesh@example.com", label: "Email" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(168, 85, 247, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/5 border border-white/20 rounded-full hover:border-purple-400/50 transition-all duration-200"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* My Journey Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-32 px-6 relative"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            My Development Journey
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-12"
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I'm a student and aspiring full-stack developer who learns by building real-world apps, not just following tutorials. I love solving practical problems through code.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
                koro is my passion project, built with Next.js, MongoDB, NextAuth, and Framer Motion. Every feature comes from hands-on research and experimentation.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
                Alongside building projects, I regularly practice DSA and LeetCode to sharpen my problem-solving skills and aim to become a well-rounded developer.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-32 px-6 relative"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent"
          >
            Skills & Technologies
          </motion.h2>

          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
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
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent"
          >
            Projects I'm Working On
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300 relative overflow-hidden"
              >
                <motion.div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      project.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : project.status === "In Progress"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-white/10 rounded text-xs text-purple-300 border border-purple-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Learning Goals Section */}
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
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent"
          >
            What I'm Learning
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {learningGoals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{
                  y: -20,
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
                className="group text-center p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl hover:border-white/40 transition-all duration-300 relative overflow-hidden"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.div
                  className="inline-flex p-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mb-6 text-white"
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {goal.icon}
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 relative z-10">{goal.title}</h3>
                <p className="text-gray-400 text-lg relative z-10">{goal.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
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
          Let's Connect!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto relative z-10"
        >
          I'm always excited to connect with fellow developers, share knowledge, and learn from the community.
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
              Try koro
            </motion.button>
          </Link>

          <motion.a
            href="https://portfolio-opal-three-ipfcqivmmp.vercel.app/"
            whileHover={{
              scale: 1.05,
              borderColor: "#a855f7",
              boxShadow: "0 0 20px rgba(168,85,247,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 text-xl font-semibold border-2 border-white rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Get in Touch
          </motion.a>
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
            className="text-3xl font-bold mb-4"
          >
            koro
          </motion.div>
          <p className="text-gray-400">© 2024 koro. Built with ❤️ by Prathamesh Anvekar</p>
        </div>
      </motion.footer>
    </div>
  )
}
