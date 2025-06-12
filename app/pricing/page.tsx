"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Check, X, ArrowRight, Sparkles, Gift, Zap, Coffee } from "lucide-react"
import check from "@/public/images/checked.png"
import { Navigation } from "../components/ui/Navbar"

export default function PricingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    { name: "Unlimited Tasks", included: true },
    { name: "Task Categories", included: true },
    { name: "Priority Levels", included: true },
    { name: "Due Dates", included: true },
    { name: "Beautiful UI", included: true },
    { name: "Responsive Design", included: true },
    { name: "Dark Mode", included: true },
    { name: "Customer Support", included: true, note: "Via telepathy" },
    { name: "AI Task Suggestions", included: false, note: "Coming never" },
    { name: "Time Travel", included: false, note: "Physics won't allow it" },
  ]

  const testimonials = [
    {
      quote:
        "I was going to pay for a task app, but then I found koro. Now I can spend that money on more important things, like avocado toast.",
      author: "Millennial User",
    },
    {
      quote: "This app is so free, I checked my bank account just to make sure they weren't secretly charging me.",
      author: "Suspicious User",
    },
    {
      quote: "I offered to pay for this app, but they refused. Something about 'learning by building' or whatever.",
      author: "Confused User",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
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

      <Navigation />
      {/* Navigation
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
              }}
              className="text-2xl font-bold tracking-wider flex items-center gap-2"
            >
              <img src={check.src} alt="Logo" className="w-8 h-8" />
              koro
            </motion.div>
          </Link>

          <div className="flex items-center gap-4">
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
        className="min-h-[50vh] flex items-center justify-center px-6 pt-32 relative"
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
            className="text-6xl md:text-7xl font-bold mb-8 leading-tight relative"
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 40px rgba(168,85,247,0.6)",
            }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Our Pricing
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            The most competitive pricing in the industry. So competitive, it's literally free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {[
              { icon: <Gift size={20} />, text: "No Credit Card Required" },
              { icon: <Coffee size={20} />, text: "Save Money For Coffee" },
              { icon: <Zap size={20} />, text: "Unlimited Everything" },
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
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 px-6 relative"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-purple-500 to-blue-500 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                POPULAR
              </div>

              <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
              <p className="text-gray-400 mb-6">For everyone</p>

              <div className="flex items-end gap-1 mb-6">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-gray-400 mb-1">/forever</span>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "white",
                  color: "black",
                  boxShadow: "0 0 30px rgba(255,255,255,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 mb-8"
              >
                Get Started
              </motion.button>

              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <motion.li
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    {feature.included ? (
                      <Check size={18} className="text-green-400 shrink-0" />
                    ) : (
                      <X size={18} className="text-gray-500 shrink-0" />
                    )}
                    <span className={feature.included ? "text-white" : "text-gray-500"}>
                      {feature.name}
                      {feature.note && <span className="text-xs text-gray-500 ml-2">({feature.note})</span>}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Premium Plan (Joke) */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-gray-500 to-gray-700 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                IMAGINARY
              </div>

              <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
              <p className="text-gray-400 mb-6">For people who hate money</p>

              <div className="flex items-end gap-1 mb-6">
                <span className="text-5xl font-bold line-through text-gray-400">$9.99</span>
                <span className="text-gray-400 mb-1">/month</span>
                <span className="ml-2 text-xl font-bold text-green-400">$0</span>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(168, 85, 247, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-transparent border-2 border-gray-500 text-gray-400 rounded-lg font-semibold transition-all duration-300 mb-8 cursor-not-allowed"
              >
                Still Free
              </motion.button>

              <ul className="space-y-3">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <Check size={18} className="text-green-400 shrink-0" />
                  <span className="text-white">Everything in Free Plan</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <Check size={18} className="text-green-400 shrink-0" />
                  <span className="text-white">
                    A warm feeling of supporting a developer
                    <span className="text-xs text-gray-500 ml-2">(Emotional support only)</span>
                  </span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <Check size={18} className="text-green-400 shrink-0" />
                  <span className="text-white">
                    Exclusive bragging rights
                    <span className="text-xs text-gray-500 ml-2">(No one will believe you)</span>
                  </span>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 px-6 relative"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-8">
            {[
              {
                question: "Wait, it's really free?",
                answer:
                  "Yes, it's 100% free. No hidden fees, no 'premium' features, no 'we'll email you every day until you pay' tactics. Just a simple, free task management app built by a developer who's learning by building.",
              },
              {
                question: "What's the catch?",
                answer:
                  "The only catch is that this is a learning project. It might not have all the features of paid alternatives, and I might be using your tasks to train my AI overlord. (Just kidding about that last part... or am I?)",
              },
              {
                question: "How do you make money?",
                answer:
                  "I don't! This is a portfolio project to showcase my skills. My payment is the knowledge I gain and the tears I shed debugging at 3 AM.",
              },
              {
                question: "Can I donate?",
                answer:
                  "While I appreciate the thought, this project is about learning. Instead, consider sharing feedback or reporting bugs to help me improve. Or buy yourself a coffee – you deserve it for finding such an awesome free app!",
              },
              {
                question: "Will it always be free?",
                answer:
                  "Yes, this version will always be free. If I ever decide to create a 'koro Pro' with advanced features in the future, the current functionality will remain free forever.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 px-6 relative"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            What Our Users Say
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
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
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 relative overflow-hidden"
              >
                <motion.div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <div className="text-4xl text-purple-400 mb-4">❝</div>
                <p className="text-gray-300 mb-6 italic">{testimonial.quote}</p>
                <div className="text-sm text-gray-400">— {testimonial.author}</div>
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

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="inline-block mb-8 relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-30"
          />
          <Sparkles size={48} className="text-purple-400 relative z-10" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent relative z-10"
        >
          Ready to Pay Nothing?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto relative z-10"
        >
          Join thousands of users who are saving exactly $0 by using koro instead of overpriced alternatives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative z-10"
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
              className="group px-12 py-4 text-xl font-semibold bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Get Started For Free
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <ArrowRight size={20} />
                </motion.div>
              </span>
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
            className="text-3xl font-bold mb-4"
          >
            koro
          </motion.div>
          <p className="text-gray-400">© 2024 koro. Free today. Free tomorrow. Free forever.</p>
        </div>
      </motion.footer>
    </div>
  )
}
