import React from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassNavbarProps extends BaseGlassProps {
  sticky?: boolean
  logo?: React.ReactNode
  actions?: React.ReactNode
}

export default function GlassNavbar({
  children,
  className = '',
  sticky = true,
  logo,
  actions,
  ...glassProps
}: GlassNavbarProps) {
  return (
    <nav className={`${sticky ? 'sticky top-0' : ''} z-50 w-full ${className}`}>
      <LiquidGlassBase
        style={{
          position: 'relative',
          top: 'auto',
          left: 'auto',
          transform: 'none',
          display: 'block',
          width: '100%',
          ...glassProps.style
        }}
        padding="16px 24px"
        cornerRadius={0}
        displacementScale={30}
        blurAmount={0.2}
        saturation={120}
        aberrationIntensity={1}
        elasticity={0}
        {...glassProps}
      >
        <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto">
          {logo && (
            <div className="flex items-center">
              {logo}
            </div>
          )}
          
          <div className="flex items-center space-x-6">
            {children}
          </div>
          
          {actions && (
            <div className="flex items-center space-x-4">
              {actions}
            </div>
          )}
        </div>
      </LiquidGlassBase>
    </nav>
  )
}