'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionAnimator } from '@/components/section-animator'

const testimonials = [
  {
    name: 'Hakan Şen',
    initials: 'HŞ',
    rating: 5,
    comment:
      'Gece yarısı tuvaletimiz taştı, hemen aradım ve yarım saat içinde geldiler. Hem hızlı hem de çok profesyonel çalıştılar. Kesinlikle tavsiye ederim.',
  },
  {
    name: 'Elif Karaca',
    initials: 'EK',
    rating: 5,
    comment:
      'Mutfak giderim sürekli tıkanıyordu, kendi yöntemlerim işe yaramadı. Ekip kameralı cihazla sorunu buldu ve kalıcı şekilde çözdü. Çok memnun kaldım.',
  },
  {
    name: 'Mustafa Aydın',
    initials: 'MA',
    rating: 4,
    comment:
      'Banyo giderinde ciddi bir koku vardı. Geldiler, boruları temizlediler ve sorunu giderdiler. Biraz geç geldiler ama işçilikleri çok iyiydi.',
  },
  {
    name: 'Sevgi Yıldız',
    initials: 'SY',
    rating: 5,
    comment:
      'Apartmanımızda kanalizasyon hattı tıkanmıştı. Büyük makinelerle gelip kısa sürede açtılar. Hem güler yüzlü hem de işini bilen bir ekip.',
  },
  {
    name: 'Burak Erdem',
    initials: 'BE',
    rating: 5,
    comment:
      'Lavabo sürekli geri taşıyordu. Gelen usta sorunu detaylı anlattı ve çözüm sundu. Fiyat uygundu.',
  },
  {
    name: 'Nuran Çetin',
    initials: 'NÇ',
    rating: 5,
    comment:
      'Acil çağrı yaptım, 40 dakika içinde geldiler. Evde hiçbir yeri kırmadan tıkanıklığı açtılar. Gerçekten güvenilir bir firma.',
  },
]


export function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  // Otomatik kaydırma
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Scroll-triggered animasyonlar için observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-testimonial-index'))
            if (!Number.isNaN(index) && !visibleCards.includes(index)) {
              setVisibleCards((prev) => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    const cards = sectionRef.current?.querySelectorAll('[data-testimonial-index]')
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [visibleCards])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }
    if (touchStart - touchEnd < -50) {
      setCurrentSlide(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      )
    }
  }

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-[#f0efeb] via-background to-[#e3e8eb]">
        {/* Alt kısım yumuşak geçiş */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary to-transparent" />
      <div className="container mx-auto px-4">
        <SectionAnimator animation="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Müşteri Yorumları
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Müşterilerimizin bizi nasıl değerlendirdiğini görün.
          </p>
        </SectionAnimator>

        {/* Mobile Slider */}
        <div
          className="md:hidden relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="w-full shrink-0 px-2"
              >
                <TestimonialCard 
                  testimonial={testimonial} 
                  index={index}
                  isVisible={true}
                />
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                type="button"
                key={`dot-${index}`}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  currentSlide === index 
                    ? 'bg-primary w-6' 
                    : 'bg-muted hover:bg-muted-foreground/30'
                )}
                aria-label={`${index + 1}. yoruma git`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.name} 
              testimonial={testimonial}
              index={index}
              isVisible={visibleCards.includes(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
  index,
  isVisible,
}: {
  testimonial: (typeof testimonials)[0]
  index: number
  isVisible: boolean
}) {
  return (
    <Card 
      data-testimonial-index={index}
      className={cn(
        'h-full transition-all duration-700 border-0 shadow-md bg-card',
        'hover:shadow-lg hover:shadow-primary/5',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-12 h-12 ring-2 ring-accent">
            <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
              {testimonial.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`star-${i}`}
                  className={cn(
                    'w-4 h-4 transition-colors duration-300',
                    i < testimonial.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted'
                  )}
                  aria-hidden="true"
                />
              ))}
              <span className="sr-only">{testimonial.rating} üzerinden 5 yıldız</span>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">{testimonial.comment}</p>
      </CardContent>
    </Card>
  )
}
