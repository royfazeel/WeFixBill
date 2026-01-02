'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'
import { BILL_CATEGORIES } from '@/lib/pricing'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const services = [
  {
    title: 'Bill Negotiation',
    description: 'Our expert negotiators contact your providers and fight for better rates on your behalf.',
    features: [
      'Professional negotiation with trained specialists',
      'We handle all phone calls and waiting',
      'No login credentials required',
      'You approve all changes before implementation',
    ],
    icon: '💬',
  },
  {
    title: 'Bill Monitoring',
    description: 'With our Lifetime Plan, we continuously monitor your bills for savings opportunities.',
    features: [
      'Automatic tracking of billing cycles',
      'Alerts for price increases',
      'Notification of expiring promotions',
      'Proactive renegotiation when opportunities arise',
    ],
    icon: '👁️',
  },
  {
    title: 'Rate Analysis',
    description: 'We analyze your current rates against available offers in your area.',
    features: [
      'Comparison with current promotions',
      'Local market rate analysis',
      'Identification of hidden fees',
      'Recommendations for optimal plans',
    ],
    icon: '📊',
  },
  {
    title: 'Ongoing Support',
    description: 'We provide continuous support and assistance with your bills.',
    features: [
      'Email and phone support',
      'Regular savings reports',
      'Help with billing disputes',
      'Guidance on plan changes',
    ],
    icon: '🤝',
  },
]

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
                Our <span className="gradient-text-aurora">Services</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-frost-300 mb-8"
              >
                Comprehensive bill management solutions to keep more money in your pocket
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Bill Categories */}
        <section className="pb-20">
          <div className="section-container">
            <h2 className="text-2xl font-bold text-white text-center mb-12">
              Bills We Negotiate
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {BILL_CATEGORIES.map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-6 text-center"
                >
                  <span className="text-4xl mb-3 block">{cat.icon}</span>
                  <h3 className="text-white font-semibold mb-1">{cat.name}</h3>
                  <p className="text-frost-400 text-sm">
                    Save ${cat.avgSavings.min}-${cat.avgSavings.max}/mo
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding bg-midnight-900/50">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-8"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-frost-300 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-frost-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Monitoring Section */}
        <section id="monitoring" className="section-padding">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel p-8 md:p-12"
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-white mb-4">Bill Monitoring</h2>
                  <p className="text-frost-300 text-lg">
                    Available with our Lifetime Plan - we never stop looking for ways to save you money
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Price Increase Alerts</h3>
                    <p className="text-frost-400 text-sm">Get notified when your provider raises rates so we can act fast</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Renewal Tracking</h3>
                    <p className="text-frost-400 text-sm">We track contract renewals and renegotiate before rates increase</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-neon-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Bi-Annual Reviews</h3>
                    <p className="text-frost-400 text-sm">Up to 2 renegotiations per year per bill, automatically</p>
                  </div>
                </div>
              </motion.div>
            </div>
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
                Ready to Lower Your Bills?
              </h2>
              <p className="text-frost-300 text-lg mb-8">
                Get started in minutes. No commitment, no risk.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary text-lg px-12 py-4"
              >
                Start Your Free Analysis
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
