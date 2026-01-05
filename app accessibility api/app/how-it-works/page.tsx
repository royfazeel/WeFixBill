'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButton from '@/components/FloatingButton'
import IntakeModal from '@/components/IntakeModal'

const steps = [
  {
    number: '01',
    title: 'Submit Your Bills',
    description: 'Tell us about your current bills - internet, cable, wireless, utilities, or any recurring service. Upload a copy of your bill or just enter the details manually.',
    details: ['No upfront payment required', 'Takes less than 5 minutes', 'Secure & encrypted'],
    icon: '📄',
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    number: '02',
    title: 'We Analyze & Strategize',
    description: 'Our expert negotiators review your bills, identify savings opportunities, and develop a personalized negotiation strategy based on current promotions and competitor offers.',
    details: ['Industry expertise', 'Know all the tricks', 'Find hidden discounts'],
    icon: '🔍',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '03',
    title: 'Expert Negotiation',
    description: 'We contact your service providers on your behalf and negotiate for better rates, applying our proven techniques that have saved customers millions.',
    details: ['Professional negotiators', 'Average 2-3 calls per bill', 'We handle everything'],
    icon: '💬',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    number: '04',
    title: 'Review & Approve',
    description: 'Before any changes are made, we present you with the savings we\'ve secured. You review and approve the new rates - no surprises, complete transparency.',
    details: ['No changes without approval', 'Clear savings breakdown', 'Keep your current services'],
    icon: '✅',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    number: '05',
    title: 'Start Saving',
    description: 'Once approved, the new rates take effect on your next billing cycle. You keep the savings month after month, year after year.',
    details: ['Immediate savings', 'Ongoing monitoring available', 'Lifetime benefits'],
    icon: '💰',
    gradient: 'from-orange-500 to-amber-500',
  },
]

export default function HowItWorksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="section-container text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-indigo-50 border border-indigo-100">
              <span className="text-sm font-medium text-indigo-700">Simple Process</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              How <span className="gradient-text">It Works</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Five simple steps from overpaying to saving hundreds every year. 
              No risk, no hassle, no upfront costs.
            </p>
          </motion.div>
        </section>

        {/* Steps */}
        <section className="section-container mb-20">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
              >
                <div className="flex-1">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-gradient-to-r ${step.gradient} text-white text-sm font-bold`}>
                    Step {step.number}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    {step.title}
                  </h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-600">
                        <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className={`w-48 h-48 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-8xl shadow-xl`}>
                    {step.icon}
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
            className="stripe-card p-12 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Ready to Start Saving?
            </h2>
            <p className="text-slate-600 mb-8">
              Join thousands of happy customers who save an average of $127/month.
            </p>
            <FloatingButton
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              size="lg"
            >
              Get Started Now
            </FloatingButton>
          </motion.div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
