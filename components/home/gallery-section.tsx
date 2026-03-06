'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SectionAnimator } from '@/components/section-animator'
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryFile {
  url: string
  pathname: string
  size: number
  uploadedAt: string
}

function isVideoFile(url: string, pathname: string): boolean {
  return /\.(mp4|webm|mov)/i.test(url) || /\.(mp4|webm|mov)/i.test(pathname)
}

export function GallerySection() {
  const [files, setFiles] = useState<GalleryFile[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    fetch('/api/gallery/list')
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || [])
        setVisibleCards(new Array(data.files?.length || 0).fill(false))
      })
      .catch(() => {})
  }, [])

  // Scroll-triggered card animations
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    cardRefs.current.forEach((ref, i) => {
      if (!ref) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev]
                next[i] = true
                return next
              })
            }, i * 80) // staggered delay
            observer.disconnect()
          }
        },
        { threshold: 0.15 }
      )
      observer.observe(ref)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [files])

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null ? Math.min(prev + 1, files.length - 1) : null))
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null ? Math.max(prev - 1, 0) : null))
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightboxIndex, files.length])

  if (files.length === 0) return null

  return (
    <>
      <section className="relative py-20 bg-gradient-to-b from-secondary via-[#cdd9e2] to-[#f0efeb]">
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f0efeb] to-transparent" />
        <div className="container mx-auto px-4">
          <SectionAnimator animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Çalışmalarımız
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              Gerçekleştirdiğimiz işlemleri inceleyebilirsiniz.
            </p>
          </SectionAnimator>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {files.map((file, i) => {
              const isVideo = isVideoFile(file.url, file.pathname)
              return (
                <div
                  key={file.url}
                  ref={(el) => { cardRefs.current[i] = el }}
                  className={cn(
                    'relative aspect-square rounded-xl overflow-hidden cursor-pointer group',
                    'transition-all duration-500 ease-out',
                    visibleCards[i]
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-8 scale-95'
                  )}
                  onClick={() => setLightboxIndex(i)}
                >
                  {isVideo ? (
                    <div className="relative w-full h-full bg-foreground/5">
                      <video
                        src={file.url}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-foreground/60 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                          <Play className="w-5 h-5 text-card ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={file.url}
                      alt={`Calisma ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && files[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/20 hover:bg-card/40 flex items-center justify-center transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5 text-card" />
          </button>

          {/* Prev */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(lightboxIndex - 1)
              }}
              className="absolute left-4 z-10 w-10 h-10 rounded-full bg-card/20 hover:bg-card/40 flex items-center justify-center transition-colors"
              aria-label="Onceki"
            >
              <ChevronLeft className="w-5 h-5 text-card" />
            </button>
          )}

          {/* Next */}
          {lightboxIndex < files.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(lightboxIndex + 1)
              }}
              className="absolute right-4 z-10 w-10 h-10 rounded-full bg-card/20 hover:bg-card/40 flex items-center justify-center transition-colors"
              aria-label="Sonraki"
            >
              <ChevronRight className="w-5 h-5 text-card" />
            </button>
          )}

          {/* Content */}
          <div
            className="relative max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideoFile(files[lightboxIndex].url, files[lightboxIndex].pathname) ? (
              <video
                src={files[lightboxIndex].url}
                className="max-w-full max-h-[85vh] rounded-lg"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <Image
                src={files[lightboxIndex].url}
                alt={`Calisma ${lightboxIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            )}
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-card/70 text-sm">
            {lightboxIndex + 1} / {files.length}
          </div>
        </div>
      )}
    </>
  )
}
