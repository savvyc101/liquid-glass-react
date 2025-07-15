import React from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassCardProps extends BaseGlassProps {
  variant?: 'default' | 'elevated' | 'subtle'
  hover?: boolean
}

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  hover = false,
  ...glassProps
}: GlassCardProps) {
  const presets = {
    default: glassPresets.card,
    elevated: {
      ...glassPresets.card,
      displacementScale: 70,
      blurAmount: 0.3,
      aberrationIntensity: 2,
    },
    subtle: {
      ...glassPresets.subtle,
      cornerRadius: 12,
    }
  }

  const preset = presets[variant]

  return (
    <LiquidGlassBase
      className={`glass-card ${hover ? 'hover:scale-[1.02] hover:shadow-2xl' : ''} transition-all duration-300 ${className}`}
      style={{
        position: 'relative',
        top: 'auto',
        left: 'auto',
        transform: 'none',
        display: 'block',
        ...glassProps.style
      }}
      padding="24px"
      {...preset}
      {...glassProps}
    >
      <div className="relative z-10">
        {children}
      </div>
    </LiquidGlassBase>
  )
}