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
    'text-white font-semibold',
    'bg-gradient-to-r from-stripe-purple to-indigo-600',
    'shadow-button-primary',
    'hover:shadow-button-primary-hover',
    'active:shadow-stripe-md'
  ),
  secondary: cn(
    'text-slate-700 font-semibold',
    'bg-white border border-slate-200',
    'shadow-stripe-sm',
    'hover:bg-slate-50 hover:border-slate-300 hover:shadow-stripe-md',
  ),
  outline: cn(
    'text-stripe-purple font-semibold',
    'bg-transparent border-2 border-stripe-purple/30',
    'hover:bg-stripe-purple/5 hover:border-stripe-purple',
  ),
  ghost: cn(
    'text-slate-600 font-medium',
    'bg-transparent',
    'hover:bg-slate-100 hover:text-slate-900'
  ),
  dark: cn(
    'text-white font-semibold',
    'bg-slate-900 border border-slate-700',
    'shadow-stripe-lg',
    'hover:bg-slate-800 hover:border-slate-600',
  ),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5 rounded-full',
  md: 'px-6 py-3 text-base gap-2 rounded-full',
  lg: 'px-8 py-4 text-lg gap-2.5 rounded-full',
  xl: 'px-10 py-5 text-xl gap-3 rounded-full',
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
      'relative inline-flex items-center justify-center',
      'transition-all duration-300 ease-out-expo',
      'focus:outline-none focus:ring-4 focus:ring-stripe-purple/20',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      fullWidth && 'w-full'
    )

    // Floating animation (idle state) - only on desktop
    const floatAnimation = prefersReducedMotion
      ? {}
      : {
          y: [0, -4, 0],
          transition: {
            y: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        }

    // Hover animation
    const hoverAnimation = prefersReducedMotion
      ? { scale: 1.02 }
      : {
          scale: 1.03,
          y: -4,
          transition: { duration: 0.25, ease: [0.19, 1, 0.22, 1] },
        }

    // Press animation
    const tapAnimation = { scale: 0.97, y: 0 }

    // Glow effect variants
    const glowVariants = {
      initial: { opacity: 0 },
      hover: { 
        opacity: 0.6,
        transition: { duration: 0.3 }
      }
    }

    const content = (
      <>
        {/* Glow effect layer */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 rounded-full -z-10 blur-xl bg-stripe-purple opacity-0"
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
          />
        )}

        {/* Shimmer effect for primary buttons */}
        {variant === 'primary' && !disabled && !loading && (
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <motion.div 
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                repeatDelay: 3,
                ease: 'easeInOut' 
              }}
            />
          </div>
        )}

        {/* Content wrapper */}
        {loading ? (
          <div className="flex items-center justify-center">
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
        ) : (
          <span className="relative z-10 inline-flex items-center justify-center whitespace-nowrap">
            {icon && iconPosition === 'left' && (
              <span className="flex-shrink-0 flex items-center mr-2">{icon}</span>
            )}
            <span className="flex items-center">{children}</span>
            {icon && iconPosition === 'right' && (
              <span className="flex-shrink-0 flex items-center ml-2">{icon}</span>
            )}
          </span>
        )}
      </>
    )

    const motionProps: HTMLMotionProps<'button'> = {
      className: cn(baseStyles, variantStyles[variant], sizeStyles[size], className),
      disabled: disabled || loading,
      onClick,
      type,
      // Only apply float animation on non-touch devices
      animate: !disabled && !loading && typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches 
        ? floatAnimation 
        : {},
      whileHover: !disabled && !loading ? hoverAnimation : {},
      whileTap: !disabled && !loading ? tapAnimation : {},
    }

    if (href && !disabled) {
      return (
        <motion.a
          href={href}
          {...(motionProps as any)}
          ref={ref as any}
        >
          {content}
        </motion.a>
      )
    }

    return (
      <motion.button ref={ref} {...motionProps}>
        {content}
      </motion.button>
    )
  }
)

FloatingButton.displayName = 'FloatingButton'

export default FloatingButton
