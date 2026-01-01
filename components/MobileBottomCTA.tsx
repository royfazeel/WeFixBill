'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingButton from './FloatingButton'

interface MobileBottomCTAProps {
  onOpenModal: () => void
}

export default function MobileBottomCTA({ onOpenModal }: MobileBottomCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px, hide if dismissed
      if (!isDismissed) {
        setIsVisible(window.scrollY > 300)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  // Don't render on desktop
  if (typeof window !== 'undefined' && window.innerWidth > 640) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
        >
          {/* Background blur */}
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700" />
          
          {/* Content */}
          <div className="relative px-4 py-3 pb-safe">
            <div className="flex items-center gap-3">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-green-400 font-medium">No savings = No fee</p>
                <p className="text-sm text-white font-semibold truncate">
                  Save up to $800/year
                </p>
              </div>

              {/* CTA Button */}
              <FloatingButton
                onClick={onOpenModal}
                variant="primary"
                size="sm"
                className="flex-shrink-0"
              >
                Check Savings
              </FloatingButton>

              {/* Dismiss button */}
              <button
                onClick={() => setIsDismissed(true)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
                aria-label="Dismiss"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
