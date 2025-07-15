import React, { useState } from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

interface GlassTabProps extends BaseGlassProps {
  tabs: TabItem[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
  variant?: 'pills' | 'underline' | 'elevated'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function GlassTab({
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
  variant = 'pills',
  size = 'md',
  className = '',
  ...glassProps
}: GlassTabProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '')
  const activeTab = controlledActiveTab || internalActiveTab

  const handleTabChange = (tabId: string) => {
    if (tabs.find(tab => tab.id === tabId)?.disabled) return
    
    if (controlledActiveTab) {
      onTabChange?.(tabId)
    } else {
      setInternalActiveTab(tabId)
      onTabChange?.(tabId)
    }
  }

  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: '14px' },
    md: { padding: '12px 20px', fontSize: '16px' },
    lg: { padding: '16px 24px', fontSize: '18px' }
  }

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  if (variant === 'underline') {
    return (
      <div className={`glass-tab-wrapper ${className}`}>
        <div className="flex border-b border-white/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`
                relative px-4 py-3 font-medium transition-all duration-200
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:text-white'}
                ${activeTab === tab.id ? 'text-white' : 'text-white/60'}
              `}
              onClick={() => handleTabChange(tab.id)}
              disabled={tab.disabled}
              style={{ fontSize: sizeStyles[size].fontSize }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>
        
        <div className="mt-6">
          {activeTabContent}
        </div>
      </div>
    )
  }

  if (variant === 'elevated') {
    return (
      <div className={`glass-tab-wrapper ${className}`}>
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <LiquidGlassBase
              key={tab.id}
              style={{
                position: 'relative',
                top: 'auto',
                left: 'auto',
                transform: 'none',
                display: 'inline-block',
              }}
              padding={sizeStyles[size].padding}
              cornerRadius={12}
              displacementScale={activeTab === tab.id ? 40 : 20}
              blurAmount={activeTab === tab.id ? 0.15 : 0.05}
              saturation={activeTab === tab.id ? 140 : 100}
              aberrationIntensity={activeTab === tab.id ? 1.5 : 0.5}
              elasticity={0.1}
              {...glassProps}
            >
              <button
                className={`
                  relative z-10 font-medium transition-all duration-200
                  ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${activeTab === tab.id ? 'text-white' : 'text-white/70 hover:text-white'}
                `}
                onClick={() => handleTabChange(tab.id)}
                disabled={tab.disabled}
                style={{ fontSize: sizeStyles[size].fontSize }}
              >
                {tab.label}
              </button>
            </LiquidGlassBase>
          ))}
        </div>
        
        <div>
          {activeTabContent}
        </div>
      </div>
    )
  }

  // Default pills variant
  return (
    <div className={`glass-tab-wrapper ${className}`}>
      <LiquidGlassBase
        style={{
          position: 'relative',
          top: 'auto',
          left: 'auto',
          transform: 'none',
          display: 'block',
          ...glassProps.style
        }}
        padding="4px"
        cornerRadius={16}
        {...glassPresets.subtle}
        {...glassProps}
      >
        <div className="relative z-10 flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`
                relative flex-1 font-medium transition-all duration-200 rounded-xl
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${activeTab === tab.id 
                  ? 'text-white bg-white/20 shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }
              `}
              onClick={() => handleTabChange(tab.id)}
              disabled={tab.disabled}
              style={{ 
                padding: sizeStyles[size].padding,
                fontSize: sizeStyles[size].fontSize 
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </LiquidGlassBase>
      
      <div className="mt-6">
        {activeTabContent}
      </div>
    </div>
  )
}