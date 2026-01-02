import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Email recipient - YOUR EMAIL
const NOTIFICATION_EMAIL = 'support@wefixbill.com'

// Generate a unique reference ID
function generateReferenceId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `WFB-${timestamp}-${random}`
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone format
function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 15
}

// Validate ZIP code
function isValidZip(zip: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zip)
}

// Format phone number for display
function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

// Create HTML email template
function createEmailHTML(data: {
  fullName: string
  email: string
  phone: string
  state: string
  zipCode: string
  billCategory: string
  provider: string
  monthlyAmount: string
  referenceId: string
  hasFile: boolean
  fileName?: string
  submittedAt: string
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                New Lead Submission
              </h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                Reference: <strong>${data.referenceId}</strong>
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              
              <!-- Customer Info Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <h2 style="margin: 0; color: #06b6d4; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                      Customer Information
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #334155; border-radius: 12px; padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #475569;">
                          <span style="color: #94a3b8; font-size: 13px;">Full Name</span><br>
                          <span style="color: #ffffff; font-size: 16px; font-weight: 600;">${data.fullName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #475569;">
                          <span style="color: #94a3b8; font-size: 13px;">Email</span><br>
                          <a href="mailto:${data.email}" style="color: #06b6d4; font-size: 16px; text-decoration: none;">${data.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #475569;">
                          <span style="color: #94a3b8; font-size: 13px;">Phone</span><br>
                          <a href="tel:${data.phone}" style="color: #06b6d4; font-size: 16px; text-decoration: none;">${formatPhone(data.phone)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #94a3b8; font-size: 13px;">Location</span><br>
                          <span style="color: #ffffff; font-size: 16px;">${data.state}, ${data.zipCode}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Bill Info Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <h2 style="margin: 0; color: #06b6d4; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                      Bill Details
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #334155; border-radius: 12px; padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #475569;">
                          <span style="color: #94a3b8; font-size: 13px;">Category</span><br>
                          <span style="color: #ffffff; font-size: 16px; font-weight: 600;">${data.billCategory}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #475569;">
                          <span style="color: #94a3b8; font-size: 13px;">Provider</span><br>
                          <span style="color: #ffffff; font-size: 16px;">${data.provider}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #475569;">
                          <span style="color: #94a3b8; font-size: 13px;">Monthly Amount</span><br>
                          <span style="color: #10b981; font-size: 24px; font-weight: bold;">$${data.monthlyAmount}/mo</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #94a3b8; font-size: 13px;">Bill Uploaded</span><br>
                          <span style="color: ${data.hasFile ? '#10b981' : '#f59e0b'}; font-size: 16px;">
                            ${data.hasFile ? 'Yes - ' + data.fileName : 'No'}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Potential Savings -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px; text-align: center;">
                    <span style="color: #94a3b8; font-size: 13px;">Potential Monthly Savings (20% estimate)</span><br>
                    <span style="color: #10b981; font-size: 28px; font-weight: bold;">$${Math.round(parseFloat(data.monthlyAmount) * 0.2)}/mo</span>
                    <span style="color: #94a3b8; font-size: 14px; display: block; margin-top: 5px;">
                      ~$${Math.round(parseFloat(data.monthlyAmount) * 0.2 * 12)}/year
                    </span>
                  </td>
                </tr>
              </table>
              
              <!-- Metadata -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-top: 15px; border-top: 1px solid #334155;">
                    <p style="margin: 0; color: #64748b; font-size: 12px; text-align: center;">
                      Submitted on ${data.submittedAt}
                    </p>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 20px; text-align: center;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                Wefixbill Lead Notification
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

// Create plain text version
function createEmailText(data: {
  fullName: string
  email: string
  phone: string
  state: string
  zipCode: string
  billCategory: string
  provider: string
  monthlyAmount: string
  referenceId: string
  hasFile: boolean
  fileName?: string
  submittedAt: string
}): string {
  return `
NEW LEAD SUBMISSION
Reference: ${data.referenceId}
==========================================

CUSTOMER INFORMATION
--------------------
Name: ${data.fullName}
Email: ${data.email}
Phone: ${formatPhone(data.phone)}
Location: ${data.state}, ${data.zipCode}

BILL DETAILS
------------
Category: ${data.billCategory}
Provider: ${data.provider}
Monthly Amount: $${data.monthlyAmount}/mo
Bill Uploaded: ${data.hasFile ? 'Yes - ' + data.fileName : 'No'}

POTENTIAL SAVINGS
-----------------
Estimated Monthly: $${Math.round(parseFloat(data.monthlyAmount) * 0.2)}/mo
Estimated Annual: $${Math.round(parseFloat(data.monthlyAmount) * 0.2 * 12)}/year

==========================================
Submitted: ${data.submittedAt}
  `.trim()
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const state = formData.get('state') as string
    const zipCode = formData.get('zipCode') as string
    const billCategory = formData.get('billCategory') as string
    const provider = formData.get('provider') as string
    const monthlyAmount = formData.get('monthlyAmount') as string
    const signature = formData.get('signature') as string
    const consent = formData.get('consent') === 'true'
    const website = formData.get('website') as string // Honeypot field
    const bill = formData.get('bill') as File | null
    
    // Honeypot check (spam prevention)
    if (website && website.length > 0) {
      return NextResponse.json({
        success: true,
        message: "We'll review your request and get back to you within 24 hours.",
        referenceId: generateReferenceId(),
      })
    }
    
    // Server-side validation
    const errors: Record<string, string> = {}
    
    if (!fullName || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name'
    }
    if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email'
    }
    if (!isValidPhone(phone)) {
      errors.phone = 'Please enter a valid phone number'
    }
    if (!state) {
      errors.state = 'Please select your state'
    }
    if (!isValidZip(zipCode)) {
      errors.zipCode = 'Please enter a valid ZIP code'
    }
    if (!billCategory) {
      errors.billCategory = 'Please select a bill category'
    }
    if (!provider || provider.trim().length < 1) {
      errors.provider = 'Please enter your provider'
    }
    const amount = parseFloat(monthlyAmount)
    if (isNaN(amount) || amount < 20 || amount > 5000) {
      errors.monthlyAmount = 'Please enter an amount between $20 and $5000'
    }
    if (!consent) {
      errors.consent = 'Please agree to the terms to continue'
    }
    if (!signature || signature.toLowerCase().trim() !== fullName.toLowerCase().trim()) {
      errors.signature = 'Signature must match your full name'
    }
    
    // Return validation errors if any
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Validation failed',
        errors 
      }, { status: 400 })
    }
    
    // Generate reference ID
    const referenceId = generateReferenceId()
    const submittedAt = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })
    
    // Prepare email data
    const emailData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      state,
      zipCode: zipCode.trim(),
      billCategory,
      provider: provider.trim(),
      monthlyAmount,
      referenceId,
      hasFile: !!bill && bill.size > 0,
      fileName: bill?.name,
      submittedAt,
    }
    
    // Send email notification
    try {
      const { error: emailError } = await resend.emails.send({
        from: 'Wefixbill <onboarding@resend.dev>',
        to: [NOTIFICATION_EMAIL],
        replyTo: email,
        subject: `New Lead: ${fullName} - ${billCategory} ($${monthlyAmount}/mo)`,
        html: createEmailHTML(emailData),
        text: createEmailText(emailData),
      })
      
      if (emailError) {
        console.error('Email send error:', emailError)
      }
    } catch (emailErr) {
      console.error('Email service error:', emailErr)
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: "We'll review your request and get back to you within 24 hours.",
      referenceId,
    })
    
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
