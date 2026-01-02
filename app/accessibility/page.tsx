import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Accessibility',
}

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">Accessibility Statement</h1>
            <p className="text-frost-400 mb-8">Last updated: January 2025</p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Our Commitment</h2>
                <p className="text-frost-300 leading-relaxed">
                  Wefixbill is committed to ensuring digital accessibility for people with disabilities. 
                  We continually improve the user experience for everyone and apply relevant accessibility 
                  standards.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Accessibility Features</h2>
                <p className="text-frost-300 leading-relaxed mb-4">Our website includes the following accessibility features:</p>
                <ul className="list-disc list-inside text-frost-300 space-y-2 ml-4">
                  <li>Keyboard navigation support throughout the site</li>
                  <li>Screen reader compatibility</li>
                  <li>ARIA labels for interactive elements</li>
                  <li>Alt text for images</li>
                  <li>Sufficient color contrast ratios</li>
                  <li>Resizable text without loss of functionality</li>
                  <li>Reduced motion option for animations (respects system preferences)</li>
                  <li>Focus indicators for interactive elements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Conformance Standards</h2>
                <p className="text-frost-300 leading-relaxed">
                  We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. 
                  These guidelines explain how to make web content more accessible for people with 
                  disabilities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Browser Compatibility</h2>
                <p className="text-frost-300 leading-relaxed mb-4">Our website is designed to be compatible with:</p>
                <ul className="list-disc list-inside text-frost-300 space-y-2 ml-4">
                  <li>Current versions of Chrome, Firefox, Safari, and Edge</li>
                  <li>Screen readers including NVDA, JAWS, and VoiceOver</li>
                  <li>Browser zoom functionality up to 200%</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Known Limitations</h2>
                <p className="text-frost-300 leading-relaxed">
                  We are continually working to improve accessibility. Some older content or third-party 
                  components may not fully meet accessibility standards. We are actively working to 
                  address these limitations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Alternative Access</h2>
                <p className="text-frost-300 leading-relaxed">
                  If you have difficulty accessing any part of our website, please contact us. We're 
                  happy to provide information in alternative formats or assist you directly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Feedback</h2>
                <p className="text-frost-300 leading-relaxed">
                  We welcome your feedback on the accessibility of our website. Please let us know if 
                  you encounter accessibility barriers:
                </p>
                <div className="mt-4 glass-panel p-6">
                  <p className="text-frost-300">
                    <strong className="text-white">Email:</strong>{' '}
                    <a href="mailto:accessibility@wefixbill.com" className="text-neon-cyan hover:underline">
                      accessibility@wefixbill.com
                    </a>
                  </p>
                  <p className="text-frost-300 mt-2">
                    <strong className="text-white">Phone:</strong> 1-800-FIXBILL
                  </p>
                </div>
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
