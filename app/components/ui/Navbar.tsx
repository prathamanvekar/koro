"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import check from "@/public/images/checked.png"; // adjust this path to your image import
import { FiExternalLink } from "react-icons/fi";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {
      href: "https://portfolio-opal-three-ipfcqivmmp.vercel.app/",
      label: (
        <span className="flex items-center gap-1">
          Contact <FiExternalLink className="inline-block" size={16} />
        </span>
      ),
    },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/signin", label: "Sign In" },
    { href: "/signup", label: "Sign Up", isPrimary: true },
  ];

  return (
    <>
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.isPrimary ? (
                <Link href={link.href} key={link.href}>
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
                    {link.label}
                  </motion.button>
                </Link>
              ) : (
                <Link href={link.href} key={link.href}>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      color: "#a855f7",
                      textShadow: "0 0 10px rgba(168,85,247,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-white hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.label}
                  </motion.button>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 left-4 right-4 z-50 bg-black/70 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl flex flex-col p-4 gap-3 md:hidden"
          >
            {navLinks.map((link) =>
              link.isPrimary ? (
                <Link
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "rgba(168, 85, 247, 0.2)",
                      borderColor: "#a855f7",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-5 py-3 border border-white rounded-full text-white"
                  >
                    {link.label}
                  </motion.button>
                </Link>
              ) : (
                <Link
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <motion.button
                    whileHover={{ scale: 1.03, color: "#a855f7" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full text-left px-5 py-2 text-white text-base"
                  >
                    {link.label}
                  </motion.button>
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
