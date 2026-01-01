import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Wefixbill | Expert Bill Negotiation Services',
    template: '%s | Wefixbill',
  },
  description: 'Stop overpaying for your bills. Our expert negotiators reduce your internet, cable, wireless, and utility bills. Pay only when we save you money.',
  keywords: ['bill negotiation', 'save money', 'lower bills', 'bill reduction', 'internet bills', 'cable bills', 'utility savings', 'bill monitoring'],
  authors: [{ name: 'Wefixbill' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Wefixbill | Expert Bill Negotiation Services',
    description: 'Stop overpaying for your bills. Our expert negotiators reduce your internet, cable, wireless, and utility bills.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Wefixbill',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wefixbill | Expert Bill Negotiation Services',
    description: 'Stop overpaying for your bills. Our expert negotiators reduce your internet, cable, wireless, and utility bills.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030712',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans overflow-x-hidden">
        {/* Grid pattern background */}
        <div className="fixed inset-0 grid-pattern pointer-events-none z-0" aria-hidden="true" />
        
        {/* Aurora glow effects */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[150px] animate-aurora" />
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-neon-purple/10 rounded-full blur-[150px] animate-aurora" style={{ animationDelay: '-4s' }} />
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
