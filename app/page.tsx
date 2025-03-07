import { Suspense } from "react"
import ImageProcessor from "@/components/image-processor"
import PageLoader from "@/components/page-loader"
import Attribution from "@/components/attribution"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500 tracking-tight">
          Thresholding Image Processor
        </h1>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
          Transform your images with powerful thresholding techniques. Upload an image and convert it to a high-contrast
          black and white version in seconds.
        </p>

        <Suspense fallback={<PageLoader />}>
          <ImageProcessor />
        </Suspense>

        <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-blue-500/30 blur-sm hidden md:block" />
        <div className="absolute top-40 right-20 w-6 h-6 rounded-full bg-purple-500/30 blur-sm hidden md:block" />
        <div className="absolute bottom-20 left-1/4 w-5 h-5 rounded-full bg-blue-500/30 blur-sm hidden md:block" />
      </div>

      <Attribution />
    </main>
  )
}

