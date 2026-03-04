import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/hero-section'
import { ServicesSection } from '@/components/home/services-section'
import { WorkingHoursSection } from '@/components/home/working-hours-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { FAQSection } from '@/components/home/faq-section'
import { CTASection } from '@/components/home/cta-section'
import { FloatingCallButton } from '@/components/floating-call-button'
<<<<<<< HEAD
import GallerySection from '@/components/home/GallerySection'
=======
>>>>>>> a4d07e2bb13a1eed6cb1a48b03c1861f81dfbc81

export const metadata: Metadata = {
  title:
    'Tıkanıklık ve Gider Açma | 7/24 Acil Tıkanıklık Servisi - Bornova, Konak, Karşıyaka, Buca, Çiğli ve Tüm İzmir',
  description:
    'İzmir ve çevre illerde 7/24 acil tıkanıklık ve kanal açma. Lavabo, tuvalet, boru ve kanalizasyon tıkanıklıklarında aynı gün müdahale, kamera inceleme ve garantili çözüm.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tıkanıklık ve Gider Açma | 7/24 Acil Tıkanıklık Servisi',
    description:
      "İzmir'de 7/24 acil kanal açma ve tıkanıklık gider hizmeti. Lavabo, tuvalet, boru ve kanalizasyon tıkanıklıklarında aynı gün çözüm!",
    url: 'https://kanalacmaizmir.com',
    images: ['/og-image.jpg'],
  },
  icons: {
<<<<<<< HEAD
    icon: '/icon-light-32x32.png',
    apple: '/apple-icon.png',
=======
    icon: '/icon-light-32x32.png', // sekme favicon (public/icon-light-32x32.png)
    apple: '/apple-icon.png', // iOS ana ekran ikonu (public/apple-icon.png)
>>>>>>> a4d07e2bb13a1eed6cb1a48b03c1861f81dfbc81
    other: [
      { rel: 'icon', url: '/icon-light-32x32.png' },
      { rel: 'mask-icon', url: '/icon.svg' },
    ],
  },
}

<<<<<<< HEAD
export default async function HomePage() {
  // API’den galeri verisini çekiyoruz
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/gallery`, {
    cache: 'no-store',
  })
  const items = await res.json()

=======
export default function HomePage() {
>>>>>>> a4d07e2bb13a1eed6cb1a48b03c1861f81dfbc81
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WorkingHoursSection />
<<<<<<< HEAD

      {/* Yeni eklenen galeri section */}
      <GallerySection items={items} />

=======
>>>>>>> a4d07e2bb13a1eed6cb1a48b03c1861f81dfbc81
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <FloatingCallButton />
    </>
  )
}
