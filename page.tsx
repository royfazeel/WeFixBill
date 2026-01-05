'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'

function BillCategories({ onOpenModal }: { onOpenModal: () => void }) {
  const categories = [
    { name: 'Internet', icon: '🌐', savings: '$45/mo avg', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Cable & TV', icon: '📺', savings: '$38/mo avg', color: 'from-blue-500 to-cyan-500' },
    { name: 'Wireless', icon: '📱', savings: '$52/mo avg', color: 'from-cyan-500 to-teal-500' },
    { name: 'Utilities', icon: '⚡', savings: '$35/mo avg', color: 'from-emerald-500 to-green-600' },
    { name: 'Subscriptions', icon: '💳', savings: '$28/mo avg', color: 'from-orange-500 to-amber-500' },
    { name: 'Insurance', icon: '🛡️', savings: '$67/mo avg', color: 'from-pink-500 to-rose-500' },
  ]

  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-purple-50 border border-purple-100">
            <span className="text-sm font-medium text-purple-700">All Bill Types</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Bills We <span className="gradient-text">Negotiate</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We handle negotiations for all major bill categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={onOpenModal}
              className="stripe-card p-6 text-left group hover:shadow-xl cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">{category.name}</h3>
              <p className="text-sm text-emerald-600 font-medium">{category.savings}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const testimonials = [
    {
      quote: "Wefixbill saved me $127/month on my internet and cable bills. The process was seamless!",
      author: "Sarah M.",
      role: "Austin, TX",
      savings: "$1,524/yr",
    },
    {
      quote: "I was skeptical at first, but they actually got my wireless bill reduced by 40%. Amazing service.",
      author: "Michael R.",
      role: "Denver, CO", 
      savings: "$624/yr",
    },
    {
      quote: "The team was professional and kept me updated throughout. Highly recommend to everyone.",
      author: "Jennifer L.",
      role: "Seattle, WA",
      savings: "$936/yr",
    },
  ]

  return (
    <section className="section-padding bg-slate-50/50">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-amber-50 border border-amber-100">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-amber-700">Customer Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See what our customers are saying about their savings
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="stripe-card p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-slate-600 mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Saved</p>
                  <p className="font-bold text-emerald-600">{testimonial.savings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    {
      question: "How does the \"No Savings, No Fee\" guarantee work?",
      answer: "It's simple: if we don't save you money, you don't pay us anything. We only charge a fee when we successfully reduce your bills. No hidden costs, no upfront payments."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use bank-level 256-bit encryption to protect your data. We never sell your information, and we only access what's necessary to negotiate your bills."
    },
    {
      question: "How long does the negotiation process take?",
      answer: "Most negotiations are completed within 1-2 weeks. We'll keep you updated throughout the process and notify you immediately once we've secured savings."
    },
    {
      question: "What types of bills can you negotiate?",
      answer: "We negotiate internet, cable/TV, wireless, utilities, subscriptions, and insurance bills. If it's a recurring bill, there's a good chance we can help lower it."
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about our service
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="stripe-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-slate-900">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <Navbar onOpenModal={openModal} />
      
      <main>
        <Hero onOpenModal={openModal} />
        <HowItWorks onOpenModal={openModal} />
        <BillCategories onOpenModal={openModal} />
        <Testimonials />
        <FAQ />
        <FinalCTA onOpenModal={openModal} />
      </main>

      <Footer />

      <IntakeModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
