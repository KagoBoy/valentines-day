"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye } from "lucide-react"

interface StreetViewEmbedProps {
  location: {
    name: string
    coordinates: { lat: number; lng: number }
    heading?: number
    pitch?: number
    fov?: number
  }
  isVisible: boolean
}

export const StreetViewEmbed = ({ location, isVisible }: StreetViewEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const getStreetViewUrl = () => {
    const apiKey = "AIzaSyChQma4b9hM1ZGbk_Xc4iazklALXUbsPrI"
    const { lat, lng } = location.coordinates
    const heading = location.heading || 0
    const pitch = location.pitch || 0
    const fov = location.fov || 90

    return `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&fov=${fov}`
  }

  return (
    <motion.div
      className="w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100 relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {isVisible && (
        <>
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4 relative">
            {/* Street View placeholder */}
            <div className="text-center">
              <div className="bg-white/90 rounded-full p-4 mb-4 shadow-lg">
                <Eye className="text-blue-600 mx-auto" size={32} />
              </div>

              <h4 className="font-bold text-blue-800 mb-2">{location.name}</h4>
              <p className="text-blue-600 text-sm mb-4">Vista Street View</p>

              <button
                onClick={() => {
                  const { lat, lng } = location.coordinates
                  const heading = location.heading || 0
                  const pitch = location.pitch || 0
                  window.open(
                    `https://www.google.com/maps/@${lat},${lng},3a,75y,${heading}h,${pitch}t/data=!3m6!1e1`,
                    "_blank",
                  )
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Eye size={16} />
                Abrir Street View
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-2 right-2 text-xs bg-white/80 px-2 py-1 rounded">360° View</div>
          </div>
        </>
      )}
    </motion.div>
  )
}
