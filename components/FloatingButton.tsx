'use client'

import { forwardRef, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
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
    'bg-gradient-to-b from-stripe-purple-light to-stripe-purple',
    'shadow-stripe-glow',
    'hover:shadow-stripe-glow-lg'
  ),
  secondary: cn(
    'text-stripe-purple font-semibold',
    'bg-white border border-slate-200',
    'shadow-stripe-sm',
    'hover:border-stripe-purple/30 hover:bg-stripe-purple/5',
    'hover:shadow-md'
  ),
  ghost: cn(
    'text-slate-600 font-medium',
    'bg-transparent',
    'hover:text-stripe-purple hover:bg-slate-50'
  ),
  outline: cn(
    'text-stripe-purple font-semibold',
    'bg-transparent border-2 border-stripe-purple/30',
    'hover:border-stripe-purple hover:bg-stripe-purple/5'
  ),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5 rounded-lg',
  md: 'px-5 py-2.5 text-sm gap-2 rounded-lg',
  lg: 'px-6 py-3 text-base gap-2 rounded-lg',
  xl: 'px-8 py-4 text-lg gap-2.5 rounded-xl',
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
    const baseStyles = cn(
      'relative inline-flex items-center justify-center',
      'transition-all duration-200 ease-stripe',
      'focus:outline-none focus:ring-4 focus:ring-stripe-purple/20',
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
      </>
    )

    const motionProps: HTMLMotionProps<'button'> = {
      className: cn(baseStyles, variantStyles[variant], sizeStyles[size], className),
      disabled: disabled || loading,
      onClick,
      type,
      whileHover: !disabled && !loading ? { y: -2 } : {},
      whileTap: !disabled && !loading ? { y: 0, scale: 0.98 } : {},
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
