"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Music, ChevronUp, ChevronDown, Volume2, VolumeX } from "lucide-react"

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
  const [volume, setVolume] = useState(50) // Volume padrão em 50%
  const [isMuted, setIsMuted] = useState(false)
  const [playerKey, setPlayerKey] = useState(0) // Para forçar recarregamento do iframe

  // Atualiza a chave para forçar o recarregamento do iframe quando o volume muda
  useEffect(() => {
    setPlayerKey(prev => prev + 1)
  }, [volume, isMuted])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  // Gera a URL do player com os parâmetros necessários
  const getPlayerUrl = () => {
    const baseUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=${theme}`
    const params = new URLSearchParams()
    
    // Auto-play
    params.append('autoplay', 'true')
    
    // Volume (0-1)
    const volumeValue = isMuted ? 0 : volume / 100
    params.append('volume', volumeValue.toString())
    
    return `${baseUrl}&${params.toString()}`
  }

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
          {/* Controles de volume */}
          <div className="flex items-center gap-2 p-2 bg-white/80">
            <button onClick={toggleMute} className="text-rose-600 hover:text-rose-800">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-rose-600 w-8">{isMuted ? '0%' : `${volume}%`}</span>
          </div>

          {/* Iframe do Spotify */}
          <iframe
            key={playerKey}
            src={getPlayerUrl()}
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
