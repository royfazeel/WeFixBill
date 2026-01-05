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
        // Stripe-inspired palette
        stripe: {
          purple: '#635BFF',
          'purple-dark': '#4F46E5',
          blue: '#00A3FF',
          cyan: '#00D1FF',
          pink: '#FF579A',
          green: '#00D177',
          orange: '#FF8A4C',
        },
        // Extended grays for fintech feel
        surface: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'monospace'],
      },
      fontSize: {
        // Stripe-like type scale
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-xl': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'stripe-gradient': 'linear-gradient(135deg, #635BFF 0%, #00A3FF 100%)',
        'aurora-gradient': 'linear-gradient(135deg, #635BFF 0%, #00D1FF 50%, #FF579A 100%)',
        'mesh-gradient': `
          radial-gradient(at 40% 20%, rgba(99, 91, 255, 0.15) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(0, 209, 255, 0.12) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(255, 87, 154, 0.1) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(0, 163, 255, 0.1) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(99, 91, 255, 0.1) 0px, transparent 50%)
        `,
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 91, 255, 0.15), transparent)',
      },
      boxShadow: {
        'stripe-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'stripe-md': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
        'stripe-lg': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
        'stripe-xl': '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)',
        'stripe-2xl': '0 25px 50px -12px rgb(0 0 0 / 0.15)',
        'glow-purple': '0 0 40px rgba(99, 91, 255, 0.25), 0 0 80px rgba(99, 91, 255, 0.1)',
        'glow-purple-strong': '0 0 60px rgba(99, 91, 255, 0.35), 0 0 100px rgba(0, 209, 255, 0.15)',
        'glow-cyan': '0 0 40px rgba(0, 209, 255, 0.25), 0 0 80px rgba(0, 209, 255, 0.1)',
        'button-primary': '0 4px 14px rgba(99, 91, 255, 0.4)',
        'button-primary-hover': '0 8px 25px rgba(99, 91, 255, 0.5), 0 0 40px rgba(99, 91, 255, 0.2)',
        'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 0 40px rgba(99, 91, 255, 0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-subtle': 'floatSubtle 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'blob': 'blob 10s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 4px 14px rgba(99, 91, 255, 0.4)' },
          '50%': { boxShadow: '0 4px 25px rgba(99, 91, 255, 0.6), 0 0 40px rgba(99, 91, 255, 0.2)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
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
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, -30px) scale(1.1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '75%': { transform: 'translate(30px, 10px) scale(1.05)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [],
}

export default config
