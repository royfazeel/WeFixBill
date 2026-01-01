'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved theme or use light as default
    const savedTheme = localStorage.getItem('wefixbill-theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('wefixbill-theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button 
        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10" 
        aria-label="Toggle theme" 
      />
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center transition-colors hover:bg-slate-200 dark:hover:bg-white/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun icon (shown in light mode) */}
      <motion.svg
        className="absolute w-5 h-5 text-amber-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          opacity: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : 90,
        }}
        transition={{ duration: 0.2 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </motion.svg>

      {/* Moon icon (shown in dark mode) */}
      <motion.svg
        className="absolute w-5 h-5 text-sky-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : -90,
        }}
        transition={{ duration: 0.2 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </motion.svg>
    </motion.button>
  )
}
