"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Attribution() {
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-10 bg-gray-900/30 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-300 border border-gray-700/30"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 0.8, y: 0 }}
      transition={{ delay: 1 }}
      whileHover={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2">
        <span>Created by</span>
        <Link
          href="https://portfolio-psi-two-81.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          Mohamed Samy
        </Link>
      </div>
    </motion.div>
  )
}

