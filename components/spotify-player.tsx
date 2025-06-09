"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Music, ChevronUp, ChevronDown } from "lucide-react"

interface SpotifyPlayerProps {
  playlistId: string
  theme?: "dark" | "light"
  compact?: boolean
}

export const SpotifyPlayer = ({
  playlistId = "5xCr2cXoic2AKCEqkpGqI5",
  theme = "dark",
  compact = false,
}: SpotifyPlayerProps) => {
  const [isExpanded, setIsExpanded] = useState(!compact)

  return (
    <div className="fixed bottom-0 right-0 z-50 mb-4 mr-4 max-w-md w-full md:w-96">
      <motion.div
        initial={{ y: compact ? 400 : 0 }}
        animate={{ y: isExpanded ? 0 : 400 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white/95 backdrop-blur-md rounded-t-xl shadow-2xl border-2 border-rose-200 overflow-hidden"
      >
        {isExpanded && (
          <div
            className="p-3 flex items-center justify-between cursor-pointer bg-gradient-to-r from-rose-500 to-pink-500 text-white"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-2">
              <Music size={20} />
              <span className="font-medium">Nossa Playlist de Amor</span>
            </div>
            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </div>
        )}

        <div className="w-full">
          <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=${theme}`}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </motion.div>

      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-3 rounded-full shadow-lg cursor-pointer flex items-center gap-2 absolute bottom-0 right-0"
          onClick={() => setIsExpanded(true)}
        >
          <Music size={20} />
          <span className="font-medium">Abrir Playlist</span>
        </motion.div>
      )}
    </div>
  )
}
