import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const dancing = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" })

export const metadata: Metadata = {
  title: "Caça ao Tesouro do Nosso Amor",
  description: "Uma jornada mágica através das nossas memórias",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable} ${dancing.variable} font-sans`}>{children}</body>
    </html>
  )
}
