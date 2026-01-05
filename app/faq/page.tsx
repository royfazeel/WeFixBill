'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButton from '@/components/FloatingButton'
import IntakeModal from '@/components/IntakeModal'

const faqCategories = [
  {
    name: 'General',
    faqs: [
      {
        question: 'What is Wefixbill?',
        answer: 'Wefixbill is a bill negotiation service that helps you save money on your recurring bills. Our expert negotiators contact your service providers and negotiate lower rates on your behalf.',
      },
      {
        question: 'How does the "No Savings, No Fee" guarantee work?',
        answer: 'It\'s simple: if we don\'t save you money, you don\'t pay us anything. We only charge a fee when we successfully reduce your bills. No hidden costs, no upfront payments.',
      },
      {
        question: 'What types of bills can you negotiate?',
        answer: 'We negotiate internet, cable/TV, wireless, utilities, subscriptions, and insurance bills. If it\'s a recurring bill, there\'s a good chance we can help lower it.',
      },
      {
        question: 'How much can I expect to save?',
        answer: 'Our customers save an average of $127 per month, or over $1,500 per year. Savings vary based on your current rates and providers, but we have a 94% success rate.',
      },
    ],
  },
  {
    name: 'Process',
    faqs: [
      {
        question: 'How long does the negotiation process take?',
        answer: 'Most negotiations are completed within 1-2 weeks. We\'ll keep you updated throughout the process and notify you immediately once we\'ve secured savings.',
      },
      {
        question: 'Do I need to be on the phone during negotiations?',
        answer: 'No! We handle everything for you. Once you sign our Letter of Authorization, we do all the work. You just sit back and wait for the savings.',
      },
      {
        question: 'Will my services be interrupted?',
        answer: 'Never. We negotiate for better rates on your existing services. There\'s no interruption, no switching providers unless you want to, and no changes to your service quality.',
      },
      {
        question: 'What information do you need from me?',
        answer: 'We need your name, contact information, the bill you want us to negotiate, and a signed Letter of Authorization. Uploading a copy of your bill helps but is optional.',
      },
    ],
  },
  {
    name: 'Pricing & Payment',
    faqs: [
      {
        question: 'How much do you charge?',
        answer: 'Our fee is a percentage of your first year\'s savings only - typically between 35-50% depending on your plan. After the first year, you keep 100% of the ongoing savings forever.',
      },
      {
        question: 'When do I pay?',
        answer: 'You only pay after we\'ve successfully negotiated savings and you\'ve approved the new rates. We never charge upfront, and if we don\'t save you money, you pay nothing.',
      },
      {
        question: 'Are there any hidden fees?',
        answer: 'Absolutely not. Our pricing is completely transparent. You pay a percentage of your first year\'s savings - that\'s it. No setup fees, no monthly fees, no cancellation fees.',
      },
      {
        question: 'Can I cancel my request?',
        answer: 'Yes, you can cancel at any time before we finalize negotiations with your provider. Once savings are secured and you\'ve approved them, our fee becomes due.',
      },
    ],
  },
  {
    name: 'Security',
    faqs: [
      {
        question: 'Is my personal information secure?',
        answer: 'Absolutely. We use bank-level 256-bit encryption to protect your data. We\'re also SOC 2 compliant and never sell your information to third parties.',
      },
      {
        question: 'Why do you need a Letter of Authorization?',
        answer: 'The LOA gives us permission to contact your service providers on your behalf. Without it, providers won\'t discuss your account with us. It\'s a standard industry practice.',
      },
      {
        question: 'Do you store my passwords?',
        answer: 'No, we never ask for or store your account passwords. We only need basic account information and authorization to negotiate on your behalf.',
      },
    ],
  },
]

export default function FAQPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

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
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-50 border border-blue-100">
              <span className="text-sm font-medium text-blue-700">Got Questions?</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about our service. Can&apos;t find what you&apos;re looking for? 
              Contact our support team.
            </p>
          </motion.div>
        </section>

        {/* FAQ Categories */}
        <section className="section-container max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
                {category.name}
              </h2>
              <div className="space-y-3">
                {category.faqs.map((faq, faqIndex) => {
                  const key = `${categoryIndex}-${faqIndex}`
                  const isOpen = openItems[key]
                  
                  return (
                    <div key={key} className="stripe-card overflow-hidden">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4"
                      >
                        <span className="font-medium text-slate-900">{faq.question}</span>
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
                            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA */}
        <section className="section-container text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="stripe-card p-12 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-slate-600 mb-8">
              Our support team is here to help. Reach out anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FloatingButton
                onClick={() => setIsModalOpen(true)}
                variant="primary"
                size="lg"
              >
                Get Started
              </FloatingButton>
              <FloatingButton
                href="/contact"
                variant="secondary"
                size="lg"
              >
                Contact Support
              </FloatingButton>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
