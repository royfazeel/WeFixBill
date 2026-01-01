'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils'
import { PRICING_CONFIG } from '@/lib/pricing'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface PricingPreviewProps {
  onOpenModal?: () => void
}

export default function PricingPreview({ onOpenModal }: PricingPreviewProps) {
  const [activeModel, setActiveModel] = useState<'success' | 'lifetime'>('success')

  return (
    <section id="pricing" className="section-padding">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Simple, <span className="gradient-text-aurora">Transparent</span> Pricing
            </h2>
            <p className="text-lg text-frost-300 max-w-2xl mx-auto mb-8">
              Choose the model that works best for you. No hidden fees, ever.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-2 p-1.5 bg-midnight-800 rounded-xl">
              <button
                onClick={() => setActiveModel('success')}
                className={cn(
                  'px-6 py-2.5 rounded-lg font-medium transition-all',
                  activeModel === 'success'
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                    : 'text-frost-400 hover:text-white'
                )}
              >
                Success Fee
              </button>
              <button
                onClick={() => setActiveModel('lifetime')}
                className={cn(
                  'px-6 py-2.5 rounded-lg font-medium transition-all',
                  activeModel === 'lifetime'
                    ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                    : 'text-frost-400 hover:text-white'
                )}
              >
                Lifetime Plan
              </button>
            </div>
          </motion.div>

          {/* Success Fee Model */}
          {activeModel === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {/* Standard */}
              <div className="glass-panel p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue" />
                
                <h3 className="text-xl font-bold text-white mb-2">Standard</h3>
                <p className="text-frost-400 mb-6">Best for one-time negotiation</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-neon-cyan">40%</span>
                  <span className="text-frost-400 ml-2">of savings</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {PRICING_CONFIG.successFee.standard.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-frost-300">
                      <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-frost-300">
                    <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Capped at 24 months of savings</span>
                  </li>
                </ul>

                <button onClick={onOpenModal} className="btn-neon w-full">
                  Get Started
                </button>
              </div>

              {/* Flexible */}
              <div className="glass-panel p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-purple to-neon-pink" />
                
                <div className="absolute top-4 right-4 px-3 py-1 bg-neon-purple/20 border border-neon-purple/30 rounded-full">
                  <span className="text-neon-purple text-xs font-semibold">POPULAR</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Flexible</h3>
                <p className="text-frost-400 mb-6">Payment options available</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-neon-purple">50%</span>
                  <span className="text-frost-400 ml-2">of savings</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {PRICING_CONFIG.successFee.flexible.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-frost-300">
                      <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-frost-300">
                    <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Based on 12 months of savings</span>
                  </li>
                </ul>

                <button onClick={onOpenModal} className="btn-primary w-full">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}

          {/* Lifetime Plan */}
          {activeModel === 'lifetime' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink" />
                
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-neon-pink/10 border border-neon-pink/30">
                    <span className="text-neon-pink text-sm font-semibold">BEST VALUE</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{PRICING_CONFIG.lifetimePlan.name}</h3>
                  <p className="text-frost-400 mb-6">{PRICING_CONFIG.lifetimePlan.description}</p>
                  
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-white">{formatCurrency(PRICING_CONFIG.lifetimePlan.price)}</span>
                    <span className="text-frost-400 ml-2">one-time</span>
                  </div>
                  <p className="text-frost-500 text-sm">Lifetime access, no recurring fees</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {PRICING_CONFIG.lifetimePlan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-frost-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Savings Promise */}
                <div className="bg-neon-green/5 border border-neon-green/20 rounded-xl p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-neon-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Savings Promise</h4>
                      <p className="text-frost-400 text-sm">
                        If we don't save you at least {formatCurrency(PRICING_CONFIG.lifetimePlan.savingsPromiseThreshold)}/year, 
                        your fee may be waived or refunded per our <a href="/refund-policy" className="text-neon-cyan hover:underline">refund policy</a>.
                      </p>
                    </div>
                  </div>
                </div>

                <button onClick={onOpenModal} className="btn-primary w-full text-lg py-4">
                  Get Lifetime Access
                </button>
              </div>
            </motion.div>
          )}

          <motion.p variants={fadeInUp} className="text-center text-frost-500 text-sm mt-8 max-w-2xl mx-auto">
            * Savings not guaranteed. Results vary by provider and account. Fees clearly disclosed before work begins.
            See our <a href="/disclaimer" className="text-neon-cyan hover:underline">disclaimer</a> for full details.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
