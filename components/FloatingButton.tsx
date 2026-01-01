'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FloatingButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'neon' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export default function FloatingButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  icon,
  iconPosition = 'left',
  className,
  onClick,
  type = 'button',
}: FloatingButtonProps) {
  const prefersReducedMotion = useReducedMotion()

  const baseClasses = cn(
    'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    fullWidth && 'w-full'
  )

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
  }

  const variantClasses = {
    primary: cn(
      'bg-gradient-to-r from-sky-500 to-blue-600 text-white',
      'hover:from-sky-400 hover:to-blue-500',
      'focus:ring-sky-500/50',
      'shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30',
      'dark:from-neon-cyan dark:to-neon-blue dark:shadow-neon-cyan/25'
    ),
    secondary: cn(
      'bg-white text-gray-900 border-2 border-gray-200',
      'hover:bg-gray-50 hover:border-gray-300',
      'focus:ring-gray-500/50',
      'shadow-md hover:shadow-lg',
      'dark:bg-midnight-800 dark:text-white dark:border-white/20 dark:hover:bg-midnight-700'
    ),
    neon: cn(
      'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white',
      'hover:from-cyan-300 hover:via-blue-400 hover:to-purple-400',
      'focus:ring-purple-500/50',
      'shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40',
      'border border-white/20'
    ),
    ghost: cn(
      'bg-transparent text-gray-700 hover:bg-gray-100',
      'dark:text-frost-300 dark:hover:bg-white/5',
      'focus:ring-gray-500/30'
    ),
  }

  const floatAnimation = prefersReducedMotion
    ? {}
    : {
        y: [0, -3, 0],
        rotate: [0, 0.3, -0.3, 0],
        transition: {
          y: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        },
      }

  const hoverAnimation = prefersReducedMotion
    ? { scale: 1.02 }
    : {
        scale: 1.03,
        y: -2,
        transition: { duration: 0.2 },
      }

  const tapAnimation = { scale: 0.97 }

  return (
    <motion.button
      type={type}
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      disabled={disabled || loading}
      onClick={onClick}
      animate={!disabled && !loading ? floatAnimation : {}}
      whileHover={!disabled && !loading ? hoverAnimation : {}}
      whileTap={!disabled && !loading ? tapAnimation : {}}
    >
      <motion.div
        className={cn(
          'absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity -z-10',
          variant === 'primary' && 'bg-sky-400 dark:bg-neon-cyan',
          variant === 'neon' && 'bg-purple-400',
          variant === 'secondary' && 'bg-gray-300 dark:bg-white/20'
        )}
        whileHover={{ opacity: 0.4 }}
      />

      {loading ? (
        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </motion.button>
  )
}
