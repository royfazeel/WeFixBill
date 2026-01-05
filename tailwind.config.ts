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
        stripe: {
          purple: '#635BFF',
          'purple-dark': '#4F46E5',
          blue: '#00A3FF',
          cyan: '#00D1FF',
          pink: '#FF579A',
          green: '#00D177',
          orange: '#FF8A4C',
        },
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'stripe-gradient': 'linear-gradient(135deg, #635BFF 0%, #00A3FF 100%)',
        'aurora-gradient': 'linear-gradient(135deg, #635BFF 0%, #00D1FF 50%, #FF579A 100%)',
      },
      boxShadow: {
        'stripe-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'stripe-md': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
        'stripe-lg': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
        'stripe-xl': '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)',
        'stripe-2xl': '0 25px 50px -12px rgb(0 0 0 / 0.15)',
        'glow-purple': '0 0 40px rgba(99, 91, 255, 0.25), 0 0 80px rgba(99, 91, 255, 0.1)',
        'button-primary': '0 4px 14px rgba(99, 91, 255, 0.4)',
        'button-primary-hover': '0 8px 25px rgba(99, 91, 255, 0.5), 0 0 40px rgba(99, 91, 255, 0.2)',
        'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 0 40px rgba(99, 91, 255, 0.08)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-subtle': 'floatSubtle 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'blob': 'blob 10s ease-in-out infinite',
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
        glowPulse: {
          '0%, 100%': { boxShadow: '0 4px 14px rgba(99, 91, 255, 0.4)' },
          '50%': { boxShadow: '0 4px 25px rgba(99, 91, 255, 0.6), 0 0 40px rgba(99, 91, 255, 0.2)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, -30px) scale(1.1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '75%': { transform: 'translate(30px, 10px) scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
