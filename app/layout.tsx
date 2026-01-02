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
  themeColor: '#ffffff',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans bg-white text-slate-900 antialiased overflow-x-hidden">
        {/* Main content */}
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  )
}
