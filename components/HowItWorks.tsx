'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import FloatingButton from './FloatingButton'

const steps = [
  {
    number: '01',
    title: 'Select Your Bills',
    description: 'Choose from internet, cable, wireless, utilities, subscriptions, and more.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Provide Details',
    description: 'Tell us your provider, current rate, and upload your bill (optional).',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Authorize Us',
    description: 'Sign our Letter of Authorization so we can negotiate on your behalf.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'We Negotiate',
    description: 'Our experts contact your providers and fight for the best rates.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Approve Changes',
    description: 'Review and approve any plan changes before we finalize them.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Save Money',
    description: 'Enjoy lower bills and ongoing monitoring with our Lifetime Plan.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <section id="how-it-works" className="section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              How <span className="gradient-text">It Works</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Six simple steps from overpaying to saving money every month
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="relative">
            {/* Connection line (desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 place-items-center">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  custom={index}
                  className="relative w-full max-w-md"
                >
                  {/* Dark glass panel */}
                  <div className="glass-panel p-6 group h-full hover:border-cyan-500/30 transition-all">
                    {/* HUD corners */}
                    <div className="hud-corner-tl" />
                    <div className="hud-corner-tr" />
                    <div className="hud-corner-bl" />
                    <div className="hud-corner-br" />

                    {/* Step number badge */}
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-slate-900 border border-cyan-500/50 rounded-full">
                      <span className="text-cyan-400 font-mono text-sm font-bold">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 mt-2 group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>

                    {/* Content - LIGHT TEXT on dark card */}
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <FloatingButton onClick={onOpenModal} variant="primary" size="lg">
              Get Started Now
            </FloatingButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
