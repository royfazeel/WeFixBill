import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const NOTIFICATION_EMAIL = 'support@wefixbill.com'

function generateReferenceId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `WFB-${timestamp}-${random}`
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 15
}

function isValidZip(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip)
}

function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

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
  submittedAt: string
}): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Lead</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#1e293b;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#06b6d4,#3b82f6);padding:30px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:24px;">New Lead Submission</h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">Reference: <strong>${data.referenceId}</strong></p>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;">
              <h2 style="margin:0 0 15px;color:#06b6d4;font-size:16px;">Customer Information</h2>
              <table width="100%" style="background-color:#334155;border-radius:12px;padding:20px;">
                <tr><td style="padding:8px 0;color:#94a3b8;font-size:13px;">Name</td></tr>
                <tr><td style="padding:0 0 8px;color:#fff;font-size:16px;font-weight:600;">${data.fullName}</td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8;font-size:13px;">Email</td></tr>
                <tr><td style="padding:0 0 8px;"><a href="mailto:${data.email}" style="color:#06b6d4;font-size:16px;">${data.email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8;font-size:13px;">Phone</td></tr>
                <tr><td style="padding:0 0 8px;"><a href="tel:${data.phone}" style="color:#06b6d4;font-size:16px;">${formatPhone(data.phone)}</a></td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8;font-size:13px;">Location</td></tr>
                <tr><td style="padding:0 0 8px;color:#fff;font-size:16px;">${data.state}, ${data.zipCode}</td></tr>
              </table>
              <h2 style="margin:25px 0 15px;color:#06b6d4;font-size:16px;">Bill Details</h2>
              <table width="100%" style="background-color:#334155;border-radius:12px;padding:20px;">
                <tr><td style="padding:8px 0;color:#94a3b8;font-size:13px;">Category</td></tr>
                <tr><td style="padding:0 0 8px;color:#fff;font-size:16px;font-weight:600;">${data.billCategory}</td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8;font-size:13px;">Provider</td></tr>
                <tr><td style="padding:0 0 8px;color:#fff;font-size:16px;">${data.provider}</td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8;font-size:13px;">Monthly Amount</td></tr>
                <tr><td style="padding:0 0 8px;color:#10b981;font-size:24px;font-weight:bold;">$${data.monthlyAmount}/mo</td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8;font-size:13px;">Bill Uploaded</td></tr>
                <tr><td style="color:${data.hasFile ? '#10b981' : '#f59e0b'};font-size:16px;">${data.hasFile ? 'Yes' : 'No'}</td></tr>
              </table>
              <table width="100%" style="margin-top:25px;background:linear-gradient(135deg,rgba(16,185,129,0.2),rgba(6,182,212,0.2));border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:20px;text-align:center;">
                <tr><td style="color:#94a3b8;font-size:13px;">Potential Monthly Savings (20% estimate)</td></tr>
                <tr><td style="color:#10b981;font-size:28px;font-weight:bold;">$${Math.round(parseFloat(data.monthlyAmount) * 0.2)}/mo</td></tr>
              </table>
              <p style="margin:20px 0 0;color:#64748b;font-size:12px;text-align:center;">Submitted: ${data.submittedAt}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
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
    const website = formData.get('website') as string
    const bill = formData.get('bill') as File | null
    
    if (website && website.length > 0) {
      return NextResponse.json({ success: true, message: "We'll review your request within 24 hours.", referenceId: generateReferenceId() })
    }
    
    const errors: Record<string, string> = {}
    if (!fullName || fullName.trim().length < 2) errors.fullName = 'Please enter your full name'
    if (!isValidEmail(email)) errors.email = 'Please enter a valid email'
    if (!isValidPhone(phone)) errors.phone = 'Please enter a valid phone number'
    if (!state) errors.state = 'Please select your state'
    if (!isValidZip(zipCode)) errors.zipCode = 'Please enter a valid ZIP code'
    if (!billCategory) errors.billCategory = 'Please select a bill category'
    if (!provider || provider.trim().length < 1) errors.provider = 'Please enter your provider'
    const amount = parseFloat(monthlyAmount)
    if (isNaN(amount) || amount < 20 || amount > 5000) errors.monthlyAmount = 'Enter amount between $20-$5000'
    if (!consent) errors.consent = 'Please agree to the terms'
    if (!signature || signature.toLowerCase().trim() !== fullName.toLowerCase().trim()) errors.signature = 'Signature must match your name'
    
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, error: 'Validation failed', errors }, { status: 400 })
    }
    
    const referenceId = generateReferenceId()
    const submittedAt = new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })
    
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
      submittedAt,
    }
    
    try {
      await resend.emails.send({
        from: 'Wefixbill <notifications@wefixbill.com>',
        to: [NOTIFICATION_EMAIL],
        replyTo: email,
        subject: `New Lead: ${fullName} - ${billCategory} ($${monthlyAmount}/mo)`,
        html: createEmailHTML(emailData),
      })
    } catch (emailErr) {
      console.error('Email error:', emailErr)
    }
    
    return NextResponse.json({ success: true, message: "We'll review your request within 24 hours.", referenceId })
    
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
