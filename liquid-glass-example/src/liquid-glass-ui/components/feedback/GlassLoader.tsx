import React from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassLoaderProps extends BaseGlassProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars'
  size?: 'sm' | 'md' | 'lg'
  text?: string
  overlay?: boolean
  className?: string
}

export default function GlassLoader({
  variant = 'spinner',
  size = 'md',
  text,
  overlay = false,
  className = '',
  ...glassProps
}: GlassLoaderProps) {
  const sizeStyles = {
    sm: { size: '20px', fontSize: '12px' },
    md: { size: '32px', fontSize: '14px' },
    lg: { size: '48px', fontSize: '16px' }
  }

  const renderSpinner = () => (
    <svg
      className="animate-spin text-white"
      style={{ width: sizeStyles[size].size, height: sizeStyles[size].size }}
      fill="none"
      viewBox="0 0 24 24"
    >
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
  )

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="bg-white rounded-full animate-pulse"
          style={{
            width: `${parseInt(sizeStyles[size].size) / 4}px`,
            height: `${parseInt(sizeStyles[size].size) / 4}px`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <div
      className="bg-white/30 rounded-full animate-pulse"
      style={{
        width: sizeStyles[size].size,
        height: sizeStyles[size].size,
        animationDuration: '1.5s'
      }}
    />
  )

  const renderBars = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white animate-pulse"
          style={{
            width: `${parseInt(sizeStyles[size].size) / 6}px`,
            height: `${parseInt(sizeStyles[size].size) / 2 + i * 2}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1.2s'
          }}
        />
      ))}
    </div>
  )

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      case 'bars':
        return renderBars()
      default:
        return renderSpinner()
    }
  }

  const loaderContent = (
    <div className={`glass-loader ${className} flex flex-col items-center gap-3`}>
      {text ? (
        <LiquidGlassBase
          style={{
            position: 'relative',
            top: 'auto',
            left: 'auto',
            transform: 'none',
            display: 'block',
            ...glassProps.style
          }}
          padding="16px 24px"
          cornerRadius={16}
          {...glassPresets.card}
          {...glassProps}
        >
          <div className="relative z-10 flex flex-col items-center gap-3">
            {renderLoader()}
            <span 
              className="text-white font-medium"
              style={{ fontSize: sizeStyles[size].fontSize }}
            >
              {text}
            </span>
          </div>
        </LiquidGlassBase>
      ) : (
        renderLoader()
      )}
    </div>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
        {loaderContent}
      </div>
    )
  }

  return loaderContent
}