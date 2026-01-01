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

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 40,
    transition: { duration: 0.2 }
  }
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.2 }
  })
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  }
}

// Reusable input styles
const inputBaseStyles = cn(
  'w-full px-4 py-3.5 rounded-xl transition-all duration-200',
  'bg-slate-800/50 text-white placeholder:text-slate-500',
  'border border-slate-700 focus:border-cyan-500',
  'focus:outline-none focus:ring-2 focus:ring-cyan-500/20',
  'hover:border-slate-600'
)

const inputErrorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500/20'

const labelStyles = 'block text-sm font-medium text-slate-300 mb-2'

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

  // Lock body scroll when modal is open
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
      newErrors.email = 'Please enter a valid email address'
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
      newErrors.monthlyAmount = 'Amount must be between $20 and $5000'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.consent) {
      newErrors.consent = 'Please agree to the terms to continue'
    }
    if (!formData.signature.trim()) {
      newErrors.signature = 'Please sign by typing your full name'
    } else if (formData.signature.toLowerCase().trim() !== formData.fullName.toLowerCase().trim()) {
      newErrors.signature = 'Signature must match your full name exactly'
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    processFile(selectedFile)
  }

  const processFile = (selectedFile: File | undefined) => {
    if (!selectedFile) return
    
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrors((prev) => ({ ...prev, file: 'Only PDF, JPG, or PNG files are allowed' }))
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files?.[0]
    processFile(droppedFile)
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
          setDirection(-1)
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
      setDirection(1)
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
    <AnimatePresence mode="wait">
      <motion.div
        key="backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        onClick={handleClose}
      >
        <motion.div
          key="modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-xl max-h-[90vh] overflow-hidden bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl shadow-cyan-500/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Close button */}
          <motion.button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Progress indicator */}
          {step < 4 && (
            <div className="relative z-10 px-8 pt-8">
              <div className="flex items-center justify-center gap-3">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: step === s ? 1.1 : 1,
                        backgroundColor: step >= s ? 'rgb(6 182 212)' : 'rgb(51 65 85)'
                      }}
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        'text-sm font-bold transition-colors'
                      )}
                    >
                      {step > s ? (
                        <motion.svg 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      ) : (
                        <span className={step >= s ? 'text-slate-900' : 'text-slate-400'}>{s}</span>
                      )}
                    </motion.div>
                    {s < 3 && (
                      <motion.div
                        initial={false}
                        animate={{
                          backgroundColor: step > s ? 'rgb(6 182 212)' : 'rgb(51 65 85)'
                        }}
                        className="w-12 sm:w-20 h-1 rounded-full"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-3 px-2">
                <span className={step >= 1 ? 'text-cyan-400' : ''}>Details</span>
                <span className={step >= 2 ? 'text-cyan-400' : ''}>Upload</span>
                <span className={step >= 3 ? 'text-cyan-400' : ''}>Confirm</span>
              </div>
            </div>
          )}

          {/* Form content */}
          <div className="relative z-10 overflow-y-auto max-h-[calc(90vh-120px)]">
            <AnimatePresence mode="wait" custom={direction}>
              {/* Step 1: User Info & Bill Details */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="px-8 py-6"
                >
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    <motion.div variants={fadeInUp} className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Let's Get Started
                      </h2>
                      <p className="text-slate-400">
                        Tell us about yourself and your bill
                      </p>
                    </motion.div>

                    <div className="space-y-5">
                      {/* Full Name */}
                      <motion.div variants={fadeInUp}>
                        <label className={labelStyles}>Full Name</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          className={cn(inputBaseStyles, errors.fullName && inputErrorStyles)}
                          placeholder="John Smith"
                          autoComplete="name"
                        />
                        {errors.fullName && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-400 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.fullName}
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Email & Phone */}
                      <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelStyles}>Email</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className={cn(inputBaseStyles, errors.email && inputErrorStyles)}
                            placeholder="john@example.com"
                            autoComplete="email"
                          />
                          {errors.email && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-400">
                              {errors.email}
                            </motion.p>
                          )}
                        </div>
                        <div>
                          <label className={labelStyles}>Phone</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className={cn(inputBaseStyles, errors.phone && inputErrorStyles)}
                            placeholder="(555) 123-4567"
                            autoComplete="tel"
                          />
                          {errors.phone && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-400">
                              {errors.phone}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>

                      {/* State & ZIP */}
                      <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelStyles}>State</label>
                          <select
                            value={formData.state}
                            onChange={(e) => updateField('state', e.target.value)}
                            className={cn(inputBaseStyles, errors.state && inputErrorStyles, 'appearance-none cursor-pointer')}
                          >
                            <option value="" className="bg-slate-800">Select State</option>
                            {US_STATES.map((state) => (
                              <option key={state.code} value={state.code} className="bg-slate-800">
                                {state.name}
                              </option>
                            ))}
                          </select>
                          {errors.state && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-400">
                              {errors.state}
                            </motion.p>
                          )}
                        </div>
                        <div>
                          <label className={labelStyles}>ZIP Code</label>
                          <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => updateField('zipCode', e.target.value)}
                            className={cn(inputBaseStyles, errors.zipCode && inputErrorStyles)}
                            placeholder="12345"
                            maxLength={10}
                            autoComplete="postal-code"
                          />
                          {errors.zipCode && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-400">
                              {errors.zipCode}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>

                      {/* Divider */}
                      <motion.div variants={fadeInUp} className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-700" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 text-sm text-slate-500 bg-slate-900">Bill Information</span>
                        </div>
                      </motion.div>

                      {/* Bill Category */}
                      <motion.div variants={fadeInUp}>
                        <label className={labelStyles}>Bill Category</label>
                        <select
                          value={formData.billCategory}
                          onChange={(e) => {
                            updateField('billCategory', e.target.value)
                            updateField('provider', '')
                          }}
                          className={cn(inputBaseStyles, errors.billCategory && inputErrorStyles, 'appearance-none cursor-pointer')}
                        >
                          <option value="" className="bg-slate-800">Select Category</option>
                          {BILL_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id} className="bg-slate-800">
                              {cat.icon} {cat.name}
                            </option>
                          ))}
                        </select>
                        {errors.billCategory && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-400">
                            {errors.billCategory}
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Provider & Amount */}
                      <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelStyles}>Provider</label>
                          {providers.length > 0 ? (
                            <select
                              value={formData.provider}
                              onChange={(e) => updateField('provider', e.target.value)}
                              className={cn(inputBaseStyles, errors.provider && inputErrorStyles, 'appearance-none cursor-pointer')}
                            >
                              <option value="" className="bg-slate-800">Select Provider</option>
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
                              className={cn(inputBaseStyles, errors.provider && inputErrorStyles)}
                              placeholder="Enter provider name"
                            />
                          )}
                          {errors.provider && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-400">
                              {errors.provider}
                            </motion.p>
                          )}
                        </div>
                        <div>
                          <label className={labelStyles}>Monthly Amount</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                            <input
                              type="number"
                              value={formData.monthlyAmount}
                              onChange={(e) => updateField('monthlyAmount', e.target.value)}
                              className={cn(inputBaseStyles, 'pl-8', errors.monthlyAmount && inputErrorStyles)}
                              placeholder="150"
                              min="20"
                              max="5000"
                            />
                          </div>
                          {errors.monthlyAmount && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-400">
                              {errors.monthlyAmount}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Continue button */}
                    <motion.div variants={fadeInUp} className="mt-8">
                      <FloatingButton onClick={handleNext} variant="primary" size="lg" fullWidth>
                        Continue
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </FloatingButton>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Upload Bill */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="px-8 py-6"
                >
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    <motion.div variants={fadeInUp} className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Upload Your Bill
                      </h2>
                      <p className="text-slate-400">
                        Optional but helps us negotiate better rates
                      </p>
                    </motion.div>

                    {/* Upload area */}
                    <motion.div variants={fadeInUp}>
                      <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                          'relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300',
                          isDragging
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : file
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/50'
                        )}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                        />

                        {file ? (
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-3"
                          >
                            <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-2xl flex items-center justify-center">
                              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-white font-medium truncate max-w-xs mx-auto">{file.name}</p>
                              <p className="text-slate-400 text-sm">{formatFileSize(file.size)}</p>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); setFile(null) }}
                              className="text-red-400 hover:text-red-300 text-sm font-medium"
                            >
                              Remove file
                            </button>
                          </motion.div>
                        ) : (
                          <>
                            <div className="w-16 h-16 mx-auto bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                            </div>
                            <p className="text-white font-medium mb-1">
                              Drop your bill here or click to browse
                            </p>
                            <p className="text-slate-500 text-sm">
                              PDF, JPG, or PNG up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                      {errors.file && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-red-400 text-center">
                          {errors.file}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Why upload */}
                    <motion.div variants={fadeInUp} className="mt-6 p-4 bg-slate-800/50 rounded-xl">
                      <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Why upload your bill?
                      </h4>
                      <ul className="text-slate-400 text-sm space-y-1">
                        <li>• Helps us identify all charges and fees</li>
                        <li>• Enables more accurate negotiation</li>
                        <li>• Speeds up the process significantly</li>
                      </ul>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div variants={fadeInUp} className="mt-8 flex gap-3">
                      <FloatingButton onClick={handleBack} variant="secondary" size="lg" className="flex-1">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Back
                      </FloatingButton>
                      <FloatingButton onClick={handleNext} variant="primary" size="lg" className="flex-[2]">
                        {file ? 'Continue with Bill' : 'Skip for Now'}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </FloatingButton>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Review & Authorize */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="px-8 py-6"
                >
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    <motion.div variants={fadeInUp} className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Review & Authorize
                      </h2>
                      <p className="text-slate-400">
                        Please confirm your information
                      </p>
                    </motion.div>

                    {/* Summary */}
                    <motion.div variants={fadeInUp} className="bg-slate-800/50 rounded-2xl p-5 mb-6 space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-400">Name</span>
                        <span className="text-white font-medium">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-400">Email</span>
                        <span className="text-white font-medium">{formData.email}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-400">Phone</span>
                        <span className="text-white font-medium">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-400">Location</span>
                        <span className="text-white font-medium">{formData.state}, {formData.zipCode}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-400">Bill Type</span>
                        <span className="text-white font-medium capitalize">{formData.billCategory}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-700">
                        <span className="text-slate-400">Provider</span>
                        <span className="text-white font-medium">{formData.provider}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-400">Monthly Amount</span>
                        <span className="text-cyan-400 font-bold text-lg">${formData.monthlyAmount}</span>
                      </div>
                      {file && (
                        <div className="flex justify-between items-center py-2 pt-3 border-t border-slate-700">
                          <span className="text-slate-400">Attached Bill</span>
                          <span className="text-green-400 font-medium flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {file.name}
                          </span>
                        </div>
                      )}
                    </motion.div>

                    {/* Authorization */}
                    <motion.div variants={fadeInUp} className="space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex-shrink-0 mt-0.5">
                          <input
                            type="checkbox"
                            checked={formData.consent}
                            onChange={(e) => updateField('consent', e.target.checked)}
                            className="sr-only"
                          />
                          <div className={cn(
                            'w-5 h-5 rounded border-2 transition-all flex items-center justify-center',
                            formData.consent
                              ? 'bg-cyan-500 border-cyan-500'
                              : 'border-slate-600 group-hover:border-slate-500'
                          )}>
                            {formData.consent && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-slate-300 leading-relaxed">
                          I authorize Wefixbill to contact my service provider on my behalf and negotiate my bill. 
                          I agree to the <a href="/terms-of-service" className="text-cyan-400 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-cyan-400 hover:underline">Privacy Policy</a>.
                        </span>
                      </label>
                      {errors.consent && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400">
                          {errors.consent}
                        </motion.p>
                      )}

                      {/* Signature */}
                      <div>
                        <label className={labelStyles}>
                          Electronic Signature
                          <span className="text-slate-500 font-normal ml-1">(Type your full name)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.signature}
                          onChange={(e) => updateField('signature', e.target.value)}
                          className={cn(inputBaseStyles, 'font-mono', errors.signature && inputErrorStyles)}
                          placeholder={formData.fullName || 'Your full name'}
                        />
                        {errors.signature && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-400">
                            {errors.signature}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>

                    {/* Error message */}
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
                      >
                        {submitError}
                      </motion.div>
                    )}

                    {/* Buttons */}
                    <motion.div variants={fadeInUp} className="mt-8 flex gap-3">
                      <FloatingButton onClick={handleBack} variant="secondary" size="lg" className="flex-1" disabled={isSubmitting}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Back
                      </FloatingButton>
                      <FloatingButton 
                        onClick={handleNext} 
                        variant="primary" 
                        size="lg" 
                        className="flex-[2]"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      </FloatingButton>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === 4 && submitSuccess && (
                <motion.div
                  key="step4"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="px-8 py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-8"
                  >
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="w-12 h-12 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Request Submitted!
                    </h2>
                    <p className="text-slate-400 mb-6">
                      {submitSuccess.message}
                    </p>
                    
                    <div className="inline-block bg-slate-800/50 px-6 py-3 rounded-xl mb-8">
                      <span className="text-slate-400 text-sm">Reference ID</span>
                      <p className="text-cyan-400 font-mono font-bold text-lg">{submitSuccess.referenceId}</p>
                    </div>

                    {/* What happens next */}
                    <div className="text-left bg-slate-800/30 rounded-2xl p-6 mb-8">
                      <h4 className="text-white font-semibold mb-4">What happens next?</h4>
                      <div className="space-y-4">
                        {[
                          { step: '1', text: 'Our team reviews your request within 24 hours' },
                          { step: '2', text: 'We contact your provider and negotiate on your behalf' },
                          { step: '3', text: 'You approve any changes before we finalize them' },
                          { step: '4', text: 'You only pay if we save you money!' },
                        ].map((item, i) => (
                          <motion.div
                            key={item.step}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-cyan-400 text-xs font-bold">{item.step}</span>
                            </div>
                            <p className="text-slate-300 text-sm">{item.text}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <FloatingButton onClick={handleClose} variant="primary" size="lg">
                      Done
                    </FloatingButton>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
