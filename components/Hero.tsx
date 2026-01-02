'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AGGREGATE_STATS } from '@/lib/mockData'
import FloatingButton from './FloatingButton'

interface HeroProps {
  onOpenModal: () => void
}

// Stripe-style animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// Animated counter
function AnimatedCounter({
  end,
  prefix = '',
  suffix = '',
}: {
  end: number
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
      const progress = Math.min((timestamp - startTime) / 2000, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, inView])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient - Stripe style */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full animate-aurora"
          style={{ background: 'radial-gradient(circle, rgba(99, 91, 255, 0.15) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full animate-aurora"
          style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)', animationDelay: '-5s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container w-full pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Trust badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="trust-badge">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No savings, no fee — Risk-free guarantee
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-display-2 md:text-display-1 font-bold text-slate-900 mb-6"
          >
            Stop overpaying.{' '}
            <span className="gradient-text">We fix your bills.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-body-lg text-slate-600 mb-10 max-w-2xl"
          >
            Our expert negotiators reduce your internet, cable, wireless, and utility bills. 
            You keep 100% of the first month&apos;s savings. Pay only when we succeed.
          </motion.p>

          {/* CTA buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <FloatingButton
              onClick={onOpenModal}
              variant="primary"
              size="xl"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              }
              iconPosition="right"
            >
              Start Saving Now
            </FloatingButton>
            
            <FloatingButton variant="secondary" size="xl" href="/how-it-works">
              See How It Works
            </FloatingButton>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          >
            {[
              { value: AGGREGATE_STATS.totalSaved, prefix: '$', label: 'Total Saved', color: 'text-stripe-purple' },
              { value: AGGREGATE_STATS.customersHelped, suffix: '+', label: 'Customers', color: 'text-stripe-cyan' },
              { value: AGGREGATE_STATS.averageSavings, prefix: '$', label: 'Avg. Monthly Savings', color: 'text-stripe-green' },
              { value: AGGREGATE_STATS.successRate, suffix: '%', label: 'Success Rate', color: 'text-stripe-orange' },
            ].map((stat, index) => (
              <div key={index} className="text-left">
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix || ''}
                  />
                </div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Trust logos placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 pt-10 border-t border-slate-200"
        >
          <p className="text-sm text-slate-400 mb-6">Trusted by customers who save with providers like</p>
          <div className="flex flex-wrap items-center gap-8 opacity-50">
            {['AT&T', 'Comcast', 'Verizon', 'Spectrum', 'T-Mobile'].map((brand) => (
              <span key={brand} className="text-lg font-semibold text-slate-400">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
