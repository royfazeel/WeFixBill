'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Results', href: '/results' },
    { label: 'Careers', href: '/careers' },
  ],
  services: [
    { label: 'Bill Negotiation', href: '/services' },
    { label: 'Bill Monitoring', href: '/services#monitoring' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQ', href: '/faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Help Center', href: '/faq' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-midnight-950 border-t border-white/5">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      
      <div className="relative section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan to-neon-blue rounded-xl" />
                <div className="absolute inset-0 bg-midnight-950 rounded-xl flex items-center justify-center border border-neon-cyan/30 m-0.5">
                  <span className="text-neon-cyan font-bold text-lg">W</span>
                </div>
              </div>
              <span className="font-bold text-lg text-white">
                wefix<span className="text-neon-cyan">bill</span>
              </span>
            </Link>
            <p className="text-frost-400 text-sm mb-4 max-w-xs">
              Expert bill negotiation services. We lower your bills so you can keep more of your money.
            </p>
            <p className="text-frost-500 text-xs">
              © {new Date().getFullYear()} Wefixbill. All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-frost-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-frost-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-frost-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-frost-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-frost-500 text-xs mb-2">Email</p>
              <a href="mailto:support@wefixbill.com" className="text-neon-cyan text-sm hover:underline">
                support@wefixbill.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-frost-500 text-xs text-center max-w-3xl mx-auto">
            Savings not guaranteed. Results vary by provider, location, and account details. 
            We are not affiliated with any service providers. Fees are clearly disclosed before any work begins. 
            Past results do not guarantee future outcomes.
          </p>
        </div>
      </div>
    </footer>
  )
}
