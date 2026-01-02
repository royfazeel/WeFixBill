'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, isValidEmail, isValidPhone, isValidZip } from '@/lib/utils'
import { BILL_CATEGORIES, US_STATES, PROVIDERS_BY_CATEGORY } from '@/lib/pricing'

interface IntakeModalProps {
  isOpen: boolean
  onClose: () => void
}

type Step = 1 | 2 | 3 | 4 | 5

interface FormData {
  billCategory: string
  provider: string
  monthlyAmount: string
  state: string
  zipCode: string
  fullName: string
  email: string
  phone: string
  signature: string
  consent: boolean
  honeypot: string // spam protection
}

interface FormErrors {
  [key: string]: string
}

const initialFormData: FormData = {
  billCategory: '',
  provider: '',
  monthlyAmount: '',
  state: '',
  zipCode: '',
  fullName: '',
  email: '',
  phone: '',
  signature: '',
  consent: false,
  honeypot: '',
}

const STEP_TITLES = [
  { num: 1, title: 'Bill Info', subtitle: 'What bill do you want to lower?' },
  { num: 2, title: 'Your Info', subtitle: 'How can we reach you?' },
  { num: 3, title: 'Upload', subtitle: 'Help us negotiate better' },
  { num: 4, title: 'Authorize', subtitle: 'Review and confirm' },
]

// Floating label input component - NO UNMOUNTING on value change
function FloatingInput({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  prefix,
  className,
}: {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal' | 'search' | 'url' | 'none'
  maxLength?: number
  prefix?: string
  className?: string
}) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasValue = value.length > 0

  return (
    <div className={cn('relative', className)}>
      <div 
        className={cn(
          'relative rounded-xl border-2 transition-all duration-200',
          isFocused ? 'border-stripe-purple shadow-[0_0_0_3px_rgba(99,91,255,0.1)]' : 
          error ? 'border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : 
          'border-slate-200 hover:border-slate-300'
        )}
      >
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          placeholder={isFocused ? placeholder : ''}
          className={cn(
            'w-full bg-transparent px-4 pt-5 pb-2 text-slate-900 text-base outline-none',
            'placeholder:text-slate-300',
            prefix && 'pl-8'
          )}
          style={{ fontSize: '16px' }} // Prevents iOS zoom
        />
        <label
          onClick={() => inputRef.current?.focus()}
          className={cn(
            'absolute left-4 transition-all duration-200 pointer-events-none',
            prefix && 'left-8',
            (isFocused || hasValue) 
              ? 'top-1.5 text-xs font-medium' 
              : 'top-1/2 -translate-y-1/2 text-sm',
            isFocused ? 'text-stripe-purple' : error ? 'text-red-400' : 'text-slate-400'
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 mt-1.5 ml-1 flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  )
}

// Floating label select component
function FloatingSelect({
  label,
  value,
  onChange,
  options,
  error,
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  error?: string
  className?: string
}) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0

  return (
    <div className={cn('relative', className)}>
      <div 
        className={cn(
          'relative rounded-xl border-2 transition-all duration-200',
          isFocused ? 'border-stripe-purple shadow-[0_0_0_3px_rgba(99,91,255,0.1)]' : 
          error ? 'border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : 
          'border-slate-200 hover:border-slate-300'
        )}
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'w-full bg-transparent px-4 pt-5 pb-2 text-base outline-none appearance-none cursor-pointer',
            hasValue ? 'text-slate-900' : 'text-transparent'
          )}
          style={{ fontSize: '16px' }}
        >
          <option value="" disabled></option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <label
          className={cn(
            'absolute left-4 transition-all duration-200 pointer-events-none',
            (isFocused || hasValue) 
              ? 'top-1.5 text-xs font-medium' 
              : 'top-1/2 -translate-y-1/2 text-sm',
            isFocused ? 'text-stripe-purple' : error ? 'text-red-400' : 'text-slate-400'
          )}
        >
          {label}
        </label>
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 mt-1.5 ml-1 flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  )
}

// Premium button with animations
function PremiumButton({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  type = 'button',
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  className?: string
  type?: 'button' | 'submit'
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className={cn(
        'relative min-h-[52px] px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200',
        'flex items-center justify-center gap-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        fullWidth && 'w-full',
        variant === 'primary' && [
          'bg-gradient-to-r from-stripe-purple to-indigo-600 text-white',
          'shadow-[0_4px_14px_rgba(99,91,255,0.4)]',
          'hover:shadow-[0_6px_20px_rgba(99,91,255,0.5)]',
        ],
        variant === 'secondary' && [
          'bg-slate-100 text-slate-700',
          'hover:bg-slate-200',
        ],
        variant === 'ghost' && [
          'bg-transparent text-slate-600',
          'hover:bg-slate-50',
        ],
        className
      )}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
        />
      ) : children}
      
      {/* Glow effect for primary */}
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-stripe-purple to-indigo-600 opacity-0"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ filter: 'blur(20px)', zIndex: -1 }}
        />
      )}
    </motion.button>
  )
}

// Progress stepper component
function ProgressStepper({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="w-full px-4 py-4">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2">
        {STEP_TITLES.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <motion.div
              animate={{
                backgroundColor: currentStep >= s.num ? '#635bff' : '#e2e8f0',
                scale: currentStep === s.num ? 1.15 : 1,
              }}
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-shadow',
                currentStep === s.num && 'shadow-[0_0_0_4px_rgba(99,91,255,0.2)]'
              )}
            >
              {currentStep > s.num ? (
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
                <span className={cn(
                  'text-sm font-bold',
                  currentStep >= s.num ? 'text-white' : 'text-slate-400'
                )}>
                  {s.num}
                </span>
              )}
            </motion.div>
            {i < totalSteps - 1 && (
              <div className="w-8 sm:w-12 h-1 mx-1 rounded-full overflow-hidden bg-slate-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: currentStep > s.num ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-stripe-purple"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Current step title */}
      {currentStep <= 4 && (
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-3"
        >
          <p className="text-sm font-semibold text-stripe-purple">Step {currentStep} of {totalSteps}</p>
          <p className="text-xs text-slate-500 mt-0.5">{STEP_TITLES[currentStep - 1]?.subtitle}</p>
        </motion.div>
      )}
    </div>
  )
}

// Success timeline animation
function SuccessTimeline() {
  const steps = [
    { icon: '📋', title: 'Review', desc: 'We review your info within 24hrs' },
    { icon: '📞', title: 'Negotiate', desc: 'We contact your provider' },
    { icon: '✅', title: 'Approve', desc: 'You approve any changes' },
    { icon: '💰', title: 'Save', desc: 'You keep more money!' },
  ]

  return (
    <div className="relative py-2">
      {/* Connecting line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-stripe-purple via-indigo-400 to-green-400" />
      
      {steps.map((step, i) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.15 }}
          className="relative flex items-start gap-4 mb-4 last:mb-0"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + i * 0.15, type: 'spring' }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-xl shadow-sm border border-slate-200 z-10"
          >
            {step.icon}
          </motion.div>
          <div className="flex-1 pt-1">
            <h4 className="font-semibold text-slate-900 text-sm">{step.title}</h4>
            <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function IntakeModal({ isOpen, onClose }: IntakeModalProps) {
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<{ message: string; referenceId: string } | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // FIX: Prevent body scroll on iOS without breaking input focus
  // Using position:fixed approach that preserves scroll position
  useEffect(() => {
    if (!isOpen) return

    const scrollY = window.scrollY
    const body = document.body
    
    // Store current scroll position and apply fixed positioning
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.overflow = 'hidden'

    return () => {
      // Restore body styles and scroll position
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.overflow = ''
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  // Reset form when modal closes
  const resetForm = useCallback(() => {
    setStep(1)
    setFormData(initialFormData)
    setErrors({})
    setFile(null)
    setIsSubmitting(false)
    setSubmitError(null)
    setSubmitSuccess(null)
    setHasSubmitted(false)
  }, [])

  const handleClose = useCallback(() => {
    onClose()
    setTimeout(resetForm, 300)
  }, [onClose, resetForm])

  // FIX: Memoized field update to prevent unnecessary re-renders
  // This ensures inputs don't get unmounted/remounted on each keystroke
  const updateField = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev }
        delete next[field]
        return next
      }
      return prev
    })
  }, [])

  // Computed providers list - memoized to prevent recalculation
  const providers = useMemo(() => {
    if (!formData.billCategory) return []
    return PROVIDERS_BY_CATEGORY[formData.billCategory as keyof typeof PROVIDERS_BY_CATEGORY] || []
  }, [formData.billCategory])

  // Validation functions
  const validateStep1 = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.billCategory) newErrors.billCategory = 'Please select a bill category'
    if (!formData.provider.trim()) newErrors.provider = 'Please enter your provider'
    const amount = parseFloat(formData.monthlyAmount)
    if (isNaN(amount) || amount < 20) newErrors.monthlyAmount = 'Minimum $20'
    if (amount > 5000) newErrors.monthlyAmount = 'Maximum $5000'
    if (!formData.state) newErrors.state = 'Please select your state'
    if (!isValidZip(formData.zipCode)) newErrors.zipCode = 'Enter a valid ZIP code'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const validateStep2 = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name'
    }
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const validateStep4 = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.consent) {
      newErrors.consent = 'Please agree to continue'
    }
    if (!formData.signature.trim()) {
      newErrors.signature = 'Please type your name to sign'
    } else if (formData.signature.toLowerCase().trim() !== formData.fullName.toLowerCase().trim()) {
      newErrors.signature = 'Signature must match your full name'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  // Navigation - NO AnimatePresence mode="wait" to prevent focus loss
  const goToStep = useCallback((targetStep: Step) => {
    setErrors({})
    setStep(targetStep)
    // Scroll to top of modal content
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [])

  const handleNext = useCallback(() => {
    if (step === 1 && validateStep1()) {
      goToStep(2)
    } else if (step === 2 && validateStep2()) {
      goToStep(3)
    } else if (step === 3) {
      goToStep(4)
    } else if (step === 4 && validateStep4()) {
      handleSubmit()
    }
  }, [step, validateStep1, validateStep2, validateStep4, goToStep])

  const handleBack = useCallback(() => {
    if (step > 1 && step < 5) {
      goToStep((step - 1) as Step)
    }
  }, [step, goToStep])

  // File handling
  const processFile = useCallback((selectedFile: File | undefined) => {
    if (!selectedFile) return
    
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
  }, [])

  // Submit handler with duplicate prevention
  const handleSubmit = useCallback(async () => {
    if (hasSubmitted || isSubmitting) return
    
    // Honeypot check for spam
    if (formData.honeypot) {
      console.log('Bot detected')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)
    setHasSubmitted(true)

    try {
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'honeypot') {
          submitData.append(key, String(value))
        }
      })
      submitData.append('website', '') // Additional honeypot field
      if (file) submitData.append('bill', file)

      const response = await fetch('/api/lead', { method: 'POST', body: submitData })
      const result = await response.json()

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors)
          goToStep(1)
        } else {
          setSubmitError(result.error || 'Submission failed. Please try again.')
        }
        setHasSubmitted(false)
        return
      }

      setSubmitSuccess({ message: result.message, referenceId: result.referenceId })
      goToStep(5)
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
      setHasSubmitted(false)
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, file, hasSubmitted, isSubmitting, goToStep])

  // Check if current step is valid for enabling Next button
  const isStepValid = useMemo(() => {
    switch (step) {
      case 1:
        return formData.billCategory && formData.provider && formData.monthlyAmount && formData.state && formData.zipCode
      case 2:
        return formData.fullName && formData.email && formData.phone
      case 3:
        return true // Upload is optional
      case 4:
        return formData.consent && formData.signature
      default:
        return true
    }
  }, [step, formData])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        >
          {/* Backdrop - separate from content to avoid focus issues */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal - Bottom sheet on mobile, centered on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'relative w-full sm:max-w-lg bg-white sm:rounded-2xl overflow-hidden',
              'max-h-[90dvh] sm:max-h-[85vh]', // FIX: Using dvh for mobile viewport
              'rounded-t-[20px] sm:rounded-2xl',
              'shadow-[0_-10px_40px_rgba(0,0,0,0.1),0_25px_50px_rgba(0,0,0,0.15)]'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle for mobile */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-slate-300" />
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Progress stepper */}
            {step < 5 && <ProgressStepper currentStep={step} totalSteps={4} />}

            {/* FIX: Scrollable content area with proper touch scrolling */}
            <div 
              ref={scrollContainerRef}
              className={cn(
                'overflow-y-auto overscroll-contain',
                step < 5 ? 'max-h-[calc(90dvh-180px)] sm:max-h-[calc(85vh-180px)]' : 'max-h-[90dvh] sm:max-h-[85vh]'
              )}
              style={{ 
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
              }}
            >
              {/* Honeypot field - hidden from real users */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => updateField('honeypot', e.target.value)}
                className="absolute -left-[9999px] opacity-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* FIX: Steps rendered WITHOUT AnimatePresence mode="wait" to prevent unmounting */}
              {/* This is the key fix - inputs stay mounted and don't lose focus */}
              
              {/* STEP 1: Bill Info */}
              <div className={cn('px-5 pb-6 sm:px-6', step !== 1 && 'hidden')}>
                <div className="space-y-4">
                  <FloatingSelect
                    label="Bill Category"
                    value={formData.billCategory}
                    onChange={(value) => {
                      updateField('billCategory', value)
                      updateField('provider', '')
                    }}
                    options={BILL_CATEGORIES.map((cat) => ({
                      value: cat.id,
                      label: `${cat.icon} ${cat.name}`,
                    }))}
                    error={errors.billCategory}
                  />

                  {providers.length > 0 ? (
                    <FloatingSelect
                      label="Provider"
                      value={formData.provider}
                      onChange={(value) => updateField('provider', value)}
                      options={[
                        ...providers.map((p) => ({ value: p, label: p })),
                        { value: 'Other', label: 'Other' },
                      ]}
                      error={errors.provider}
                    />
                  ) : (
                    <FloatingInput
                      label="Provider Name"
                      value={formData.provider}
                      onChange={(value) => updateField('provider', value)}
                      placeholder="e.g. Comcast, Verizon"
                      autoComplete="organization"
                      error={errors.provider}
                    />
                  )}

                  <FloatingInput
                    label="Monthly Bill Amount"
                    type="text"
                    inputMode="decimal"
                    value={formData.monthlyAmount}
                    onChange={(value) => updateField('monthlyAmount', value)}
                    placeholder="150"
                    prefix="$"
                    error={errors.monthlyAmount}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FloatingSelect
                      label="State"
                      value={formData.state}
                      onChange={(value) => updateField('state', value)}
                      options={US_STATES.map((s) => ({
                        value: s.code,
                        label: s.name,
                      }))}
                      error={errors.state}
                    />
                    <FloatingInput
                      label="ZIP Code"
                      value={formData.zipCode}
                      onChange={(value) => updateField('zipCode', value)}
                      placeholder="12345"
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="postal-code"
                      error={errors.zipCode}
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: Personal Info */}
              <div className={cn('px-5 pb-6 sm:px-6', step !== 2 && 'hidden')}>
                <div className="space-y-4">
                  <FloatingInput
                    label="Full Name"
                    value={formData.fullName}
                    onChange={(value) => updateField('fullName', value)}
                    placeholder="John Smith"
                    autoComplete="name"
                    error={errors.fullName}
                  />

                  <FloatingInput
                    label="Email Address"
                    type="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(value) => updateField('email', value)}
                    placeholder="john@example.com"
                    autoComplete="email"
                    error={errors.email}
                  />

                  <FloatingInput
                    label="Phone Number"
                    type="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(value) => updateField('phone', value)}
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                    error={errors.phone}
                  />

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      256-bit encrypted
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      No spam ever
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: Upload */}
              <div className={cn('px-5 pb-6 sm:px-6', step !== 3 && 'hidden')}>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); processFile(e.dataTransfer.files?.[0]) }}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200',
                    isDragging ? 'border-stripe-purple bg-stripe-purple/5 scale-[1.02]' :
                    file ? 'border-green-400 bg-green-50' :
                    'border-slate-200 hover:border-stripe-purple/50 hover:bg-slate-50'
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
                    <div className="space-y-3">
                      <div className="w-14 h-14 mx-auto bg-green-100 rounded-xl flex items-center justify-center">
                        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 truncate max-w-[200px] mx-auto">{file.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setFile(null) }} 
                        className="text-red-500 hover:text-red-600 text-sm font-medium hover:underline"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 mx-auto bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-base font-semibold text-slate-900">Drop your bill here</p>
                      <p className="text-sm text-slate-500 mt-1">or click to browse</p>
                      <p className="text-xs text-slate-400 mt-3">PDF, JPG, PNG up to 10MB</p>
                    </>
                  )}
                </div>
                
                {errors.file && (
                  <p className="text-sm text-red-500 mt-3 text-center">{errors.file}</p>
                )}

                <p className="text-xs text-slate-400 text-center mt-4">
                  📝 Uploading your bill helps us get you the best savings
                </p>
              </div>

              {/* STEP 4: Authorization */}
              <div className={cn('px-5 pb-6 sm:px-6', step !== 4 && 'hidden')}>
                {/* Summary Card */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 mb-5 border border-slate-200">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Name</span>
                      <span className="text-slate-900 font-medium">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Email</span>
                      <span className="text-slate-900 font-medium truncate ml-4">{formData.email}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Bill Type</span>
                      <span className="text-slate-900 font-medium">{formData.billCategory}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Provider</span>
                      <span className="text-slate-900 font-medium">{formData.provider}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500">Monthly Bill</span>
                      <span className="text-stripe-purple font-bold text-lg">${formData.monthlyAmount}/mo</span>
                    </div>
                  </div>
                </div>

                {/* Authorization checkbox */}
                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-colors -mx-3">
                  <div className="relative mt-0.5">
                    <input 
                      type="checkbox" 
                      checked={formData.consent} 
                      onChange={(e) => updateField('consent', e.target.checked)} 
                      className="sr-only peer"
                    />
                    <div className={cn(
                      'w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center',
                      formData.consent 
                        ? 'bg-stripe-purple border-stripe-purple' 
                        : 'border-slate-300 peer-focus:border-stripe-purple peer-focus:ring-2 peer-focus:ring-stripe-purple/20'
                    )}>
                      {formData.consent && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-slate-600 leading-relaxed">
                    I authorize Wefixbill to negotiate with my provider on my behalf and agree to the{' '}
                    <a href="/terms-of-service" className="text-stripe-purple hover:underline font-medium" onClick={(e) => e.stopPropagation()}>Terms of Service</a> and{' '}
                    <a href="/privacy-policy" className="text-stripe-purple hover:underline font-medium" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-red-500 mt-1 ml-8">{errors.consent}</p>
                )}

                {/* Electronic signature */}
                <div className="mt-4">
                  <FloatingInput
                    label="Electronic Signature (type your full name)"
                    value={formData.signature}
                    onChange={(value) => updateField('signature', value)}
                    placeholder={formData.fullName || 'Your full name'}
                    autoComplete="name"
                    error={errors.signature}
                  />
                </div>

                {submitError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {submitError}
                  </div>
                )}
              </div>

              {/* STEP 5: Success */}
              {step === 5 && submitSuccess && (
                <div className="px-5 py-8 sm:px-6">
                  {/* Success animation */}
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15, delay: 0.1 }}
                      className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold text-slate-900 mt-5"
                    >
                      You&apos;re all set! 🎉
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-slate-500 mt-2"
                    >
                      {submitSuccess.message}
                    </motion.p>
                  </div>

                  {/* Reference ID */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-100 rounded-xl px-4 py-3 text-center mb-6"
                  >
                    <span className="text-xs text-slate-500 block">Reference ID</span>
                    <span className="text-stripe-purple font-mono font-bold text-lg">{submitSuccess.referenceId}</span>
                  </motion.div>

                  {/* What's next timeline */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-5 border border-slate-200"
                  >
                    <h3 className="font-semibold text-slate-900 mb-4">What happens next?</h3>
                    <SuccessTimeline />
                  </motion.div>

                  {/* Close button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6"
                  >
                    <PremiumButton onClick={handleClose} variant="primary" fullWidth>
                      Done
                    </PremiumButton>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Sticky bottom action bar - only for steps 1-4 */}
            {step < 5 && (
              <div className="sticky bottom-0 bg-white border-t border-slate-100 px-5 py-4 sm:px-6">
                <div className="flex gap-3">
                  {step > 1 && (
                    <PremiumButton 
                      onClick={handleBack} 
                      variant="secondary"
                      disabled={isSubmitting}
                      className="flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </PremiumButton>
                  )}
                  <PremiumButton 
                    onClick={handleNext} 
                    variant="primary"
                    fullWidth
                    disabled={!isStepValid}
                    loading={isSubmitting}
                  >
                    {step === 3 ? (file ? 'Continue' : 'Skip for now') :
                     step === 4 ? (isSubmitting ? 'Submitting...' : 'Submit Request') :
                     'Continue'}
                    {step < 4 && !isSubmitting && (
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </PremiumButton>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
