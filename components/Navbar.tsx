'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import FloatingButton from './FloatingButton'

interface NavbarProps {
  onOpenModal?: () => void
}

const navLinks = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Results', href: '/results' },
  { label: 'Services', href: '/services' },
  { label: 'FAQ', href: '/faq' },
]

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-midnight-950/90 backdrop-blur-xl border-b border-frost-border shadow-glass'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Neon Bill + Checkmark Icon */}
              <div className="relative w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 512 512" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,245,255,0.3)]">
                  <rect width="512" height="512" rx="96" fill="#0a0f1e"/>
                  <rect width="512" height="512" rx="96" fill="url(#neonGradient)" opacity="0.3"/>
                  <rect x="100" y="80" width="200" height="24" rx="12" fill="#00f5ff" opacity="0.4"/>
                  <rect x="100" y="130" width="280" height="24" rx="12" fill="#00f5ff" opacity="0.4"/>
                  <rect x="100" y="180" width="240" height="24" rx="12" fill="#00f5ff" opacity="0.4"/>
                  <rect x="100" y="230" width="180" height="24" rx="12" fill="#00f5ff" opacity="0.4"/>
                  <circle cx="360" cy="360" r="120" fill="#22c55e"/>
                  <path d="M300 360 L340 400 L420 320" stroke="white" strokeWidth="32" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00f5ff"/>
                      <stop offset="100%" stopColor="#a855f7"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="font-bold text-xl text-white">
                wefix<span className="text-neon-cyan">bill</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-frost-light hover:text-neon-cyan rounded-lg hover:bg-frost-subtle transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link 
                href="/contact" 
                className="hidden sm:block text-sm font-medium text-frost-light hover:text-neon-cyan transition-colors"
              >
                Contact
              </Link>

              <FloatingButton
                onClick={onOpenModal}
                variant="neon"
                size="md"
                className="hidden sm:inline-flex"
                floating
              >
                Get Started
              </FloatingButton>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-frost-light hover:text-neon-cyan hover:bg-frost-subtle rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-midnight-950/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[64px] left-4 right-4 glass-panel z-50 md:hidden overflow-hidden"
            >
              <nav className="p-4">
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-base font-medium text-frost-light hover:text-neon-cyan hover:bg-frost-subtle rounded-lg transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                  >
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-frost-light hover:text-neon-cyan hover:bg-frost-subtle rounded-lg transition-colors"
                    >
                      Contact
                    </Link>
                  </motion.div>
                </div>

                <div className="mt-4 pt-4 border-t border-frost-border">
                  <FloatingButton
                    onClick={() => {
                      setMobileMenuOpen(false)
                      onOpenModal?.()
                    }}
                    variant="neon"
                    size="lg"
                    fullWidth
                  >
                    Get Started Free
                  </FloatingButton>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
