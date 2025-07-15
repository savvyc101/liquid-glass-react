import React from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassPanelProps extends BaseGlassProps {
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  overlay?: boolean
  onClose?: () => void
}

export default function GlassPanel({
  children,
  className = '',
  position = 'center',
  overlay = false,
  onClose,
  ...glassProps
}: GlassPanelProps) {
  const positionStyles = {
    top: 'top-0 left-1/2 -translate-x-1/2',
    bottom: 'bottom-0 left-1/2 -translate-x-1/2',
    left: 'left-0 top-1/2 -translate-y-1/2',
    right: 'right-0 top-1/2 -translate-y-1/2',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  }

  return (
    <>
      {overlay && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      <div className={`fixed ${positionStyles[position]} z-50 ${className}`}>
        <LiquidGlassBase
          style={{
            position: 'relative',
            top: 'auto',
            left: 'auto',
            transform: 'none',
            display: 'block',
            ...glassProps.style
          }}
          padding="20px"
          {...glassPresets.card}
          {...glassProps}
        >
          <div className="relative z-10">
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
            {children}
          </div>
        </LiquidGlassBase>
      </div>
    </>
  )
}