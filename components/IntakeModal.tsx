'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, isValidEmail, isValidZip, generateId, formatCurrency } from '@/lib/utils'
import { BILL_CATEGORIES, PROVIDERS, US_STATES, PRICING_CONFIG } from '@/lib/pricing'
import { modalBackdrop, modalContent } from '@/lib/motion'

interface IntakeModalProps {
  isOpen: boolean
  onClose: () => void
}

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 'success'

interface FormData {
  // Step 1: Bill Categories
  categories: string[]
  // Step 2: Provider Details
  bills: Array<{
    id: string
    category: string
    provider: string
    monthlyAmount: number
  }>
  // Step 3: Location
  zipCode: string
  state: string
  // Step 4: Bill Upload (simulated)
  uploadedFiles: string[]
  // Step 5: Authorization
  fullName: string
  email: string
  phone: string
  authorizationConsent: boolean
  termsConsent: boolean
  // Step 6: Pricing Selection
  pricingPlan: 'success-40' | 'success-50' | 'lifetime'
}

const initialFormData: FormData = {
  categories: [],
  bills: [],
  zipCode: '',
  state: '',
  uploadedFiles: [],
  fullName: '',
  email: '',
  phone: '',
  authorizationConsent: false,
  termsConsent: false,
  pricingPlan: 'success-40',
}

export default function IntakeModal({ isOpen, onClose }: IntakeModalProps) {
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1)
        setFormData(initialFormData)
        setErrors({})
      }, 300)
    }
  }, [isOpen])

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const validateStep = (currentStep: Step): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (formData.categories.length === 0) {
        newErrors.categories = 'Please select at least one bill category'
      }
    }

    if (currentStep === 2) {
      if (formData.bills.length === 0) {
        newErrors.bills = 'Please add at least one bill'
      } else {
        formData.bills.forEach((bill, i) => {
          if (!bill.provider) newErrors[`bill-${i}-provider`] = 'Required'
          if (bill.monthlyAmount < 1) newErrors[`bill-${i}-amount`] = 'Required'
        })
      }
    }

    if (currentStep === 3) {
      if (!isValidZip(formData.zipCode)) {
        newErrors.zipCode = 'Please enter a valid ZIP code'
      }
      if (!formData.state) {
        newErrors.state = 'Please select your state'
      }
    }

    if (currentStep === 5) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Required'
      if (!isValidEmail(formData.email)) newErrors.email = 'Valid email required'
      if (!formData.authorizationConsent) newErrors.authorizationConsent = 'Required'
      if (!formData.termsConsent) newErrors.termsConsent = 'Required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateStep(step as Step)) return

    if (step === 1) {
      // Initialize bills for selected categories
      const newBills = formData.categories.map(cat => ({
        id: generateId(),
        category: cat,
        provider: '',
        monthlyAmount: 0,
      }))
      setFormData(prev => ({ ...prev, bills: newBills }))
    }

    if (step === 6) {
      handleSubmit()
    } else {
      setStep(prev => (prev as number) + 1 as Step)
    }
  }

  const handleBack = () => {
    setStep(prev => (prev as number) - 1 as Step)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setStep('success')
  }

  const toggleCategory = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(c => c !== categoryId)
        : [...prev.categories, categoryId]
    }))
    setErrors(prev => ({ ...prev, categories: '' }))
  }

  const updateBill = (id: string, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      bills: prev.bills.map(bill => 
        bill.id === id ? { ...bill, [field]: value } : bill
      )
    }))
  }

  const simulateFileUpload = () => {
    const fakeFile = `bill_${Date.now()}.pdf`
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, fakeFile]
    }))
  }

  const progressPercent = step === 'success' ? 100 : ((step as number) / 6) * 100

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-midnight-950/90 backdrop-blur-sm z-50"
          />

          <motion.div
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-midnight-900 border border-white/10 rounded-2xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">
                  {step === 'success' ? 'You\'re All Set!' : 'Start Saving'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-frost-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Progress bar */}
              {step !== 'success' && (
                <div className="h-1 bg-midnight-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Categories */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">Which bills do you want us to negotiate?</h3>
                    <p className="text-frost-400 mb-6">Select all that apply</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {BILL_CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => toggleCategory(cat.id)}
                          className={cn(
                            'p-4 rounded-xl border text-left transition-all',
                            formData.categories.includes(cat.id)
                              ? 'bg-neon-cyan/10 border-neon-cyan'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          )}
                        >
                          <span className="text-2xl mr-2">{cat.icon}</span>
                          <span className="text-white font-medium">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                    {errors.categories && (
                      <p className="text-red-400 text-sm mt-2">{errors.categories}</p>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Provider Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">Tell us about your bills</h3>
                    <p className="text-frost-400 mb-6">Provider and current monthly amount</p>
                    
                    <div className="space-y-4">
                      {formData.bills.map((bill, i) => {
                        const category = BILL_CATEGORIES.find(c => c.id === bill.category)
                        return (
                          <div key={bill.id} className="bg-midnight-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-xl">{category?.icon}</span>
                              <span className="text-white font-medium">{category?.name}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-frost-400 text-sm block mb-1">Provider</label>
                                <select
                                  value={bill.provider}
                                  onChange={(e) => updateBill(bill.id, 'provider', e.target.value)}
                                  className="input-field"
                                >
                                  <option value="">Select provider</option>
                                  {PROVIDERS[bill.category]?.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="text-frost-400 text-sm block mb-1">Monthly Amount</label>
                                <input
                                  type="number"
                                  value={bill.monthlyAmount || ''}
                                  onChange={(e) => updateBill(bill.id, 'monthlyAmount', Number(e.target.value))}
                                  placeholder="$0"
                                  className="input-field"
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Location */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">Where are you located?</h3>
                    <p className="text-frost-400 mb-6">This helps us find the best offers in your area</p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-frost-400 text-sm block mb-1">ZIP Code</label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                          placeholder="12345"
                          maxLength={10}
                          className="input-field"
                        />
                        {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                      </div>
                      <div>
                        <label className="text-frost-400 text-sm block mb-1">State</label>
                        <select
                          value={formData.state}
                          onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                          className="input-field"
                        >
                          <option value="">Select state</option>
                          {US_STATES.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Bill Upload */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">Upload your bills (optional)</h3>
                    <p className="text-frost-400 mb-6">This helps us negotiate more effectively</p>
                    
                    <div
                      onClick={simulateFileUpload}
                      className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-neon-cyan/50 transition-colors"
                    >
                      <svg className="w-12 h-12 mx-auto text-frost-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-frost-300 mb-1">Click to upload or drag and drop</p>
                      <p className="text-frost-500 text-sm">PDF, PNG, JPG up to 10MB</p>
                    </div>

                    {formData.uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.uploadedFiles.map((file, i) => (
                          <div key={i} className="flex items-center gap-3 bg-midnight-800/50 rounded-lg p-3">
                            <svg className="w-5 h-5 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-frost-300 text-sm">{file}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-frost-500 text-sm mt-4">
                      You can skip this step and provide bills later
                    </p>
                  </motion.div>
                )}

                {/* Step 5: Authorization */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">Authorization & Contact</h3>
                    <p className="text-frost-400 mb-6">Sign our Letter of Authorization to let us negotiate</p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-frost-400 text-sm block mb-1">Full Legal Name</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="John Smith"
                          className="input-field"
                        />
                        {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="text-frost-400 text-sm block mb-1">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john@example.com"
                          className="input-field"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="text-frost-400 text-sm block mb-1">Phone (optional)</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="(555) 123-4567"
                          className="input-field"
                        />
                      </div>

                      <div className="pt-4 border-t border-white/10 space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.authorizationConsent}
                            onChange={(e) => setFormData(prev => ({ ...prev, authorizationConsent: e.target.checked }))}
                            className="mt-1 w-4 h-4 rounded border-white/20 bg-midnight-800 text-neon-cyan focus:ring-neon-cyan"
                          />
                          <span className="text-frost-300 text-sm">
                            I authorize Wefixbill to contact my service providers and negotiate on my behalf. I confirm I am authorized to make changes to these accounts.
                          </span>
                        </label>
                        {errors.authorizationConsent && <p className="text-red-400 text-sm">{errors.authorizationConsent}</p>}
                        
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.termsConsent}
                            onChange={(e) => setFormData(prev => ({ ...prev, termsConsent: e.target.checked }))}
                            className="mt-1 w-4 h-4 rounded border-white/20 bg-midnight-800 text-neon-cyan focus:ring-neon-cyan"
                          />
                          <span className="text-frost-300 text-sm">
                            I agree to the <a href="/terms-of-service" className="text-neon-cyan hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-neon-cyan hover:underline">Privacy Policy</a>
                          </span>
                        </label>
                        {errors.termsConsent && <p className="text-red-400 text-sm">{errors.termsConsent}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 6: Pricing Selection */}
                {step === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">Choose your plan</h3>
                    <p className="text-frost-400 mb-6">Select how you'd like to pay</p>
                    
                    <div className="space-y-4">
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, pricingPlan: 'success-40' }))}
                        className={cn(
                          'w-full p-5 rounded-xl border text-left transition-all',
                          formData.pricingPlan === 'success-40'
                            ? 'bg-neon-cyan/10 border-neon-cyan'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Success Fee (40%)</span>
                          <span className="text-neon-cyan font-bold">No Upfront Cost</span>
                        </div>
                        <p className="text-frost-400 text-sm">Pay 40% of savings over 24 months. No savings = no fee.</p>
                      </button>

                      <button
                        onClick={() => setFormData(prev => ({ ...prev, pricingPlan: 'success-50' }))}
                        className={cn(
                          'w-full p-5 rounded-xl border text-left transition-all',
                          formData.pricingPlan === 'success-50'
                            ? 'bg-neon-purple/10 border-neon-purple'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Flexible Payment (50%)</span>
                          <span className="text-neon-purple font-bold">Payment Options</span>
                        </div>
                        <p className="text-frost-400 text-sm">Pay 50% of 12-month savings. Pay upfront (10% off) or monthly.</p>
                      </button>

                      <button
                        onClick={() => setFormData(prev => ({ ...prev, pricingPlan: 'lifetime' }))}
                        className={cn(
                          'w-full p-5 rounded-xl border text-left transition-all',
                          formData.pricingPlan === 'lifetime'
                            ? 'bg-neon-pink/10 border-neon-pink'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">Lifetime Plan</span>
                          <span className="text-neon-pink font-bold">{formatCurrency(PRICING_CONFIG.lifetimePlan.price)}</span>
                        </div>
                        <p className="text-frost-400 text-sm">One-time fee. Lifetime monitoring + up to 2 renegotiations/year. Savings promise included.</p>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Success */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-green/20 flex items-center justify-center">
                      <svg className="w-10 h-10 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Submission Received!</h3>
                    <p className="text-frost-300 mb-8 max-w-sm mx-auto">
                      We'll review your bills and start negotiating within 24-48 hours. Check your email for updates.
                    </p>
                    
                    <div className="bg-midnight-800/50 rounded-xl p-6 text-left max-w-sm mx-auto">
                      <h4 className="text-white font-semibold mb-4">What happens next:</h4>
                      <ol className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-neon-cyan/20 text-neon-cyan text-sm flex items-center justify-center flex-shrink-0">1</span>
                          <span className="text-frost-300 text-sm">We review your bills and identify savings opportunities</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-neon-cyan/20 text-neon-cyan text-sm flex items-center justify-center flex-shrink-0">2</span>
                          <span className="text-frost-300 text-sm">Our experts contact your providers to negotiate</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-neon-cyan/20 text-neon-cyan text-sm flex items-center justify-center flex-shrink-0">3</span>
                          <span className="text-frost-300 text-sm">You approve any changes before we finalize</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-neon-green/20 text-neon-green text-sm flex items-center justify-center flex-shrink-0">4</span>
                          <span className="text-frost-300 text-sm">Start saving money!</span>
                        </li>
                      </ol>
                    </div>

                    <button onClick={onClose} className="btn-primary mt-8">
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {step !== 'success' && (
              <div className="p-6 border-t border-white/10 flex justify-between">
                {step > 1 ? (
                  <button onClick={handleBack} className="btn-secondary">
                    Back
                  </button>
                ) : (
                  <div />
                )}
                <button 
                  onClick={handleNext} 
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : step === 6 ? 'Submit' : 'Continue'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
