'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'
import FloatingButton from '@/components/FloatingButton'

const steps = [
  {
    number: '01',
    title: 'Submit Your Bill',
    description: 'Tell us about your bill and optionally upload a copy. The more information you provide, the better we can negotiate.',
    details: [
      'Select your bill category (internet, cable, wireless, etc.)',
      'Enter your current provider and monthly amount',
      'Upload your bill for faster processing (optional)',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'We Analyze',
    description: 'Our expert team reviews your bill, identifies all charges, and develops a negotiation strategy.',
    details: [
      'Identify hidden fees and unnecessary charges',
      'Research competitor rates in your area',
      'Develop a personalized negotiation approach',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'We Negotiate',
    description: 'Our trained negotiators contact your provider and fight for the best rates on your behalf.',
    details: [
      'Direct communication with provider retention teams',
      'Leverage industry knowledge and proven tactics',
      'Multiple negotiation attempts if needed',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'You Approve',
    description: 'Review the savings we negotiated and approve before any changes are finalized.',
    details: [
      'Clear breakdown of savings achieved',
      'No changes without your approval',
      'Full transparency on new rates and terms',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'You Save',
    description: 'Start enjoying your lower bills. You only pay our fee from the savings we secure.',
    details: [
      'Keep 100% of your first month\'s savings',
      'Pay only a percentage of proven savings',
      'Ongoing support if issues arise',
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function HowItWorksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="pt-20">
        {/* Hero */}
        <section className="section bg-gradient-hero">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-display-3 md:text-display-2 font-bold text-white mb-6">
                How <span className="gradient-text-aurora">Wefixbill</span> works
              </h1>
              <p className="text-body-lg text-frost-light mb-8">
                Our proven process has saved customers over $2 million in just a few simple steps.
              </p>
              <FloatingButton onClick={() => setIsModalOpen(true)} variant="neon" size="xl">
                Start Saving Now
              </FloatingButton>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section className="section">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pb-16 last:pb-0"
                >
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-px bg-slate-200" />
                  )}

                  <div className="flex gap-8">
                    {/* Number */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-purple flex items-center justify-center text-white font-bold shadow-stripe-glow">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-frost-light mb-4">{step.description}</p>
                      
                      <div className="glass-panel p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
                            {step.icon}
                          </div>
                          <span className="text-sm font-medium text-frost-medium">What happens:</span>
                        </div>
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-frost-light">
                              <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-surface-secondary">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-display-3 font-bold text-white mb-6">
                Ready to lower your bills?
              </h2>
              <p className="text-body-lg text-frost-light mb-8">
                Join thousands of customers saving money every month. It takes less than 2 minutes to get started.
              </p>
              <FloatingButton onClick={() => setIsModalOpen(true)} variant="neon" size="xl">
                Get Started — It&apos;s Free
              </FloatingButton>
              <p className="mt-4 text-sm text-frost-medium">
                No savings, no fee. 100% risk-free.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
