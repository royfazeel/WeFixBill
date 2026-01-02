'use client'

import { motion } from 'framer-motion'
import FloatingButton from './FloatingButton'

const steps = [
  {
    number: '01',
    title: 'Select Your Bills',
    description: 'Choose from internet, cable, wireless, utilities, subscriptions, and more.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Share Details',
    description: 'Tell us your provider, current rate, and optionally upload your bill.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'We Negotiate',
    description: 'Our experts contact your providers and fight for the best rates possible.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'You Save',
    description: 'Approve the savings and enjoy lower bills. Pay only when we succeed.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

interface HowItWorksProps {
  onOpenModal?: () => void
}

export default function HowItWorks({ onOpenModal }: HowItWorksProps) {
  return (
    <section className="section-padding bg-surface-secondary relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-hero opacity-50" />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-display-3 md:text-display-2 font-bold text-slate-900 mb-4">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
            Four simple steps to start saving money on your monthly bills
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
            >
              <div className="card-elevated p-6 h-full">
                {/* Step number */}
                <div className="text-xs font-bold text-stripe-purple mb-4 tracking-wider">
                  STEP {step.number}
                </div>
                
                {/* Icon */}
                <div className="feature-icon mb-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-heading-2 font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-body text-slate-600">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <FloatingButton onClick={onOpenModal} variant="primary" size="xl">
            Get Started — It&apos;s Free
          </FloatingButton>
          <p className="mt-4 text-sm text-slate-500">
            No credit card required. Only pay when we save you money.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
