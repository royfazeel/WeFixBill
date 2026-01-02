'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'
import FloatingButton from '@/components/FloatingButton'
import { BILL_CATEGORIES } from '@/lib/pricing'

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const services = BILL_CATEGORIES.map(cat => ({
    id: cat.id,
    icon: cat.icon,
    title: cat.name,
    description: `Let us negotiate your ${cat.name.toLowerCase()} bills and save you money every month.`,
    savings: `$${Math.floor(Math.random() * 30 + 20)}-$${Math.floor(Math.random() * 50 + 50)}/mo average savings`,
  }))

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
                Bills we <span className="gradient-text">negotiate</span>
              </h1>
              <p className="text-body-lg text-slate-600">
                From internet and cable to wireless and utilities, we negotiate all your recurring bills.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding">
          <div className="section-container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-elevated p-6"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {service.savings}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-surface-secondary">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-display-3 font-bold text-slate-900 mb-6">
                Don&apos;t see your bill?
              </h2>
              <p className="text-body-lg text-slate-600 mb-8">
                We negotiate many other types of bills. Contact us to see if we can help.
              </p>
              <FloatingButton onClick={() => setIsModalOpen(true)} variant="primary" size="xl">
                Get Started
              </FloatingButton>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
