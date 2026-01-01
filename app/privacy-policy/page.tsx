import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-frost-400 mb-8">Last updated: January 2025</p>

            <div className="prose prose-invert prose-frost max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                <p className="text-frost-300 leading-relaxed">
                  Wefixbill ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you use our 
                  bill negotiation services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                <p className="text-frost-300 leading-relaxed mb-4">We collect information that you provide directly to us:</p>
                <ul className="list-disc list-inside text-frost-300 space-y-2 ml-4">
                  <li>Contact information (name, email, phone number, address)</li>
                  <li>Account information for service providers (account numbers, not login credentials)</li>
                  <li>Bill statements and related documents</li>
                  <li>Payment information for our fees</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-frost-300 leading-relaxed mb-4">We use your information to:</p>
                <ul className="list-disc list-inside text-frost-300 space-y-2 ml-4">
                  <li>Negotiate with your service providers on your behalf</li>
                  <li>Process your transactions and send related information</li>
                  <li>Communicate with you about our services</li>
                  <li>Monitor your bills for savings opportunities (Lifetime Plan)</li>
                  <li>Improve our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Information Sharing</h2>
                <p className="text-frost-300 leading-relaxed">
                  We share your information with your service providers only as necessary to negotiate on your 
                  behalf. We do not sell your personal information to third parties. We may share information 
                  with service providers who assist us in operating our business.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
                <p className="text-frost-300 leading-relaxed">
                  We implement industry-standard security measures to protect your information. However, no 
                  method of transmission over the Internet is 100% secure. We use encryption for sensitive 
                  data and never store payment card details on our servers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
                <p className="text-frost-300 leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-frost-300 space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
                <p className="text-frost-300 leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:privacy@wefixbill.com" className="text-neon-cyan hover:underline">
                    privacy@wefixbill.com
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
