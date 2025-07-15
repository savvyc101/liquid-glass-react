import React, { useState, useRef, useEffect } from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassTooltipProps extends BaseGlassProps {
  content: React.ReactNode
  children: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click' | 'focus'
  delay?: number
  disabled?: boolean
  className?: string
}

export default function GlassTooltip({
  content,
  children,
  placement = 'top',
  trigger = 'hover',
  delay = 200,
  disabled = false,
  className = '',
  ...glassProps
}: GlassTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const showTooltip = () => {
    if (disabled) return
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      updatePosition()
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    if (trigger === 'hover') {
      setIsVisible(false)
    }
  }

  const toggleTooltip = () => {
    if (disabled) return
    setIsVisible(!isVisible)
    if (!isVisible) {
      updatePosition()
    }
  }

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    let x = 0
    let y = 0

    switch (placement) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        y = triggerRect.top - tooltipRect.height - 8
        break
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        y = triggerRect.bottom + 8
        break
      case 'left':
        x = triggerRect.left - tooltipRect.width - 8
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        break
      case 'right':
        x = triggerRect.right + 8
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        break
    }

    // Keep tooltip within viewport
    x = Math.max(8, Math.min(x, viewport.width - tooltipRect.width - 8))
    y = Math.max(8, Math.min(y, viewport.height - tooltipRect.height - 8))

    setPosition({ x, y })
  }

  useEffect(() => {
    if (isVisible) {
      updatePosition()
      window.addEventListener('scroll', updatePosition)
      window.addEventListener('resize', updatePosition)
    }

    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isVisible])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const triggerProps = {
    onMouseEnter: trigger === 'hover' ? showTooltip : undefined,
    onMouseLeave: trigger === 'hover' ? hideTooltip : undefined,
    onClick: trigger === 'click' ? toggleTooltip : undefined,
    onFocus: trigger === 'focus' ? showTooltip : undefined,
    onBlur: trigger === 'focus' ? hideTooltip : undefined,
  }

  return (
    <>
      <div
        ref={triggerRef}
        className={`glass-tooltip-trigger inline-block ${className}`}
        {...triggerProps}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-[1000] pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <LiquidGlassBase
            style={{
              position: 'relative',
              top: 'auto',
              left: 'auto',
              transform: 'none',
              display: 'block',
              maxWidth: '200px',
              ...glassProps.style
            }}
            padding="8px 12px"
            cornerRadius={8}
            displacementScale={15}
            blurAmount={0.15}
            saturation={120}
            aberrationIntensity={0.5}
            elasticity={0}
            {...glassProps}
          >
            <div className="relative z-10 text-sm text-white">
              {content}
            </div>
          </LiquidGlassBase>
        </div>
      )}
    </>
  )
}