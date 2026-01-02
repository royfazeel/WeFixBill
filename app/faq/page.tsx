'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'
import FloatingButton from '@/components/FloatingButton'
import { cn } from '@/lib/utils'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'How does Wefixbill work?',
        a: 'We negotiate with your service providers on your behalf to lower your monthly bills. Simply submit your bill details, and our expert team handles the rest. You only pay if we save you money.',
      },
      {
        q: 'What types of bills do you negotiate?',
        a: 'We negotiate internet, cable TV, satellite, wireless/cell phone, home security, and various utility bills. If you have a recurring bill, chances are we can help.',
      },
      {
        q: 'Is there any risk to try your service?',
        a: 'None at all. We operate on a success-fee model, meaning you only pay if we successfully negotiate savings for you. If we can\'t save you money, you pay nothing.',
      },
    ],
  },
  {
    category: 'Pricing',
    questions: [
      {
        q: 'How much does your service cost?',
        a: 'We offer two success-fee models: Standard (40% of savings over 24 months) and Flexible (50% of savings over 12 months). We also offer a Lifetime Plan for $99 one-time that includes unlimited negotiations.',
      },
      {
        q: 'When do I pay?',
        a: 'You only pay after we successfully negotiate savings on your bill. There are no upfront costs, and you keep 100% of your first month\'s savings.',
      },
      {
        q: 'What if I\'m not happy with the results?',
        a: 'You have full control over the process. We present all negotiated savings to you for approval before any changes are made. If you don\'t approve, you don\'t pay.',
      },
    ],
  },
  {
    category: 'Process',
    questions: [
      {
        q: 'How long does the process take?',
        a: 'Most negotiations are completed within 3-5 business days. Complex cases may take up to 2 weeks. We\'ll keep you updated throughout the process.',
      },
      {
        q: 'Do I need to provide my account login?',
        a: 'No. We only need basic information about your bill. We contact providers directly and handle negotiations through their customer service channels.',
      },
      {
        q: 'Will this affect my service?',
        a: 'No. We negotiate better rates without changing your service level or features. In many cases, we can even get you better service at a lower price.',
      },
    ],
  },
  {
    category: 'Security',
    questions: [
      {
        q: 'Is my information secure?',
        a: 'Absolutely. We use bank-level encryption to protect your data. We never share your information with third parties and comply with all privacy regulations.',
      },
      {
        q: 'What information do you need?',
        a: 'We need your name, contact information, service provider details, and current bill amount. Uploading a copy of your bill helps us negotiate more effectively.',
      },
    ],
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-stripe-purple transition-colors"
      >
        <span className="font-medium text-slate-900 pr-8">{question}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-5 h-5 text-slate-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-600 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('General')

  const currentFaqs = faqs.find(f => f.category === activeCategory)?.questions || []

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
                Frequently asked <span className="gradient-text">questions</span>
              </h1>
              <p className="text-body-lg text-slate-600">
                Everything you need to know about our bill negotiation service.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {faqs.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => setActiveCategory(cat.category)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      activeCategory === cat.category
                        ? 'bg-stripe-purple text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    )}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>

              {/* Questions */}
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-elevated p-6"
              >
                {currentFaqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.q} answer={faq.a} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Still have questions */}
        <section className="section-padding bg-surface-secondary">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-display-3 font-bold text-slate-900 mb-6">
                Still have questions?
              </h2>
              <p className="text-body-lg text-slate-600 mb-8">
                Can&apos;t find what you&apos;re looking for? Our team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <FloatingButton variant="primary" size="lg" href="/contact">
                  Contact Us
                </FloatingButton>
                <FloatingButton onClick={() => setIsModalOpen(true)} variant="secondary" size="lg">
                  Start Saving
                </FloatingButton>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
