'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const navLinks = [
  { href: '/', label: 'Anasayfa' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isSubPage = pathname !== '/'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm py-2'
            : 'bg-transparent py-4',
          isSubPage && !isScrolled && 'bg-background'
        )}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                'transition-all duration-300 relative',
                isScrolled ? 'w-10 h-10' : 'w-12 h-12'
              )}
            >
              <Image
                src={isScrolled || isSubPage ? '/images/logo.png' : '/images/logo-white.png'}
                alt="Kanal Açma İzmir Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <li key={link.href}>
                    {isActive ? (
                      <span
                        className={cn(
                          'font-medium cursor-default border-b-2 border-current pb-1',
                          isScrolled || isSubPage
                            ? 'text-foreground'
                            : 'text-white'
                        )}
                      >
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          'font-medium transition-colors hover:opacity-70',
                          isScrolled || isSubPage
                            ? 'text-foreground'
                            : 'text-white/90 hover:text-white'
                        )}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
              aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            >
              <span
                className={cn(
                  'absolute h-0.5 w-6 transition-all duration-300',
                  isScrolled || isSubPage ? 'bg-foreground' : 'bg-white',
                  isMenuOpen ? 'rotate-45' : '-translate-y-2'
                )}
              />
              <span
                className={cn(
                  'absolute h-0.5 w-6 transition-all duration-300',
                  isScrolled || isSubPage ? 'bg-foreground' : 'bg-white',
                  isMenuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'absolute h-0.5 w-6 transition-all duration-300',
                  isScrolled || isSubPage ? 'bg-foreground' : 'bg-white',
                  isMenuOpen ? '-rotate-45' : 'translate-y-2'
                )}
              />
            </button>
          </nav>

          {/* Breadcrumb for sub-pages */}
          {isSubPage && (
            <div className="mt-2 hidden md:block">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Anasayfa</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {navLinks.find((l) => l.href === pathname)?.label || 'Sayfa'}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <ul className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  {isActive ? (
                    <span className="font-medium text-foreground bg-muted px-4 py-2 rounded-lg block">
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-medium text-foreground hover:bg-muted px-4 py-2 rounded-lg block transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Mobile Breadcrumb */}
          {isSubPage && (
            <div className="container mx-auto px-4 pb-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Anasayfa</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {navLinks.find((l) => l.href === pathname)?.label || 'Sayfa'}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
