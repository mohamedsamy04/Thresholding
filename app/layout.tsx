import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import InitialLoader from "@/components/initial-loader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Thresholding Image Processor",
  description: "Transform your images with powerful thresholding techniques , created by Mohamed Samy",
    generator: 'Mohamed Samy'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InitialLoader />
        {children}
      </body>
    </html>
  )
}



import './globals.css'