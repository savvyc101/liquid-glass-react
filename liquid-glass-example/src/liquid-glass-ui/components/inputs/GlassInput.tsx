import React, { forwardRef } from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'>, BaseGlassProps {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'minimal'
}

export default forwardRef<HTMLInputElement, GlassInputProps>(function GlassInput({
  label,
  error,
  leftIcon,
  rightIcon,
  variant = 'default',
  className = '',
  placeholder,
  disabled,
  ...props
}, ref) {
  const { value, onChange, onFocus, onBlur, ...glassProps } = props

  return (
    <div className={`glass-input-wrapper ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-white/90 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        <LiquidGlassBase
          style={{
            position: 'relative',
            top: 'auto',
            left: 'auto',
            transform: 'none',
            display: 'block',
            ...glassProps.style
          }}
          padding="0"
          {...glassPresets.input}
          overLight={false}
          {...glassProps}
        >
          <div className="relative z-10 flex items-center">
            {leftIcon && (
              <div className="absolute left-3 text-white/50 pointer-events-none">
                {leftIcon}
              </div>
            )}
            
            <input
              ref={ref}
              className={`
                w-full bg-transparent border-0 outline-none text-white placeholder-white/50
                ${leftIcon ? 'pl-10' : 'pl-4'}
                ${rightIcon ? 'pr-10' : 'pr-4'}
                py-3
                ${variant === 'minimal' ? 'text-sm' : 'text-base'}
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={disabled}
            />
            
            {rightIcon && (
              <div className="absolute right-3 text-white/50 pointer-events-none">
                {rightIcon}
              </div>
            )}
          </div>
        </LiquidGlassBase>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
})