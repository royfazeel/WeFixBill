'use client'

import { useState, useCallback, useRef, useEffect, memo, ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingButton from './FloatingButton'
import { cn, isValidEmail, isValidPhone, isValidZip } from '@/lib/utils'

const BILL_CATEGORIES = [
  { id: 'internet', name: 'Internet', icon: '🌐' },
  { id: 'cable', name: 'Cable & TV', icon: '📺' },
  { id: 'wireless', name: 'Wireless', icon: '📱' },
  { id: 'utilities', name: 'Utilities', icon: '⚡' },
  { id: 'subscriptions', name: 'Subscriptions', icon: '💳' },
  { id: 'insurance', name: 'Insurance', icon: '🛡️' },
]

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
]

interface FormData {
  fullName: string
  email: string
  phone: string
  state: string
  zipCode: string
  billCategory: string
  provider: string
  monthlyAmount: string
  consent: boolean
  signature: string
}

interface IntakeModalProps {
  isOpen: boolean
  onClose: () => void
}

const getInputStyles = (hasError: boolean) => cn(
  'w-full px-4 py-3.5 rounded-xl transition-all duration-200',
  'bg-white text-slate-900 placeholder:text-slate-400',
  'border shadow-stripe-sm',
  'focus:outline-none focus:ring-4',
  hasError
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
    : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/10'
)

const getSelectStyles = (hasError: boolean) => cn(
  'w-full px-4 py-3.5 rounded-xl transition-all duration-200 appearance-none cursor-pointer',
  'bg-white text-slate-900',
  'border shadow-stripe-sm',
  'focus:outline-none focus:ring-4',
  hasError
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
    : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/10'
)

const FormField = memo(function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  inputMode,
  autoComplete,
  enterKeyHint,
}: {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
  required?: boolean
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal'
  autoComplete?: string
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        enterKeyHint={enterKeyHint}
        className={getInputStyles(!!error)}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
})

export default function IntakeModal({ isOpen, onClose }: IntakeModalProps) {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    zipCode: '',
    billCategory: '',
    provider: '',
    monthlyAmount: '',
    consent: false,
    signature: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<{ message: string; referenceId: string } | null>(null)

  const modalRef = useRef<HTMLDivElement>(null)

  const updateField = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Please enter your full name'
      }
      if (!isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
      if (!isValidPhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number'
      }
      if (!formData.state) {
        newErrors.state = 'Please select your state'
      }
      if (!isValidZip(formData.zipCode)) {
        newErrors.zipCode = 'Please enter a valid ZIP code'
      }
      if (!formData.billCategory) {
        newErrors.billCategory = 'Please select a bill category'
      }
      if (!formData.provider.trim()) {
        newErrors.provider = 'Please enter your provider'
      }
      const amount = parseFloat(formData.monthlyAmount)
      if (isNaN(amount) || amount < 20 || amount > 5000) {
        newErrors.monthlyAmount = 'Please enter an amount between $20 and $5000'
      }
    }

    if (currentStep === 3) {
      if (!formData.consent) {
        newErrors.consent = 'Please agree to the terms to continue'
      }
      if (!formData.signature.trim() || formData.signature.toLowerCase().trim() !== formData.fullName.toLowerCase().trim()) {
        newErrors.signature = 'Please sign with your full name as entered above'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrors(prev => ({ ...prev, file: 'Only PDF, JPG, or PNG allowed' }))
      return
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, file: 'File must be under 10MB' }))
      return
    }
    setFile(selectedFile)
    setErrors(prev => { const next = { ...prev }; delete next.file; return next })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, String(value))
      })
      submitData.append('website', '')
      if (file) submitData.append('bill', file)

      const response = await fetch('/api/lead', { method: 'POST', body: submitData })
      const result = await response.json()

      if (!response.ok) {
        if (result.errors) { setErrors(result.errors); setDirection(-1); setStep(1) }
        else setSubmitError(result.error || 'Submission failed')
        return
      }
      setSubmitSuccess({ message: result.message, referenceId: result.referenceId })
      setDirection(1)
      setStep(4)
    } catch {
      setSubmitError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    if (step === 3) {
      if (validateStep(3)) handleSubmit()
      return
    }
    if (validateStep(step)) {
      setDirection(1)
      setStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setDirection(-1)
    setStep(prev => prev - 1)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep(1)
      setFormData({
        fullName: '', email: '', phone: '', state: '', zipCode: '',
        billCategory: '', provider: '', monthlyAmount: '', consent: false, signature: ''
      })
      setFile(null)
      setErrors({})
      setSubmitError(null)
      setSubmitSuccess(null)
    }, 300)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
  }

  if (!isOpen) return null

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-stripe-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Get Your Free Quote</h2>
                <p className="text-sm text-slate-500">Step {step} of 3</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="h-1 bg-slate-100">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-6">
              {submitError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {submitError}
                </div>
              )}

              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <FormField
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      error={errors.fullName}
                      placeholder="John Smith"
                      required
                      autoComplete="name"
                      enterKeyHint="next"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        error={errors.email}
                        placeholder="john@email.com"
                        required
                        inputMode="email"
                        autoComplete="email"
                        enterKeyHint="next"
                      />
                      <FormField
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        error={errors.phone}
                        placeholder="(555) 123-4567"
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        enterKeyHint="next"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-2">
                          State <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={(e) => updateField('state', e.target.value)}
                            className={getSelectStyles(!!errors.state)}
                          >
                            <option value="">Select state</option>
                            {US_STATES.map(state => (
                              <option key={state} value={state}>{state}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {errors.state && <p className="mt-1.5 text-sm text-red-600">{errors.state}</p>}
                      </div>

                      <FormField
                        label="ZIP Code"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => updateField('zipCode', e.target.value)}
                        error={errors.zipCode}
                        placeholder="12345"
                        required
                        inputMode="numeric"
                        autoComplete="postal-code"
                        enterKeyHint="next"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Bill Category <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {BILL_CATEGORIES.map(cat => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => updateField('billCategory', cat.id)}
                            className={cn(
                              'p-3 rounded-xl border text-center transition-all',
                              formData.billCategory === cat.id
                                ? 'border-indigo-500 bg-indigo-500/5 ring-2 ring-indigo-500/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            )}
                          >
                            <span className="text-xl mb-1 block">{cat.icon}</span>
                            <span className="text-xs font-medium text-slate-700">{cat.name}</span>
                          </button>
                        ))}
                      </div>
                      {errors.billCategory && <p className="mt-1.5 text-sm text-red-600">{errors.billCategory}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Provider"
                        name="provider"
                        value={formData.provider}
                        onChange={(e) => updateField('provider', e.target.value)}
                        error={errors.provider}
                        placeholder="e.g. Comcast"
                        required
                        enterKeyHint="next"
                      />
                      <FormField
                        label="Monthly Amount"
                        name="monthlyAmount"
                        value={formData.monthlyAmount}
                        onChange={(e) => updateField('monthlyAmount', e.target.value)}
                        error={errors.monthlyAmount}
                        placeholder="150"
                        required
                        inputMode="decimal"
                        enterKeyHint="done"
                      />
                    </div>

                    <div className="pt-4">
                      <FloatingButton
                        onClick={handleNext}
                        variant="primary"
                        size="lg"
                        fullWidth
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        }
                        iconPosition="right"
                      >
                        Continue
                      </FloatingButton>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload Your Bill</h3>
                      <p className="text-sm text-slate-500">Optional but helps us get you better savings</p>
                    </div>

                    <label
                      htmlFor="bill-upload"
                      className={cn(
                        'block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all',
                        file ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 hover:border-indigo-500 hover:bg-indigo-500/5'
                      )}
                    >
                      {file ? (
                        <div className="space-y-2">
                          <div className="w-12 h-12 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="font-medium text-slate-900">{file.name}</p>
                          <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-12 h-12 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                          </div>
                          <p className="font-medium text-slate-700">Click to upload or drag & drop</p>
                          <p className="text-sm text-slate-500">PDF, JPG, PNG up to 10MB</p>
                        </div>
                      )}
                      <input
                        id="bill-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {errors.file && <p className="mt-2 text-sm text-red-600">{errors.file}</p>}

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <FloatingButton onClick={handleBack} variant="secondary" size="lg">
                        Back
                      </FloatingButton>
                      <FloatingButton onClick={handleNext} variant="primary" size="lg">
                        {file ? 'Continue' : 'Skip'}
                      </FloatingButton>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-slate-50 rounded-2xl p-4 mb-6 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Category</span>
                        <span className="font-medium text-slate-900">{formData.billCategory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Provider</span>
                        <span className="font-medium text-slate-900">{formData.provider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Amount</span>
                        <span className="font-bold text-emerald-600">${formData.monthlyAmount}/mo</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Bill</span>
                        <span className={file ? 'text-emerald-600' : 'text-amber-600'}>
                          {file ? '✓ Uploaded' : 'Not uploaded'}
                        </span>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 mb-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => updateField('consent', e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
                      />
                      <span className="text-sm text-slate-600">
                        I authorize Wefixbill to negotiate on my behalf and agree to the{' '}
                        <a href="/terms" className="text-indigo-600 hover:underline">Terms</a> and{' '}
                        <a href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>.
                      </span>
                    </label>
                    {errors.consent && <p className="mb-4 text-sm text-red-600">{errors.consent}</p>}

                    <FormField
                      label="Electronic Signature"
                      name="signature"
                      value={formData.signature}
                      onChange={(e) => updateField('signature', e.target.value)}
                      error={errors.signature}
                      placeholder="Type your full name"
                      required
                      enterKeyHint="done"
                    />

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <FloatingButton onClick={handleBack} variant="secondary" size="lg" disabled={isSubmitting}>
                        Back
                      </FloatingButton>
                      <FloatingButton onClick={handleNext} variant="primary" size="lg" loading={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </FloatingButton>
                    </div>
                  </motion.div>
                )}

                {step === 4 && submitSuccess && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Request Submitted!</h3>
                    <p className="text-slate-600 mb-4">{submitSuccess.message}</p>
                    
                    <div className="inline-block bg-slate-100 px-4 py-2 rounded-lg mb-6">
                      <span className="text-slate-500 text-xs">Reference</span>
                      <p className="text-indigo-600 font-mono font-bold">{submitSuccess.referenceId}</p>
                    </div>

                    <FloatingButton onClick={handleClose} variant="primary" size="lg" fullWidth>
                      Done
                    </FloatingButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
