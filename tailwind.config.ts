import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Stripe Brand Colors
        stripe: {
          purple: '#635bff',
          'purple-light': '#7c8bff',
          'purple-dark': '#5048e5',
          navy: '#0a2540',
          cyan: '#00d4ff',
          green: '#00d4aa',
          pink: '#ff61ab',
          orange: '#ff9f43',
        },
        // Backgrounds
        surface: {
          primary: '#ffffff',
          secondary: '#f6f9fc',
          tertiary: '#f0f3f9',
        },
        // Text
        content: {
          primary: '#30313d',
          secondary: '#697386',
          muted: '#adbdcc',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      fontSize: {
        'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-3': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-1': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'heading-2': ['1.5rem', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body': ['1rem', { lineHeight: '1.6' }],
      },
      boxShadow: {
        'stripe-sm': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'stripe': '0 2px 4px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.02), 0 8px 16px rgba(0,0,0,0.02)',
        'stripe-md': '0 4px 8px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.04)',
        'stripe-lg': '0 8px 16px rgba(0,0,0,0.06), 0 16px 32px rgba(0,0,0,0.06), 0 32px 64px rgba(0,0,0,0.06)',
        'stripe-glow': '0 4px 14px rgba(99, 91, 255, 0.35)',
        'stripe-glow-lg': '0 8px 20px rgba(99, 91, 255, 0.4)',
      },
      transitionTimingFunction: {
        'stripe': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'stripe-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'float': 'subtleFloat 6s ease-in-out infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'aurora': 'auroraGlow 15s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        auroraGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'translate(0, 0) scale(1)' },
          '33%': { opacity: '0.7', transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { opacity: '0.6', transform: 'translate(-20px, 10px) scale(0.98)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-stripe': 'linear-gradient(135deg, #635bff 0%, #00d4ff 100%)',
        'gradient-purple': 'linear-gradient(180deg, #7c8bff 0%, #635bff 100%)',
        'gradient-hero': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 91, 255, 0.15), transparent)',
      },
    },
  },
  plugins: [],
}

export default config
