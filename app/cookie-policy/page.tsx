import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy',
}

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Cookie Policy</h1>
            <p className="text-frost-400 mb-8">Last updated: January 2025</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies</h2>
                <p className="text-frost-300 leading-relaxed">
                  Cookies are small text files stored on your device when you visit our website. They help us 
                  provide a better experience by remembering your preferences and understanding how you use 
                  our site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Essential Cookies</h3>
                    <p className="text-frost-300">Required for the website to function properly. Cannot be disabled.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Analytics Cookies</h3>
                    <p className="text-frost-300">Help us understand how visitors interact with our website.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Preference Cookies</h3>
                    <p className="text-frost-300">Remember your settings and preferences (like dark mode).</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Managing Cookies</h2>
                <p className="text-frost-300 leading-relaxed">
                  You can control cookies through your browser settings. Note that disabling certain cookies 
                  may affect the functionality of our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                <p className="text-frost-300 leading-relaxed">
                  For questions about our cookie policy, contact us at{' '}
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
