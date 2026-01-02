import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { formatCurrency } from '@/lib/utils'
import { PRICING_CONFIG } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Refund Policy',
}

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Refund Policy</h1>
            <p className="text-frost-400 mb-8">Last updated: January 2025</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Success Fee Model</h2>
                <p className="text-frost-300 leading-relaxed">
                  With our Success Fee model, you only pay if we successfully negotiate savings on your bills. 
                  If we cannot achieve any savings, you owe nothing - there is no fee to refund because no 
                  payment was collected.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Lifetime Plan - Savings Promise</h2>
                <div className="text-frost-300 leading-relaxed space-y-4">
                  <p>
                    Our Lifetime Plan includes a Savings Promise: if we don't save you at least{' '}
                    <span className="text-neon-cyan font-semibold">
                      {formatCurrency(PRICING_CONFIG.lifetimePlan.savingsPromiseThreshold)}
                    </span>{' '}
                    per year across your bills, you may be eligible for a refund.
                  </p>
                  <div className="bg-neon-green/5 border border-neon-green/20 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-3">Refund Eligibility</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>You must have submitted at least 3 bills for negotiation</li>
                      <li>You must have provided accurate account information</li>
                      <li>We must have had adequate time to negotiate (at least 60 days from submission)</li>
                      <li>Refund requests must be submitted within 90 days of your purchase</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">How to Request a Refund</h2>
                <p className="text-frost-300 leading-relaxed mb-4">
                  To request a refund under our Savings Promise:
                </p>
                <ol className="list-decimal list-inside text-frost-300 space-y-2 ml-4">
                  <li>Email us at refunds@wefixbill.com with your account details</li>
                  <li>Include documentation of the bills we negotiated</li>
                  <li>Provide a summary of the savings (or lack thereof) you've seen</li>
                  <li>We will review your request within 5 business days</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Non-Refundable Situations</h2>
                <p className="text-frost-300 leading-relaxed mb-4">
                  Refunds are not available in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-frost-300 space-y-2 ml-4">
                  <li>You did not provide accurate account information</li>
                  <li>You cancelled services before we could negotiate</li>
                  <li>Provider changes were declined by you after we negotiated them</li>
                  <li>Request made more than 90 days after purchase</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                <p className="text-frost-300 leading-relaxed">
                  For questions about refunds, contact us at{' '}
                  <a href="mailto:refunds@wefixbill.com" className="text-neon-cyan hover:underline">
                    refunds@wefixbill.com
                  </a>.
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <Link href="/" className="text-neon-cyan hover:underline">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
