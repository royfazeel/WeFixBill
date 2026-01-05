'use client'

import { forwardRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
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
  primary: 'text-white font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-[0_10px_40px_-10px_rgba(99,91,255,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(99,91,255,0.6)] border-0',
  secondary: 'text-slate-700 font-semibold bg-white border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300',
  outline: 'text-indigo-600 font-semibold bg-transparent border-2 border-indigo-500/30 hover:bg-indigo-500/5 hover:border-indigo-500',
  ghost: 'text-slate-600 font-medium bg-transparent hover:bg-slate-100 hover:text-slate-900',
  dark: 'text-white font-semibold bg-slate-900 border border-slate-700 shadow-lg hover:bg-slate-800',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-6 py-3 text-sm rounded-full',
  md: 'px-8 py-4 text-base rounded-full',
  lg: 'px-10 py-5 text-lg rounded-full',
  xl: 'px-12 py-6 text-xl rounded-full',
}

const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
  function FloatingButton(
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
  ) {
    const baseStyles = cn(
      'relative inline-flex items-center justify-center overflow-hidden',
      'transition-all duration-300 ease-out',
      'focus:outline-none focus:ring-4 focus:ring-indigo-500/30',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      fullWidth && 'w-full'
    )

    const combinedStyles = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    )

    const hoverAnimation = {
      scale: 1.05,
      y: -4,
      transition: { duration: 0.25, ease: [0.19, 1, 0.22, 1] },
    }

    const tapAnimation = { scale: 0.97, y: 0 }

    const buttonContent = (
      <span className="relative z-10 inline-flex items-center justify-center whitespace-nowrap gap-2">
        {icon && iconPosition === 'left' && <span>{icon}</span>}
        {loading ? (
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <span>{children}</span>
        )}
        {icon && iconPosition === 'right' && <span>{icon}</span>}
      </span>
    )

    if (href && !disabled) {
      return (
        <motion.a
          href={href}
          className={combinedStyles}
          whileHover={hoverAnimation}
          whileTap={tapAnimation}
        >
          {buttonContent}
        </motion.a>
      )
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        className={combinedStyles}
        disabled={disabled || loading}
        onClick={onClick}
        whileHover={!disabled && !loading ? hoverAnimation : {}}
        whileTap={!disabled && !loading ? tapAnimation : {}}
      >
        {buttonContent}
      </motion.button>
    )
  }
)

export default FloatingButton
