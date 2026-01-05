'use client'

import { forwardRef, ReactNode } from 'react'
import { motion, useReducedMotion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface FloatingButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  href?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'text-white font-bold tracking-wide',
    'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500',
    'shadow-[0_10px_40px_-10px_rgba(99,91,255,0.5)]',
    'hover:shadow-[0_20px_50px_-10px_rgba(99,91,255,0.6)]',
    'active:shadow-[0_5px_20px_-5px_rgba(99,91,255,0.5)]',
    'border-0'
  ),
  secondary: cn(
    'text-slate-700 font-semibold',
    'bg-white border border-slate-200',
    'shadow-[0_2px_8px_rgba(0,0,0,0.08)]',
    'hover:bg-slate-50 hover:border-slate-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]',
  ),
  outline: cn(
    'text-indigo-600 font-semibold',
    'bg-transparent border-2 border-indigo-500/30',
    'hover:bg-indigo-500/5 hover:border-indigo-500',
  ),
  ghost: cn(
    'text-slate-600 font-medium',
    'bg-transparent',
    'hover:bg-slate-100 hover:text-slate-900'
  ),
  dark: cn(
    'text-white font-semibold',
    'bg-slate-900 border border-slate-700',
    'shadow-lg',
    'hover:bg-slate-800 hover:border-slate-600',
  ),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-6 py-3 text-sm gap-1.5 rounded-full',
  md: 'px-8 py-4 text-base gap-2 rounded-full',
  lg: 'px-10 py-5 text-lg gap-2.5 rounded-full',
  xl: 'px-12 py-6 text-xl gap-3 rounded-full',
}

const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      className,
      onClick,
      type = 'button',
      href,
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()

    const baseStyles = cn(
      'relative inline-flex items-center justify-center overflow-hidden',
      'transition-all duration-300 ease-out',
      'focus:outline-none focus:ring-4 focus:ring-indigo-500/30',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      fullWidth && 'w-full'
    )

    const hoverAnimation = prefersReducedMotion
      ? { scale: 1.02 }
      : {
          scale: 1.05,
          y: -4,
          transition: { duration: 0.25, ease: [0.19, 1, 0.22, 1] },
        }

    const tapAnimation = { scale: 0.97, y: 0 }

    const content = (
      <>
        {/* Animated glow for primary */}
        {variant === 'primary' && !disabled && !loading && (
          <>
            {/* Pulsing glow behind button */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 blur-2xl opacity-50"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
            />
            
            {/* Shimmer sweep */}
            <motion.div 
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 3,
                ease: 'easeInOut' 
              }}
            />
          </>
        )}

        {loading ? (
          <div className="flex items-center justify-center relative z-10">
            <motion.svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </motion.svg>
          </div>
