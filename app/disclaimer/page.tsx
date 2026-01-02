import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Disclaimer',
}

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Disclaimer</h1>
            <p className="text-frost-400 mb-8">Last updated: January 2025</p>

            <div className="space-y-8">
              <section className="glass-panel p-6 border-l-4 border-neon-cyan">
                <h2 className="text-xl font-semibold text-white mb-3">No Affiliation with Providers</h2>
                <p className="text-frost-300 leading-relaxed">
                  Wefixbill is not affiliated with, endorsed by, or sponsored by any service providers 
                  including but not limited to internet, cable, wireless, utility, or insurance companies. 
                  All trademarks and brand names are the property of their respective owners.
                </p>
              </section>

              <section className="glass-panel p-6 border-l-4 border-neon-purple">
                <h2 className="text-xl font-semibold text-white mb-3">Savings Not Guaranteed</h2>
                <p className="text-frost-300 leading-relaxed">
                  Results vary based on provider, location, account history, current promotions, and other 
                  factors. Past results do not guarantee future outcomes. The savings examples and 
                  testimonials on our website represent individual experiences and are not typical results.
                </p>
              </section>

              <section className="glass-panel p-6 border-l-4 border-neon-pink">
                <h2 className="text-xl font-semibold text-white mb-3">Fee Disclosure</h2>
                <p className="text-frost-300 leading-relaxed">
                  Our fees are clearly disclosed before any work begins. For Success Fee plans, you pay a 
                  percentage of your verified savings. For our Lifetime Plan, you pay a one-time fee. 
                  All fees are explained during the intake process and require your approval.
                </p>
              </section>

              <section className="glass-panel p-6 border-l-4 border-neon-green">
                <h2 className="text-xl font-semibold text-white mb-3">Account Authority</h2>
                <p className="text-frost-300 leading-relaxed">
                  By using our services, you represent and warrant that you have the legal authority to 
                  authorize changes to the accounts you submit. You must be the account holder or have 
                  explicit permission from the account holder to use our services.
                </p>
              </section>

              <section className="glass-panel p-6 border-l-4 border-yellow-500">
                <h2 className="text-xl font-semibold text-white mb-3">Consent Requirement</h2>
                <p className="text-frost-300 leading-relaxed">
                  We require your signed Letter of Authorization before contacting any service provider on 
                  your behalf. This authorization is legally binding and allows us to negotiate as your 
                  authorized representative. You can revoke this authorization at any time in writing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Additional Disclaimers</h2>
                <ul className="list-disc list-inside text-frost-300 space-y-3 ml-4">
                  <li>We are not responsible for changes made by providers after our negotiation</li>
                  <li>Service availability and pricing may change at any time at the provider's discretion</li>
                  <li>We do not provide legal, financial, or tax advice</li>
                  <li>Our website content is for informational purposes only</li>
                  <li>We make no warranties about the accuracy of information provided by service providers</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Questions?</h2>
                <p className="text-frost-300 leading-relaxed">
                  If you have questions about this disclaimer, contact us at{' '}
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
