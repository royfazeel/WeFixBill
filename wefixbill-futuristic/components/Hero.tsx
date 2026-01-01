'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AGGREGATE_STATS } from '@/lib/mockData'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import FloatingButton from './FloatingButton'

interface HeroProps {
  onOpenModal: () => void
}

// Animated counter component
function AnimatedCounter({ 
  end, 
  duration = 2000,
  prefix = '',
  suffix = ''
}: { 
  end: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, inView])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Radial gradient spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-sky-400/5 dark:bg-neon-cyan/5 rounded-full blur-[100px]" />
        
        {/* HUD grid lines */}
        <div className="absolute inset-0 opacity-10 dark:opacity-10">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500 dark:via-neon-cyan to-transparent" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 dark:via-neon-purple to-transparent" />
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-sky-500 dark:via-neon-cyan to-transparent" />
          <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500 dark:via-neon-purple to-transparent" />
        </div>
      </div>

      {/* Content */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 section-container text-center"
      >
        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-slate-100 dark:bg-white/5 border border-sky-200 dark:border-neon-cyan/30 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-neon-green animate-pulse" />
            <span className="text-sm font-medium text-slate-700 dark:text-frost-200">
              No Savings = No Fee
            </span>
          </motion.div>

          {/* Main headline */}
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 dark:text-white mb-6 leading-[1.1]">
            Stop Overpaying.{' '}
            <span className="gradient-text-aurora">We Fix Your Bills.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-frost-300 mb-10 max-w-2xl mx-auto text-balance">
            Our expert negotiators reduce your internet, cable, wireless, and utility bills. 
            You keep the savings. Pay only if we succeed.
          </p>

          {/* CTA buttons */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <FloatingButton
              onClick={onOpenModal}
              variant="primary"
              size="lg"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              }
              iconPosition="right"
            >
              Start Saving Now
            </FloatingButton>
            <FloatingButton
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = '/how-it-works'}
            >
              See How It Works
            </FloatingButton>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            <div className="glass-panel p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-sky-600 dark:text-neon-cyan mb-1">
                <AnimatedCounter end={AGGREGATE_STATS.totalSaved} prefix="$" />
              </div>
              <div className="text-slate-500 dark:text-frost-400 text-sm">Total Saved</div>
            </div>
            <div className="glass-panel p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-neon-purple mb-1">
                <AnimatedCounter end={AGGREGATE_STATS.customersHelped} suffix="+" />
              </div>
              <div className="text-slate-500 dark:text-frost-400 text-sm">Happy Customers</div>
            </div>
            <div className="glass-panel p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-neon-pink mb-1">
                $<AnimatedCounter end={AGGREGATE_STATS.averageSavings} />/mo
              </div>
              <div className="text-slate-500 dark:text-frost-400 text-sm">Avg. Savings</div>
            </div>
            <div className="glass-panel p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-neon-green mb-1">
                <AnimatedCounter end={AGGREGATE_STATS.successRate} suffix="%" />
              </div>
              <div className="text-slate-500 dark:text-frost-400 text-sm">Success Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-frost-400/30 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-3 bg-sky-500 dark:bg-neon-cyan rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-20 left-4 md:left-8">
        <div className="hud-corner-tl w-8 h-8" />
      </div>
      <div className="absolute top-20 right-4 md:right-8">
        <div className="hud-corner-tr w-8 h-8" />
      </div>
      <div className="absolute bottom-4 left-4 md:left-8">
        <div className="hud-corner-bl w-8 h-8" />
      </div>
      <div className="absolute bottom-4 right-4 md:right-8">
        <div className="hud-corner-br w-8 h-8" />
      </div>
    </section>
  )
}
