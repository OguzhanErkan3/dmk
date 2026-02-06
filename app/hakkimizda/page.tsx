'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Target, Eye, Heart } from 'lucide-react'

// Not: 'use client' oldugu icin metadata burada tanimlanamaz.
// Metadata icin ayri bir layout.tsx veya generateMetadata kullanilabilir.

const contentBlocks = [
  {
    icon: Heart,
    title: 'Biz Kimiz?',
    content:
      'İzmir merkezli profesyonel tesisat ve kanal açma firması olarak, yılların deneyimiyle müşterilerimize güvenilir ve kalıcı çözümler sunuyoruz. Alanında uzman ekibimiz, modern ekipmanlarımız ve müşteri memnuniyeti odaklı yaklaşımımız sayesinde sektörde öncü bir konuma sahibiz. Ev, iş yeri ve endüstriyel alanlarda yaşanan kanalizasyon ve gider tıkanıklıklarını hızlı ve etkili şekilde çözüyoruz. Güvenilir hizmet anlayışımızla İzmir ve çevre illerde tercih edilen firma olmanın gururunu yaşıyoruz.',
  },
  {
    icon: Target,
    title: 'Misyonumuz',
    content:
      'Misyonumuz, müşterilerimizin karşılaştığı altyapı ve tesisat sorunlarını en kısa sürede, en doğru yöntemlerle ve kalıcı şekilde çözmektir. Hijyen, güvenlik ve hız önceliğimizdir. Teknolojik cihazlar ve kameralı sistemlerle tıkanıklıkların kaynağını nokta atışıyla tespit ederek gereksiz maliyetleri ortadan kaldırıyoruz. Amacımız, her müşterimize kaliteli hizmet sunarak yaşam alanlarını daha sağlıklı ve sorunsuz hale getirmektir.',
  },
  {
    icon: Eye,
    title: 'Vizyonumuz',
    content:
      'Vizyonumuz, İzmir ve çevre illerde kanal açma ve tesisat hizmetlerinde lider marka haline gelmektir. Sürekli gelişen teknolojiye uyum sağlayarak hizmet kalitemizi artırmayı, müşteri memnuniyetini en üst seviyede tutmayı hedefliyoruz. Uzun vadede Türkiye genelinde yaygın hizmet ağına sahip, güvenilir ve yenilikçi bir firma olarak sektörde fark yaratmayı amaçlıyoruz. Kalıcı çözümler, profesyonel yaklaşım ve sürdürülebilir hizmet anlayışıyla geleceğe değer katıyoruz.',
  },
]


export default function AboutPage() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            if (!visibleCards.includes(index)) {
              setVisibleCards((prev) => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = sectionRef.current?.querySelectorAll('[data-index]')
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [visibleCards])

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Hakkımızda
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div
            ref={sectionRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {contentBlocks.map((block, index) => {
              const Icon = block.icon
              return (
                <Card
                  key={block.title}
                  data-index={index}
                  className={cn(
                    'transition-all duration-500',
                    visibleCards.includes(index)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{block.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {block.content}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
