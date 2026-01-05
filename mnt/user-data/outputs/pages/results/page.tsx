'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButton from '@/components/FloatingButton'
import IntakeModal from '@/components/IntakeModal'

const stats = [
  { value: '$2.5M+', label: 'Total Customer Savings' },
  { value: '15,000+', label: 'Bills Negotiated' },
  { value: '94%', label: 'Success Rate' },
  { value: '$127', label: 'Avg. Monthly Savings' },
]

const testimonials = [
  {
    quote: "I was skeptical at first, but Wefixbill actually lowered my internet bill from $189 to $99. That's $90 a month I was just throwing away!",
    author: 'Sarah M.',
    location: 'Austin, TX',
    savings: '$1,080/year',
    bill: 'Internet',
    rating: 5,
  },
  {
    quote: "They negotiated my cable and wireless bills together. The process was so easy - I didn't have to do anything except sign the authorization.",
    author: 'Michael R.',
    location: 'Denver, CO',
    savings: '$1,524/year',
    bill: 'Cable & Wireless',
    rating: 5,
  },
  {
    quote: "The team was professional and kept me updated throughout. They saved me money on bills I didn't even know could be negotiated.",
    author: 'Jennifer L.',
    location: 'Seattle, WA',
    savings: '$936/year',
    bill: 'Multiple Bills',
    rating: 5,
  },
  {
    quote: "I've been with my internet provider for 10 years and was paying way too much. Wefixbill got me a promotional rate I didn't even know existed.",
    author: 'David K.',
    location: 'Chicago, IL',
    savings: '$720/year',
    bill: 'Internet',
    rating: 5,
  },
  {
    quote: "As a small business owner, every dollar counts. They helped reduce our office internet and phone bills significantly.",
    author: 'Amanda T.',
    location: 'Miami, FL',
    savings: '$2,160/year',
    bill: 'Business Services',
    rating: 5,
  },
  {
    quote: "I tried negotiating myself before and got nowhere. These guys have the expertise and connections to actually get results.",
    author: 'Robert J.',
    location: 'Phoenix, AZ',
    savings: '$648/year',
    bill: 'Cable TV',
    rating: 5,
  },
]

const savingsByCategory = [
  { category: 'Internet', avgSavings: '$45/mo', topSavings: '$120/mo' },
  { category: 'Cable & TV', avgSavings: '$38/mo', topSavings: '$95/mo' },
  { category: 'Wireless', avgSavings: '$52/mo', topSavings: '$140/mo' },
  { category: 'Utilities', avgSavings: '$35/mo', topSavings: '$85/mo' },
  { category: 'Insurance', avgSavings: '$67/mo', topSavings: '$200/mo' },
]

export default function ResultsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="section-container text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-emerald-50 border border-emerald-100">
              <span className="text-sm font-medium text-emerald-700">Proven Results</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Real <span className="gradient-text">Savings</span>, Real People
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it. See what our customers have saved 
              and hear their stories.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="section-container mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="stripe-card p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Savings by Category */}
        <section className="section-container mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">
            Average Savings by Category
          </h2>
          <div className="max-w-3xl mx-auto">
            {savingsByCategory.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0"
              >
                <span className="font-medium text-slate-900">{item.category}</span>
                <div className="flex gap-6">
                  <div className="text-right">
                    <div className="text-emerald-600 font-bold">{item.avgSavings}</div>
                    <div className="text-xs text-slate-400">Average</div>
                  </div>
                  <div className="text-right">
                    <div className="text-indigo-600 font-bold">{item.topSavings}</div>
                    <div className="text-xs text-slate-400">Top Savings</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-container mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">
            Customer Success Stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
                className="stripe-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{testimonial.author}</p>
                    <p className="text-xs text-slate-500">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">{testimonial.bill}</p>
                    <p className="font-bold text-emerald-600">{testimonial.savings}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join Them?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
              Start saving today. No risk, no upfront cost, and guaranteed results.
            </p>
            <FloatingButton
              onClick={() => setIsModalOpen(true)}
              variant="secondary"
              size="lg"
              className="bg-white text-indigo-600 hover:bg-indigo-50"
            >
              Start Saving Now
            </FloatingButton>
          </motion.div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
