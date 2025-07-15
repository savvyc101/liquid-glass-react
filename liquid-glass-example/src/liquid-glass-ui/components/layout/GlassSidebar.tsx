import React from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassSidebarProps extends BaseGlassProps {
  position?: 'left' | 'right'
  width?: 'sm' | 'md' | 'lg'
  isOpen?: boolean
  onClose?: () => void
  overlay?: boolean
}

export default function GlassSidebar({
  children,
  className = '',
  position = 'left',
  width = 'md',
  isOpen = true,
  onClose,
  overlay = false,
  ...glassProps
}: GlassSidebarProps) {
  const widthClasses = {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96'
  }

  const positionClasses = {
    left: `left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`,
    right: `right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
  }

  return (
    <>
      {overlay && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`fixed top-0 h-full ${widthClasses[width]} ${positionClasses[position]} z-50 transition-transform duration-300 ease-in-out ${className}`}
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
          padding="24px"
          cornerRadius={0}
          displacementScale={40}
          blurAmount={0.25}
          saturation={130}
          aberrationIntensity={1.5}
          elasticity={0.1}
          {...glassProps}
        >
          <div className="relative z-10 h-full flex flex-col">
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors lg:hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
        </LiquidGlassBase>
      </aside>
    </>
  )
}