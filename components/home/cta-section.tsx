'use client'

import React from "react"

import { useState } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionAnimator } from '@/components/section-animator'

export function CTASection() {
  return (
    // --------- "Bizimle Hemen İletişime Geçin" bölümü
    <section id="cta-section" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <SectionAnimator animation="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Bizimle Hemen İletişime Geçin
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg text-pretty">
            Sorularınız mı var? Profesyonel ekibimizden bilgi almak için
            bize ulaşın.
          </p>
        </SectionAnimator>

        <SectionAnimator animation="fade-up" delay={200} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA - WhatsApp */}
          <CTAButton
            href="https://wa.me/905330204012?text=Merhaba%2C%20hizmetleriniz%20hakkında%20daha%20fazla%20bilgi%20almak%20istiyorum."
            variant="primary"
            icon={<MessageCircle className="w-5 h-5" />}
            label="Whatsapp ile Mesaj Gönder"
          />

          {/* Secondary CTA - Phone */}
          <CTAButton
            href="tel:+905330204012"
            variant="secondary"
            icon={<Phone className="w-5 h-5" />}
            label="Bizi Arayın"
          />
        </SectionAnimator>
      </div>
    </section>
  )
}

function CTAButton({
  href,
  variant,
  icon,
  label,
}: {
  href: string
  variant: 'primary' | 'secondary'
  icon: React.ReactNode
  label: string
}) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev, { x, y, id }])

    // Ripple'ı kaldır
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
    }, 600)
  }

  const isPrimary = variant === 'primary'

  return (
    <a
      href={href}
      target={isPrimary ? '_blank' : undefined}
      rel={isPrimary ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      className={cn(
        'group relative inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300',
        isPrimary
          ? 'bg-white text-foreground hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105'
          : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105'
      )}
      aria-label={label}
    >
      {/* Glow efekti */}
      <span
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          isPrimary
            ? 'bg-gradient-to-r from-white/0 via-white/30 to-white/0'
            : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
        )}
        aria-hidden="true"
      />

      {/* Hover slide efekti */}
      <span
        className={cn(
          'absolute inset-0 transition-transform duration-300',
          isPrimary
            ? 'bg-accent/20 translate-y-full group-hover:translate-y-0'
            : 'bg-white translate-y-full group-hover:translate-y-0'
        )}
        aria-hidden="true"
      />

      {/* Ripple efektleri */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/40 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
          aria-hidden="true"
        />
      ))}

      {/* İkon */}
      <span className="relative z-10">{icon}</span>

      {/* Label */}
      <span className="relative z-10">{label}</span>
    </a>
  )
}
