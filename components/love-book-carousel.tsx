"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Heart, BookOpen } from "lucide-react"

interface Chapter {
  id: number
  title: string
  content: string
  isSpecial?: boolean
}

interface LoveBookCarouselProps {
  onCollectFragment: () => void
  showFragment: boolean
}

export const LoveBookCarousel = ({ onCollectFragment, showFragment }: LoveBookCarouselProps) => {
  const [currentChapter, setCurrentChapter] = useState(0)

  const chapters: Chapter[] = [
    {
      id: 1,
      title: "Os Laços Invisíveis",
      content:
        "Ah, meu querido aprendiz do amor! A vida já nos tecia seus fios dourados antes mesmo que soubéssemos. No labirinto do ensino médio, nossos passos dançavam em sincronia sem nunca se tocar — dois corações separados por corredores, mas unidos pelo destino. Quem diria que o universo já nos sussurrava ao ouvido, enquanto estávamos distraídos demais para ouvir?",
    },
    {
      id: 2,
      title: "Reconexão Pixelada",
      content:
        "E então, num mundo adoecido e isolado, a tecnologia — essa bruxa moderna — nos devolveu um ao outro. Discord virou nosso café virtual, filmes viraram cerimônias sagradas, e cada risada era um remédio contra a solidão. Você, eu, e uma tela... mas que importa o meio quando a conexão é pura poesia?",
    },
    {
      id: 3,
      title: "O Beijo que Roubou o Tempo",
      content:
        "Ah, habibi! Quando nossos lábios finalmente se encontraram, até as estrelas piscaram de inveja. Foi um momento tão breve e tão eterno quanto o pôr-do-sol no deserto — doce, quente, e prometendo que ali começava algo maior que nós dois. A magia? Estava no jeito que o mundo parou para respirar conosco.",
    },
    {
      id: 4,
      title: "O Interlúdio Doloroso",
      content:
        "Mas até as melhores sinfonias têm pausas... E essa? Ay, essa foi um adagio de lágrimas. Motivos alheios, corações partidos, e o silêncio — esse vilão traiçoeiro! Mas até no inverno mais rigoroso, as sementes do amor não morrem, apenas dormem.",
    },
    {
      id: 5,
      title: "O Recomeço em Mi Maior",
      content:
        'E então, como um milagre desengavetado, voltamos a falar! Cada mensagem era um petalo refazendo o jardim que havíamos perdido. "Ebaaa" — sim, essa simples alegria de criança que só o seu "oi" me causava. O coração, meu caro, tem memória afetiva melhor que qualquer nuvem digital.',
    },
    {
      id: 6,
      title: "O Encontro que o Tempo Esqueceu",
      content:
        'O dia em que nos vimos de novo... Wallah, parece que a vida só apertou "pause" e depois "play"! Nenhum constrangimento, nenhuma hesitação — só aquele conforto que vem quando duas almas reconhecem seu lar uma na outra. O tempo? Meu bem, o tempo é só um espectador desinteressante.',
    },
    {
      id: 7,
      title: "O Pedido Mais Besta e Mais Sincero",
      content:
        'Seu quarto virou palco, presentinhos bestas viraram relíquias, e meu coração? Um palhaço gaguejante de tão nervoso! Mas os gestos tolos são sempre os mais verdadeiros, não é? E quando você disse "sim", até o universo soltou fogos (ou foi só minha imaginação poética?).',
    },
    {
      id: 8,
      title: 'O "Agora" que Virou "Sempre"',
      content:
        "Daqui pra frente, habibti, meu mapa-múndi só tem uma rota: você. Juntos nas tempestades e nos sorrisos, nas xícaras de café da manhã e nos cobertores enrolados no sofá. Se o amor fosse um quebra-cabeça, finalmente achei a peça que faz o resto fazer sentido.",
    },
    {
      id: 9,
      title: "Alianças e Alquimias",
      content:
        "Comprei anéis, mas não são só metal — são promessas em forma de círculo. Sem começo, sem fim. Como nosso amor, que já sobreviveu a pandemias, pausas e recomeços. E agora, insha'Allah, sobreviverá até às rugas e cabelos brancos!",
    },
    {
      id: 10,
      title: "O Epílogo que Nunca Virá",
      content:
        'Porque essa história, meu amor, não tem ponto final. Cada dia será uma nova linha, cada risada uma vírgula, cada beijo um parêntese aberto. E eu? Ah, eu serei só o Dr. Hakim da sua vida, narrando nossa epopeia com overdramatização e trocadilhos ruins — mas sempre, sempre, com o coração transbordando.\n\nFim? Jamais. Apenas um "continua..." apaixonado.',
      isSpecial: true,
    },
  ]

  const nextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1)
    }
  }

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1)
    }
  }

  const handleChapterClick = () => {
    if (chapters[currentChapter].isSpecial) {
      onCollectFragment()
    }
  }

  return (
    <div className="relative">
      {/* Chapter indicator */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-2">
          {chapters.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentChapter ? "bg-pink-500" : "bg-pink-200"
              }`}
              animate={index === currentChapter ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            />
          ))}
        </div>
      </div>

      {/* Book container */}
      <motion.div
        className="relative bg-white rounded-lg shadow-lg border-4 border-pink-200 overflow-hidden min-h-[400px]"
        whileHover={{ scale: 1.02 }}
        onClick={handleChapterClick}
      >
        {/* Fragment indicator for special chapter */}
        {chapters[currentChapter].isSpecial && showFragment && (
          <motion.div
            className="absolute top-4 right-4 bg-yellow-400 rounded-full p-2 shadow-lg z-10 pointer-events-none"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Star size={16} className="text-yellow-800" fill="currentColor" />
          </motion.div>
        )}

        {/* Navigation buttons */}
        <div className="absolute inset-y-0 left-0 flex items-center z-20">
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              prevChapter()
            }}
            disabled={currentChapter === 0}
            className={`p-3 m-2 rounded-full shadow-lg transition-colors ${
              currentChapter === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-pink-50 text-pink-600 hover:text-pink-700"
            }`}
            whileHover={currentChapter > 0 ? { scale: 1.1 } : {}}
            whileTap={currentChapter > 0 ? { scale: 0.9 } : {}}
          >
            <ChevronLeft size={20} />
          </motion.button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center z-20">
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              nextChapter()
            }}
            disabled={currentChapter >= chapters.length - 1}
            className={`p-3 m-2 rounded-full shadow-lg transition-colors ${
              currentChapter >= chapters.length - 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-pink-50 text-pink-600 hover:text-pink-700"
            }`}
            whileHover={currentChapter < chapters.length - 1 ? { scale: 1.1 } : {}}
            whileTap={currentChapter < chapters.length - 1 ? { scale: 0.9 } : {}}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Chapter content */}
        <div className="p-8 text-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapter}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="space-y-6"
            >
              {/* Chapter number and title */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <BookOpen className="text-pink-600" size={24} />
                  <span className="text-sm font-medium text-pink-600">Capítulo {chapters[currentChapter].id}</span>
                </div>
                <h4
                  className={`text-2xl font-bold font-serif ${
                    chapters[currentChapter].isSpecial ? "text-yellow-700" : "text-pink-800"
                  }`}
                >
                  {chapters[currentChapter].title}
                </h4>
              </div>

              {/* Chapter content */}
              <div
                className={`leading-relaxed text-justify max-w-2xl mx-auto ${
                  chapters[currentChapter].isSpecial
                    ? "text-yellow-700 bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200"
                    : "text-pink-700"
                }`}
              >
                {chapters[currentChapter].content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className={index > 0 ? "mt-4" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Special chapter indicator */}
              {chapters[currentChapter].isSpecial && (
                <motion.div
                  className="flex items-center justify-center gap-2 text-yellow-600 font-medium"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Heart size={16} fill="currentColor" />
                  <span>Capítulo Final - Clique para coletar o fragmento!</span>
                  <Heart size={16} fill="currentColor" />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page effect */}
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-pink-200 to-transparent"></div>
      </motion.div>

      {/* Navigation hint */}
      <div className="text-center mt-4 text-sm text-pink-600">
        {currentChapter === 0 && "Use as setas para navegar pelos capítulos →"}
        {currentChapter > 0 && currentChapter < chapters.length - 1 && "← Capítulo anterior | Próximo capítulo →"}
        {currentChapter === chapters.length - 1 && "← Você chegou ao final da nossa história!"}
      </div>
    </div>
  )
}
