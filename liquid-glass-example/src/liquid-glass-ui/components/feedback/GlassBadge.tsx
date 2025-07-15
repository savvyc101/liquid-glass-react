import React from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassBadgeProps extends BaseGlassProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  count?: number
  maxCount?: number
  showZero?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  className?: string
}

export default function GlassBadge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  count,
  maxCount = 99,
  showZero = false,
  position = 'top-right',
  className = '',
  ...glassProps
}: GlassBadgeProps) {
  const sizeStyles = {
    sm: { padding: '2px 6px', fontSize: '10px', minWidth: '16px', height: '16px' },
    md: { padding: '4px 8px', fontSize: '12px', minWidth: '20px', height: '20px' },
    lg: { padding: '6px 10px', fontSize: '14px', minWidth: '24px', height: '24px' }
  }

  const variantPresets = {
    default: { ...glassPresets.subtle, saturation: 110 },
    primary: { ...glassPresets.subtle, saturation: 140, aberrationIntensity: 1 },
    success: { ...glassPresets.subtle, saturation: 130, displacementScale: 25 },
    warning: { ...glassPresets.subtle, saturation: 150, aberrationIntensity: 1.5 },
    danger: { ...glassPresets.subtle, saturation: 160, aberrationIntensity: 2 },
    info: { ...glassPresets.subtle, saturation: 125, displacementScale: 20 }
  }

  const positionStyles = {
    'top-right': 'top-0 right-0 transform translate-x-1/2 -translate-y-1/2',
    'top-left': 'top-0 left-0 transform -translate-x-1/2 -translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 transform translate-x-1/2 translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2'
  }

  const shouldShowBadge = () => {
    if (dot) return true
    if (count === undefined) return true
    if (count === 0 && !showZero) return false
    return true
  }

  const getDisplayCount = () => {
    if (dot) return null
    if (count === undefined) return null
    if (count > maxCount) return `${maxCount}+`
    return count.toString()
  }

  if (!shouldShowBadge()) {
    return <div className={className}>{children}</div>
  }

  const badgeContent = (
    <LiquidGlassBase
      style={{
        position: 'absolute',
        top: 'auto',
        left: 'auto',
        transform: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: dot ? sizeStyles[size].height : sizeStyles[size].minWidth,
        height: sizeStyles[size].height,
        ...glassProps.style
      }}
      padding={dot ? '0' : sizeStyles[size].padding}
      cornerRadius={sizeStyles[size].height}
      {...variantPresets[variant]}
      {...glassProps}
    >
      {!dot && (
        <span
          className="text-white font-medium leading-none"
          style={{ fontSize: sizeStyles[size].fontSize }}
        >
          {getDisplayCount()}
        </span>
      )}
    </LiquidGlassBase>
  )

  return (
    <div className={`glass-badge-wrapper relative inline-block ${className}`}>
      {children}
      <div className={`absolute ${positionStyles[position]} z-10`}>
        {badgeContent}
      </div>
    </div>
  )
}