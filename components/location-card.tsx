"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Heart, ExternalLink, Navigation, Clock, Camera, Eye, Map } from "lucide-react"
import { GoogleMapsEmbed } from "./google-maps-embed"
import { StreetViewEmbed } from "./street-view-embed"

interface LocationCardProps {
  location: {
    id: number
    name: string
    special: boolean
    query: string
    link: string
    placeId?: string
    coordinates?: { lat: number; lng: number }
    streetView?: {
      heading?: number
      pitch?: number
      fov?: number
    }
    description?: string
    memories?: string[]
  }
  isSelected: boolean
  onSelect: () => void
  onCollectFragment?: () => void
  showFragment: boolean
}

export const LocationCard = ({
  location,
  isSelected,
  onSelect,
  onCollectFragment,
  showFragment,
}: LocationCardProps) => {
  const [viewMode, setViewMode] = useState<"map" | "streetview">("map")

  const handleClick = () => {
    onSelect()
    if (location.special && onCollectFragment) {
      onCollectFragment()
    }
  }

  const locationDetails = {
    0: {
      description: "Onde nossos olhares se cruzaram pela primeira vez",
      memories: ["Primeiro encontro", "Nervosismo gostoso", "Início de tudo"],
      icon: Heart,
    },
    1: {
      description: "O lugar do nosso primeiro beijo mágico",
      memories: ["Primeiro beijo", "Borboletas no estômago", "Momento inesquecível"],
      icon: Heart,
    },
    2: {
      description: "Nosso cantinho especial para encontros",
      memories: ["Conversas longas", "Risadas", "Sabores compartilhados"],
      icon: Camera,
    },
    3: {
      description: "Caminhadas românticas e momentos de paz",
      memories: ["Pôr do sol", "Mãos dadas", "Planos para o futuro"],
      icon: Clock,
    },
    4: {
      description: "Onde sonhamos construir nossa vida juntos",
      memories: ["Sonhos compartilhados", "Futuro", "Lar doce lar"],
      icon: Heart,
    },
  }

  const details = locationDetails[location.id as keyof typeof locationDetails]
  const IconComponent = details?.icon || MapPin
  const hasStreetView = location.coordinates && location.streetView

  return (
    <motion.div
      className={`rounded-lg border-2 cursor-pointer relative overflow-hidden transition-all duration-300 ${
        location.special
          ? "bg-gradient-to-br from-rose-200 to-pink-200 border-rose-300"
          : "bg-white border-blue-200 hover:border-blue-300"
      } ${isSelected ? "ring-4 ring-blue-300 ring-opacity-50" : ""}`}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="p-4 text-center">
        <IconComponent className={`${location.special ? "text-rose-600" : "text-blue-600"} mx-auto mb-2`} size={24} />
        <p className={`font-semibold ${location.special ? "text-rose-800" : "text-blue-800"}`}>{location.name}</p>

        {details?.description && <p className="text-xs text-gray-600 mt-1 italic">{details.description}</p>}

        {/* Street View available indicator */}
        {hasStreetView && (
          <div className="mt-2">
            <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              <Eye size={10} />
              Street View disponível
            </span>
          </div>
        )}

        {/* Fragment indicator */}
        {showFragment && (
          <motion.div
            className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <Heart size={12} className="text-yellow-800" fill="currentColor" />
          </motion.div>
        )}
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t-2 border-gray-200"
          >
            {/* View mode toggle */}
            {hasStreetView && (
              <div className="p-3 bg-gray-50 border-b border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setViewMode("map")
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                      viewMode === "map"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    <Map size={14} />
                    Mapa
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setViewMode("streetview")
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                      viewMode === "streetview"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    <Eye size={14} />
                    Street View
                  </button>
                </div>
              </div>
            )}

            {/* Map or Street View */}
            {viewMode === "map" ? (
              <GoogleMapsEmbed location={location} isVisible={isSelected} />
            ) : (
              hasStreetView && (
                <StreetViewEmbed
                  location={{
                    name: location.name,
                    coordinates: location.coordinates!,
                    ...location.streetView,
                  }}
                  isVisible={isSelected && viewMode === "streetview"}
                />
              )
            )}

            {/* Memories section */}
            {details?.memories && (
              <div className="p-3 bg-white/50">
                <h5 className="text-xs font-semibold text-gray-700 mb-2">💭 Memórias:</h5>
                <div className="flex flex-wrap gap-1">
                  {details.memories.map((memory, index) => (
                    <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {memory}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="p-3 bg-gray-50 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(location.link, "_blank")
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                <Navigation size={14} />
                Google Maps
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const query = encodeURIComponent(location.query)
                  window.open(`https://www.google.com/maps/search/${query}`, "_blank")
                }}
                className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                <ExternalLink size={14} />
              </button>

              {hasStreetView && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const { lat, lng } = location.coordinates!
                    window.open(`https://www.google.com/maps/@${lat},${lng},3a,75y,90t/data=!3m6!1e1`, "_blank")
                  }}
                  className="flex items-center justify-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  <Eye size={14} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand/Collapse indicator */}
      <div className="p-2 text-center bg-gray-50">
        <span className="text-xs text-gray-600">
          {isSelected
            ? "Clique para fechar"
            : hasStreetView
              ? "Clique para ver mapa e Street View"
              : "Clique para ver no mapa"}
        </span>
      </div>
    </motion.div>
  )
}
