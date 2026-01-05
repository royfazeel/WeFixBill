'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import FloatingButton from './FloatingButton'

const steps = [
  {
    number: '01',
    title: 'Select Your Bills',
    description: 'Choose from internet, cable, wireless, utilities, subscriptions, and more.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    number: '02',
    title: 'Provide Details',
    description: 'Tell us your provider, current rate, and upload your bill (optional).',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '03',
    title: 'Authorize Us',
    description: 'Sign our Letter of Authorization so we can negotiate on your behalf.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    number: '04',
    title: 'We Negotiate',
    description: 'Our experts contact your providers and fight for the best rates.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    number: '05',
    title: 'Approve Changes',
    description: 'Review and approve any plan changes before we finalize them.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    number: '06',
    title: 'Save Money',
    description: 'Enjoy lower bills and ongoing monitoring with our Lifetime Plan.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-pink-500 to-rose-500',
  },
]

interface HowItWorksProps {
  onOpenModal?: () => void
}

export default function HowItWorks({ onOpenModal }: HowItWorksProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="section-padding bg-slate-50/50">
      <div ref={containerRef} className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-indigo-50 border border-indigo-100">
            <span className="text-sm font-medium text-indigo-700">Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            How <span className="gradient-text">It Works</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Six simple steps from overpaying to saving money every month
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="stripe-card p-6 h-full group hover:shadow-card-hover">
                  <div className={`absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r ${step.gradient} shadow-lg`}>
                    <span className="text-white font-mono text-sm font-bold">{step.number}</span>
                  </div>

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white mb-4 mt-3 group-hover:scale-110 transition-transform shadow-lg`}>
                    {step.icon}
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <FloatingButton onClick={onOpenModal} variant="primary" size="lg">
            Get Started Now
          </FloatingButton>
        </motion.div>
      </div>
    </section>
  )
}
