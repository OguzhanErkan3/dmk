'use client'

import React from "react"

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface SectionAnimatorProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right'
  delay?: number
}

export function SectionAnimator({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
}: SectionAnimatorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const animationClasses = {
    'fade-up': isVisible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-12',
    'fade-in': isVisible
      ? 'opacity-100'
      : 'opacity-0',
    'slide-left': isVisible
      ? 'opacity-100 translate-x-0'
      : 'opacity-0 translate-x-12',
    'slide-right': isVisible
      ? 'opacity-100 translate-x-0'
      : 'opacity-0 -translate-x-12',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        animationClasses[animation],
        className
      )}
    >
      {children}
    </div>
  )
}
