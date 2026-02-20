import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Kanal Açma İzmir | 7/24 Acil Tıkanıklık Gider',
    template: '%s | Kanal Açma İzmir'
  },
  description: 'İzmir ve çevre illerde 7/24 acil kanal açma, gider temizleme ve tıkanıklık açma hizmetleri. Lavabo, tuvalet, boru ve kanalizasyon tıkanıklıklarında aynı gün çözüm, kamera inceleme ve garantili işçilik.',
  keywords: [
    'kanal açma izmir', 'gider açma izmir', 'tıkanıklık açma izmir', 'acil tıkanıklık gider izmir',
    '7/24 kanal açma hizmeti', 'boru tıkanıklığı açma', 'lavabo tıkanıklığı açma', 'tuvalet tıkanıklığı açma',
    'kanalizasyon açma izmir', 'tesisatçı izmir', 'İzmir ve çevre illerde tıkanıklık açma', 'profesyonel kanal açma servisi',
    'acil tesisat hizmeti', 'kamera ile boru görüntüleme', 'yüksek basınçlı su jeti', 'mekanik spiral', 'ücretsiz keşif',
    'Bornova kanal açma', 'Konak gider açma', 'Karşıyaka gider açma', 'Buca kanal açma', 'Çiğli gider açma',
    'Aliağa kanal açma', 'Balçova gider açma', 'Narlıdere kanal açma', 'Seferihisar gider açma', 'Urla kanal açma',
    'Foça gider açma', 'Menemen kanal açma', 'Ödemiş gider açma', 'Torbalı kanal açma', 'Tire gider açma',
    'Manisa acil kanal açma', 'Turgutlu gider açma', 'Salihli kanal açma', 'Akhisar gider açma', 'Aydın kanal açma',
    'Didim gider açma', 'Kuşadası kanal açma', 'Söke gider açma'
  ],
  authors: [{ name: 'Kanal Açma İzmir', url: 'https://kanalacmaizmir.com' }],
  creator: 'Kanal Açma İzmir',
  publisher: 'Kanal Açma İzmir',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kanalacmaizmir.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kanal Açma İzmir | 7/24 Acil Tıkanıklık Servisi',
    description: 'İzmir\'de 7/24 acil kanal açma ve tıkanıklık gider hizmeti. Kamera inceleme, yüksek basınçlı su jeti ve garantili işçilik.',
    url: 'https://kanalacmaizmir.com',
    siteName: 'Kanal Açma İzmir',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kanal Açma İzmir - 7/24 Acil Tıkanıklık Servisi',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kanal Açma İzmir | 7/24 Acil Tıkanıklık Gider',
    description: 'İzmir ve çevre illerde 7/24 acil kanal açma, gider temizleme ve tıkanıklık açma hizmetleri.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'GOOGLE_SITE_VERIFICATION_CODE', // Google Search Console dogrulama kodu buraya eklenecek
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Kanal Açma İzmir',
  image: 'https://kanalacmaizmir.com/logo.png',
  url: 'https://kanalacmaizmir.com',
  telephone: '+90 532 123 45 67',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'İzmir',
    addressCountry: 'TR',
  },
  description: 'İzmir ve çevre illerde 7/24 acil kanal açma, gider temizleme ve tıkanıklık açma hizmetleri. Kamera inceleme ve garantili işçilik.',
  areaServed: ['İzmir', 'Manisa', 'Aydın'],
  service: [
    { '@type': 'Service', name: 'Lavabo tıkanıklığı açma' },
    { '@type': 'Service', name: 'Tuvalet tıkanıklığı açma' },
    { '@type': 'Service', name: 'Kanalizasyon açma' },
    { '@type': 'Service', name: 'Kamera ile boru görüntüleme' },
    { '@type': 'Service', name: 'Yüksek basınçlı su jeti' },
    { '@type': 'Service', name: 'Mekanik spiral' },
  ],
  openingHours: 'Mo-Su 00:00-24:00',
  priceRange: '$$',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics - GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EE342TDFX8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EE342TDFX8', { 'anonymize_ip': true });
          `}
        </Script>
      </head>
      <body className={`font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
