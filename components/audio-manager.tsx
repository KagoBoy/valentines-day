"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { Volume2, VolumeX, Music, Music2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AudioContextType {
  playBackgroundMusic: () => void
  stopBackgroundMusic: () => void
  playEffect: (effectName: string) => void
  changeMusicSection: (section: string) => void
  isMusicEnabled: boolean
  isEffectsEnabled: boolean
  toggleMusic: () => void
  toggleEffects: () => void
  isPlaying: boolean
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider")
  }
  return context
}

interface AudioProviderProps {
  children: ReactNode
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [isMusicEnabled, setIsMusicEnabled] = useState(true)
  const [isEffectsEnabled, setIsEffectsEnabled] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSection, setCurrentSection] = useState("intro")
  const [audioLoaded, setAudioLoaded] = useState(false)

  // Audio refs
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null)
  const effectsRef = useRef<{ [key: string]: HTMLAudioElement }>({})

  // Initialize audio elements
  useEffect(() => {
    // Background music
    backgroundMusicRef.current = new Audio("/audio/background-romantic.mp3")
    backgroundMusicRef.current.loop = true
    backgroundMusicRef.current.volume = 0.3

    // Preload background music
    backgroundMusicRef.current.addEventListener("canplaythrough", () => {
      console.log("Background music loaded")
    })

    // Sound effects
    const effects = {
      collect: "/audio/collect-fragment.mp3",
      pageFlip: "/audio/page-flip.mp3",
      correct: "/audio/quiz-correct.mp3",
      mapClick: "/audio/map-click.mp3",
      clockTick: "/audio/clock-tick.mp3",
      treasureReveal: "/audio/treasure-reveal.mp3",
      magicalChime: "/audio/magical-chime.mp3",
      heartbeat: "/audio/heartbeat.mp3",
    }

    // Create and preload all audio elements
    let loadedCount = 0
    const totalEffects = Object.keys(effects).length

    Object.entries(effects).forEach(([name, src]) => {
      const audio = new Audio(src)
      audio.volume = 0.6
      effectsRef.current[name] = audio

      // Preload effect
      audio.addEventListener("canplaythrough", () => {
        loadedCount++
        console.log(`Loaded effect: ${name}`)
        if (loadedCount >= totalEffects) {
          setAudioLoaded(true)
          console.log("All audio effects loaded")
        }
      })

      // Start preloading
      audio.load()
    })

    return () => {
      // Cleanup
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause()
      }
      Object.values(effectsRef.current).forEach((audio) => {
        audio.pause()
      })
    }
  }, [])

  const playBackgroundMusic = async () => {
    if (backgroundMusicRef.current && isMusicEnabled) {
      try {
        await backgroundMusicRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.log("Auto-play prevented. User interaction required.")
      }
    }
  }

  const stopBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause()
      setIsPlaying(false)
    }
  }

  const playEffect = async (effectName: string) => {
    if (effectsRef.current[effectName] && isEffectsEnabled) {
      try {
        // Reset playback position to start
        effectsRef.current[effectName].currentTime = 0
        await effectsRef.current[effectName].play()
      } catch (error) {
        console.log("Effect play failed:", error)
      }
    }
  }

  const changeMusicSection = (section: string) => {
    if (section !== currentSection && backgroundMusicRef.current) {
      setCurrentSection(section)
      // Fade effect for section changes
      if (isPlaying) {
        const fadeOut = setInterval(() => {
          if (backgroundMusicRef.current && backgroundMusicRef.current.volume > 0.1) {
            backgroundMusicRef.current.volume -= 0.05
          } else {
            clearInterval(fadeOut)
            // Change music or add instruments based on section
            setTimeout(() => {
              const fadeIn = setInterval(() => {
                if (backgroundMusicRef.current && backgroundMusicRef.current.volume < 0.3) {
                  backgroundMusicRef.current.volume += 0.05
                } else {
                  clearInterval(fadeIn)
                }
              }, 100)
            }, 500)
          }
        }, 100)
      }
    }
  }

  const toggleMusic = () => {
    setIsMusicEnabled(!isMusicEnabled)
    if (!isMusicEnabled) {
      playBackgroundMusic()
    } else {
      stopBackgroundMusic()
    }
  }

  const toggleEffects = () => {
    setIsEffectsEnabled(!isEffectsEnabled)
  }

  return (
    <AudioContext.Provider
      value={{
        playBackgroundMusic,
        stopBackgroundMusic,
        playEffect,
        changeMusicSection,
        isMusicEnabled,
        isEffectsEnabled,
        toggleMusic,
        toggleEffects,
        isPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const AudioControls = () => {
  const { isMusicEnabled, isEffectsEnabled, toggleMusic, toggleEffects, isPlaying, playBackgroundMusic } = useAudio()
  const [showControls, setShowControls] = useState(false)

  const handleMusicToggle = () => {
    if (!isMusicEnabled && !isPlaying) {
      // First time enabling music - require user interaction
      playBackgroundMusic()
    }
    toggleMusic()
  }

  return (
    <div className="fixed top-6 left-6 z-50">
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border-2 border-rose-200"
        onHoverStart={() => setShowControls(true)}
        onHoverEnd={() => setShowControls(false)}
      >
        <div className="p-3 cursor-pointer" onClick={() => setShowControls(!showControls)}>
          <Music className="text-rose-600" size={24} />
        </div>

        <AnimatePresence>
          {showControls && (
            <motion.div
              className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border-2 border-rose-200 p-4 min-w-[200px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-rose-800">Música</span>
                  <button
                    onClick={handleMusicToggle}
                    className={`p-2 rounded-full transition-colors ${
                      isMusicEnabled ? "bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isMusicEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-rose-800">Efeitos</span>
                  <button
                    onClick={toggleEffects}
                    className={`p-2 rounded-full transition-colors ${
                      isEffectsEnabled ? "bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isEffectsEnabled ? <Music2 size={16} /> : <VolumeX size={16} />}
                  </button>
                </div>

                {isPlaying && (
                  <div className="flex items-center gap-2 text-xs text-rose-600">
                    <motion.div
                      className="w-2 h-2 bg-rose-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                    Tocando música romântica
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
