'use client'

import { useState, useEffect } from 'react'
import { Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FloatingCallButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Hero section yüksekliği (100vh)
      const heroHeight = window.innerHeight

      // CTA section'ı bul (id="cta-section")
      const ctaSection = document.getElementById('cta-section')
      // Footer'ı bul
      const footer = document.querySelector('footer')

      // CTA section görünür mü kontrol et
      let isCtaVisible = false
      if (ctaSection) {
        const ctaRect = ctaSection.getBoundingClientRect()
        // CTA section ekranda görünüyorsa (kısmen veya tamamen)
        isCtaVisible = ctaRect.top < window.innerHeight && ctaRect.bottom > 0
      }

      // Footer görünür mü kontrol et
      let isFooterVisible = false
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        // Footer ekranda görünüyorsa
        isFooterVisible = footerRect.top < window.innerHeight && footerRect.bottom > 0
      }

      // Hero'yu geçtiyse ve CTA/Footer görünmüyorsa göster
      const shouldShow = window.scrollY > heroHeight && !isCtaVisible && !isFooterVisible
      setIsVisible(shouldShow)
    }

    window.addEventListener('scroll', handleScroll)
    // İlk render'da da kontrol et
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <a
      href="tel:+905551231234"
      className={cn(
        // --------- Floating arama butonu yeşil rengi (WhatsApp yeşili tonu)
        'fixed bottom-6 right-6 z-[70] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 lg:hidden',
        'bg-[#25D366] hover:bg-[#20BD5A] text-white', // --------- Yeşil buton rengi
        isVisible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
      )}
      aria-label="Ara"
    >
      <Phone className="w-6 h-6" />
    </a>
  )
}
