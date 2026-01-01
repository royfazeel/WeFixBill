'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import FloatingButton from './FloatingButton'

interface FinalCTAProps {
  onOpenModal?: () => void
}

export default function FinalCTA({ onOpenModal }: FinalCTAProps) {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="section-container relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-slate-800/80 border border-green-500/30"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-slate-200">Average savings: $67/month</span>
          </motion.div>

          {/* Headline */}
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Ready to{' '}
            <span className="gradient-text-aurora">Stop Overpaying</span>?
          </motion.h2>

          {/* Subheadline */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto"
          >
            Join thousands of customers who save money every month. 
            It only takes 2 minutes to get started.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
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
              Check My Savings
            </FloatingButton>
            
            <FloatingButton variant="outline" size="lg" href="/pricing">
              View Pricing
            </FloatingButton>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            <div className="flex items-center gap-2 text-slate-400">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">No upfront fees</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Pay only if we save you</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
