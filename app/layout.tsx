import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Wefixbill | Expert Bill Negotiation Services',
    template: '%s | Wefixbill',
  },
  description: 'Stop overpaying for your bills. Our expert negotiators reduce your internet, cable, wireless, and utility bills. Pay only when we save you money.',
  keywords: ['bill negotiation', 'save money', 'lower bills', 'bill reduction', 'internet bills', 'cable bills', 'utility savings'],
  authors: [{ name: 'Wefixbill' }],
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
      <body className="font-sans overflow-x-hidden bg-white text-slate-900 antialiased">
        <div 
          className="fixed inset-0 pointer-events-none z-0" 
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-indigo-500/10 via-transparent to-transparent opacity-60" />
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] animate-blob" />
          <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '-5s' }} />
          <div className="absolute bottom-[10%] left-[30%] w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[140px] animate-blob" style={{ animationDelay: '-10s' }} />
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
