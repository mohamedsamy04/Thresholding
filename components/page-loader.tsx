"use client"

import { motion } from "framer-motion"

export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-64 h-64">
        {/* Animated grid background representing pixels */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1">
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div
              key={i}
              className="rounded-sm"
              initial={{ backgroundColor: "#6366f1" }}
              animate={{
                backgroundColor: Math.random() > 0.5 ? "#000000" : "#ffffff",
                transition: {
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: i * 0.01,
                  ease: "easeInOut",
                },
              }}
            />
          ))}
        </div>

        {/* Circular scanning effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-white/30"
          style={{ borderRadius: "50%" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Horizontal scanning line */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
          initial={{ top: 0, opacity: 0.7 }}
          animate={{ top: "100%", opacity: 0.9 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Vertical scanning line */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"
          initial={{ left: 0, opacity: 0.7 }}
          animate={{ left: "100%", opacity: 0.9 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 0.75,
          }}
        />

        {/* Center image icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/70"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <motion.path
              d="M21 15l-5-5L5 21"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", repeatDelay: 1 }}
            ></motion.path>
          </svg>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-xl font-medium text-white mb-2">Initializing Thresholding Engine</h3>
        <div className="flex items-center justify-center space-x-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

