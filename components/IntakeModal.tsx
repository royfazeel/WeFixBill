'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingButton from './FloatingButton'
import { cn, isValidEmail, isValidPhone, isValidZip } from '@/lib/utils'
import { BILL_CATEGORIES, US_STATES, PROVIDERS_BY_CATEGORY } from '@/lib/pricing'

interface IntakeModalProps {
  isOpen: boolean
  onClose: () => void
}

type Step = 1 | 2 | 3 | 4

interface FormData {
  fullName: string
  email: string
  phone: string
  state: string
  zipCode: string
  billCategory: string
  provider: string
  monthlyAmount: string
  signature: string
  consent: boolean
}

interface FormErrors {
  [key: string]: string
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  state: '',
  zipCode: '',
  billCategory: '',
  provider: '',
  monthlyAmount: '',
  signature: '',
  consent: false,
}

export default function IntakeModal({ isOpen, onClose }: IntakeModalProps) {
  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<{ message: string; referenceId: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const resetForm = useCallback(() => {
    setStep(1)
    setDirection(0)
    setFormData(initialFormData)
    setErrors({})
    setFile(null)
    setIsSubmitting(false)
    setSubmitError(null)
    setSubmitSuccess(null)
  }, [])

  const handleClose = useCallback(() => {
    onClose()
    setTimeout(resetForm, 300)
  }, [onClose, resetForm])

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name'
    }
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone'
    }
    if (!formData.state) {
      newErrors.state = 'Please select your state'
    }
    if (!isValidZip(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP'
    }
    if (!formData.billCategory) {
      newErrors.billCategory = 'Please select a category'
    }
    if (!formData.provider.trim()) {
      newErrors.provider = 'Please enter provider'
    }
    const amount = parseFloat(formData.monthlyAmount)
    if (isNaN(amount) || amount < 20 || amount > 5000) {
      newErrors.monthlyAmount = 'Enter $20 - $5000'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.consent) {
      newErrors.consent = 'Please agree to continue'
    }
    if (!formData.signature.trim()) {
      newErrors.signature = 'Please sign with your name'
    } else if (formData.signature.toLowerCase().trim() !== formData.fullName.toLowerCase().trim()) {
      newErrors.signature = 'Must match your full name'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setDirection(1)
      setStep(2)
    } else if (step === 2) {
      setDirection(1)
      setStep(3)
    } else if (step === 3 && validateStep3()) {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1)
      setStep((prev) => (prev - 1) as Step)
    }
  }

  const processFile = (selectedFile: File | undefined) => {
    if (!selectedFile) return
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrors((prev) => ({ ...prev, file: 'Only PDF, JPG, or PNG allowed' }))
      return
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: 'File must be under 10MB' }))
      return
    }
    setFile(selectedFile)
    setErrors((prev) => { const next = { ...prev }; delete next.file; return next })
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

  const providers = formData.billCategory
    ? PROVIDERS_BY_CATEGORY[formData.billCategory as keyof typeof PROVIDERS_BY_CATEGORY] || []
    : []

  if (!isOpen) return null

  // Reusable Components
  const FormField = ({ 
    label, 
    error, 
    children, 
    className = '' 
  }: { 
    label: string
    error?: string
    children: React.ReactNode
    className?: string 
  }) => (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-300 mb-2 text-left">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-400 mt-1.5 text-left"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )

  const inputStyles = (hasError: boolean) => cn(
    'w-full h-12 px-4 rounded-xl text-white text-sm',
    'bg-slate-800/60 border transition-all duration-200',
    'placeholder:text-slate-500 focus:outline-none',
    hasError 
      ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
      : 'border-slate-700 hover:border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
  )

  const selectStyles = (hasError: boolean) => cn(
    inputStyles(hasError),
    'appearance-none cursor-pointer',
    'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")]',
    'bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10'
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="relative w-full max-w-lg bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effects */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-violet-500/15 rounded-full blur-[100px] pointer-events-none" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Progress Steps */}
            {step < 4 && (
              <div className="relative z-10 px-6 pt-6 pb-4">
                <div className="flex items-center justify-center">
                  {[1, 2, 3].map((s, i) => (
                    <div key={s} className="flex items-center">
                      <motion.div
                        animate={{
                          backgroundColor: step >= s ? '#06b6d4' : '#334155',
                          scale: step === s ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-9 h-9 rounded-full flex items-center justify-center"
                      >
                        {step > s ? (
                          <motion.svg
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-4 h-4 text-slate-900"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </motion.svg>
                        ) : (
                          <span className={cn(
                            'text-sm font-semibold',
                            step >= s ? 'text-slate-900' : 'text-slate-400'
                          )}>{s}</span>
                        )}
                      </motion.div>
                      {i < 2 && (
                        <motion.div
                          animate={{ backgroundColor: step > s ? '#06b6d4' : '#334155' }}
                          transition={{ duration: 0.3 }}
                          className="w-16 h-1 mx-2 rounded-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 px-1">
                  <span className={cn('text-xs', step >= 1 ? 'text-cyan-400' : 'text-slate-500')}>Details</span>
                  <span className={cn('text-xs', step >= 2 ? 'text-cyan-400' : 'text-slate-500')}>Upload</span>
                  <span className={cn('text-xs', step >= 3 ? 'text-cyan-400' : 'text-slate-500')}>Confirm</span>
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="relative z-10 max-h-[70vh] overflow-y-auto">
              <AnimatePresence mode="wait" custom={direction}>
                {/* ═══════════════════════════════════════════════════════════
                    STEP 1: USER INFO & BILL DETAILS
                   ═══════════════════════════════════════════════════════════ */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: direction >= 0 ? 30 : -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction >= 0 ? -30 : 30 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="px-6 pb-6"
                  >
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-white">Let&apos;s Get Started</h2>
                      <p className="text-sm text-slate-400 mt-1">Tell us about yourself and your bill</p>
                    </div>

                    {/* Form Grid */}
                    <div className="space-y-4">
                      {/* Full Name */}
                      <FormField label="Full Name" error={errors.fullName}>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          className={inputStyles(!!errors.fullName)}
                          placeholder="John Smith"
                          autoComplete="name"
                        />
                      </FormField>

                      {/* Email & Phone - 2 columns */}
                      <div className="grid grid-cols-2 gap-3">
                        <FormField label="Email" error={errors.email}>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className={inputStyles(!!errors.email)}
                            placeholder="john@email.com"
                            autoComplete="email"
                          />
                        </FormField>
                        <FormField label="Phone" error={errors.phone}>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className={inputStyles(!!errors.phone)}
                            placeholder="(555) 123-4567"
                            autoComplete="tel"
                          />
                        </FormField>
                      </div>

                      {/* State & ZIP - 2 columns */}
                      <div className="grid grid-cols-2 gap-3">
                        <FormField label="State" error={errors.state}>
                          <select
                            value={formData.state}
                            onChange={(e) => updateField('state', e.target.value)}
                            className={selectStyles(!!errors.state)}
                          >
                            <option value="" className="bg-slate-800">Select</option>
                            {US_STATES.map((s) => (
                              <option key={s.code} value={s.code} className="bg-slate-800">{s.name}</option>
                            ))}
                          </select>
                        </FormField>
                        <FormField label="ZIP Code" error={errors.zipCode}>
                          <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => updateField('zipCode', e.target.value)}
                            className={inputStyles(!!errors.zipCode)}
                            placeholder="12345"
                            maxLength={10}
                            autoComplete="postal-code"
                          />
                        </FormField>
                      </div>

                      {/* Divider */}
                      <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-800" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-3 text-xs text-slate-500 bg-slate-900">Bill Info</span>
                        </div>
                      </div>

                      {/* Bill Category */}
                      <FormField label="Bill Category" error={errors.billCategory}>
                        <select
                          value={formData.billCategory}
                          onChange={(e) => { updateField('billCategory', e.target.value); updateField('provider', '') }}
                          className={selectStyles(!!errors.billCategory)}
                        >
                          <option value="" className="bg-slate-800">Select category</option>
                          {BILL_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id} className="bg-slate-800">{cat.icon} {cat.name}</option>
                          ))}
                        </select>
                      </FormField>

                      {/* Provider & Amount - 2 columns */}
                      <div className="grid grid-cols-2 gap-3">
                        <FormField label="Provider" error={errors.provider}>
                          {providers.length > 0 ? (
                            <select
                              value={formData.provider}
                              onChange={(e) => updateField('provider', e.target.value)}
                              className={selectStyles(!!errors.provider)}
                            >
                              <option value="" className="bg-slate-800">Select</option>
                              {providers.map((p) => (
                                <option key={p} value={p} className="bg-slate-800">{p}</option>
                              ))}
                              <option value="Other" className="bg-slate-800">Other</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              value={formData.provider}
                              onChange={(e) => updateField('provider', e.target.value)}
                              className={inputStyles(!!errors.provider)}
                              placeholder="Provider name"
                            />
                          )}
                        </FormField>
                        <FormField label="Monthly Amount" error={errors.monthlyAmount}>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                            <input
                              type="number"
                              value={formData.monthlyAmount}
                              onChange={(e) => updateField('monthlyAmount', e.target.value)}
                              className={cn(inputStyles(!!errors.monthlyAmount), 'pl-8')}
                              placeholder="150"
                              min="20"
                              max="5000"
                            />
                          </div>
                        </FormField>
                      </div>
                    </div>

                    {/* Continue Button */}
                    <div className="mt-6">
                      <FloatingButton onClick={handleNext} variant="primary" size="lg" fullWidth>
                        Continue
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </FloatingButton>
                    </div>
                  </motion.div>
                )}

                {/* ═══════════════════════════════════════════════════════════
                    STEP 2: UPLOAD BILL
                   ═══════════════════════════════════════════════════════════ */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: direction >= 0 ? 30 : -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction >= 0 ? -30 : 30 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="px-6 pb-6"
                  >
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-white">Upload Your Bill</h2>
                      <p className="text-sm text-slate-400 mt-1">Optional - helps us negotiate better rates</p>
                    </div>

                    {/* Upload Area */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => { e.preventDefault(); setIsDragging(false); processFile(e.dataTransfer.files?.[0]) }}
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        'relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200',
                        isDragging ? 'border-cyan-500 bg-cyan-500/10' :
                        file ? 'border-green-500 bg-green-500/5' :
                        'border-slate-700 hover:border-slate-600 hover:bg-slate-800/30'
                      )}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={(e) => processFile(e.target.files?.[0])}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                      {file ? (
                        <div className="space-y-2">
                          <div className="w-12 h-12 mx-auto bg-green-500/20 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-white font-medium text-sm truncate max-w-[200px] mx-auto">{file.name}</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); setFile(null) }}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 mx-auto bg-slate-800 rounded-xl flex items-center justify-center mb-3">
                            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <p className="text-white text-sm font-medium">Drop file here or click to browse</p>
                          <p className="text-slate-500 text-xs mt-1">PDF, JPG, PNG up to 10MB</p>
                        </>
                      )}
                    </div>
                    {errors.file && <p className="text-xs text-red-400 mt-2 text-center">{errors.file}</p>}

                    {/* Info Box */}
                    <div className="mt-4 p-3 bg-slate-800/40 rounded-lg">
                      <p className="text-xs text-slate-400 leading-relaxed">
                        <span className="text-cyan-400 font-medium">Why upload?</span> Helps us identify fees and negotiate better rates faster.
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <FloatingButton onClick={handleBack} variant="secondary" size="lg">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </FloatingButton>
                      <FloatingButton onClick={handleNext} variant="primary" size="lg">
                        {file ? 'Continue' : 'Skip'}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </FloatingButton>
                    </div>
                  </motion.div>
                )}

                {/* ═══════════════════════════════════════════════════════════
                    STEP 3: REVIEW & AUTHORIZE
                   ═══════════════════════════════════════════════════════════ */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: direction >= 0 ? 30 : -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction >= 0 ? -30 : 30 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="px-6 pb-6"
                  >
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-white">Review & Confirm</h2>
                      <p className="text-sm text-slate-400 mt-1">Please verify your information</p>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-slate-800/40 rounded-xl p-4 space-y-2.5 text-sm">
                      {[
                        { label: 'Name', value: formData.fullName },
                        { label: 'Email', value: formData.email },
                        { label: 'Phone', value: formData.phone },
                        { label: 'Location', value: `${formData.state}, ${formData.zipCode}` },
                        { label: 'Category', value: formData.billCategory },
                        { label: 'Provider', value: formData.provider },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-slate-700/50 last:border-0">
                          <span className="text-slate-400">{item.label}</span>
                          <span className="text-white font-medium text-right">{item.value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                        <span className="text-slate-400">Amount</span>
                        <span className="text-cyan-400 font-bold text-lg">${formData.monthlyAmount}/mo</span>
                      </div>
                      {file && (
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-slate-400">Bill</span>
                          <span className="text-green-400 text-xs flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Uploaded
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Authorization */}
                    <div className="mt-5 space-y-4">
                      {/* Consent Checkbox */}
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-0.5">
                          <input
                            type="checkbox"
                            checked={formData.consent}
                            onChange={(e) => updateField('consent', e.target.checked)}
                            className="sr-only"
                          />
                          <div className={cn(
                            'w-5 h-5 rounded border-2 transition-all flex items-center justify-center',
                            formData.consent ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600 group-hover:border-slate-500'
                          )}>
                            {formData.consent && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-slate-300 leading-relaxed text-left">
                          I authorize Wefixbill to negotiate on my behalf and agree to the{' '}
                          <a href="/terms-of-service" className="text-cyan-400 hover:underline">Terms</a> and{' '}
                          <a href="/privacy-policy" className="text-cyan-400 hover:underline">Privacy Policy</a>.
                        </span>
                      </label>
                      {errors.consent && <p className="text-xs text-red-400">{errors.consent}</p>}

                      {/* Signature */}
                      <FormField label="Electronic Signature (type your full name)" error={errors.signature}>
                        <input
                          type="text"
                          value={formData.signature}
                          onChange={(e) => updateField('signature', e.target.value)}
                          className={cn(inputStyles(!!errors.signature), 'font-mono')}
                          placeholder={formData.fullName}
                        />
                      </FormField>
                    </div>

                    {/* Error */}
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs"
                      >
                        {submitError}
                      </motion.div>
                    )}

                    {/* Buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <FloatingButton onClick={handleBack} variant="secondary" size="lg" disabled={isSubmitting}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </FloatingButton>
                      <FloatingButton onClick={handleNext} variant="primary" size="lg" loading={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </FloatingButton>
                    </div>
                  </motion.div>
                )}

                {/* ═══════════════════════════════════════════════════════════
                    STEP 4: SUCCESS
                   ═══════════════════════════════════════════════════════════ */}
                {step === 4 && submitSuccess && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-10 text-center"
                  >
                    {/* Success Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                      className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                    >
                      <motion.svg
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="w-10 h-10 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="text-xl font-bold text-white mb-2">Request Submitted!</h2>
                      <p className="text-sm text-slate-400 mb-4">{submitSuccess.message}</p>
                      
                      <div className="inline-block bg-slate-800/50 px-4 py-2 rounded-lg mb-6">
                        <span className="text-slate-400 text-xs">Reference</span>
                        <p className="text-cyan-400 font-mono font-bold">{submitSuccess.referenceId}</p>
                      </div>

                      {/* Next Steps */}
                      <div className="text-left bg-slate-800/30 rounded-xl p-4 mb-6">
                        <h4 className="text-white font-semibold text-sm mb-3">What&apos;s Next?</h4>
                        <div className="space-y-2.5">
                          {[
                            'We review your request within 24 hours',
                            'We contact your provider to negotiate',
                            'You approve changes before we finalize',
                            'You only pay if we save you money!'
                          ].map((text, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-cyan-400 text-xs font-bold">{i + 1}</span>
                              </div>
                              <p className="text-slate-300 text-xs">{text}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <FloatingButton onClick={handleClose} variant="primary" size="lg" fullWidth>
                        Done
                      </FloatingButton>
                    </motion.div>
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
