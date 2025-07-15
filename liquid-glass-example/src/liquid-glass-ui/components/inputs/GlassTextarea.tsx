import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { BaseGlassProps } from '../../core/types'
import { glassPresets } from '../../utils/classNames'
import LiquidGlassBase from '../../core/LiquidGlassBase'

interface GlassTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'>, BaseGlassProps {
  label?: string
  error?: string
  autoResize?: boolean
  minRows?: number
  maxRows?: number
}

export default forwardRef<HTMLTextAreaElement, GlassTextareaProps>(function GlassTextarea({
  label,
  error,
  autoResize = true,
  minRows = 3,
  maxRows = 8,
  className = '',
  placeholder,
  disabled,
  ...props
}, ref) {
  const { value, onChange, onFocus, onBlur, ...glassProps } = props
  const internalRef = useRef<HTMLTextAreaElement>(null)
  const textareaRef = (ref || internalRef) as React.RefObject<HTMLTextAreaElement>

  const [rows, setRows] = useState(minRows)

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current
      textarea.style.height = 'auto'
      const scrollHeight = textarea.scrollHeight
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
      const newRows = Math.min(maxRows, Math.max(minRows, Math.floor(scrollHeight / lineHeight)))
      setRows(newRows)
    }
  }, [value, autoResize, minRows, maxRows])

  return (
    <div className={`glass-textarea-wrapper ${className}`}>
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
          <div className="relative z-10">
            <textarea
              ref={textareaRef}
              className={`
                w-full bg-transparent border-0 outline-none text-white placeholder-white/50
                px-4 py-3 resize-none
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={disabled}
              rows={autoResize ? rows : minRows}
              style={{ minHeight: `${minRows * 1.5}rem` }}
            />
          </div>
        </LiquidGlassBase>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
})