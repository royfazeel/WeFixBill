'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'
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
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 dark:bg-midnight-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-600 dark:from-neon-cyan dark:to-neon-blue rounded-xl rotate-6 group-hover:rotate-12 transition-transform" />
                <div className="absolute inset-0 bg-white dark:bg-midnight-950 rounded-xl flex items-center justify-center border border-sky-200 dark:border-neon-cyan/30">
                  <span className="text-sky-600 dark:text-neon-cyan font-bold text-xl">W</span>
                </div>
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">
                wefix<span className="text-sky-600 dark:text-neon-cyan">bill</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 dark:text-frost-300 hover:text-slate-900 dark:hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 dark:bg-neon-cyan group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle />

              <Link 
                href="/contact" 
                className="hidden sm:block text-sm font-medium text-slate-600 dark:text-frost-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Contact
              </Link>

              <FloatingButton
                onClick={onOpenModal}
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
              >
                Start Saving
              </FloatingButton>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 dark:text-frost-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
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
              className="fixed inset-0 bg-slate-900/50 dark:bg-midnight-950/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-midnight-900 border-l border-slate-200 dark:border-white/10 z-50 md:hidden"
            >
              <div className="p-6 pt-20">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-slate-700 dark:text-frost-200 hover:text-slate-900 dark:hover:text-white transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-slate-700 dark:text-frost-200 hover:text-slate-900 dark:hover:text-white transition-colors py-2"
                  >
                    Contact
                  </Link>
                  <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10">
                    <FloatingButton
                      onClick={() => {
                        setMobileMenuOpen(false)
                        onOpenModal?.()
                      }}
                      variant="primary"
                      fullWidth
                    >
                      Start Saving
                    </FloatingButton>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
