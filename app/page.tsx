"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Star, MapPin, Clock, Book, Camera, Trophy, Sparkles, X } from "lucide-react"
import { AudioProvider, AudioControls, useAudio } from "@/components/audio-manager"
import { SectionObserver } from "@/components/section-observer"
import { SpotifyPlayer } from "@/components/spotify-player"
import { LocationCard } from "@/components/location-card"
import { PhotoGalleryManager } from "@/components/photo-gallery-manager"
import { LoveBookCarousel } from "@/components/love-book-carousel"

interface TimeCounterProps {
  startDate: string
  title: string
  color: "purple" | "rose"
}

const TimeCounter = ({ startDate, title, color }: TimeCounterProps) => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const start = new Date(startDate)
      const now = new Date()

      let years = now.getFullYear() - start.getFullYear()
      let months = now.getMonth() - start.getMonth()
      let days = now.getDate() - start.getDate()
      let hours = now.getHours() - start.getHours()
      let minutes = now.getMinutes() - start.getMinutes()
      let seconds = now.getSeconds() - start.getSeconds()

      // Adjust for negative values
      if (seconds < 0) {
        seconds += 60
        minutes--
      }
      if (minutes < 0) {
        minutes += 60
        hours--
      }
      if (hours < 0) {
        hours += 24
        days--
      }
      if (days < 0) {
        const daysInPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
        days += daysInPrevMonth
        months--
      }
      if (months < 0) {
        months += 12
        years--
      }

      setTimeElapsed({ years, months, days, hours, minutes, seconds })
    }

    // Calculate immediately
    calculateTimeElapsed()

    // Update every second
    const interval = setInterval(calculateTimeElapsed, 1000)

    return () => clearInterval(interval)
  }, [startDate])

  const colorClasses = {
    purple: {
      text: "text-purple-800",
      subtext: "text-purple-600",
      bg: "bg-purple-50",
    },
    rose: {
      text: "text-rose-800",
      subtext: "text-rose-600",
      bg: "bg-rose-50",
    },
  }

  const colors = colorClasses[color]

  return (
    <div className="space-y-4">
      <p className={`text-sm ${colors.subtext} italic`}>{title}</p>

      {/* Main counters */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`${colors.bg} rounded-lg p-4`}>
          <div className={`text-2xl font-bold ${colors.text}`}>{timeElapsed.years}</div>
          <div className={colors.subtext}>{timeElapsed.years === 1 ? "Ano" : "Anos"}</div>
        </div>
        <div className={`${colors.bg} rounded-lg p-4`}>
          <div className={`text-2xl font-bold ${colors.text}`}>{timeElapsed.months}</div>
          <div className={colors.subtext}>{timeElapsed.months === 1 ? "Mês" : "Meses"}</div>
        </div>
        <div className={`${colors.bg} rounded-lg p-4`}>
          <div className={`text-2xl font-bold ${colors.text}`}>{timeElapsed.days}</div>
          <div className={colors.subtext}>{timeElapsed.days === 1 ? "Dia" : "Dias"}</div>
        </div>
      </div>

      {/* Detailed time */}
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="text-center">
          <div className={`font-semibold ${colors.text}`}>{timeElapsed.hours}</div>
          <div className={colors.subtext}>{timeElapsed.hours === 1 ? "Hora" : "Horas"}</div>
        </div>
        <div className="text-center">
          <div className={`font-semibold ${colors.text}`}>{timeElapsed.minutes}</div>
          <div className={colors.subtext}>{timeElapsed.minutes === 1 ? "Minuto" : "Minutos"}</div>
        </div>
        <div className="text-center">
          <div className={`font-semibold ${colors.text}`}>{timeElapsed.seconds}</div>
          <div className={colors.subtext}>{timeElapsed.seconds === 1 ? "Segundo" : "Segundos"}</div>
        </div>
      </div>

      {/* Love infinity */}
      <div className="text-center pt-2">
        <div className={`text-3xl font-bold ${colors.text}`}>∞</div>
        <div className={colors.subtext}>Amor</div>
      </div>
    </div>
  )
}

// Treasure Modal Component
const TreasureModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "🎉 PARABÉNS! 🎉",
      content: "Você coletou todos os fragmentos do amor!",
      animation: "celebration",
    },
    {
      title: "💖 TESOURO ENCONTRADO 💖",
      content: "O verdadeiro tesouro sempre esteve no nosso coração...",
      animation: "heart",
    },
    {
      title: "🗺️ LOCALIZAÇÃO REAL",
      content: "Mas há algo especial esperando por você...",
      animation: "map",
    },
    {
      title: "💌 SUA PISTA FINAL",
      content:
        "Aaah, o amor! Tão profundo quanto o mar onde o tesouro se perdeu..." +
        "Mas escute, escute com atenção, mi amor... nem tudo está perdido!"+
        "O que foi selado com compromisso, agora espera por você…"+

        "Não busque no oceano, não!"+
        "Busque onde guardamos o que o tempo não apaga…" +
        "Memórias em uma caixa, histórias em silêncio…"+
        "E dentro dela, uma caixinha menor... aquela que chegou com promessas douradas!"+

        "Aha! O tesouro está lá, esperando ser encontrado por quem ama de verdade! 💕",
      animation: "treasure",
    },
  ]

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
      const timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1
          }
          clearInterval(timer)
          return prev
        })
      }, 3000)

      return () => clearInterval(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  const currentStepData = steps[currentStep]

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Magical particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            >
              {Math.random() > 0.5 ? (
                <Heart className="text-pink-400" size={12 + Math.random() * 8} fill="currentColor" />
              ) : (
                <Sparkles className="text-yellow-400" size={12 + Math.random() * 8} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Modal Content */}
        <motion.div
          className="relative max-w-2xl mx-4 bg-gradient-to-br from-yellow-100 via-amber-50 to-rose-100 rounded-3xl shadow-2xl border-4 border-yellow-300 overflow-hidden"
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          exit={{ scale: 0, rotateY: 180 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          {/* Close button */}
          {currentStep === steps.length - 1 && (
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <X size={20} className="text-gray-600" />
            </motion.button>
          )}

          {/* Animated background pattern */}
          <div className="absolute inset-0">
            <motion.div
              className="w-full h-full opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, #f59e0b 2px, transparent 2px)`,
                backgroundSize: "30px 30px",
              }}
              animate={{ backgroundPosition: ["0px 0px", "30px 30px"] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>

          <div className="relative p-8 text-center">
            {/* Step indicator */}
            <div className="flex justify-center mb-6">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 ${index <= currentStep ? "bg-yellow-500" : "bg-gray-300"}`}
                  animate={index === currentStep ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                />
              ))}
            </div>

            {/* Main animation area */}
            <div className="mb-8 h-32 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, scale: 0, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0, rotateY: 90 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {currentStepData.animation === "celebration" && (
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Trophy className="text-yellow-500" size={80} />
                    </motion.div>
                  )}

                  {currentStepData.animation === "heart" && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Heart className="text-red-500" size={80} fill="currentColor" />
                    </motion.div>
                  )}

                  {currentStepData.animation === "map" && (
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <MapPin className="text-blue-500" size={80} />
                    </motion.div>
                  )}

                  {currentStepData.animation === "treasure" && (
                    <motion.div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Heart className="text-white" size={40} fill="currentColor" />
                      </motion.div>
                      {/* Sparkles around treasure */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-yellow-400"
                          style={{
                            left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                            top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                        >
                          <Sparkles size={16} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Text content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-yellow-800 mb-4 font-serif">{currentStepData.title}</h2>
                <p
                  className={`text-lg leading-relaxed ${
                    currentStep === steps.length - 1
                      ? "text-rose-700 font-semibold bg-white/60 rounded-lg p-4 border-2 border-rose-200"
                      : "text-yellow-700"
                  }`}
                >
                  {currentStepData.content}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress indicator for final step */}
            {currentStep === steps.length - 1 && (
              <motion.div
                className="mt-6 text-sm text-yellow-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Clique no X para fechar e ir procurar seu presente! 💝
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

interface Photo {
  id: number
  src: string
  alt: string
  description: string
}

const PhotoCard = ({
  photo,
  isRevealed,
  onReveal,
  showFragment,
}: {
  photo: Photo
  isRevealed: boolean
  onReveal: () => void
  showFragment: boolean
}) => {
  return (
    <motion.div className="relative group cursor-pointer" whileHover={{ scale: 1.05 }} onClick={onReveal}>
      <div className="aspect-square bg-gradient-to-br from-pink-200 to-rose-300 rounded-lg shadow-lg border-2 border-white flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {isRevealed ? (
            <motion.img
              key="revealed"
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            />
          ) : (
            <motion.div
              key="hidden"
              className="flex flex-col items-center justify-center text-rose-600"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Heart size={32} fill="currentColor" />
              <span className="text-xs mt-2 text-center px-2">Clique para revelar</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isRevealed && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 rounded-b-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white text-xs font-medium text-center">{photo.description}</p>
        </motion.div>
      )}

      {showFragment && (
        <motion.div
          className="absolute -top-1 -right-1 bg-yellow-300/60 rounded-full p-1 shadow-md"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={12} className="text-yellow-700/80" />
        </motion.div>
      )}
    </motion.div>
  )
}

const TreasureHuntContent = () => {
  const { playEffect, playBackgroundMusic } = useAudio()
  const [collectedFragments, setCollectedFragments] = useState<number[]>([])
  const [showTreasureModal, setShowTreasureModal] = useState(false)
  const [treasureFound, setTreasureFound] = useState(false) // Nova flag para controlar se o tesouro já foi encontrado
  const [activeSection, setActiveSection] = useState<number | null>(null)
  const [revealedPhotos, setRevealedPhotos] = useState<number[]>([])
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [randomFragmentPhotoId, setRandomFragmentPhotoId] = useState<number | null>(null)

  // Updated photos state with all new images
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20220208-013358_Discord.jpg-3K1Z7M1Syl6iNnE8OMcoFWciOB1tAL.jpeg",
      alt: "Chamada em andamento",
      description: "Momentos virtuais especiais",
    },
    {
      id: 2,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-02-12-13-54-26-945_com.instagram.android.jpg-QYokkEn36mTBtbzKbCsQUWMMH2O0Ev.jpeg",
      alt: "Casal se arrumando",
      description: "Nosso look combinando",
    },
    {
      id: 3,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20241220_205124.jpg-tSaOzujWTDnSSwaPIAobHLEBPNhziX.jpeg",
      alt: "Natal com Papai Noel",
      description: "Natal na Sementeira",
    },
    {
      id: 4,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20241220_205437.jpg-a5ML2P2m9ax8zLaADYiqFGA6NfoRcf.jpeg",
      alt: "Selfie noturna",
      description: "Noites iluminadas",
    },
    {
      id: 5,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20241130_214200.jpg-CyW4f0lvcI6V89zcWaoDYWGOjrC0Jt.jpeg",
      alt: "Fondue romântico",
      description: "Nosso fondue",
    },
    {
      id: 6,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20211225_040725.jpg-Nkseyq5t0xAJzkVwSMWikpQYYSS1yQ.jpeg",
      alt: "Gatinho fofo",
      description: "Foto de Maru que te mandava",
    },
    {
      id: 7,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.38.59%20%281%29-or5OB4Q209pd4Rt58bOPBrLYjzLZWQ.jpeg",
      alt: "Selfie no shopping",
      description: "Passeio no shopping",
    },
    {
      id: 8,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.38.58%20%281%29-s0nIm6pp0UePD0eMPI1d3jrKeNbax0.jpeg",
      alt: "Selfie no espelho",
      description: "Do meu aniversário que te fiz andar muito",
    },
    {
      id: 9,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.38.58-lLtBK0vfVLMbrYAkbl4CmcSVLo5ApZ.jpeg",
      alt: "Beijo romântico",
      description: "Nosso amor em destaque",
    },
    {
      id: 10,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.38.59%20%282%29-LEAueNdykC6asNa8RiZV72cPWqDWDW.jpeg",
      alt: "Momento com amigos",
      description: "Você fazendo meus cachinhos",
    },
    {
      id: 11,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.00%20%285%29-CnwQ63oxT4wH9Pemn6Wq1YRDq6iD90.jpeg",
      alt: "Look elegante",
      description: "Fala deles, monocromáticos",
    },
    {
      id: 12,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.00%20%281%29-27LMUkPcpfyAAXRNeOLVuNFPDLvegD.jpeg",
      alt: "Abraço carinhoso",
      description: "Quando eu já era bobo por você",
    },
    {
      id: 13,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.00%20%284%29-maEz3GQa6w9XsPqTxhamOQGwPttDdT.jpeg",
      alt: "Compras juntos",
      description: "Aventuras nas lojas",
    },
    {
      id: 14,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.00%20%283%29-6cRTAMoPgn5QeNK7MXUqOhcquLYsLz.jpeg",
      alt: "Jantar romântico",
      description: "Encontros especiais",
    },
    {
      id: 15,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.00%20%282%29-eqV435uRX7j9UPFiiLeTi3vyBFeWZc.jpeg",
      alt: "Sorrisos radiantes",
      description: "Felicidade pura",
    },
    {
      id: 16,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.38.59-iLuNtAEvUFvWWIJ7ZRuKzQ0rOtIGpT.jpeg",
      alt: "Momento relaxante",
      description: "Momentos antes do nosso primeiro beijo 🥰",
    },
    {
      id: 17,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.00-XyAY6S3uzlD7GuPjyNiOn9Fof93yHn.jpeg",
      alt: "Noite divertida",
      description: "Nós de halloween",
    },
    {
      id: 18,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.01%20%282%29-RQCDIT6RHdAQmqgA6c9RZ933y8266d.jpeg",
      alt: "Olhares apaixonados",
      description: "Mavis e Jhonny 🥰",
    },
    {
      id: 19,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.01%20%283%29-tnJ4Hcdb8zlMxafYs6nsccY7jeRoo0.jpeg",
      alt: "Selfie no espelho",
      description: "Quando você ficou pra sempre com KagoBoy 🤣",
    },
    {
      id: 20,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.01%20%284%29-bEn4Wtz2XKfYo8rucb9i6PbEIRN743.jpeg",
      alt: "Fairy of shampoo",
      description: "Metadinha gayyy",
    },
    {
      id: 21,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.01%20%281%29-zzJ2GGd2hfhiRz0xXDGjZkCgzXEHj6.jpeg",
      alt: "Momento super-herói",
      description: "Carinho de super-heróis",
    },
    {
      id: 22,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.01-oKzF89rVsvBaZVatvuHo5PxQlHbJY7.jpeg",
      alt: "Girassóis e amor",
      description: "Relaxando juntos",
    },
    {
      id: 23,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.02%20%281%29-youh3f9LBg5eGDaqf5spwvHdNVs4Da.jpeg",
      alt: "Aconchego noturno",
      description: "Momentos íntimos",
    },
    {
      id: 24,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.02%20%282%29-LFVbzjHXJ5YXWqS3BxvORahrSj30Uq.jpeg",
      alt: "Óculos combinando",
      description: "Estilo coordenado",
    },
    {
      id: 25,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.02%20%284%29-xfoD2YIHnluDy3Bl8R0JBNBhssf8Zk.jpeg",
      alt: "Compartilhando smoothie",
      description: "Dividindo o açaiii",
    },
    {
      id: 26,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.02%20%283%29-3WcpjasirqPf2AVkzw8CL1LvnsaTlk.jpeg",
      alt: "Shopping em dupla",
      description: "Rolê no falido parque shopping",
    },
    {
      id: 27,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.03%20%283%29-FcFS3cCPgC3boefdBWJsf3quyb0D1s.jpeg",
      alt: "Sinais de paz noturno",
      description: "Estacionamento do shopping riomar!!",
    },
    {
      id: 28,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.03%20%281%29-xzVQC1ORjRQh8HckpiZcOfWZZsc4F7.jpeg",
      alt: "Carinho íntimo",
      description: "Amor e aconchego",
    },
    {
      id: 29,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.03%20%282%29-MrusSkOHhx6yxDWuv6jDrx3OEnZiKn.jpeg",
      alt: "Sol e praia",
      description: "Verão dourado juntos",
    },
    {
      id: 30,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.02-8zElhA9olYQQDpP7qXwnnCowNzo2A7.jpeg",
      alt: "Amigo peludo",
      description: "Carinho com nosso filho perdido",
    },
    {
      id: 31,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.02%20%285%29-QXYVKQJnm4dEW6rrv71PUZjJh2Jg52.jpeg",
      alt: "Compras de calçados",
      description: "Nós fofos",
    },
    {
      id: 32,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.03%20%284%29-A5GPm8bpGiTOHOSWDQOPmdaTVZyLiu.jpeg",
      alt: "Diversão noturna",
      description: "Risadas e caretas",
    },
    {
      id: 33,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.03%20%285%29-Qz3a1rhfrbtgd0fk2PQ9qlNkLiT5VH.jpeg",
      alt: "Natal em família",
      description: "Quando você me viu chorando pela primeira vez kkkk",
    },
    {
      id: 34,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.04%20%282%29-I9NuX8OuZfSdKvvue3sKwb4UAqz70e.jpeg",
      alt: "Selfie caseira",
      description: "Momentos em casa",
    },
    {
      id: 35,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.03-YFW8BmuvJoq5M1UeAsBDacPJvCSLSd.jpeg",
      alt: "Grupo de amigos",
      description: "Shopping com nossos besties",
    },
    {
      id: 36,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.04%20%281%29-dNxEJXfnyFI0crJ74XTDT65JjIIYk1.jpeg",
      alt: "Momento casual",
      description: "Minha assessora do banco imobiliário",
    },
    {
      id: 37,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.04%20%283%29-jTRjvhU8XAq7q42aQk9wI5Dp5oFl4H.jpeg",
      alt: "Máscaras faciais divertidas",
      description: "Skin care",
    },
    {
      id: 38,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.04-33jPbeLuZbVYUOZ7ed2mFfptfDOY95.jpeg",
      alt: "Selfie caseira íntima",
      description: "Momentos de carinho em casa",
    },
    {
      id: 39,
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-09%20at%2017.39.04%20%284%29-lnYkCPPrJlR8RwrNs9obe3KY2RR0kw.jpeg",
      alt: "Sorrisos radiantes",
      description: "Quando fui pra sua casa só pra jogar homem aranha",
    },
  ])

  // Choose random photo for fragment on page load
  useEffect(() => {
    const randomId = Math.floor(Math.random() * photos.length) + 1
    setRandomFragmentPhotoId(randomId)
  }, [photos.length])

  const collectFragment = (fragmentId: number) => {
    if (!collectedFragments.includes(fragmentId)) {
      setCollectedFragments([...collectedFragments, fragmentId])
      playEffect("collect")
    }
  }

  const revealPhoto = (photoId: number) => {
    if (!revealedPhotos.includes(photoId)) {
      setRevealedPhotos([...revealedPhotos, photoId])
      if (photoId === randomFragmentPhotoId) {
        collectFragment(1)
        playEffect("magicalChime")
      }
    }
  }

  // Modificado para só mostrar o modal uma vez
  useEffect(() => {
    if (collectedFragments.length === 5 && !treasureFound) {
      setTreasureFound(true) // Marca que o tesouro foi encontrado
      setTimeout(() => {
        setShowTreasureModal(true)
        playEffect("treasureReveal")
        setTimeout(() => playEffect("heartbeat"), 1000)
      }, 1000)
    }
  }, [collectedFragments, treasureFound, playEffect])

  // Start background music after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      playBackgroundMusic()
    }, 2000)
    return () => clearTimeout(timer)
  }, [playBackgroundMusic])

  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/30"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: (typeof window !== "undefined" ? window.innerHeight : 800) + 50,
            rotate: 0,
          }}
          animate={{
            y: -50,
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            rotate: 360,
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 2,
          }}
        >
          <Heart size={16 + Math.random() * 8} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  )

  const FragmentCollector = () => (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-full p-4 shadow-lg border-2 border-amber-300">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((id) => (
            <motion.div
              key={id}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                collectedFragments.includes(id)
                  ? "bg-gradient-to-br from-yellow-400 to-amber-500 border-amber-600 text-white"
                  : "bg-gray-200 border-gray-300 text-gray-400"
              }`}
              animate={collectedFragments.includes(id) ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Star size={16} fill="currentColor" />
            </motion.div>
          ))}
        </div>
        {/* Indicador de tesouro encontrado */}
        {treasureFound && (
          <motion.div
            className="mt-2 text-center text-xs text-amber-700 font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            🏆 Tesouro Encontrado!
          </motion.div>
        )}
      </div>
    </div>
  )

  const locations = [
    {
      id: 0,
      name: "Primeiro Encontro",
      special: false,
      query: "RioMar Shopping Aracaju",
      placeId: "ChIJA1YFMKhqbAcRrp_JjBjhzN0",
      coordinates: { lat: -10.9447321, lng: -37.0475752 },
      streetView: { heading: 90, pitch: 0, fov: 90 },
      link: "https://www.google.com/maps/place/RioMar+Shopping+Aracaju/@-10.9447268,-37.0501501,17z/data=!3m1!4b1!4m6!3m5!1s0x71ab6ad830056c3:0xdcdce118acf9ae!8m2!3d-10.9447321!4d-37.0475752!16s%2Fg%2F11b6d9sytl?entry=ttu",
    },
    {
      id: 1,
      name: "Primeiro Beijo",
      special: true,
      query: "Condomínio Barra Clube 1 Aracaju",
      coordinates: { lat: -10.9234567, lng: -37.0456789 },
      streetView: { heading: 180, pitch: -10, fov: 75 },
      link: "https://www.google.com/maps?q=condominio+barra+clube+1+aracaju",
    },
    {
      id: 2,
      name: "Nosso Restaurante",
      special: false,
      query: "Cactus Burger Aracaju",
      coordinates: { lat: -10.9123456, lng: -37.056789 },
      streetView: { heading: 45, pitch: 5, fov: 80 },
      link: "https://www.google.com/maps?q=cactus+burger+aracaju",
    },
    {
      id: 3,
      name: "Parque das Memórias",
      special: false,
      query: "Parque da Sementeira Aracaju",
      placeId: "ChIJE4IYS2s6bAcRDHckJNit1kY",
      coordinates: { lat: -10.9443374, lng: -37.0533389 },
      streetView: { heading: 270, pitch: 0, fov: 100 },
      link: "https://www.google.com/maps/place/Parque+da+Sementeira/@-10.9443321,-37.0582098,17z",
    },
    {
      id: 4,
      name: "Casa dos Sonhos",
      special: false,
      query: "Condomínio Residencial Morada das Mangueiras Aracaju",
      placeId: "ChIJr4nZeZY8bAcRR6JPB3HLGh8",
      coordinates: { lat: -10.9387252, lng: -37.0770919 },
      streetView: { heading: 135, pitch: -5, fov: 85 },
      link: "https://www.google.com/maps/place/Condom%C3%ADnio+Residencial+Morada+das+Mangueiras/@-10.9387199,-37.0796668,17z",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 relative overflow-hidden">
      <FloatingHearts />
      <FragmentCollector />

      {/* Treasure Modal */}
      <TreasureModal isOpen={showTreasureModal} onClose={() => setShowTreasureModal(false)} />

      {/* Header */}
      <SectionObserver sectionId="intro">
        <header className="relative py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent mb-4 font-serif">
              Caça ao Tesouro
            </h1>
            <h2 className="text-2xl md:text-3xl text-rose-800 font-light italic">do Nosso Amor</h2>
            <motion.div
              className="mt-8 text-lg text-rose-700 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <p className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-rose-200 shadow-lg">
                {treasureFound
                  ? "🏆 Parabéns! Você encontrou todos os fragmentos e descobriu o tesouro do nosso amor! 💖"
                  : "Cada pista é um pedaço do nosso coração. Colete todos os fragmentos e descubra onde está escondido o tesouro do nosso amor... 💖"}
              </p>
            </motion.div>
          </motion.div>
        </header>
      </SectionObserver>

      {/* Section 1 - Photo Gallery */}
      <SectionObserver sectionId="gallery" className="py-16 px-4">
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-100 to-rose-100 rounded-3xl p-8 shadow-2xl border-4 border-amber-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f59e0b' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E')] opacity-30"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Camera className="text-rose-600" size={32} />
                  <h3 className="text-3xl font-bold text-rose-800 font-serif">Galeria de Memórias</h3>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-6 border-2 border-dashed border-rose-300">
                  <p className="text-rose-700 italic text-lg text-center">
                    "Lá onde tudo começou, entre memórias e sorrisos, está a primeira pista para o amor escondido."
                  </p>
                </div>

                {/* Gallery Manager */}
                {isEditMode ? (
                  <PhotoGalleryManager
                    photos={photos}
                    onPhotosChange={setPhotos}
                    isEditMode={isEditMode}
                    onToggleEditMode={() => setIsEditMode(!isEditMode)}
                  />
                ) : (
                  <>
                    {/* Edit Mode Toggle */}
                    <div className="flex justify-end mb-4">
                      <button
                        onClick={() => setIsEditMode(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        <Camera size={16} />
                        Gerenciar Fotos
                      </button>
                    </div>

                    {/* Photo Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {photos.map((photo) => (
                        <PhotoCard
                          key={photo.id}
                          photo={photo}
                          isRevealed={revealedPhotos.includes(photo.id)}
                          onReveal={() => revealPhoto(photo.id)}
                          showFragment={photo.id === randomFragmentPhotoId && !collectedFragments.includes(1)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      </SectionObserver>

      {/* Section 2 - Love Book */}
      <SectionObserver sectionId="book" className="py-16 px-4">
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl p-8 shadow-2xl border-4 border-rose-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ec4899' fillOpacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Book className="text-pink-600" size={32} />
                  <h3 className="text-3xl font-bold text-pink-800 font-serif">Nosso Livro de Amor</h3>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-6 border-2 border-dashed border-pink-300">
                  <p className="text-pink-700 italic text-lg text-center">
                    "Histórias contadas com o coração escondem segredos que só os apaixonados conseguem decifrar."
                  </p>
                </div>

                {/* Love Book Carousel */}
                <LoveBookCarousel
                  onCollectFragment={() => {
                    collectFragment(2)
                    playEffect("pageFlip")
                  }}
                  showFragment={!collectedFragments.includes(2)}
                />
              </div>
            </div>
          </div>
        </motion.section>
      </SectionObserver>

      {/* Section 3 - Interactive Quiz */}
      <SectionObserver sectionId="quiz" className="py-16 px-4">
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-8 shadow-2xl border-4 border-green-200 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Trophy className="text-green-600" size={32} />
                  <h3 className="text-3xl font-bold text-green-800 font-serif">Quiz do Coração</h3>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-6 border-2 border-dashed border-green-300">
                  <p className="text-green-700 italic text-lg text-center">
                    "O amor é feito de lembranças certas e erros fofos. Acertou? Merece mais uma pista!"
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-green-200">
                    <h4 className="text-xl font-bold text-green-800 mb-4">Qual foi nossa primeira música juntos?</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Pra você acreditar - Ferrugem",
                        "Camisa 10 - Turma do Pagode",
                        "Stand By Me",
                        "Exagerado - Cazuza",
                      ].map((option, index) => (
                        <motion.button
                          key={option}
                          className="p-3 bg-green-50 hover:bg-green-100 rounded-lg border-2 border-green-200 text-green-800 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            if (index === 0) {
                              collectFragment(3)
                              playEffect("correct")
                            }
                          }}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </SectionObserver>

      {/* Section 4 - Love Map */}
      <SectionObserver sectionId="map" className="py-16 px-4">
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 shadow-2xl border-4 border-blue-200 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <MapPin className="text-blue-600" size={32} />
                  <h3 className="text-3xl font-bold text-blue-800 font-serif">Mapa do Amor</h3>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-6 border-2 border-dashed border-blue-300">
                  <p className="text-blue-700 italic text-lg text-center">
                    "Cada ponto neste mapa conta uma história. Mas só um leva ao futuro..."
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {locations.map((location) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      isSelected={selectedLocation === location.id}
                      onSelect={() => {
                        setSelectedLocation(selectedLocation === location.id ? null : location.id)
                      }}
                      onCollectFragment={() => {
                        collectFragment(4)
                        playEffect("mapClick")
                      }}
                      showFragment={location.special && !collectedFragments.includes(4)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </SectionObserver>

      {/* Section 5 - Time Counter */}
      <SectionObserver sectionId="time" className="py-16 px-4">
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-100 to-violet-100 rounded-3xl p-8 shadow-2xl border-4 border-purple-200 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Clock className="text-purple-600" size={32} />
                  <h3 className="text-3xl font-bold text-purple-800 font-serif">Contador do Nosso Tempo</h3>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-6 border-2 border-dashed border-purple-300">
                  <p className="text-purple-700 italic text-lg text-center">
                    "Contamos os segundos juntos, mas é no tempo certo que a magia acontece..."
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Relationship Counter */}
                  <motion.div
                    className="bg-white rounded-lg p-8 shadow-lg border-2 border-purple-200 text-center cursor-pointer relative"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      collectFragment(5)
                      playEffect("clockTick")
                    }}
                  >
                    <h4 className="text-xl font-bold text-purple-800 mb-4">💕 Nosso Relacionamento</h4>
                    <TimeCounter startDate="2022-09-26" title="Juntos há" color="purple" />
                    {!collectedFragments.includes(5) && (
                      <motion.div
                        className="absolute top-4 right-4 bg-yellow-400 rounded-full p-2 shadow-lg"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Clock size={16} className="text-yellow-800" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* First Kiss Counter */}
                  <motion.div
                    className="bg-white rounded-lg p-8 shadow-lg border-2 border-rose-200 text-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="text-xl font-bold text-rose-800 mb-4">💋 Primeiro Beijo</h4>
                    <TimeCounter startDate="2022-01-29" title="Desde nosso primeiro beijo" color="rose" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </SectionObserver>

      {/* Spotify Player */}
      <SpotifyPlayer playlistId="5xCr2cXoic2AKCEqkpGqI5" theme="dark" compact={true} />

      {/* Footer */}
      <footer className="py-16 text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
          <p className="text-rose-600 text-lg italic">Feito com 💖 para o amor da minha vida</p>
        </motion.div>
      </footer>
    </div>
  )
}

export default function TreasureHuntLanding() {
  return (
    <AudioProvider>
      <AudioControls />
      <TreasureHuntContent />
    </AudioProvider>
  )
}
