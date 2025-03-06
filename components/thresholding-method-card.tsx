"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface ThresholdingMethodCardProps {
  title: string
  description: string
  isSelected: boolean
  onClick: () => void
  icon: React.ReactNode
}

export default function ThresholdingMethodCard({
  title,
  description,
  isSelected,
  onClick,
  icon,
}: ThresholdingMethodCardProps) {
  return (
    <motion.div
      className={`
        relative rounded-lg p-2 sm:p-3 cursor-pointer overflow-hidden
        ${
          isSelected
            ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-blue-500"
            : "bg-gray-900/40 border border-gray-700 hover:border-gray-500"
        }
      `}
      onClick={onClick}
      whileHover={{ y: -3, boxShadow: "0 8px 20px -10px rgba(59, 130, 246, 0.3)" }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {isSelected && (
        <motion.div
          className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}

      <div className="flex flex-col items-center text-center p-0.5 sm:p-1">
        <div
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${isSelected ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400"} flex items-center justify-center mb-1 sm:mb-2`}
        >
          {icon}
        </div>
        <h4 className={`text-xs sm:text-base font-medium mb-0.5 ${isSelected ? "text-blue-400" : "text-white"}`}>
          {title}
        </h4>
        <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">{description}</p>
      </div>

      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}

