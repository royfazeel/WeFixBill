'use client'

import { forwardRef, ReactNode } from 'react'
import { motion, useReducedMotion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
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
    'text-white font-bold',
    'bg-gradient-to-r from-cyan-500 to-blue-600',
    'shadow-lg shadow-cyan-500/30',
    'hover:shadow-xl hover:shadow-cyan-500/40',
    'active:shadow-md'
  ),
  secondary: cn(
    'text-white font-semibold',
    'bg-slate-800 border border-slate-600',
    'hover:bg-slate-700 hover:border-cyan-500/50',
    'shadow-lg shadow-slate-900/50'
  ),
  outline: cn(
    'text-cyan-400 font-semibold',
    'bg-transparent border-2 border-cyan-500/50',
    'hover:bg-cyan-500/10 hover:border-cyan-400',
    'shadow-none hover:shadow-lg hover:shadow-cyan-500/20'
  ),
  ghost: cn(
    'text-slate-300 font-medium',
    'bg-transparent',
    'hover:bg-white/5 hover:text-white'
  ),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5 rounded-lg',
  md: 'px-6 py-3 text-base gap-2 rounded-xl',
  lg: 'px-8 py-4 text-lg gap-2.5 rounded-xl',
  xl: 'px-10 py-5 text-xl gap-3 rounded-2xl',
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
      'transition-all duration-300 ease-out',
      'focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      fullWidth && 'w-full'
    )

    // Animation variants
    const floatAnimation = prefersReducedMotion
      ? {}
      : {
          y: [0, -3, 0],
          transition: {
            y: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        }

    const hoverAnimation = prefersReducedMotion
      ? { scale: 1.02 }
      : {
          scale: 1.03,
          y: -3,
          transition: { duration: 0.2, ease: 'easeOut' },
        }

    const tapAnimation = { scale: 0.97, y: 0 }

    const glowVariants = {
      initial: { opacity: 0 },
      hover: { 
        opacity: 0.4,
        transition: { duration: 0.3 }
      }
    }

    const content = (
      <>
        {/* Glow effect layer */}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-inherit -z-10 blur-xl',
            variant === 'primary' && 'bg-cyan-500',
            variant === 'secondary' && 'bg-slate-500',
            variant === 'outline' && 'bg-cyan-500',
            'opacity-0'
          )}
          variants={glowVariants}
          initial="initial"
          whileHover="hover"
        />

        {/* Shimmer effect */}
        {variant === 'primary' && !disabled && (
          <div className="absolute inset-0 overflow-hidden rounded-inherit">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        )}

        {/* Content - Properly centered with flex */}
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
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
            </svg>
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
      animate: !disabled && !loading ? floatAnimation : {},
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
