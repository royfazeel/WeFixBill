import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Wefixbill | Expert Bill Negotiation Services',
    template: '%s | Wefixbill',
  },
  description: 'Stop overpaying for your bills. Our expert negotiators reduce your internet, cable, wireless, and utility bills. Pay only when we save you money.',
  keywords: ['bill negotiation', 'save money', 'lower bills', 'bill reduction', 'internet bills', 'cable bills', 'utility savings'],
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: '32x32' },
      { url: '/icon-v2.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon-v2.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Wefixbill | Expert Bill Negotiation Services',
    description: 'Stop overpaying for your bills. Our expert negotiators save you money.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Wefixbill',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030712',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans bg-midnight-950 text-white antialiased overflow-x-hidden">
        {/* Aurora background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 bg-grid-pattern bg-grid opacity-30"
            style={{ backgroundSize: '50px 50px' }}
          />
          
          {/* Aurora glow - top */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[120px] animate-aurora" />
          <div className="absolute -top-20 right-1/4 w-80 h-80 bg-neon-purple/20 rounded-full blur-[100px] animate-aurora" style={{ animationDelay: '5s' }} />
          
          {/* Aurora glow - bottom */}
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-neon-pink/15 rounded-full blur-[120px] animate-aurora" style={{ animationDelay: '10s' }} />
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-neon-purple/15 rounded-full blur-[100px] animate-aurora" style={{ animationDelay: '7s' }} />
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
