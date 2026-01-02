'use client'

import { forwardRef, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'neon' | 'neon-purple' | 'neon-pink' | 'glass' | 'ghost' | 'outline'
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
  floating?: boolean
  floatDelay?: number
  glowPulse?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  neon: cn(
    'text-midnight-950 font-semibold',
    'bg-gradient-to-r from-neon-cyan to-neon-cyan',
    'shadow-btn-glow',
    'hover:shadow-btn-glow-hover'
  ),
  'neon-purple': cn(
    'text-white font-semibold',
    'bg-gradient-to-r from-neon-purple to-neon-purple',
    'shadow-neon-purple',
    'hover:shadow-neon-purple-lg'
  ),
  'neon-pink': cn(
    'text-white font-semibold',
    'bg-gradient-to-r from-neon-pink to-neon-pink',
    'shadow-neon-pink',
    'hover:shadow-neon-pink-lg'
  ),
  glass: cn(
    'text-white font-semibold',
    'bg-frost-subtle backdrop-blur-md border border-frost-border',
    'hover:border-neon-cyan/30 hover:shadow-neon-cyan'
  ),
  ghost: cn(
    'text-frost-light font-medium',
    'bg-transparent',
    'hover:text-white hover:bg-frost-subtle'
  ),
  outline: cn(
    'text-neon-cyan font-semibold',
    'bg-transparent border-2 border-neon-cyan/30',
    'hover:border-neon-cyan hover:bg-neon-cyan/10 hover:shadow-neon-cyan'
  ),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5 rounded-lg',
  md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'px-6 py-3 text-base gap-2 rounded-xl',
  xl: 'px-8 py-4 text-lg gap-2.5 rounded-xl',
}

const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
  (
    {
      children,
      variant = 'neon',
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
      floating = false,
      floatDelay = 0,
      glowPulse = false,
    },
    ref
  ) => {
    const baseStyles = cn(
      'relative inline-flex items-center justify-center',
      'transition-all duration-300 ease-neon',
      'focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:ring-offset-2 focus:ring-offset-midnight-950',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      fullWidth && 'w-full'
    )

    const content = (
      <>
        {loading ? (
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
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
            <span>{children}</span>
            {icon && iconPosition === 'right' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
          </>
        )}
        
        {/* Shimmer effect overlay */}
        <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <span 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
            }}
          />
        </span>
      </>
    )

    // Floating animation variants
    const floatingAnimation = floating ? {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
        delay: floatDelay,
      }
    } : {}

    const hoverAnimation = !disabled && !loading ? {
      y: -3,
      scale: 1.02,
    } : {}

    const tapAnimation = !disabled && !loading ? {
      y: 0,
      scale: 0.98,
    } : {}

    const motionProps: HTMLMotionProps<'button'> = {
      className: cn(
        baseStyles, 
        variantStyles[variant], 
        sizeStyles[size], 
        glowPulse && 'animate-glow-pulse',
        'group',
        className
      ),
      disabled: disabled || loading,
      onClick,
      type,
      animate: floatingAnimation,
      whileHover: hoverAnimation,
      whileTap: tapAnimation,
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
    }

    if (href && !disabled) {
      return (
        <motion.a
          href={href}
          {...(motionProps as HTMLMotionProps<'a'>)}
          ref={ref as React.Ref<HTMLAnchorElement>}
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
