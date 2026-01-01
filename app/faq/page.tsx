'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'
import { FAQ_ITEMS } from '@/lib/mockData'
import { fadeInUp, staggerContainer } from '@/lib/motion'

export default function FAQPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [openItems, setOpenItems] = useState<number[]>([])

  const categories = ['all', 'pricing', 'process', 'services', 'security', 'billing']

  const filteredFAQs = FAQ_ITEMS.filter(
    (faq) => activeCategory === 'all' || faq.category === activeCategory
  )

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

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
                Frequently Asked <span className="gradient-text-aurora">Questions</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-frost-300 mb-8"
              >
                Everything you need to know about our bill negotiation services
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Category filters */}
        <section className="pb-8">
          <div className="section-container">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                      : 'bg-white/5 text-frost-400 hover:text-white border border-transparent'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Items */}
        <section className="pb-20">
          <div className="section-container max-w-3xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-panel overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                    aria-expanded={openItems.includes(index)}
                  >
                    <span className="text-white font-medium pr-4">{faq.question}</span>
                    <motion.svg
                      animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                      className="w-5 h-5 text-neon-cyan flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {openItems.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 text-frost-300 border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Still have questions */}
        <section className="section-padding bg-midnight-900/50">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-10 md:p-16 text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-frost-300 text-lg mb-8">
                Our team is here to help. Reach out and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="btn-primary text-lg px-8 py-4"
                >
                  Contact Us
                </a>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Start Saving
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
