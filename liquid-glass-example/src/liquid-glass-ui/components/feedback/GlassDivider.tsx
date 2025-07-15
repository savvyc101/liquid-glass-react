import React from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassDividerProps extends BaseGlassProps {
  orientation?: 'horizontal' | 'vertical'
  label?: string
  variant?: 'solid' | 'dashed' | 'gradient'
  thickness?: 'thin' | 'medium' | 'thick'
  length?: string
  className?: string
}

export default function GlassDivider({
  orientation = 'horizontal',
  label,
  variant = 'solid',
  thickness = 'thin',
  length,
  className = '',
  ...glassProps
}: GlassDividerProps) {
  const thicknessStyles = {
    thin: '1px',
    medium: '2px',
    thick: '4px'
  }

  const isHorizontal = orientation === 'horizontal'

  if (variant === 'gradient') {
    const gradientStyle = isHorizontal
      ? { background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }
      : { background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)' }

    return (
      <div className={`glass-divider ${className} ${isHorizontal ? 'w-full flex items-center' : 'h-full flex flex-col items-center'}`}>
        {label && isHorizontal ? (
          <>
            <div
              className="flex-1"
              style={{
                height: thicknessStyles[thickness],
                ...gradientStyle
              }}
            />
            <span className="px-4 text-white/70 text-sm font-medium">{label}</span>
            <div
              className="flex-1"
              style={{
                height: thicknessStyles[thickness],
                ...gradientStyle
              }}
            />
          </>
        ) : label && !isHorizontal ? (
          <>
            <div
              className="flex-1"
              style={{
                width: thicknessStyles[thickness],
                ...gradientStyle
              }}
            />
            <span className="py-4 text-white/70 text-sm font-medium writing-mode-vertical">{label}</span>
            <div
              className="flex-1"
              style={{
                width: thicknessStyles[thickness],
                ...gradientStyle
              }}
            />
          </>
        ) : (
          <div
            className={isHorizontal ? 'w-full' : 'h-full'}
            style={{
              [isHorizontal ? 'height' : 'width']: thicknessStyles[thickness],
              [isHorizontal ? 'width' : 'height']: length || '100%',
              ...gradientStyle
            }}
          />
        )}
      </div>
    )
  }

  if (variant === 'dashed') {
    const dashStyle = {
      borderStyle: 'dashed',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      [isHorizontal ? 'borderTopWidth' : 'borderLeftWidth']: thicknessStyles[thickness]
    }

    return (
      <div className={`glass-divider ${className} ${isHorizontal ? 'w-full flex items-center' : 'h-full flex flex-col items-center'}`}>
        {label && isHorizontal ? (
          <>
            <div className="flex-1" style={dashStyle} />
            <span className="px-4 text-white/70 text-sm font-medium">{label}</span>
            <div className="flex-1" style={dashStyle} />
          </>
        ) : label && !isHorizontal ? (
          <>
            <div className="flex-1" style={dashStyle} />
            <span className="py-4 text-white/70 text-sm font-medium">{label}</span>
            <div className="flex-1" style={dashStyle} />
          </>
        ) : (
          <div
            className={isHorizontal ? 'w-full' : 'h-full'}
            style={{
              [isHorizontal ? 'width' : 'height']: length || '100%',
              ...dashStyle
            }}
          />
        )}
      </div>
    )
  }

  // Solid variant with glass effect
  return (
    <div className={`glass-divider ${className} ${isHorizontal ? 'w-full flex items-center' : 'h-full flex flex-col items-center'}`}>
      {label && isHorizontal ? (
        <>
          <div className="flex-1">
            <LiquidGlassBase
              style={{
                position: 'relative',
                top: 'auto',
                left: 'auto',
                transform: 'none',
                display: 'block',
                width: '100%',
                height: thicknessStyles[thickness],
                ...glassProps.style
              }}
              padding="0"
              cornerRadius={thicknessStyles[thickness]}
              {...glassPresets.subtle}
              displacementScale={5}
              blurAmount={0.02}
              {...glassProps}
            />
          </div>
          <span className="px-4 text-white/70 text-sm font-medium">{label}</span>
          <div className="flex-1">
            <LiquidGlassBase
              style={{
                position: 'relative',
                top: 'auto',
                left: 'auto',
                transform: 'none',
                display: 'block',
                width: '100%',
                height: thicknessStyles[thickness],
                ...glassProps.style
              }}
              padding="0"
              cornerRadius={thicknessStyles[thickness]}
              {...glassPresets.subtle}
              displacementScale={5}
              blurAmount={0.02}
              {...glassProps}
            />
          </div>
        </>
      ) : label && !isHorizontal ? (
        <>
          <div className="flex-1">
            <LiquidGlassBase
              style={{
                position: 'relative',
                top: 'auto',
                left: 'auto',
                transform: 'none',
                display: 'block',
                width: thicknessStyles[thickness],
                height: '100%',
                ...glassProps.style
              }}
              padding="0"
              cornerRadius={thicknessStyles[thickness]}
              {...glassPresets.subtle}
              displacementScale={5}
              blurAmount={0.02}
              {...glassProps}
            />
          </div>
          <span className="py-4 text-white/70 text-sm font-medium">{label}</span>
          <div className="flex-1">
            <LiquidGlassBase
              style={{
                position: 'relative',
                top: 'auto',
                left: 'auto',
                transform: 'none',
                display: 'block',
                width: thicknessStyles[thickness],
                height: '100%',
                ...glassProps.style
              }}
              padding="0"
              cornerRadius={thicknessStyles[thickness]}
              {...glassPresets.subtle}
              displacementScale={5}
              blurAmount={0.02}
              {...glassProps}
            />
          </div>
        </>
      ) : (
        <LiquidGlassBase
          style={{
            position: 'relative',
            top: 'auto',
            left: 'auto',
            transform: 'none',
            display: 'block',
            [isHorizontal ? 'width' : 'height']: length || '100%',
            [isHorizontal ? 'height' : 'width']: thicknessStyles[thickness],
            ...glassProps.style
          }}
          padding="0"
          cornerRadius={thicknessStyles[thickness]}
          {...glassPresets.subtle}
          displacementScale={5}
          blurAmount={0.02}
          {...glassProps}
        />
      )}
    </div>
  )
}