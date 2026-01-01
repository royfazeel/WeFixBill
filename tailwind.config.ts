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
        // Midnight base
        midnight: {
          950: '#030712',
          900: '#0a0f1e',
          800: '#0f172a',
          700: '#1a2744',
          600: '#253552',
        },
        // Neon accents
        neon: {
          cyan: '#00f5ff',
          blue: '#00a8ff',
          purple: '#a855f7',
          pink: '#ec4899',
          green: '#00ff88',
        },
        // Frost/Ice
        frost: {
          50: '#f8fafc',
          100: '#e2e8f0',
          200: '#c8d5e3',
          300: '#94a3b8',
          400: '#64748b',
        },
        // Aurora gradients
        aurora: {
          start: '#00f5ff',
          mid: '#a855f7',
          end: '#ec4899',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'midnight-gradient': 'linear-gradient(135deg, #030712 0%, #0a0f1e 50%, #0f172a 100%)',
        'aurora-gradient': 'linear-gradient(135deg, rgba(0,245,255,0.1) 0%, rgba(168,85,247,0.1) 50%, rgba(236,72,153,0.1) 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'neon-glow': 'radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 70%)',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0,245,255,0.5), 0 0 40px rgba(0,245,255,0.3), 0 0 60px rgba(0,245,255,0.1)',
        'neon-purple': '0 0 20px rgba(168,85,247,0.5), 0 0 40px rgba(168,85,247,0.3)',
        'neon-pink': '0 0 20px rgba(236,72,153,0.5), 0 0 40px rgba(236,72,153,0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-hover': '0 12px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
        'hud': '0 0 0 1px rgba(0,245,255,0.2), 0 4px 20px rgba(0,0,0,0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'aurora': 'aurora 8s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'border-flow': 'borderFlow 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0,245,255,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0,245,255,0.6)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        aurora: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
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
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
