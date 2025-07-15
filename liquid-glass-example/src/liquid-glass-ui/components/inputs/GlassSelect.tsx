import React, { useState, useRef, useEffect } from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

interface GlassSelectProps extends BaseGlassProps {
  label?: string
  error?: string
  placeholder?: string
  value?: string | number
  onChange?: (value: string | number) => void
  options: SelectOption[]
  disabled?: boolean
  className?: string
}

export default function GlassSelect({
  label,
  error,
  placeholder = 'Select an option...',
  value,
  onChange,
  options,
  disabled = false,
  className = '',
  ...glassProps
}: GlassSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    options.find(opt => opt.value === value) || null
  )
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const selected = options.find(opt => opt.value === value)
    setSelectedOption(selected || null)
  }, [value, options])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return
    
    setSelectedOption(option)
    onChange?.(option.value)
    setIsOpen(false)
  }

  return (
    <div className={`glass-select-wrapper ${className}`} ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-white/90 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        <LiquidGlassBase
          style={{
            position: 'relative',
            top: 'auto',
            left: 'auto',
            transform: 'none',
            display: 'block',
            ...glassProps.style
          }}
          padding="0"
          {...glassPresets.input}
          overLight={false}
          {...glassProps}
        >
          <button
            type="button"
            className={`
              relative z-10 w-full px-4 py-3 text-left bg-transparent border-0 outline-none
              flex items-center justify-between
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              ${selectedOption ? 'text-white' : 'text-white/50'}
            `}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg
              className={`w-5 h-5 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </LiquidGlassBase>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50">
            <LiquidGlassBase
              style={{
                position: 'relative',
                top: 'auto',
                left: 'auto',
                transform: 'none',
                display: 'block',
              }}
              padding="8px"
              {...glassPresets.input}
              cornerRadius={12}
              overLight={false}
            >
              <div className="relative z-10 max-h-60 overflow-y-auto">
                {options.map((option, index) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`
                      w-full px-3 py-2 text-left rounded-lg transition-colors
                      ${option.disabled 
                        ? 'text-white/30 cursor-not-allowed' 
                        : 'text-white hover:bg-white/10 cursor-pointer'
                      }
                      ${selectedOption?.value === option.value ? 'bg-white/20' : ''}
                    `}
                    onClick={() => handleSelect(option)}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </button>
                ))}
                {options.length === 0 && (
                  <div className="px-3 py-2 text-white/50">
                    No options available
                  </div>
                )}
              </div>
            </LiquidGlassBase>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}