'use client'

import { useState, useCallback, useRef } from 'react'
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
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<{ message: string; referenceId: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetForm = useCallback(() => {
    setStep(1)
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
      newErrors.fullName = 'Full name is required'
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Valid email is required'
    }

    if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Valid phone number is required'
    }

    if (!formData.state) {
      newErrors.state = 'State is required'
    }

    if (!isValidZip(formData.zipCode)) {
      newErrors.zipCode = 'Valid ZIP code is required'
    }

    if (!formData.billCategory) {
      newErrors.billCategory = 'Select a bill category'
    }

    if (!formData.provider.trim()) {
      newErrors.provider = 'Provider name is required'
    }

    const amount = parseFloat(formData.monthlyAmount)
    if (isNaN(amount) || amount < 20 || amount > 5000) {
      newErrors.monthlyAmount = 'Amount must be between $20 and $5000'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.consent) {
      newErrors.consent = 'You must agree to proceed'
    }

    if (!formData.signature.trim()) {
      newErrors.signature = 'Please type your full name as signature'
    } else if (formData.signature.toLowerCase().trim() !== formData.fullName.toLowerCase().trim()) {
      newErrors.signature = 'Signature must match your full name'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3 && validateStep3()) {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrors((prev) => ({ ...prev, file: 'Only PDF, JPG, or PNG files allowed' }))
        return
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: 'File must be under 10MB' }))
        return
      }
      setFile(selectedFile)
      setErrors((prev) => {
        const next = { ...prev }
        delete next.file
        return next
      })
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      if (!allowedTypes.includes(droppedFile.type)) {
        setErrors((prev) => ({ ...prev, file: 'Only PDF, JPG, or PNG files allowed' }))
        return
      }
      if (droppedFile.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: 'File must be under 10MB' }))
        return
      }
      setFile(droppedFile)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const submitData = new FormData()
      submitData.append('fullName', formData.fullName)
      submitData.append('email', formData.email)
      submitData.append('phone', formData.phone)
      submitData.append('state', formData.state)
      submitData.append('zipCode', formData.zipCode)
      submitData.append('billCategory', formData.billCategory)
      submitData.append('provider', formData.provider)
      submitData.append('monthlyAmount', formData.monthlyAmount)
      submitData.append('signature', formData.signature)
      submitData.append('consent', String(formData.consent))
      submitData.append('website', '') // Honeypot

      if (file) {
        submitData.append('bill', file)
      }

      const response = await fetch('/api/lead', {
        method: 'POST',
        body: submitData,
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors)
          setStep(1)
        } else {
          setSubmitError(result.error || 'Submission failed. Please try again.')
        }
        return
      }

      setSubmitSuccess({
        message: result.message,
        referenceId: result.referenceId,
      })
      setStep(4)
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const providers = formData.billCategory
    ? PROVIDERS_BY_CATEGORY[formData.billCategory as keyof typeof PROVIDERS_BY_CATEGORY] || []
    : []

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-midnight-900 rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Progress bar */}
          {step < 4 && (
            <div className="px-8 pt-6">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                        step >= s
                          ? 'bg-sky-500 text-white dark:bg-neon-cyan dark:text-midnight-900'
                          : 'bg-gray-200 text-gray-500 dark:bg-midnight-700 dark:text-frost-400'
                      )}
                    >
                      {step > s ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        s
                      )}
                    </div>
                    {s < 3 && (
                      <div
                        className={cn(
                          'w-20 sm:w-32 h-1 mx-2 rounded transition-all',
                          step > s ? 'bg-sky-500 dark:bg-neon-cyan' : 'bg-gray-200 dark:bg-midnight-700'
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-frost-400">
                <span>Your Info</span>
                <span>Upload Bill</span>
                <span>Confirm</span>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Step 1: User Info & Bill Details */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Let's Get Started
                </h2>
                <p className="text-gray-600 dark:text-frost-300 mb-6">
                  Tell us about yourself and the bill you'd like us to negotiate.
                </p>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-frost-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-midnight-800 text-gray-900 dark:text-white transition-all',
                        errors.fullName
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-200 dark:border-white/10 focus:border-sky-500 focus:ring-sky-500'
                      )}
                      placeholder="John Smith"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-frost-300 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-midnight-800 text-gray-900 dark:text-white transition-all',
                          errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-200 dark:border-white/10 focus:border-sky-500 focus:ring-sky-500'
                        )}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-frost-300 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-midnight-800 text-gray-900 dark:text-white transition-all',
                          errors.phone
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-200 dark:border-white/10 focus:border-sky-500 focus:ring-sky-500'
                        )}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* State & ZIP */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-frost-300 mb-1">
                        State *
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => updateField('state', e.target.value)}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-midnight-800 text-gray-900 dark:text-white transition-all',
                          errors.state
                            ? 'border-red-500'
                            : 'border-gray-200 dark:border-white/10 focus:border-sky-500'
                        )}
                      >
                        <option value="">Select State</option>
                        {US_STATES.map((state) => (
                          <option key={state.code} value={state.code}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-frost-300 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => updateField('zipCode', e.target.value)}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-midnight-800 text-gray-900 dark:text-white transition-all',
                          errors.zipCode
                            ? 'border-red-500'
                            : 'border-gray-200 dark:border-white/10 focus:border-sky-500'
                        )}
                        placeholder="12345"
                        maxLength={10}
                      />
                      {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
                    </div>
                  </div>

                  {/* Bill Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-frost-300 mb-1">
                      Bill Category *
                    </label>
                    <select
                      value={formData.billCategory}
                      onChange={(e) => {
                        updateField('billCategory', e.target.value)
                        updateField('provider', '')
                      }}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-midnight-800 text-gray-900 dark:text-white transition-all',
                        errors.billCategory
                          ? 'border-red-500'
                          : 'border-gray-200 dark:border-white/10 focus:border-sky-500'
                      )}
                    >
                      <option value="">Select Category</option>
                      {BILL_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </option>
                      ))}
                    </select>
                    {errors.billCategory && <p className="mt-1 text-sm text-red-500">{errors.billCategory}</p>}
                  </div>

                  {/* Provider & Amount */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-frost-300 mb-1">
                        Provider *
                      </label>
                      {providers.length > 0 ? (
                        <select
                          value={formData.provider}
                          onChange={(e) => updateField('provider', e.target.value)}
                          className={cn(
                            'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-midnight-800 text-gray-900 dark:text-white transition-all',
                            errors.provider
                              ? 'border-red-500'
                              : 'border-gray-200 dark:border-white/10 focus:border-sky-500'
                          )}
                        >
                          <option value="">Select Provider</option>
                          {providers.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={formData.provider}
                          onChange={(e) => updateField('provider', e.target.value)}
                          className={cn(
                            'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-midnight-800 text-gray-900 dark:text-white transition-all',
                            errors.provider
                              ? 'border-red-500'
                              : 'border-gray-200 dark:border-white/10 focus:border-sky-500'
                          )}
                          placeholder="Enter provider name"
                        />
                      )}
                      {errors.provider && <p className="mt-1 text-sm text-red-500">{errors.provider}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-frost-300 mb-1">
                        Monthly Amount *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          value={formData.monthlyAmount}
                          onChange={(e) => updateField('monthlyAmount', e.target.value)}
                          className={cn(
                            'w-full pl-8 pr-4 py-3 rounded-xl border bg-gray-50 dark:bg-midnight-800 text-gray-900 dark:text-white transition-all',
                            errors.monthlyAmount
                              ? 'border-red-500'
                              : 'border-gray-200 dark:border-white/10 focus:border-sky-500'
                          )}
                          placeholder="150"
                          min="20"
                          max="5000"
                        />
                      </div>
                      {errors.monthlyAmount && <p className="mt-1 text-sm text-red-500">{errors.monthlyAmount}</p>}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <FloatingButton onClick={handleNext} fullWidth size="lg">
                    Continue to Upload
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </FloatingButton>
                </div>
              </motion.div>
            )}

            {/* Step 2: Bill Upload */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Upload Your Bill
                </h2>
                <p className="text-gray-600 dark:text-frost-300 mb-6">
                  Upload a copy of your bill so we can review the details. This helps us negotiate the best rate.
                </p>

                {/* Drop zone */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    'border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all',
                    file
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-white/20 hover:border-sky-500 dark:hover:border-neon-cyan bg-gray-50 dark:bg-midnight-800'
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {file ? (
                    <div className="space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                        <p className="text-sm text-gray-500 dark:text-frost-400">{formatFileSize(file.size)}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setFile(null)
                        }}
                        className="text-sm text-red-500 hover:text-red-600 underline"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-gray-100 dark:bg-midnight-700 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Drop your bill here or click to browse
                        </p>
                        <p className="text-sm text-gray-500 dark:text-frost-400">
                          PDF, JPG, or PNG up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {errors.file && <p className="mt-2 text-sm text-red-500">{errors.file}</p>}

                <p className="mt-4 text-sm text-gray-500 dark:text-frost-400 text-center">
                  📎 Bill upload is optional but recommended for best results
                </p>

                <div className="mt-8 flex gap-4">
                  <FloatingButton onClick={handleBack} variant="secondary" fullWidth size="lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </FloatingButton>
                  <FloatingButton onClick={handleNext} fullWidth size="lg">
                    Review & Confirm
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </FloatingButton>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review & Consent */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Review & Authorize
                </h2>
                <p className="text-gray-600 dark:text-frost-300 mb-6">
                  Please review your information and authorize us to negotiate on your behalf.
                </p>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-midnight-800 rounded-xl p-6 mb-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-frost-400">Name</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-frost-400">Email</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-frost-400">Phone</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-frost-400">Location</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formData.state}, {formData.zipCode}
                    </span>
                  </div>
                  <hr className="border-gray-200 dark:border-white/10" />
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-frost-400">Bill Type</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {BILL_CATEGORIES.find((c) => c.id === formData.billCategory)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-frost-400">Provider</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formData.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-frost-400">Monthly Bill</span>
                    <span className="font-bold text-sky-600 dark:text-neon-cyan">${formData.monthlyAmount}/mo</span>
                  </div>
                  {file && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-frost-400">Bill Uploaded</span>
                      <span className="font-medium text-green-600">✓ {file.name}</span>
                    </div>
                  )}
                </div>

                {/* Authorization */}
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => updateField('consent', e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-frost-300">
                      I authorize Wefixbill to contact my service provider on my behalf to negotiate a better rate. 
                      I understand my information will only be used to review and negotiate my bills.{' '}
                      <a href="/privacy-policy" className="text-sky-600 dark:text-neon-cyan underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {errors.consent && <p className="text-sm text-red-500">{errors.consent}</p>}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-frost-300 mb-1">
                      Type your full name as signature *
                    </label>
                    <input
                      type="text"
                      value={formData.signature}
                      onChange={(e) => updateField('signature', e.target.value)}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-midnight-800 text-gray-900 dark:text-white text-lg transition-all',
                        errors.signature
                          ? 'border-red-500'
                          : 'border-gray-200 dark:border-white/10 focus:border-sky-500'
                      )}
                      style={{ fontFamily: 'cursive' }}
                      placeholder="Type your full name"
                    />
                    {errors.signature && <p className="mt-1 text-sm text-red-500">{errors.signature}</p>}
                  </div>
                </div>

                {submitError && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
                    <button
                      onClick={handleSubmit}
                      className="mt-2 text-sm text-red-600 dark:text-red-400 underline"
                    >
                      Try again
                    </button>
                  </div>
                )}

                <div className="mt-8 flex gap-4">
                  <FloatingButton onClick={handleBack} variant="secondary" fullWidth size="lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </FloatingButton>
                  <FloatingButton
                    onClick={handleNext}
                    fullWidth
                    size="lg"
                    loading={isSubmitting}
                    disabled={!formData.consent || !formData.signature}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </FloatingButton>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && submitSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center"
                >
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Request Submitted!
                </h2>
                <p className="text-gray-600 dark:text-frost-300 mb-6">
                  {submitSuccess.message}
                </p>

                <div className="bg-gray-50 dark:bg-midnight-800 rounded-xl p-4 mb-6 inline-block">
                  <p className="text-sm text-gray-500 dark:text-frost-400">Reference ID</p>
                  <p className="font-mono font-bold text-sky-600 dark:text-neon-cyan">{submitSuccess.referenceId}</p>
                </div>

                <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-xl p-6 text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">What happens next?</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Review (24-48 hours)</p>
                        <p className="text-sm text-gray-600 dark:text-frost-400">
                          Our team reviews your submission and bill details
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Negotiation (1-2 weeks)</p>
                        <p className="text-sm text-gray-600 dark:text-frost-400">
                          We contact your provider and negotiate the best rate
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Results</p>
                        <p className="text-sm text-gray-600 dark:text-frost-400">
                          We'll email you with the outcome and any savings achieved
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <FloatingButton onClick={handleClose} fullWidth size="lg">
                    Done
                  </FloatingButton>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
