'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButton from '@/components/FloatingButton'
import IntakeModal from '@/components/IntakeModal'

const plans = [
  {
    name: 'One-Time',
    description: 'Perfect for a single bill negotiation',
    price: '50%',
    priceSubtext: 'of first year savings',
    features: [
      'One bill negotiation',
      'Expert negotiators',
      'No upfront cost',
      'No savings = no fee',
      'Email support',
    ],
    popular: false,
    gradient: 'from-slate-500 to-slate-600',
  },
  {
    name: 'All Bills',
    description: 'Negotiate all your recurring bills',
    price: '40%',
    priceSubtext: 'of first year savings',
    features: [
      'Unlimited bill negotiations',
      'Priority handling',
      'No upfront cost',
      'No savings = no fee',
      'Phone & email support',
      'Annual rate review',
    ],
    popular: true,
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    name: 'Lifetime',
    description: 'Ongoing monitoring & re-negotiation',
    price: '35%',
    priceSubtext: 'of first year savings',
    features: [
      'Everything in All Bills',
      'Continuous monitoring',
      'Automatic re-negotiation',
      'Rate increase protection',
      'Priority 24/7 support',
      'Dedicated account manager',
    ],
    popular: false,
    gradient: 'from-emerald-500 to-emerald-600',
  },
]

const faqs = [
  {
    question: 'When do I pay?',
    answer: 'You only pay after we successfully save you money. We take a percentage of your first year\'s savings. If we don\'t save you anything, you pay nothing.',
  },
  {
    question: 'Are there any upfront costs?',
    answer: 'No, there are absolutely no upfront costs. Our fee is only collected after we\'ve secured savings for you.',
  },
  {
    question: 'What if you can\'t lower my bill?',
    answer: 'If we can\'t negotiate any savings, you don\'t pay us a cent. That\'s our guarantee.',
  },
  {
    question: 'How is the fee calculated?',
    answer: 'The fee is a percentage of your first year\'s savings only. After the first year, you keep 100% of the ongoing savings.',
  },
]

export default function PricingPage() {
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
              <span className="text-sm font-medium text-emerald-700">No Savings = No Fee</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              You only pay when we save you money. No upfront costs, no hidden fees, 
              no risk to you.
            </p>
          </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="section-container mb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative stripe-card p-8 ${plan.popular ? 'ring-2 ring-indigo-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 text-sm block">{plan.priceSubtext}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <FloatingButton
                  onClick={() => setIsModalOpen(true)}
                  variant={plan.popular ? 'primary' : 'secondary'}
                  size="md"
                  fullWidth
                >
                  Get Started
                </FloatingButton>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="section-container max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">
            Pricing FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stripe-card p-6"
              >
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
