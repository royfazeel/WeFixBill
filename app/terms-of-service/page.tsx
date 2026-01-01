import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
}

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-frost-400 mb-8">Last updated: January 2025</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
                <p className="text-frost-300 leading-relaxed">
                  By using Wefixbill's services, you agree to these Terms of Service. If you do not agree to 
                  these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Services</h2>
                <p className="text-frost-300 leading-relaxed">
                  Wefixbill provides bill negotiation services. We contact your service providers to negotiate 
                  lower rates on your behalf. We also offer bill monitoring services under our Lifetime Plan.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Authorization</h2>
                <p className="text-frost-300 leading-relaxed">
                  By signing our Letter of Authorization, you grant us permission to contact your service 
                  providers and negotiate on your behalf. You represent that you have the authority to make 
                  changes to the accounts you submit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Fees and Payment</h2>
                <div className="text-frost-300 leading-relaxed space-y-4">
                  <p><strong className="text-white">Success Fee Model:</strong> You pay a percentage of your 
                  savings only if we successfully reduce your bill. The fee percentage and cap period are 
                  disclosed before you authorize us to proceed.</p>
                  <p><strong className="text-white">Lifetime Plan:</strong> A one-time fee for ongoing bill 
                  monitoring and negotiation services. Subject to our Savings Promise and refund policy.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. No Guarantee of Savings</h2>
                <p className="text-frost-300 leading-relaxed">
                  While we work diligently to reduce your bills, savings are not guaranteed. Results vary based 
                  on provider, location, account history, and other factors. Past results do not guarantee 
                  future outcomes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Approval of Changes</h2>
                <p className="text-frost-300 leading-relaxed">
                  We will present any proposed plan changes to you for approval before implementing them. You 
                  have the final say on any changes to your accounts.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
                <p className="text-frost-300 leading-relaxed">
                  Wefixbill is not liable for any indirect, incidental, or consequential damages arising from 
                  your use of our services. Our total liability is limited to the fees you have paid us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Dispute Resolution</h2>
                <p className="text-frost-300 leading-relaxed">
                  Any disputes arising from these terms shall be resolved through binding arbitration in 
                  accordance with applicable laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
                <p className="text-frost-300 leading-relaxed">
                  For questions about these Terms, contact us at{' '}
                  <a href="mailto:legal@wefixbill.com" className="text-neon-cyan hover:underline">
                    legal@wefixbill.com
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
