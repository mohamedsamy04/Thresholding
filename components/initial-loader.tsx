"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function InitialLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time - in a real app, this would be based on actual resource loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-80 h-80">
            {/* Background grid */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1 opacity-20">
              {Array.from({ length: 100 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-700 rounded-sm"
                  animate={{
                    backgroundColor: Math.random() > 0.5 ? "#000000" : "#ffffff",
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: i * 0.005,
                  }}
                />
              ))}
            </div>

            {/* Main logo/icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative w-40 h-40">
                {/* Circular gradient background */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                {/* Inner circle with threshold effect */}
                <div className="absolute inset-4 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center">
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-gray-400 to-white"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />

                  {/* Threshold line */}
                  <motion.div
                    className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-500"
                    animate={{
                      height: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  />

                  {/* Binary pixels */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          backgroundColor: Math.random() > 0.5 ? "#000000" : "#ffffff",
                          opacity: Math.random() > 0.7 ? 0.8 : 0,
                        }}
                        transition={{
                          duration: 0.2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: i * 0.02,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                Thresholding Processor
              </h1>
              <div className="flex justify-center items-center space-x-2">
                <motion.div
                  className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  animate={{
                    width: ["20%", "100%", "20%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <p className="text-gray-400 text-sm">Loading</p>
                <motion.div
                  className="flex space-x-1"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-blue-500"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

