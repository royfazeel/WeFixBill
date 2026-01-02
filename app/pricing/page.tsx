'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'
import { cn, formatCurrency } from '@/lib/utils'
import { PRICING_CONFIG, calculateSuccessFee, calculateLifetimePlanValue } from '@/lib/pricing'
import { fadeInUp, staggerContainer } from '@/lib/motion'

export default function PricingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeModel, setActiveModel] = useState<'success' | 'lifetime'>('success')
  const [monthlyBill, setMonthlyBill] = useState(150)

  // Calculate example savings
  const estimatedMonthlySavings = Math.round(monthlyBill * 0.20)
  const standard = calculateSuccessFee(estimatedMonthlySavings, 40, 24)
  const flexible = calculateSuccessFee(estimatedMonthlySavings, 50, 12)
  const lifetime = calculateLifetimePlanValue(estimatedMonthlySavings, 5)

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding">
          <div className="section-container">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Simple, <span className="gradient-text-aurora">Transparent</span> Pricing
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-frost-300 mb-8"
              >
                Choose the model that works best for you. No hidden fees, ever.
              </motion.p>

              {/* Toggle */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 p-1.5 bg-midnight-800 rounded-xl mb-12">
                <button
                  onClick={() => setActiveModel('success')}
                  className={cn(
                    'px-8 py-3 rounded-lg font-medium transition-all',
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
                    'px-8 py-3 rounded-lg font-medium transition-all',
                    activeModel === 'lifetime'
                      ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                      : 'text-frost-400 hover:text-white'
                  )}
                >
                  Lifetime Plan
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Success Fee Plans */}
        {activeModel === 'success' && (
          <section className="pb-20">
            <div className="section-container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              >
                {/* Standard Plan */}
                <div className="glass-panel p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue" />
                  
                  <h3 className="text-2xl font-bold text-white mb-2">Standard</h3>
                  <p className="text-frost-400 mb-6">Best for one-time negotiation</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-neon-cyan">40%</span>
                    <span className="text-frost-300 ml-2 text-lg">of savings</span>
                  </div>

                  <div className="bg-midnight-800/50 rounded-xl p-4 mb-6">
                    <div className="text-frost-400 text-sm mb-1">Cap Period</div>
                    <div className="text-white font-semibold">24 months of savings</div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {PRICING_CONFIG.successFee.standard.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-frost-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => setIsModalOpen(true)} className="btn-neon w-full text-lg py-4">
                    Get Started
                  </button>
                </div>

                {/* Flexible Plan */}
                <div className="glass-panel p-8 relative overflow-hidden border-neon-purple/30">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-purple to-neon-pink" />
                  
                  <div className="absolute top-4 right-4 px-3 py-1 bg-neon-purple/20 border border-neon-purple/30 rounded-full">
                    <span className="text-neon-purple text-xs font-semibold">POPULAR</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">Flexible</h3>
                  <p className="text-frost-400 mb-6">Payment options available</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-neon-purple">50%</span>
                    <span className="text-frost-300 ml-2 text-lg">of savings</span>
                  </div>

                  <div className="bg-midnight-800/50 rounded-xl p-4 mb-6">
                    <div className="text-frost-400 text-sm mb-1">Cap Period</div>
                    <div className="text-white font-semibold">12 months of savings</div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {PRICING_CONFIG.successFee.flexible.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-frost-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => setIsModalOpen(true)} className="btn-primary w-full text-lg py-4">
                    Get Started
                  </button>
                </div>
              </motion.div>

              {/* Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-8 max-w-3xl mx-auto mt-12"
              >
                <h3 className="text-xl font-bold text-white mb-6 text-center">See Your Estimated Costs</h3>
                
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-frost-300">Your Monthly Bill</label>
                    <span className="text-2xl font-bold text-neon-cyan">{formatCurrency(monthlyBill)}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full h-2 bg-midnight-700 rounded-full appearance-none cursor-pointer
                              [&::-webkit-slider-thumb]:appearance-none
                              [&::-webkit-slider-thumb]:w-5
                              [&::-webkit-slider-thumb]:h-5
                              [&::-webkit-slider-thumb]:rounded-full
                              [&::-webkit-slider-thumb]:bg-neon-cyan"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-midnight-800/50 rounded-xl p-5">
                    <div className="text-frost-400 mb-3">Standard (40%)</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-frost-500">Monthly Savings</div>
                        <div className="text-white font-semibold">{formatCurrency(standard.monthlySavings)}</div>
                      </div>
                      <div>
                        <div className="text-frost-500">Our Fee</div>
                        <div className="text-neon-cyan font-semibold">{formatCurrency(standard.fee)}</div>
                      </div>
                      <div>
                        <div className="text-frost-500">24-Month Savings</div>
                        <div className="text-white font-semibold">{formatCurrency(standard.totalSavings)}</div>
                      </div>
                      <div>
                        <div className="text-frost-500">Your Net Savings</div>
                        <div className="text-neon-green font-semibold">{formatCurrency(standard.netSavings)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-midnight-800/50 rounded-xl p-5">
                    <div className="text-frost-400 mb-3">Flexible (50%)</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-frost-500">Monthly Savings</div>
                        <div className="text-white font-semibold">{formatCurrency(flexible.monthlySavings)}</div>
                      </div>
                      <div>
                        <div className="text-frost-500">Our Fee</div>
                        <div className="text-neon-purple font-semibold">{formatCurrency(flexible.fee)}</div>
                      </div>
                      <div>
                        <div className="text-frost-500">12-Month Savings</div>
                        <div className="text-white font-semibold">{formatCurrency(flexible.totalSavings)}</div>
                      </div>
                      <div>
                        <div className="text-frost-500">Your Net Savings</div>
                        <div className="text-neon-green font-semibold">{formatCurrency(flexible.netSavings)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-frost-500 text-sm text-center mt-6">
                  * Based on estimated 20% savings. Actual results vary by provider and account.
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Lifetime Plan */}
        {activeModel === 'lifetime' && (
          <section className="pb-20">
            <div className="section-container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
              >
                <div className="glass-panel p-10 md:p-12 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink" />
                  
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-neon-pink/10 border border-neon-pink/30">
                      <span className="text-neon-pink font-semibold">BEST VALUE</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {PRICING_CONFIG.lifetimePlan.name}
                    </h3>
                    <p className="text-frost-300 text-lg mb-6">
                      {PRICING_CONFIG.lifetimePlan.description}
                    </p>
                    
                    <div className="mb-2">
                      <span className="text-6xl font-bold text-white">
                        {formatCurrency(PRICING_CONFIG.lifetimePlan.price)}
                      </span>
                      <span className="text-frost-400 ml-3 text-xl">one-time</span>
                    </div>
                    <p className="text-frost-500">Lifetime access, no recurring fees ever</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {PRICING_CONFIG.lifetimePlan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-frost-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Savings Promise */}
                  <div className="bg-neon-green/5 border border-neon-green/20 rounded-xl p-6 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-2">Our Savings Promise</h4>
                        <p className="text-frost-300">
                          If we don't save you at least {formatCurrency(PRICING_CONFIG.lifetimePlan.savingsPromiseThreshold)} per year 
                          across your bills, your fee may be waived or refunded according to our{' '}
                          <a href="/refund-policy" className="text-neon-cyan hover:underline">refund policy</a>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Renegotiation Timeline */}
                  <div className="bg-midnight-800/50 rounded-xl p-6 mb-10">
                    <h4 className="text-white font-semibold mb-4">Your Renegotiation Timeline</h4>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 text-center">
                        <div className="w-10 h-10 mx-auto rounded-full bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center mb-2">
                          <span className="text-neon-cyan font-bold">1</span>
                        </div>
                        <div className="text-frost-300 text-sm">Initial Negotiation</div>
                        <div className="text-frost-500 text-xs">Right away</div>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-neon-cyan to-neon-purple" />
                      <div className="flex-1 text-center">
                        <div className="w-10 h-10 mx-auto rounded-full bg-neon-purple/20 border border-neon-purple/30 flex items-center justify-center mb-2">
                          <span className="text-neon-purple font-bold">2</span>
                        </div>
                        <div className="text-frost-300 text-sm">Second Round</div>
                        <div className="text-frost-500 text-xs">~6 months</div>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-neon-purple to-neon-pink" />
                      <div className="flex-1 text-center">
                        <div className="w-10 h-10 mx-auto rounded-full bg-neon-pink/20 border border-neon-pink/30 flex items-center justify-center mb-2">
                          <span className="text-neon-pink font-bold">∞</span>
                        </div>
                        <div className="text-frost-300 text-sm">Ongoing</div>
                        <div className="text-frost-500 text-xs">2x per year</div>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setIsModalOpen(true)} className="btn-primary w-full text-lg py-4">
                    Get Lifetime Access
                  </button>
                </div>

                {/* ROI Calculator */}
                <div className="glass-panel p-8 mt-8">
                  <h3 className="text-xl font-bold text-white mb-6 text-center">Calculate Your 5-Year ROI</h3>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-frost-300">Your Monthly Bill</label>
                      <span className="text-2xl font-bold text-neon-cyan">{formatCurrency(monthlyBill)}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value))}
                      className="w-full h-2 bg-midnight-700 rounded-full appearance-none cursor-pointer
                                [&::-webkit-slider-thumb]:appearance-none
                                [&::-webkit-slider-thumb]:w-5
                                [&::-webkit-slider-thumb]:h-5
                                [&::-webkit-slider-thumb]:rounded-full
                                [&::-webkit-slider-thumb]:bg-neon-cyan"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-midnight-800/50 rounded-xl p-4 text-center">
                      <div className="text-frost-500 text-sm mb-1">5-Year Savings</div>
                      <div className="text-2xl font-bold text-white">{formatCurrency(lifetime.totalSavings)}</div>
                    </div>
                    <div className="bg-midnight-800/50 rounded-xl p-4 text-center">
                      <div className="text-frost-500 text-sm mb-1">Plan Cost</div>
                      <div className="text-2xl font-bold text-neon-purple">{formatCurrency(lifetime.planCost)}</div>
                    </div>
                    <div className="bg-midnight-800/50 rounded-xl p-4 text-center">
                      <div className="text-frost-500 text-sm mb-1">Net Savings</div>
                      <div className="text-2xl font-bold text-neon-green">{formatCurrency(lifetime.netSavings)}</div>
                    </div>
                    <div className="bg-midnight-800/50 rounded-xl p-4 text-center">
                      <div className="text-frost-500 text-sm mb-1">ROI</div>
                      <div className="text-2xl font-bold text-neon-cyan">{Math.round(lifetime.roi)}%</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Comparison Table */}
        <section className="section-padding bg-midnight-900/50">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Compare All Plans
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-frost-300">Feature</th>
                    <th className="text-center py-4 px-4 text-neon-cyan">Standard (40%)</th>
                    <th className="text-center py-4 px-4 text-neon-purple">Flexible (50%)</th>
                    <th className="text-center py-4 px-4 text-neon-pink">Lifetime ($99)</th>
                  </tr>
                </thead>
                <tbody className="text-frost-300">
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4">Upfront Cost</td>
                    <td className="text-center py-4 px-4">$0</td>
                    <td className="text-center py-4 px-4">$0</td>
                    <td className="text-center py-4 px-4">$99</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4">Fee Structure</td>
                    <td className="text-center py-4 px-4">40% of savings</td>
                    <td className="text-center py-4 px-4">50% of savings</td>
                    <td className="text-center py-4 px-4">One-time</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4">Cap Period</td>
                    <td className="text-center py-4 px-4">24 months</td>
                    <td className="text-center py-4 px-4">12 months</td>
                    <td className="text-center py-4 px-4">N/A</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4">Payment Options</td>
                    <td className="text-center py-4 px-4">One-time</td>
                    <td className="text-center py-4 px-4">Upfront or Monthly</td>
                    <td className="text-center py-4 px-4">One-time</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4">Bill Monitoring</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">✓</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4">Renegotiations/Year</td>
                    <td className="text-center py-4 px-4">1</td>
                    <td className="text-center py-4 px-4">1</td>
                    <td className="text-center py-4 px-4">Up to 2</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4">Savings Promise</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">-</td>
                    <td className="text-center py-4 px-4">$300/year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-12">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto text-frost-500 text-sm">
              <p className="mb-4">
                * Savings not guaranteed. Results vary by provider, location, and account details. 
                We are not affiliated with any service providers. Fees are clearly disclosed before 
                any work begins.
              </p>
              <p>
                See our full <a href="/disclaimer" className="text-neon-cyan hover:underline">disclaimer</a> and{' '}
                <a href="/terms-of-service" className="text-neon-cyan hover:underline">terms of service</a> for details.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
