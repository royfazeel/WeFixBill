import { NextRequest, NextResponse } from 'next/server'

// Rate limiting store (in production use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5 // requests
const RATE_WINDOW = 60 * 1000 // 1 minute

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return ip
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(key)
  
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_WINDOW })
    return false
  }
  
  if (entry.count >= RATE_LIMIT) {
    return true
  }
  
  entry.count++
  return false
}

// Validation helpers
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

function isValidZip(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip)
}

interface LeadData {
  fullName: string
  email: string
  phone: string
  state: string
  zipCode: string
  billCategory: string
  provider: string
  monthlyAmount: number
  signature: string
  consent: boolean
  honeypot?: string
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    
    // Check honeypot (spam protection)
    const honeypot = formData.get('website') as string
    if (honeypot) {
      // Bot detected - return success but don't process
      return NextResponse.json({ success: true, message: 'Submission received' })
    }

    // Extract and validate fields
    const data: LeadData = {
      fullName: (formData.get('fullName') as string)?.trim() || '',
      email: (formData.get('email') as string)?.trim().toLowerCase() || '',
      phone: (formData.get('phone') as string)?.trim() || '',
      state: (formData.get('state') as string)?.trim() || '',
      zipCode: (formData.get('zipCode') as string)?.trim() || '',
      billCategory: (formData.get('billCategory') as string)?.trim() || '',
      provider: (formData.get('provider') as string)?.trim() || '',
      monthlyAmount: parseFloat(formData.get('monthlyAmount') as string) || 0,
      signature: (formData.get('signature') as string)?.trim() || '',
      consent: formData.get('consent') === 'true',
    }

    // Get uploaded file
    const file = formData.get('bill') as File | null

    // Validation
    const errors: Record<string, string> = {}

    if (!data.fullName || data.fullName.length < 2) {
      errors.fullName = 'Full name is required (min 2 characters)'
    }

    if (!isValidEmail(data.email)) {
      errors.email = 'Valid email address is required'
    }

    if (!isValidPhone(data.phone)) {
      errors.phone = 'Valid phone number is required (10-15 digits)'
    }

    if (!data.state) {
      errors.state = 'State is required'
    }

    if (!isValidZip(data.zipCode)) {
      errors.zipCode = 'Valid ZIP code is required'
    }

    if (!data.billCategory) {
      errors.billCategory = 'Bill category is required'
    }

    if (!data.provider) {
      errors.provider = 'Provider name is required'
    }

    if (data.monthlyAmount < 20 || data.monthlyAmount > 5000) {
      errors.monthlyAmount = 'Monthly amount must be between $20 and $5000'
    }

    if (!data.consent) {
      errors.consent = 'You must agree to the authorization terms'
    }

    if (!data.signature || data.signature.toLowerCase() !== data.fullName.toLowerCase()) {
      errors.signature = 'Signature must match your full name'
    }

    // Validate file if provided
    if (file && file.size > 0) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      if (!allowedTypes.includes(file.type)) {
        errors.file = 'File must be PDF, JPG, or PNG'
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        errors.file = 'File size must be less than 10MB'
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 })
    }

    // Prepare payload for webhook
    const payload = {
      ...data,
      submittedAt: new Date().toISOString(),
      hasFile: file && file.size > 0,
      fileName: file?.name || null,
      fileSize: file?.size || null,
      fileType: file?.type || null,
    }

    // Log the submission (always do this for debugging)
    console.log('=== NEW LEAD SUBMISSION ===')
    console.log('Timestamp:', payload.submittedAt)
    console.log('Name:', payload.fullName)
    console.log('Email:', payload.email)
    console.log('Phone:', payload.phone)
    console.log('Location:', payload.state, payload.zipCode)
    console.log('Bill:', payload.billCategory, '-', payload.provider)
    console.log('Amount:', '$' + payload.monthlyAmount)
    console.log('File:', payload.hasFile ? `${payload.fileName} (${payload.fileSize} bytes)` : 'None')
    console.log('=========================')

    // Send to webhook if configured
    const webhookUrl = process.env.LEAD_WEBHOOK_URL

    if (webhookUrl) {
      try {
        // For webhook, we need to forward the form data
        const webhookFormData = new FormData()
        webhookFormData.append('data', JSON.stringify(payload))
        
        if (file && file.size > 0) {
          webhookFormData.append('bill', file)
        }

        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          body: webhookFormData,
        })

        if (!webhookResponse.ok) {
          console.error('Webhook failed:', webhookResponse.status, await webhookResponse.text())
          // Don't fail the user submission, just log the error
        } else {
          console.log('Webhook successful')
        }
      } catch (webhookError) {
        console.error('Webhook error:', webhookError)
        // Don't fail the user submission
      }
    } else {
      console.log('No LEAD_WEBHOOK_URL configured - submission logged only')
    }

    return NextResponse.json({
      success: true,
      message: 'Your submission has been received. We will contact you within 24 hours.',
      referenceId: `WFB-${Date.now().toString(36).toUpperCase()}`,
    })

  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
