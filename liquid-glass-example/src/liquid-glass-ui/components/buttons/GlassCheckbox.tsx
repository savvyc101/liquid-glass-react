import React from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassCheckboxProps extends BaseGlassProps {
  checked?: boolean
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function GlassCheckbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  label,
  size = 'md',
  className = '',
  ...glassProps
}: GlassCheckboxProps) {
  const sizeStyles = {
    sm: { size: '16px', iconSize: '12px' },
    md: { size: '20px', iconSize: '14px' },
    lg: { size: '24px', iconSize: '16px' }
  }

  const handleChange = () => {
    if (disabled) return
    onChange?.(!checked)
  }

  const renderIcon = () => {
    if (indeterminate) {
      return (
        <svg
          className="text-white"
          style={{ width: sizeStyles[size].iconSize, height: sizeStyles[size].iconSize }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
        </svg>
      )
    }

    if (checked) {
      return (
        <svg
          className="text-white"
          style={{ width: sizeStyles[size].iconSize, height: sizeStyles[size].iconSize }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )
    }

    return null
  }

  return (
    <div className={`glass-checkbox-wrapper flex items-center gap-3 ${className}`}>
      <button
        type="button"
        className={`relative focus:outline-none ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        onClick={handleChange}
        disabled={disabled}
        style={{
          width: sizeStyles[size].size,
          height: sizeStyles[size].size,
        }}
      >
        <LiquidGlassBase
          style={{
            position: 'relative',
            top: 'auto',
            left: 'auto',
            transform: 'none',
            display: 'block',
            width: '100%',
            height: '100%',
            ...glassProps.style
          }}
          padding="0"
          cornerRadius={4}
          displacementScale={checked || indeterminate ? 30 : 15}
          blurAmount={0.05}
          saturation={checked || indeterminate ? 140 : 100}
          aberrationIntensity={checked || indeterminate ? 1.5 : 0.5}
          elasticity={0.1}
          {...glassProps}
        >
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {renderIcon()}
          </div>
        </LiquidGlassBase>
      </button>
      
      {label && (
        <label 
          className={`text-sm font-medium ${disabled ? 'text-white/50' : 'text-white'} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={handleChange}
        >
          {label}
        </label>
      )}
    </div>
  )
}