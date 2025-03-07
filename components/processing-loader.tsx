"use client"

import { motion } from "framer-motion"

export default function ProcessingLoader() {
  return (
    <div className="relative w-64 h-64">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #3b82f6)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          rotate: 360,
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          backgroundPosition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        }}
      />

      <div className="absolute inset-4 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="transition-colors duration-300"
              initial={{ backgroundColor: "#6366f1" }}
              animate={{
                backgroundColor: Math.random() > 0.5 ? "#000000" : "#ffffff",
              }}
              transition={{
                duration: 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.01,
                repeatDelay: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-blue-500 z-10"
          initial={{ top: 0 }}
          animate={{ top: "100%" }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center shadow-lg"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0)",
              "0 0 0 10px rgba(59, 130, 246, 0.3)",
              "0 0 0 0 rgba(59, 130, 246, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <path d="M12 3v3"></path>
              <path d="M18.4 5.6l-2.1 2.1"></path>
              <path d="M21 12h-3"></path>
              <path d="M18.4 18.4l-2.1-2.1"></path>
              <path d="M12 21v-3"></path>
              <path d="M5.6 18.4l2.1-2.1"></path>
              <path d="M3 12h3"></path>
              <path d="M5.6 5.6l2.1 2.1"></path>
            </svg>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute -bottom-16 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="text-sm font-medium text-blue-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          Applying Threshold Algorithm
        </motion.div>
        <div className="flex items-center justify-center mt-2 space-x-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-purple-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

