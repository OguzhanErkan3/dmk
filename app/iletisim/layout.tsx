import React from "react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Kanal Açma İzmir ile 7/24 iletişime geçin. Acil tıkanıklık, kanal açma ve gider temizleme hizmetleri için hemen arayın. İzmir, Manisa ve Aydın bölgelerinde hizmetinizdeyiz.',
  alternates: {
    canonical: '/iletisim',
  },
  openGraph: {
    title: 'İletişim | Kanal Açma İzmir',
    description: '7/24 acil kanal açma hizmeti için bizimle iletişime geçin. Ücretsiz keşif ve aynı gün müdahale.',
    url: 'https://kanalacmaizmir.com/iletisim',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
