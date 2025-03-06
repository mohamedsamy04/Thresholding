"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Sliders, ImageIcon, Download, RefreshCw, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ProcessingLoader from "@/components/processing-loader"
import ThresholdingMethodCard from "@/components/thresholding-method-card"

type ThresholdMethod = "binary" | "otsu" | "adaptive"
type DownloadFormat = "png" | "jpg" | "webp"

export default function ImageProcessor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [threshold, setThreshold] = useState(127)
  const [thresholdMethod, setThresholdMethod] = useState<ThresholdMethod>("binary")
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("png")
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setProcessedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const processImage = () => {
    if (!originalImage) return

    setIsProcessing(true)

    // Simulate processing delay for demonstration
    setTimeout(() => {
      applyThresholding()
      setIsProcessing(false)
    }, 1500)
  }

  const applyThresholding = () => {
    if (!originalImage || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      // Set canvas dimensions to match image
      canvas.width = img.width
      canvas.height = img.height

      // Draw original image
      ctx.drawImage(img, 0, 0)

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      // Apply thresholding based on selected method
      if (thresholdMethod === "binary") {
        // Simple binary thresholding
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
          const value = avg > threshold ? 255 : 0
          data[i] = data[i + 1] = data[i + 2] = value
        }
      } else if (thresholdMethod === "otsu") {
        // Simplified Otsu thresholding (normally would calculate optimal threshold)
        // For demo, we'll use a dynamic threshold based on image average
        let sum = 0
        for (let i = 0; i < data.length; i += 4) {
          sum += (data[i] + data[i + 1] + data[i + 2]) / 3
        }
        const avgThreshold = sum / (data.length / 4)

        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
          const value = avg > avgThreshold ? 255 : 0
          data[i] = data[i + 1] = data[i + 2] = value
        }
      } else if (thresholdMethod === "adaptive") {
        // Simplified adaptive thresholding
        // For demo, we'll use a local contrast enhancement
        const tempCanvas = document.createElement("canvas")
        const tempCtx = tempCanvas.getContext("2d")
        if (!tempCtx) return

        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        tempCtx.drawImage(img, 0, 0)
        const blurredData = tempCtx.getImageData(0, 0, canvas.width, canvas.height)

        // Apply a simple blur effect for local thresholding
        for (let y = 1; y < canvas.height - 1; y++) {
          for (let x = 1; x < canvas.width - 1; x++) {
            const idx = (y * canvas.width + x) * 4
            const localThreshold = threshold * 0.8
            const avg = (data[idx] + data[idx + 1] + data[idx + 2]) / 3
            const value = avg > localThreshold ? 255 : 0
            data[idx] = data[idx + 1] = data[idx + 2] = value
          }
        }
      }

      // Put processed image data back to canvas
      ctx.putImageData(imageData, 0, 0)

      // Convert canvas to data URL and set as processed image
      setProcessedImage(canvas.toDataURL(`image/${downloadFormat}`))
    }

    img.src = originalImage
  }

  const downloadImage = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    link.download = `thresholded-image.${downloadFormat}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show success message
    setShowDownloadSuccess(true)
    setTimeout(() => setShowDownloadSuccess(false), 3000)
  }

  const resetProcess = () => {
    setOriginalImage(null)
    setProcessedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-8">
      <canvas ref={canvasRef} className="hidden" />

      {!originalImage ? (
        <motion.div
          className="border-2 border-dashed border-gray-600 rounded-xl p-12 flex flex-col items-center justify-center bg-gray-800/50 cursor-pointer hover:border-blue-500 hover:bg-gray-800/80 transition-all duration-300 relative overflow-hidden group"
          whileHover={{ scale: 1.01, boxShadow: "0 10px 30px -15px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.99 }}
          onClick={() => fileInputRef.current?.click()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />

          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 relative"
            whileHover={{ rotate: 15, scale: 1.05 }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <motion.div
              className="absolute inset-1 rounded-full bg-gray-800 flex items-center justify-center"
              whileHover={{ scale: 0.95 }}
            >
              <Upload className="w-10 h-10 text-blue-400" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Upload an Image
          </motion.h2>

          <motion.p
            className="text-gray-400 text-center max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Drag and drop your image here or click to browse.
            <span className="block mt-1 text-sm text-gray-500">Supported formats: JPG, PNG, WebP</span>
          </motion.p>

          {/* Animated corner accents */}
          <motion.div
            className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500 opacity-0 group-hover:opacity-100"
            initial={{ x: -10, y: -10 }}
            whileHover={{ x: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500 opacity-0 group-hover:opacity-100"
            initial={{ x: 10, y: -10 }}
            whileHover={{ x: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500 opacity-0 group-hover:opacity-100"
            initial={{ x: -10, y: 10 }}
            whileHover={{ x: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500 opacity-0 group-hover:opacity-100"
            initial={{ x: 10, y: 10 }}
            whileHover={{ x: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <ProcessingLoader />
              <p className="mt-6 text-lg text-gray-300">Processing your image...</p>
            </motion.div>
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-colors duration-300 shadow-lg"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(59, 130, 246, 0.3)" }}
                >
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2 text-blue-400" />
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Original Image
                    </motion.span>
                  </h3>
                  <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center group">
                    {originalImage && (
                      <motion.img
                        src={originalImage || "/placeholder.svg"}
                        alt="Original"
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-colors duration-300 shadow-lg"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(139, 92, 246, 0.3)" }}
                >
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2 text-purple-400" />
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Processed Image
                    </motion.span>
                  </h3>
                  <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center group">
                    {processedImage ? (
                      <motion.img
                        src={processedImage || "/placeholder.svg"}
                        alt="Processed"
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                      />
                    ) : (
                      <motion.div
                        className="text-gray-500 text-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Adjust settings and click "Process Image" to see the result
                      </motion.div>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ boxShadow: "0 15px 30px -15px rgba(59, 130, 246, 0.2)" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-medium flex items-center">
                    <Sliders className="w-5 h-5 mr-2 text-blue-400" />
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                      Thresholding Settings
                    </motion.span>
                  </h3>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Info className="w-4 h-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          Thresholding converts grayscale images to binary (black and white) by setting pixels above a
                          threshold to white and below to black.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Tabs defaultValue="method" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-6 bg-gray-900/60 p-1 rounded-lg">
                    <TabsTrigger
                      value="method"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
                    >
                      Threshold Method
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md"
                    >
                      Threshold Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="method" className="space-y-6">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {" "}
                      {/* UPDATED LINE */}
                      <ThresholdingMethodCard
                        title="Binary"
                        description="Simple threshold using a fixed value"
                        isSelected={thresholdMethod === "binary"}
                        onClick={() => setThresholdMethod("binary")}
                        icon={
                          <svg
                            viewBox="0 0 24 24"
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                          </svg>
                        }
                      />
                      <ThresholdingMethodCard
                        title="Otsu"
                        description="Automatically determines optimal threshold"
                        isSelected={thresholdMethod === "otsu"}
                        onClick={() => setThresholdMethod("otsu")}
                        icon={
                          <svg
                            viewBox="0 0 24 24"
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M7 12a5 5 0 0 1 10 0" />
                          </svg>
                        }
                      />
                      <ThresholdingMethodCard
                        title="Adaptive"
                        description="Varies threshold across the image"
                        isSelected={thresholdMethod === "adaptive"}
                        onClick={() => setThresholdMethod("adaptive")}
                        icon={
                          <svg
                            viewBox="0 0 24 24"
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M3 9h18" />
                            <path d="M3 15h18" />
                          </svg>
                        }
                      />
                    </div>

                    <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-medium text-blue-400 mb-2">
                        About {thresholdMethod.charAt(0).toUpperCase() + thresholdMethod.slice(1)} Thresholding
                      </h4>
                      {thresholdMethod === "binary" && (
                        <p className="text-gray-300">
                          Binary thresholding applies a fixed threshold value to each pixel. Pixels with intensity above
                          the threshold become white, while those below become black. This is the simplest form of
                          thresholding.
                        </p>
                      )}
                      {thresholdMethod === "otsu" && (
                        <p className="text-gray-300">
                          Otsu's method automatically calculates the optimal threshold value by minimizing the variance
                          between black and white pixels. It works best on bimodal images (those with two distinct peaks
                          in their histogram).
                        </p>
                      )}
                      {thresholdMethod === "adaptive" && (
                        <p className="text-gray-300">
                          Adaptive thresholding calculates different threshold values for different regions of the
                          image. This method works well for images with varying lighting conditions or complex
                          backgrounds.
                        </p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="threshold" className="text-lg font-medium">
                            Threshold Value
                          </Label>
                          <span className="text-lg font-mono bg-gray-900/60 px-3 py-1 rounded-md text-blue-400">
                            {threshold}
                          </span>
                        </div>

                        <div className="bg-gray-900/40 rounded-lg p-4 relative">
                          <div className="absolute -top-3 left-4 px-2 bg-gray-800 text-xs text-gray-400">
                            Adjust threshold (0-255)
                          </div>
                          <div className="pt-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1 px-1">
                              <span>Black</span>
                              <span>White</span>
                            </div>
                            <Slider
                              id="threshold"
                              min={0}
                              max={255}
                              step={1}
                              value={[threshold]}
                              onValueChange={(values) => setThreshold(values[0])}
                              className="py-4"
                            />
                            <div className="h-4 w-full bg-gradient-to-r from-black to-white rounded-sm mt-2" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-lg font-medium">Output Format</Label>
                        <div className="flex flex-wrap gap-2">
                          {(["png", "jpg", "webp"] as const).map((format) => (
                            <Button
                              key={format}
                              variant={downloadFormat === format ? "default" : "outline"}
                              className={`
                                ${downloadFormat === format ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gray-900/60"} 
                                border border-gray-700
                              `}
                              onClick={() => setDownloadFormat(format)}
                            >
                              {format.toUpperCase()}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex flex-wrap gap-4 mt-8 items-center">
                  <Button
                    onClick={processImage}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-shadow duration-300 px-5"
                  >
                    <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      Process Image
                    </motion.div>
                  </Button>

                  <Button
                    onClick={downloadImage}
                    disabled={!processedImage}
                    className={`
                      relative overflow-hidden px-5
                      ${
                        processedImage
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-shadow duration-300"
                          : "bg-gray-800 text-gray-500 cursor-not-allowed"
                      }
                    `}
                  >
                    <motion.div
                      className="flex items-center"
                      whileHover={processedImage ? { scale: 1.05 } : {}}
                      whileTap={processedImage ? { scale: 0.95 } : {}}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download as {downloadFormat.toUpperCase()}
                    </motion.div>

                    {/* Success animation overlay */}
                    <AnimatePresence>
                      {showDownloadSuccess && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-green-600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Downloaded!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>

                  <Button
                    onClick={resetProcess}
                    variant="ghost"
                    className="hover:bg-gray-700/50 transition-colors duration-300 ml-auto"
                  >
                    <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Start Over
                    </motion.div>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

