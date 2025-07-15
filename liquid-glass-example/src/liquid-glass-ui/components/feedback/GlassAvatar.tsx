import React from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassAvatarProps extends BaseGlassProps {
  src?: string
  alt?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'away' | 'busy'
  showStatus?: boolean
  clickable?: boolean
  onClick?: () => void
  className?: string
}

export default function GlassAvatar({
  src,
  alt,
  initials,
  size = 'md',
  status,
  showStatus = false,
  clickable = false,
  onClick,
  className = '',
  ...glassProps
}: GlassAvatarProps) {
  const sizeStyles = {
    sm: { size: '32px', fontSize: '12px', statusSize: '8px' },
    md: { size: '40px', fontSize: '14px', statusSize: '10px' },
    lg: { size: '56px', fontSize: '18px', statusSize: '12px' },
    xl: { size: '80px', fontSize: '24px', statusSize: '16px' }
  }

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  }

  const handleClick = () => {
    if (clickable && onClick) {
      onClick()
    }
  }

  return (
    <div className={`glass-avatar-wrapper relative inline-block ${className}`}>
      <LiquidGlassBase
        style={{
          position: 'relative',
          top: 'auto',
          left: 'auto',
          transform: 'none',
          display: 'block',
          width: sizeStyles[size].size,
          height: sizeStyles[size].size,
          ...glassProps.style
        }}
        padding="0"
        cornerRadius={sizeStyles[size].size}
        displacementScale={20}
        blurAmount={0.1}
        saturation={120}
        aberrationIntensity={1}
        elasticity={0.05}
        className={`${clickable ? 'cursor-pointer hover:scale-105' : ''} transition-all duration-200`}
        onClick={handleClick}
        {...glassProps}
      >
        <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden rounded-full">
          {src ? (
            <img
              src={src}
              alt={alt || 'Avatar'}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="text-white font-semibold"
              style={{ fontSize: sizeStyles[size].fontSize }}
            >
              {initials || '?'}
            </span>
          )}
        </div>
      </LiquidGlassBase>

      {showStatus && status && (
        <div
          className={`absolute bottom-0 right-0 rounded-full border-2 border-white ${statusColors[status]}`}
          style={{
            width: sizeStyles[size].statusSize,
            height: sizeStyles[size].statusSize,
          }}
        />
      )}
    </div>
  )
}