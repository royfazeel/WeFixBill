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
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
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
  maximumScale: 5,
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans overflow-x-hidden bg-slate-900 text-white antialiased">
        {/* Grid pattern background - global */}
        <div 
          className="fixed inset-0 grid-pattern pointer-events-none z-0 opacity-60" 
          aria-hidden="true" 
        />
        
        {/* Aurora glow effects - global */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-aurora" />
          <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[150px] animate-aurora" style={{ animationDelay: '-4s' }} />
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
