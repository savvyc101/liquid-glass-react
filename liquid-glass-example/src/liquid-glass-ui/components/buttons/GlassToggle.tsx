import React from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassToggleProps extends BaseGlassProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function GlassToggle({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = 'md',
  className = '',
  ...glassProps
}: GlassToggleProps) {
  const sizeStyles = {
    sm: { width: '36px', height: '20px', thumbSize: '16px' },
    md: { width: '44px', height: '24px', thumbSize: '20px' },
    lg: { width: '52px', height: '28px', thumbSize: '24px' }
  }

  const handleToggle = () => {
    if (disabled) return
    onChange?.(!checked)
  }

  return (
    <div className={`glass-toggle-wrapper flex items-center gap-3 ${className}`}>
      <button
        type="button"
        className={`relative focus:outline-none ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        onClick={handleToggle}
        disabled={disabled}
        style={{
          width: sizeStyles[size].width,
          height: sizeStyles[size].height,
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
          padding="2px"
          cornerRadius={sizeStyles[size].height}
          displacementScale={20}
          blurAmount={0.1}
          saturation={checked ? 140 : 100}
          aberrationIntensity={checked ? 2 : 0.5}
          elasticity={0.1}
          {...glassProps}
        >
          <div className="relative z-10 w-full h-full flex items-center">
            <div
              className={`
                transition-all duration-300 ease-in-out rounded-full
                ${checked ? 'bg-white' : 'bg-white/50'}
                shadow-lg
              `}
              style={{
                width: sizeStyles[size].thumbSize,
                height: sizeStyles[size].thumbSize,
                transform: checked 
                  ? `translateX(${parseInt(sizeStyles[size].width) - parseInt(sizeStyles[size].thumbSize) - 4}px)` 
                  : 'translateX(0px)',
              }}
            />
          </div>
        </LiquidGlassBase>
      </button>
      
      {label && (
        <label 
          className={`text-sm font-medium ${disabled ? 'text-white/50' : 'text-white'} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={handleToggle}
        >
          {label}
        </label>
      )}
    </div>
  )
}