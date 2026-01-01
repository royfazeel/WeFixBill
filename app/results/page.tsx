'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'
import { formatCurrency } from '@/lib/utils'
import { CASE_RESULTS } from '@/lib/mockData'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const categories = ['all', 'internet', 'cable', 'wireless', 'utilities', 'insurance', 'subscriptions', 'security']

export default function ResultsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'savings' | 'recent'>('savings')

  const filteredResults = CASE_RESULTS
    .filter(r => activeCategory === 'all' || r.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'savings') return b.monthlySavings - a.monthlySavings
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  const totalSaved = CASE_RESULTS.reduce((sum, r) => sum + r.annualSavings, 0)
  const avgSavings = Math.round(CASE_RESULTS.reduce((sum, r) => sum + r.monthlySavings, 0) / CASE_RESULTS.length)

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
                Real <span className="gradient-text-aurora">Results</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-frost-300 mb-8"
              >
                See how we've helped customers like you save money on their bills
              </motion.p>

              {/* Stats */}
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
                <div className="glass-panel p-4">
                  <div className="text-2xl font-bold text-neon-cyan">{formatCurrency(totalSaved)}</div>
                  <div className="text-frost-400 text-sm">Total Saved</div>
                </div>
                <div className="glass-panel p-4">
                  <div className="text-2xl font-bold text-neon-purple">{CASE_RESULTS.length}</div>
                  <div className="text-frost-400 text-sm">Case Examples</div>
                </div>
                <div className="glass-panel p-4">
                  <div className="text-2xl font-bold text-neon-green">${avgSavings}/mo</div>
                  <div className="text-frost-400 text-sm">Avg. Savings</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="pb-8">
          <div className="section-container">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Category filters */}
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

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-frost-400 text-sm">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'savings' | 'recent')}
                  className="bg-midnight-800 border border-white/10 rounded-lg px-3 py-2 text-frost-200 text-sm focus:outline-none focus:border-neon-cyan/50"
                >
                  <option value="savings">Highest Savings</option>
                  <option value="recent">Most Recent</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results Grid */}
        <section className="pb-20">
          <div className="section-container">
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredResults.map((result) => (
                  <motion.div
                    key={result.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass-panel-hover p-6 group"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
                          <span className="text-lg">
                            {result.category === 'internet' && '🌐'}
                            {result.category === 'cable' && '📺'}
                            {result.category === 'wireless' && '📱'}
                            {result.category === 'utilities' && '⚡'}
                            {result.category === 'insurance' && '🛡️'}
                            {result.category === 'subscriptions' && '🎬'}
                            {result.category === 'security' && '🏠'}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{result.provider}</div>
                          <div className="text-frost-500 text-sm">{result.location}</div>
                        </div>
                      </div>
                      <div className="text-frost-500 text-sm">{result.date}</div>
                    </div>

                    {/* Before/After */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-red-500/10 rounded-lg p-3 text-center">
                        <div className="text-frost-400 text-xs mb-1">Before</div>
                        <div className="text-red-400 font-bold text-xl">{formatCurrency(result.oldBill)}/mo</div>
                      </div>
                      <div className="bg-neon-green/10 rounded-lg p-3 text-center">
                        <div className="text-frost-400 text-xs mb-1">After</div>
                        <div className="text-neon-green font-bold text-xl">{formatCurrency(result.newBill)}/mo</div>
                      </div>
                    </div>

                    {/* Savings highlight */}
                    <div className="bg-midnight-800/50 rounded-lg p-4 mb-4 text-center">
                      <div className="text-frost-400 text-sm mb-1">Total Savings</div>
                      <div className="flex items-center justify-center gap-4">
                        <div>
                          <span className="text-2xl font-bold text-neon-cyan">{formatCurrency(result.monthlySavings)}</span>
                          <span className="text-frost-400 text-sm">/mo</span>
                        </div>
                        <div className="text-frost-500">|</div>
                        <div>
                          <span className="text-2xl font-bold text-neon-purple">{formatCurrency(result.annualSavings)}</span>
                          <span className="text-frost-400 text-sm">/yr</span>
                        </div>
                      </div>
                    </div>

                    {/* Story */}
                    <p className="text-frost-400 text-sm leading-relaxed">
                      {result.story}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-frost-400">No results found for this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-midnight-900/50">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-10 md:p-16 text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Want Results Like These?
              </h2>
              <p className="text-frost-300 text-lg mb-8">
                Join the thousands who have saved money with Wefixbill. 
                Your savings story starts here.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary text-lg px-12 py-4"
              >
                Start Your Free Analysis
              </button>
              <p className="text-frost-500 text-sm mt-4">
                No commitment required • No savings = no fee
              </p>
            </motion.div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-12">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto text-frost-500 text-sm">
              <p>
                * These are representative case examples. Individual results vary based on 
                provider, location, account history, and other factors. Past results do not 
                guarantee future outcomes.
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
