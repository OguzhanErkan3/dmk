import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/hero-section'
import { ServicesSection } from '@/components/home/services-section'
import { WorkingHoursSection } from '@/components/home/working-hours-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { FAQSection } from '@/components/home/faq-section'
import { CTASection } from '@/components/home/cta-section'
import { FloatingCallButton } from '@/components/floating-call-button'

export const metadata: Metadata = {
  title: 'Tıkanıklık ve Gider Açma | 7/24 Acil Tıkanıklık Servisi - Bornova, Konak, Karşıyaka, Buca, Çiğli ve Tüm İzmir',
  description: 'İzmir ve çevre illerde 7/24 acil tıkanıklık ve kanal açma. Lavabo, tuvalet, boru ve kanalizasyon tıkanıklıklarında aynı gün müdahale, kamera inceleme ve garantili çözüm. ',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tıkanıklık ve Gider Açma | 7/24 Acil Tıkanıklık Servisi',
    description: 'İzmir\'de 7/24 acil kanal açma ve tıkanıklık gider hizmeti. Lavabo, tuvalet, boru ve kanalizasyon tıkanıklıklarında aynı gün çözüm!',
    url: 'https://kanalacmaizmir.com',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WorkingHoursSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <FloatingCallButton />
    </>
  )
}
