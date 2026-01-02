'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'
import FloatingButton from '@/components/FloatingButton'
import { cn, formatCurrency } from '@/lib/utils'
import { calculateSuccessFee, calculateLifetimePlanValue } from '@/lib/pricing'

export default function PricingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeModel, setActiveModel] = useState<'success' | 'lifetime'>('success')
  const [monthlyBill, setMonthlyBill] = useState(150)

  const estimatedMonthlySavings = Math.round(monthlyBill * 0.20)
  const standard = calculateSuccessFee(estimatedMonthlySavings, 40, 24)
  const flexible = calculateSuccessFee(estimatedMonthlySavings, 50, 12)
  const lifetime = calculateLifetimePlanValue(estimatedMonthlySavings, 5)

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding bg-gradient-hero">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-display-3 md:text-display-2 font-bold text-slate-900 mb-6">
                Simple, <span className="gradient-text">transparent</span> pricing
              </h1>
              <p className="text-body-lg text-slate-600 mb-8">
                Choose the model that works best for you. No hidden fees, ever.
              </p>

              {/* Toggle */}
              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl mb-12">
                <button
                  onClick={() => setActiveModel('success')}
                  className={cn(
                    'px-6 py-3 rounded-lg font-medium transition-all text-sm',
                    activeModel === 'success'
                      ? 'bg-white text-stripe-purple shadow-stripe-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  )}
                >
                  Success Fee
                </button>
                <button
                  onClick={() => setActiveModel('lifetime')}
                  className={cn(
                    'px-6 py-3 rounded-lg font-medium transition-all text-sm',
                    activeModel === 'lifetime'
                      ? 'bg-white text-stripe-purple shadow-stripe-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  )}
                >
                  Lifetime Plan
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Success Fee Plans */}
        {activeModel === 'success' && (
          <section className="pb-20 -mt-8">
            <div className="section-container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
              >
                {/* Standard Plan */}
                <div className="card-elevated p-8 relative">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Standard</h3>
                  <p className="text-slate-500 text-sm mb-6">Best for one-time negotiation</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-stripe-purple">40%</span>
                    <span className="text-slate-500 ml-2">of savings</span>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Protection Period</span>
                      <span className="font-semibold text-slate-900">24 months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">First Month Savings</span>
                      <span className="font-semibold text-green-600">100% yours</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {[
                      'Expert negotiation team',
                      '24-month rate protection',
                      'No upfront costs',
                      'Full support throughout',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <FloatingButton onClick={() => setIsModalOpen(true)} variant="primary" size="lg" fullWidth>
                    Get Started
                  </FloatingButton>
                </div>

                {/* Flexible Plan */}
                <div className="card-elevated p-8 relative border-2 border-stripe-purple">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-stripe-purple text-white text-xs font-semibold rounded-full">
                    MOST POPULAR
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Flexible</h3>
                  <p className="text-slate-500 text-sm mb-6">Lower commitment period</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-stripe-purple">50%</span>
                    <span className="text-slate-500 ml-2">of savings</span>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Protection Period</span>
                      <span className="font-semibold text-slate-900">12 months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">First Month Savings</span>
                      <span className="font-semibold text-green-600">100% yours</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {[
                      'Expert negotiation team',
                      '12-month rate protection',
                      'No upfront costs',
                      'Full support throughout',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <FloatingButton onClick={() => setIsModalOpen(true)} variant="primary" size="lg" fullWidth>
                    Get Started
                  </FloatingButton>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Lifetime Plan */}
        {activeModel === 'lifetime' && (
          <section className="pb-20 -mt-8">
            <div className="section-container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                <div className="card-elevated p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-stripe" />
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-stripe-purple/10 text-stripe-purple text-xs font-semibold rounded-full mb-6">
                    BEST VALUE
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Lifetime Plan</h3>
                  <p className="text-slate-500 mb-6">One payment, unlimited negotiations</p>
                  
                  <div className="mb-8">
                    <span className="text-6xl font-bold text-slate-900">$99</span>
                    <span className="text-slate-500 ml-2">one-time</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-left max-w-sm mx-auto">
                    {[
                      'Unlimited bill negotiations',
                      'All bill categories included',
                      'Priority support',
                      'Lifetime access',
                      'No percentage fees ever',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-600">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <FloatingButton onClick={() => setIsModalOpen(true)} variant="primary" size="xl" fullWidth>
                    Get Lifetime Access
                  </FloatingButton>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Savings Calculator */}
        <section className="section-padding bg-surface-secondary">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-display-3 font-bold text-slate-900 mb-4">
                  Calculate your savings
                </h2>
                <p className="text-body-lg text-slate-600">
                  See how much you could save with each pricing model
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-elevated p-8"
              >
                <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Your monthly bill amount
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-slate-900">${monthlyBill}</span>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-stripe-purple"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>$50</span>
                    <span>$500</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <div className="text-sm text-slate-500 mb-1">Standard (40%)</div>
                    <div className="text-2xl font-bold text-stripe-purple">{formatCurrency(standard.netSavings)}</div>
                    <div className="text-xs text-slate-400">your savings over 24mo</div>
                  </div>
                  <div className="bg-stripe-purple/5 rounded-xl p-4 text-center border border-stripe-purple/20">
                    <div className="text-sm text-stripe-purple font-medium mb-1">Flexible (50%)</div>
                    <div className="text-2xl font-bold text-stripe-purple">{formatCurrency(flexible.netSavings)}</div>
                    <div className="text-xs text-slate-400">your savings over 12mo</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <div className="text-sm text-slate-500 mb-1">Lifetime ($99)</div>
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(lifetime.netSavings)}</div>
                    <div className="text-xs text-slate-400">your savings over 5 years</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-display-3 font-bold text-slate-900 mb-4">
                Pricing FAQ
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: 'When do I pay?',
                  a: 'You only pay after we successfully negotiate savings on your bill. There are no upfront costs.',
                },
                {
                  q: 'What if you can\'t save me money?',
                  a: 'If we can\'t negotiate any savings, you pay nothing. It\'s completely risk-free.',
                },
                {
                  q: 'How is the fee calculated?',
                  a: 'For Success Fee plans, your fee is calculated as a percentage of the total savings over the protection period. First month savings are always 100% yours.',
                },
                {
                  q: 'What does the Lifetime Plan include?',
                  a: 'The Lifetime Plan includes unlimited bill negotiations across all categories for a one-time $99 fee. No percentage fees ever.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-elevated p-6"
                >
                  <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-slate-600 text-sm">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
