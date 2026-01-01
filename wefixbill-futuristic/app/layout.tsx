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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
}

// Script to prevent FOUC (Flash of Unstyled Content) for theme
const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('wefixbill-theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans overflow-x-hidden bg-white dark:bg-midnight-950 text-slate-900 dark:text-frost-100 antialiased transition-colors duration-300">
        {/* Grid pattern background */}
        <div className="fixed inset-0 grid-pattern pointer-events-none z-0 opacity-30 dark:opacity-100" aria-hidden="true" />
        
        {/* Aurora glow effects - visible in both themes but more prominent in dark */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-400/5 dark:bg-neon-cyan/10 rounded-full blur-[150px] animate-aurora" />
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-purple-400/5 dark:bg-neon-purple/10 rounded-full blur-[150px] animate-aurora" style={{ animationDelay: '-4s' }} />
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
