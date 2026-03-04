import React from "react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Kanal Açma İzmir olarak İzmir, Manisa ve Aydın bölgelerinde 7/24 profesyonel kanal açma ve tıkanıklık giderme hizmetleri sunuyoruz. Deneyimli ekibimiz ve modern ekipmanlarımızla her zaman yanınızdayız.',
  alternates: {
    canonical: '/hakkimizda',
  },
  openGraph: {
    title: 'Hakkımızda | Kanal Açma İzmir',
    description: 'Profesyonel kanal açma ve tıkanıklık giderme hizmetleri. Deneyimli ekip, modern ekipman ve garantili işçilik.',
    url: 'https://kanalacmaizmir.com/hakkimizda',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
