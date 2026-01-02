'use client'

import { useState, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IntakeModal from '@/components/IntakeModal'
import { isValidEmail } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/motion'

// Memoized form component to prevent unnecessary re-renders
const ContactForm = memo(function ContactForm({ 
  onSuccess 
}: { 
  onSuccess: () => void 
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = 'Name is required'
    if (!isValidEmail(email)) newErrors.email = 'Valid email is required'
    if (!message.trim()) newErrors.message = 'Message is required'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    onSuccess()
  }, [name, email, message, onSuccess])

  // Clear error when user starts typing
  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      if (prev[field]) {
        const { [field]: _, ...rest } = prev
        return rest
      }
      return prev
    })
  }, [])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="text-frost-300 text-sm block mb-2">
            Name *
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              clearError('name')
            }}
            className="input-field"
            placeholder="John Smith"
            autoComplete="name"
            enterKeyHint="next"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-frost-300 text-sm block mb-2">
            Email *
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              clearError('email')
            }}
            className="input-field"
            placeholder="john@example.com"
            autoComplete="email"
            enterKeyHint="next"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className="text-frost-300 text-sm block mb-2">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="input-field"
          placeholder="How can we help?"
          autoComplete="off"
          enterKeyHint="next"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-frost-300 text-sm block mb-2">
          Message *
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            clearError('message')
          }}
          rows={5}
          className="input-field resize-none"
          placeholder="Tell us more about your question..."
          enterKeyHint="send"
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full py-4 text-lg"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
})

// Success message component
const SuccessMessage = memo(function SuccessMessage({ 
  onReset 
}: { 
  onReset: () => void 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-green/20 flex items-center justify-center">
        <svg className="w-10 h-10 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
      <p className="text-frost-300 mb-6">
        We'll get back to you as soon as possible.
      </p>
      <button onClick={onReset} className="btn-secondary">
        Send Another Message
      </button>
    </motion.div>
  )
})

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSuccess = useCallback(() => {
    setIsSubmitted(true)
  }, [])

  const handleReset = useCallback(() => {
    setIsSubmitted(false)
  }, [])

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      <Navbar onOpenModal={handleOpenModal} />

      <main className="pt-20">
        <section className="section-padding">
          <div className="section-container">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Get in <span className="gradient-text-aurora">Touch</span>
                </h1>
                <p className="text-xl text-frost-300">
                  Have questions? We'd love to hear from you.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Contact Info */}
                <motion.div variants={fadeInUp} className="md:col-span-1 space-y-6">
                  <div className="glass-panel p-6">
                    <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Email</h3>
                    <a href="mailto:support@wefixbill.com" className="text-neon-cyan hover:underline">
                      support@wefixbill.com
                    </a>
                  </div>

                  <div className="glass-panel p-6">
                    <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Phone</h3>
                    <a href="tel:1-800-FIXBILL" className="text-neon-purple hover:underline">
                      1-800-FIXBILL
                    </a>
                  </div>

                  <div className="glass-panel p-6">
                    <div className="w-12 h-12 rounded-xl bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-neon-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Hours</h3>
                    <p className="text-frost-400">Mon-Fri: 9AM - 6PM EST</p>
                    <p className="text-frost-400">Sat: 10AM - 4PM EST</p>
                  </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div variants={fadeInUp} className="md:col-span-2">
                  <div className="glass-panel p-8">
                    {isSubmitted ? (
                      <SuccessMessage onReset={handleReset} />
                    ) : (
                      <ContactForm onSuccess={handleSuccess} />
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <IntakeModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
