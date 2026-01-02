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
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Bill + Checkmark Icon */}
              <div className="relative w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 512 512" className="w-full h-full">
                  <rect width="512" height="512" rx="96" fill="#635bff"/>
                  <rect x="100" y="80" width="200" height="24" rx="12" fill="white" opacity="0.5"/>
                  <rect x="100" y="130" width="280" height="24" rx="12" fill="white" opacity="0.5"/>
                  <rect x="100" y="180" width="240" height="24" rx="12" fill="white" opacity="0.5"/>
                  <rect x="100" y="230" width="180" height="24" rx="12" fill="white" opacity="0.5"/>
                  <circle cx="360" cy="360" r="120" fill="#10b981"/>
                  <path d="M300 360 L340 400 L420 320" stroke="white" strokeWidth="32" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-xl text-slate-900">
                wefix<span className="text-stripe-purple">bill</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-stripe-purple rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link 
                href="/contact" 
                className="hidden sm:block text-sm font-medium text-slate-600 hover:text-stripe-purple transition-colors"
              >
                Contact
              </Link>

              <FloatingButton
                onClick={onOpenModal}
                variant="primary"
                size="md"
                className="hidden sm:inline-flex"
              >
                Get Started
              </FloatingButton>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
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
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[64px] left-4 right-4 bg-white rounded-2xl shadow-stripe-lg border border-slate-200 z-50 md:hidden overflow-hidden"
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
                        className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-stripe-purple hover:bg-slate-50 rounded-lg transition-colors"
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
                      className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-stripe-purple hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      Contact
                    </Link>
                  </motion.div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <FloatingButton
                    onClick={() => {
                      setMobileMenuOpen(false)
                      onOpenModal?.()
                    }}
                    variant="primary"
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
