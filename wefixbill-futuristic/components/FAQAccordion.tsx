'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQ_ITEMS } from '@/lib/mockData'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface FAQAccordionProps {
  items?: typeof FAQ_ITEMS
  limit?: number
  showViewAll?: boolean
}

export default function FAQAccordion({ 
  items = FAQ_ITEMS, 
  limit,
  showViewAll = true 
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const displayItems = limit ? items.slice(0, limit) : items

  return (
    <section id="faq" className="section-padding">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-frost-300 max-w-2xl mx-auto">
              Everything you need to know about our bill negotiation service
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {displayItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="glass-panel overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-medium text-white pr-8">{item.question}</span>
                    <motion.svg
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-5 h-5 text-neon-cyan flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-frost-300 border-t border-white/5 pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {showViewAll && limit && items.length > limit && (
              <motion.div variants={fadeInUp} className="text-center mt-8">
                <a href="/faq" className="btn-secondary">
                  View All FAQs
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
