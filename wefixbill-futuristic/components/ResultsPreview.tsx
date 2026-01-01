'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CASE_RESULTS } from '@/lib/mockData'
import { BILL_CATEGORIES } from '@/lib/pricing'
import { formatCurrency } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/motion'

interface ResultsPreviewProps {
  limit?: number
}

export default function ResultsPreview({ limit = 4 }: ResultsPreviewProps) {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
  
  const displayResults = CASE_RESULTS.slice(0, limit)

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const getCategoryIcon = (categoryId: string) => {
    const cat = BILL_CATEGORIES.find(c => c.id === categoryId)
    return cat?.icon || '📄'
  }

  return (
    <section className="section-padding bg-midnight-900/30">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Real <span className="gradient-text">Results</span>
            </h2>
            <p className="text-lg text-frost-300 max-w-2xl mx-auto">
              See how much we've saved customers like you. Tap cards to see the story.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayResults.map((result) => {
              const isFlipped = flippedCards.has(result.id)
              
              return (
                <motion.div
                  key={result.id}
                  variants={fadeInUp}
                  className="perspective-1000"
                >
                  <motion.div
                    onClick={() => toggleFlip(result.id)}
                    className="relative w-full h-[280px] cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    {/* Front */}
                    <div 
                      className="absolute inset-0 glass-panel p-6 flex flex-col backface-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{getCategoryIcon(result.category)}</span>
                        <div>
                          <p className="text-white font-semibold">{result.provider}</p>
                          <p className="text-frost-500 text-sm">{result.location}</p>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-center">
                            <p className="text-frost-400 text-xs mb-1">Was</p>
                            <p className="text-xl font-bold text-red-400 line-through">{formatCurrency(result.oldBill)}</p>
                          </div>
                          <svg className="w-6 h-6 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          <div className="text-center">
                            <p className="text-frost-400 text-xs mb-1">Now</p>
                            <p className="text-xl font-bold text-neon-green">{formatCurrency(result.newBill)}</p>
                          </div>
                        </div>

                        <div className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-3 text-center">
                          <p className="text-neon-green font-bold text-lg">
                            {formatCurrency(result.monthlySavings)}/mo saved
                          </p>
                          <p className="text-frost-400 text-sm">
                            {formatCurrency(result.annualSavings)}/year
                          </p>
                        </div>
                      </div>

                      <p className="text-frost-500 text-xs text-center mt-4">
                        Tap to see story
                      </p>
                    </div>

                    {/* Back */}
                    <div 
                      className="absolute inset-0 glass-panel p-6 flex flex-col backface-hidden"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">{getCategoryIcon(result.category)}</span>
                        <span className="text-white font-semibold">{result.provider}</span>
                      </div>

                      <p className="text-frost-300 text-sm flex-1">
                        {result.story}
                      </p>

                      <div className="pt-4 border-t border-white/10">
                        <p className="text-frost-500 text-xs">
                          {result.location} • {result.date}
                        </p>
                      </div>

                      <p className="text-frost-500 text-xs text-center mt-4">
                        Tap to flip back
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          <motion.div variants={fadeInUp} className="text-center mt-10">
            <a href="/results" className="btn-secondary">
              View All Results
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
