'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const detailedSteps = [
  {
    number: '01',
    title: 'Select Your Bills',
    description: 'Choose the bills you want us to negotiate from our supported categories.',
    details: [
      'Internet & Cable TV',
      'Wireless & Mobile Plans',
      'Utilities (where applicable)',
      'Streaming Subscriptions',
      'Insurance Policies',
      'Home Security & Fitness',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    simulation: 'categories',
  },
  {
    number: '02',
    title: 'Provide Bill Details',
    description: 'Tell us about your current provider, monthly rate, and location.',
    details: [
      'Select your service provider',
      'Enter your current monthly amount',
      'Provide your ZIP code for local offers',
      'Upload your bill for best results (optional)',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    simulation: 'upload',
  },
  {
    number: '03',
    title: 'Authorize Us',
    description: 'Sign our Letter of Authorization to give us permission to negotiate.',
    details: [
      'Digital signature - no physical paperwork',
      'Legally binding authorization',
      'We never access your accounts directly',
      'We work through official customer service channels',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    simulation: 'authorization',
  },
  {
    number: '04',
    title: 'We Negotiate',
    description: 'Our expert negotiators contact your providers and fight for the best rates.',
    details: [
      'We handle all phone calls and waiting',
      'We know the best tactics for each provider',
      'Average negotiation time: 1-2 weeks',
      'We keep you updated on progress',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    simulation: 'negotiation',
  },
  {
    number: '05',
    title: 'Approve Changes',
    description: 'Review and approve any plan changes before we finalize them.',
    details: [
      'We present all options to you first',
      'You have final say on any changes',
      'No changes made without your approval',
      'Clear breakdown of old vs new rates',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    simulation: 'approval',
  },
  {
    number: '06',
    title: 'Save Money & Monitor',
    description: 'Enjoy lower bills and ongoing monitoring with our Lifetime Plan.',
    details: [
      'Start saving immediately',
      'Lifetime Plan: We monitor for future savings',
      'Automatic alerts for price increases',
      'Up to 2 renegotiations per year',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    simulation: 'monitoring',
  },
]

export default function HowItWorksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

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
                How <span className="gradient-text-aurora">Wefixbill</span> Works
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-frost-300 mb-8"
              >
                Our simple 6-step process takes you from overpaying to saving money, 
                with zero hassle on your end.
              </motion.p>
              <motion.button
                variants={fadeInUp}
                onClick={() => setIsModalOpen(true)}
                className="btn-primary text-lg px-10 py-4"
              >
                Start Now
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Detailed Steps */}
        <section className="section-padding bg-midnight-900/50">
          <div className="section-container">
            <div className="max-w-5xl mx-auto">
              {detailedSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1 }}
                  className="relative mb-12 last:mb-0"
                >
                  {/* Connection line */}
                  {index < detailedSteps.length - 1 && (
                    <div className="absolute left-8 top-32 w-0.5 h-24 bg-gradient-to-b from-neon-cyan/50 to-transparent hidden md:block" />
                  )}

                  <div className="glass-panel p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left: Icon and Number */}
                      <div className="flex-shrink-0 text-center md:text-left">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan mb-4">
                          {step.icon}
                        </div>
                        <div className="text-neon-cyan font-mono text-sm">Step {step.number}</div>
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {step.title}
                        </h3>
                        <p className="text-frost-300 mb-6 text-lg">
                          {step.description}
                        </p>

                        <ul className="grid sm:grid-cols-2 gap-3">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-frost-400">{detail}</span>
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
        <section className="section-padding">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-10 md:p-16 text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Saving?
              </h2>
              <p className="text-frost-300 text-lg mb-8">
                Join thousands of customers who have saved money with Wefixbill. 
                It only takes a few minutes to get started.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary text-lg px-12 py-4"
              >
                Start Your Free Analysis
              </button>
              <p className="text-frost-500 text-sm mt-4">
                No credit card required • No commitment • No savings = no fee
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
