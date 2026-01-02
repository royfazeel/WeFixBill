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
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
      {/* Background spotlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[100px]" />
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
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-slate-800/80 border border-cyan-500/30 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-slate-200">
              No Savings = No Fee
            </span>
          </motion.div>

          {/* Main headline - HIGH CONTRAST */}
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]">
            Stop Overpaying.{' '}
            <span className="gradient-text-aurora">We Fix Your Bills.</span>
          </h1>

          {/* Subheadline - READABLE */}
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
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
              variant="outline"
              size="lg"
              href="/how-it-works"
            >
              See How It Works
            </FloatingButton>
          </motion.div>

          {/* Stats - Glass cards with HIGH CONTRAST text */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { value: AGGREGATE_STATS.totalSaved, prefix: '$', label: 'Total Saved', color: 'text-cyan-400' },
              { value: AGGREGATE_STATS.customersHelped, suffix: '+', label: 'Happy Customers', color: 'text-violet-400' },
              { value: AGGREGATE_STATS.averageSavings, prefix: '$', suffix: '/mo', label: 'Avg. Savings', color: 'text-pink-400' },
              { value: AGGREGATE_STATS.successRate, suffix: '%', label: 'Success Rate', color: 'text-green-400' },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="glass-panel p-5 text-center group hover:border-cyan-500/30 transition-all"
              >
                <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
                  <AnimatedCounter 
                    end={stat.value} 
                    prefix={stat.prefix || ''} 
                    suffix={stat.suffix || ''}
                  />
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
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
          className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-3 bg-cyan-500 rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* HUD corners */}
      <div className="absolute top-20 left-4 md:left-8"><div className="hud-corner-tl w-8 h-8" /></div>
      <div className="absolute top-20 right-4 md:right-8"><div className="hud-corner-tr w-8 h-8" /></div>
      <div className="absolute bottom-4 left-4 md:left-8"><div className="hud-corner-bl w-8 h-8" /></div>
      <div className="absolute bottom-4 right-4 md:right-8"><div className="hud-corner-br w-8 h-8" /></div>
    </section>
  )
}
