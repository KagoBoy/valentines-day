"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useAudio } from "./audio-manager"

interface SectionObserverProps {
  sectionId: string
  children: React.ReactNode
  className?: string
}

export const SectionObserver = ({ sectionId, children, className }: SectionObserverProps) => {
  const { changeMusicSection } = useAudio()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            changeMusicSection(sectionId)
          }
        })
      },
      {
        threshold: 0.5,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [sectionId, changeMusicSection])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}
