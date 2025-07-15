import React from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'>, BaseGlassProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export default function GlassButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  onClick,
  ...props
}: GlassButtonProps) {
  const { ...glassProps } = props

  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: '14px' },
    md: { padding: '12px 24px', fontSize: '16px' },
    lg: { padding: '16px 32px', fontSize: '18px' }
  }

  const variantPresets = {
    primary: {
      ...glassPresets.button,
      saturation: 140,
    },
    secondary: {
      ...glassPresets.button,
      displacementScale: 40,
      saturation: 120,
      aberrationIntensity: 1,
    },
    ghost: {
      ...glassPresets.subtle,
      displacementScale: 20,
      blurAmount: 0.1,
    },
    danger: {
      ...glassPresets.button,
      saturation: 160,
      aberrationIntensity: 3,
    }
  }

  const handleClick = () => {
    if (loading || disabled) return
    onClick?.({} as React.MouseEvent<HTMLButtonElement>)
  }

  return (
    <div
      className={`glass-button ${variant} ${size} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'} transition-all duration-200 ${className}`}
      onClick={(e) => {
        if (loading || disabled) return
        onClick?.(e as any)
      }}
    >
      <LiquidGlassBase
        style={{
          position: 'relative',
          top: 'auto',
          left: 'auto',
          transform: 'none',
          display: 'inline-block',
          ...glassProps.style
        }}
        padding={sizeStyles[size].padding}
        {...variantPresets[variant]}
        {...glassProps}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
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
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            <span 
              className="font-medium text-white"
              style={{ fontSize: sizeStyles[size].fontSize }}
            >
              {children}
            </span>
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </>
        )}
      </div>
    </LiquidGlassBase>
    </div>
  )
}