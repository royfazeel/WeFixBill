'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatCurrency } from '@/lib/utils'
import { PRICING_CONFIG, calculateSuccessFee, calculateLifetimePlanValue } from '@/lib/pricing'
import { fadeInUp } from '@/lib/motion'

interface SavingsCalculatorProps {
  onOpenModal?: () => void
}

export default function SavingsCalculator({ onOpenModal }: SavingsCalculatorProps) {
  const [monthlyBill, setMonthlyBill] = useState(150)
  const [selectedPlan, setSelectedPlan] = useState<'success-40' | 'success-50' | 'lifetime'>('success-40')
  
  // Calculate savings based on selected plan
  const getSavingsData = () => {
    // Assume 20% average savings
    const estimatedMonthlySavings = Math.round(monthlyBill * 0.20)
    
    if (selectedPlan === 'lifetime') {
      const data = calculateLifetimePlanValue(estimatedMonthlySavings, 5)
      return {
        monthlySavings: estimatedMonthlySavings,
        annualSavings: estimatedMonthlySavings * 12,
        fee: data.planCost,
        netSavings: data.netSavings,
        fiveYearSavings: data.totalSavings,
        roi: data.roi,
      }
    }
    
    const config = selectedPlan === 'success-40' 
      ? PRICING_CONFIG.successFee.standard 
      : PRICING_CONFIG.successFee.flexible
    
    const data = calculateSuccessFee(estimatedMonthlySavings, config.feePercent, config.capMonths)
    
    return {
      monthlySavings: data.monthlySavings,
      annualSavings: data.annualSavings,
      fee: data.fee,
      netSavings: data.netSavings,
      totalSavings: data.totalSavings,
      feePercent: data.feePercent,
    }
  }

  const savings = getSavingsData()

  return (
    <section className="section-padding bg-midnight-900/50">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Calculate Your <span className="gradient-text">Potential Savings</span>
          </h2>
          <p className="text-lg text-frost-300 max-w-2xl mx-auto">
            See how much you could save based on your current bill and our pricing models
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="glass-panel p-6 md:p-10"
          >
            {/* Bill amount slider */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-frost-200 font-medium">Your Monthly Bill</label>
                <div className="text-3xl font-bold text-neon-cyan">
                  {formatCurrency(monthlyBill)}
                </div>
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
                          [&::-webkit-slider-thumb]:w-6
                          [&::-webkit-slider-thumb]:h-6
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-neon-cyan
                          [&::-webkit-slider-thumb]:shadow-neon-cyan
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:transition-transform
                          [&::-webkit-slider-thumb]:hover:scale-110"
              />
              <div className="flex justify-between text-sm text-frost-400 mt-2">
                <span>$50</span>
                <span>$500</span>
              </div>
            </div>

            {/* Plan selection */}
            <div className="mb-10">
              <label className="text-frost-200 font-medium block mb-4">Select Pricing Model</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setSelectedPlan('success-40')}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    selectedPlan === 'success-40'
                      ? 'bg-neon-cyan/10 border-neon-cyan text-white'
                      : 'bg-white/5 border-white/10 text-frost-300 hover:border-white/20'
                  }`}
                >
                  <div className="font-semibold mb-1">Success Fee (40%)</div>
                  <div className="text-sm opacity-80">Pay 40% of savings</div>
                </button>
                <button
                  onClick={() => setSelectedPlan('success-50')}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    selectedPlan === 'success-50'
                      ? 'bg-neon-purple/10 border-neon-purple text-white'
                      : 'bg-white/5 border-white/10 text-frost-300 hover:border-white/20'
                  }`}
                >
                  <div className="font-semibold mb-1">Flexible (50%)</div>
                  <div className="text-sm opacity-80">Payment options</div>
                </button>
                <button
                  onClick={() => setSelectedPlan('lifetime')}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    selectedPlan === 'lifetime'
                      ? 'bg-neon-pink/10 border-neon-pink text-white'
                      : 'bg-white/5 border-white/10 text-frost-300 hover:border-white/20'
                  }`}
                >
                  <div className="font-semibold mb-1">Lifetime Plan</div>
                  <div className="text-sm opacity-80">One-time $99</div>
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-midnight-800/50 rounded-xl p-4 text-center">
                <div className="text-frost-400 text-sm mb-1">Monthly Savings</div>
                <div className="text-2xl font-bold text-neon-green">
                  {formatCurrency(savings.monthlySavings)}
                </div>
              </div>
              <div className="bg-midnight-800/50 rounded-xl p-4 text-center">
                <div className="text-frost-400 text-sm mb-1">Annual Savings</div>
                <div className="text-2xl font-bold text-neon-cyan">
                  {formatCurrency(savings.annualSavings)}
                </div>
              </div>
              <div className="bg-midnight-800/50 rounded-xl p-4 text-center">
                <div className="text-frost-400 text-sm mb-1">Our Fee</div>
                <div className="text-2xl font-bold text-neon-purple">
                  {formatCurrency(savings.fee)}
                </div>
              </div>
              <div className="bg-midnight-800/50 rounded-xl p-4 text-center">
                <div className="text-frost-400 text-sm mb-1">Your Net Savings</div>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(savings.netSavings)}
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-frost-300">
                  {selectedPlan === 'lifetime' ? (
                    <>
                      <strong className="text-white">Lifetime Plan:</strong> Pay {formatCurrency(PRICING_CONFIG.lifetimePlan.price)} once for unlimited bill monitoring and up to {PRICING_CONFIG.lifetimePlan.renegotiationCadence} renegotiations per year, per bill. Over 5 years, your ROI could be <span className="text-neon-green font-semibold">{Math.round(savings.roi || 0)}%</span>.
                    </>
                  ) : (
                    <>
                      <strong className="text-white">Success Fee Model:</strong> If we save you {formatCurrency(savings.monthlySavings)}/month, you pay {savings.feePercent}% of your savings over {selectedPlan === 'success-40' ? '24' : '12'} months. No savings = no fee.
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button onClick={onOpenModal} className="btn-primary text-lg px-10 py-4">
                Start Your Free Analysis
              </button>
              <p className="text-frost-400 text-sm mt-4">
                * Estimates based on 20% average savings. Actual results vary.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
