"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, ExternalLink } from "lucide-react"

interface GoogleMapsEmbedProps {
  location: {
    name: string
    placeId?: string
    query: string
    link: string
    special: boolean
    coordinates?: { lat: number; lng: number }
  }
  isVisible: boolean
}

export const GoogleMapsEmbed = ({ location, isVisible }: GoogleMapsEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)

  // Generate embed URL with your API key
  const getEmbedUrl = () => {
    // Priorize coordinates if available
    if (location.coordinates) {
      const { lat, lng } = location.coordinates
      const apiKey = "AIzaSyChQma4b9hM1ZGbk_Xc4iazklALXUbsPrI"
      return `https://maps.googleapis.com/maps/api/js?key=${apiKey}&center=${lat},${lng}&zoom=15&maptype=roadmap`
    }

    // Fall back to query if no coordinates
    const encodedQuery = encodeURIComponent(location.query)
    const apiKey = "AIzaSyChQma4b9hM1ZGbk_Xc4iazklALXUbsPrI"
    return `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodedQuery}&zoom=15&maptype=roadmap`
  }

  // Alternative embed URL for places with place ID
  const getPlaceEmbedUrl = (placeId: string) => {
    const apiKey = "AIzaSyChQma4b9hM1ZGbk_Xc4iazklALXUbsPrI"
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}&zoom=15`
  }

  const embedUrl = location.placeId ? getPlaceEmbedUrl(location.placeId) : getEmbedUrl()

  const handleLoadError = () => {
    setLoadError(true)
    setIsLoaded(true)
  }

  return (
    <motion.div
      className="w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {isVisible && (
        <div className="relative w-full h-full">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoaded(true)}
            onError={handleLoadError}
            className="w-full h-full"
          />

          {/* Overlay with location info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="text-sm font-medium">{location.name}</span>
              </div>
              <button
                onClick={() => window.open(location.link, "_blank")}
                className="flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 rounded px-2 py-1 transition-colors"
              >
                <ExternalLink size={12} />
                Abrir
              </button>
            </div>
          </div>

          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Error fallback */}
          {loadError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4">
              <MapPin size={24} className="text-blue-600 mb-2" />
              <p className="text-sm text-center text-gray-600">{location.name}</p>
              <button
                onClick={() => window.open(location.link, "_blank")}
                className="mt-2 flex items-center gap-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1 transition-colors"
              >
                <ExternalLink size={12} />
                Ver no Google Maps
              </button>
            </div>
          )}

          {/* Special location indicator */}
          {location.special && (
            <div className="absolute top-2 right-2">
              <div className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                ❤️ Especial
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
