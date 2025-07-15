import React, { type CSSProperties, forwardRef, useCallback, useEffect, useId, useRef, useState } from "react"
import { ShaderDisplacementGenerator, fragmentShaders } from "./shader-utils"
import { displacementMap, polarDisplacementMap, prominentDisplacementMap } from "./displacement-maps"
import { BaseGlassProps, GlassMode, Vec2 } from "./types"

const generateShaderDisplacementMap = (width: number, height: number): string => {
  const generator = new ShaderDisplacementGenerator({
    width,
    height,
    fragment: fragmentShaders.liquidGlass,
  })

  const dataUrl = generator.updateShader()
  generator.destroy()

  return dataUrl
}

const getMap = (mode: GlassMode, shaderMapUrl?: string) => {
  switch (mode) {
    case "standard":
      return displacementMap
    case "polar":
      return polarDisplacementMap
    case "prominent":
      return prominentDisplacementMap
    case "shader":
      return shaderMapUrl || displacementMap
    default:
      throw new Error(`Invalid mode: ${mode}`)
  }
}

interface GlassFilterProps {
  id: string
  displacementScale: number
  aberrationIntensity: number
  width: number
  height: number
  mode: GlassMode
  shaderMapUrl?: string
}

const GlassFilter: React.FC<GlassFilterProps> = ({
  id,
  displacementScale,
  aberrationIntensity,
  width,
  height,
  mode,
  shaderMapUrl,
}) => (
  <svg style={{ position: "absolute", width, height }} aria-hidden="true">
    <defs>
      <radialGradient id={`${id}-edge-mask`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="black" stopOpacity="0" />
        <stop offset={`${Math.max(30, 80 - aberrationIntensity * 2)}%`} stopColor="black" stopOpacity="0" />
        <stop offset="100%" stopColor="white" stopOpacity="1" />
      </radialGradient>
      <filter id={id} x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
        <feImage 
          id="feimage" 
          x="0" 
          y="0" 
          width="100%" 
          height="100%" 
          result="DISPLACEMENT_MAP" 
          href={getMap(mode, shaderMapUrl)} 
          preserveAspectRatio="xMidYMid slice" 
        />
        
        <feColorMatrix
          in="DISPLACEMENT_MAP"
          type="matrix"
          values="0.3 0.3 0.3 0 0
                 0.3 0.3 0.3 0 0
                 0.3 0.3 0.3 0 0
                 0 0 0 1 0"
          result="EDGE_INTENSITY"
        />
        <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
          <feFuncA type="discrete" tableValues={`0 ${aberrationIntensity * 0.05} 1`} />
        </feComponentTransfer>

        <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

        <feDisplacementMap 
          in="SourceGraphic" 
          in2="DISPLACEMENT_MAP" 
          scale={displacementScale * (mode === "shader" ? 1 : -1)} 
          xChannelSelector="R" 
          yChannelSelector="B" 
          result="RED_DISPLACED" 
        />
        <feColorMatrix
          in="RED_DISPLACED"
          type="matrix"
          values="1 0 0 0 0
                 0 0 0 0 0
                 0 0 0 0 0
                 0 0 0 1 0"
          result="RED_CHANNEL"
        />

        <feDisplacementMap 
          in="SourceGraphic" 
          in2="DISPLACEMENT_MAP" 
          scale={displacementScale * ((mode === "shader" ? 1 : -1) - aberrationIntensity * 0.05)} 
          xChannelSelector="R" 
          yChannelSelector="B" 
          result="GREEN_DISPLACED" 
        />
        <feColorMatrix
          in="GREEN_DISPLACED"
          type="matrix"
          values="0 0 0 0 0
                 0 1 0 0 0
                 0 0 0 0 0
                 0 0 0 1 0"
          result="GREEN_CHANNEL"
        />

        <feDisplacementMap 
          in="SourceGraphic" 
          in2="DISPLACEMENT_MAP" 
          scale={displacementScale * ((mode === "shader" ? 1 : -1) - aberrationIntensity * 0.1)} 
          xChannelSelector="R" 
          yChannelSelector="B" 
          result="BLUE_DISPLACED" 
        />
        <feColorMatrix
          in="BLUE_DISPLACED"
          type="matrix"
          values="0 0 0 0 0
                 0 0 0 0 0
                 0 0 1 0 0
                 0 0 0 1 0"
          result="BLUE_CHANNEL"
        />

        <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED" />
        <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />

        <feGaussianBlur in="RGB_COMBINED" stdDeviation={Math.max(0.1, 0.5 - aberrationIntensity * 0.1)} result="ABERRATED_BLURRED" />

        <feComposite in="ABERRATED_BLURRED" in2="EDGE_MASK" operator="in" result="EDGE_ABERRATION" />

        <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN" />

        <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
      </filter>
    </defs>
  </svg>
)

interface GlassContainerProps extends BaseGlassProps {
  glassSize?: { width: number; height: number }
  onMouseLeave?: () => void
  onMouseEnter?: () => void
  onMouseDown?: () => void
  onMouseUp?: () => void
  active?: boolean
  onClick?: () => void
}

const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  (
    {
      children,
      className = "",
      style,
      displacementScale = 25,
      blurAmount = 12,
      saturation = 180,
      aberrationIntensity = 2,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      active = false,
      overLight = false,
      cornerRadius = 999,
      padding = "24px 32px",
      glassSize = { width: 270, height: 69 },
      onClick,
      mode = "standard",
    },
    ref,
  ) => {
    const filterId = useId()
    const [shaderMapUrl, setShaderMapUrl] = useState<string>("")

    const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes("firefox")

    useEffect(() => {
      if (mode === "shader") {
        const url = generateShaderDisplacementMap(glassSize.width, glassSize.height)
        setShaderMapUrl(url)
      }
    }, [mode, glassSize.width, glassSize.height])

    const backdropStyle = {
      filter: isFirefox ? undefined : `url(#${filterId})`,
      backdropFilter: `blur(${(overLight ? 12 : 4) + blurAmount * 32}px) saturate(${saturation}%)`,
    }

    return (
      <div 
        ref={ref} 
        className={`relative ${className} ${active ? "active" : ""} ${Boolean(onClick) ? "cursor-pointer" : ""}`} 
        style={style} 
        onClick={onClick}
      >
        <GlassFilter 
          mode={mode} 
          id={filterId} 
          displacementScale={displacementScale} 
          aberrationIntensity={aberrationIntensity} 
          width={glassSize.width} 
          height={glassSize.height} 
          shaderMapUrl={shaderMapUrl} 
        />

        <div
          className="glass"
          style={{
            borderRadius: `${cornerRadius}px`,
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: "24px",
            padding,
            overflow: "hidden",
            transition: "all 0.2s ease-in-out",
            boxShadow: overLight ? "0px 16px 70px rgba(0, 0, 0, 0.75)" : "0px 12px 40px rgba(0, 0, 0, 0.25)",
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <span
            className="glass__warp"
            style={
              {
                ...backdropStyle,
                position: "absolute",
                inset: "0",
              } as CSSProperties
            }
          />

          <div
            className="transition-all duration-150 ease-in-out text-white"
            style={{
              position: "relative",
              zIndex: 1,
              font: "500 20px/1 system-ui",
              textShadow: overLight ? "0px 2px 12px rgba(0, 0, 0, 0)" : "0px 2px 12px rgba(0, 0, 0, 0.4)",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    )
  },
)

GlassContainer.displayName = "GlassContainer"

export default function LiquidGlassBase({
  children,
  displacementScale = 70,
  blurAmount = 0.0625,
  saturation = 140,
  aberrationIntensity = 2,
  elasticity = 0.15,
  cornerRadius = 999,
  globalMousePos: externalGlobalMousePos,
  mouseOffset: externalMouseOffset,
  mouseContainer = null,
  className = "",
  padding = "24px 32px",
  overLight = false,
  style = {},
  mode = "standard",
}: BaseGlassProps & { onClick?: () => void }) {
  const glassRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [glassSize, setGlassSize] = useState({ width: 270, height: 69 })
  const [internalGlobalMousePos, setInternalGlobalMousePos] = useState({ x: 0, y: 0 })
  const [internalMouseOffset, setInternalMouseOffset] = useState({ x: 0, y: 0 })

  const globalMousePos = externalGlobalMousePos || internalGlobalMousePos
  const mouseOffset = externalMouseOffset || internalMouseOffset

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const container = mouseContainer?.current || glassRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      setInternalMouseOffset({
        x: ((e.clientX - centerX) / rect.width) * 100,
        y: ((e.clientY - centerY) / rect.height) * 100,
      })

      setInternalGlobalMousePos({
        x: e.clientX,
        y: e.clientY,
      })
    },
    [mouseContainer],
  )

  useEffect(() => {
    if (externalGlobalMousePos && externalMouseOffset) return

    const container = mouseContainer?.current || glassRef.current
    if (!container) return

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove, mouseContainer, externalGlobalMousePos, externalMouseOffset])

  const calculateDirectionalScale = useCallback(() => {
    if (!globalMousePos.x || !globalMousePos.y || !glassRef.current) {
      return "scale(1)"
    }

    const rect = glassRef.current.getBoundingClientRect()
    const pillCenterX = rect.left + rect.width / 2
    const pillCenterY = rect.top + rect.height / 2
    const pillWidth = glassSize.width
    const pillHeight = glassSize.height

    const deltaX = globalMousePos.x - pillCenterX
    const deltaY = globalMousePos.y - pillCenterY

    const edgeDistanceX = Math.max(0, Math.abs(deltaX) - pillWidth / 2)
    const edgeDistanceY = Math.max(0, Math.abs(deltaY) - pillHeight / 2)
    const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY)

    const activationZone = 200

    if (edgeDistance > activationZone) {
      return "scale(1)"
    }

    const fadeInFactor = 1 - edgeDistance / activationZone

    const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    if (centerDistance === 0) {
      return "scale(1)"
    }

    const normalizedX = deltaX / centerDistance
    const normalizedY = deltaY / centerDistance

    const stretchIntensity = Math.min(centerDistance / 300, 1) * elasticity * fadeInFactor

    const scaleX = 1 + Math.abs(normalizedX) * stretchIntensity * 0.3 - Math.abs(normalizedY) * stretchIntensity * 0.15
    const scaleY = 1 + Math.abs(normalizedY) * stretchIntensity * 0.3 - Math.abs(normalizedX) * stretchIntensity * 0.15

    return `scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`
  }, [globalMousePos, elasticity, glassSize])

  const calculateFadeInFactor = useCallback(() => {
    if (!globalMousePos.x || !globalMousePos.y || !glassRef.current) {
      return 0
    }

    const rect = glassRef.current.getBoundingClientRect()
    const pillCenterX = rect.left + rect.width / 2
    const pillCenterY = rect.top + rect.height / 2
    const pillWidth = glassSize.width
    const pillHeight = glassSize.height

    const edgeDistanceX = Math.max(0, Math.abs(globalMousePos.x - pillCenterX) - pillWidth / 2)
    const edgeDistanceY = Math.max(0, Math.abs(globalMousePos.y - pillCenterY) - pillHeight / 2)
    const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY)

    const activationZone = 200
    return edgeDistance > activationZone ? 0 : 1 - edgeDistance / activationZone
  }, [globalMousePos, glassSize])

  const calculateElasticTranslation = useCallback(() => {
    if (!glassRef.current) {
      return { x: 0, y: 0 }
    }

    const fadeInFactor = calculateFadeInFactor()
    const rect = glassRef.current.getBoundingClientRect()
    const pillCenterX = rect.left + rect.width / 2
    const pillCenterY = rect.top + rect.height / 2

    return {
      x: (globalMousePos.x - pillCenterX) * elasticity * 0.1 * fadeInFactor,
      y: (globalMousePos.y - pillCenterY) * elasticity * 0.1 * fadeInFactor,
    }
  }, [globalMousePos, elasticity, calculateFadeInFactor])

  useEffect(() => {
    const updateGlassSize = () => {
      if (glassRef.current) {
        const rect = glassRef.current.getBoundingClientRect()
        setGlassSize({ width: rect.width, height: rect.height })
      }
    }

    updateGlassSize()
    window.addEventListener("resize", updateGlassSize)
    return () => window.removeEventListener("resize", updateGlassSize)
  }, [])

  const transformStyle = `translate(calc(-50% + ${calculateElasticTranslation().x}px), calc(-50% + ${calculateElasticTranslation().y}px)) ${calculateDirectionalScale()}`

  const baseStyle = {
    ...style,
    transform: transformStyle,
    transition: "all ease-out 0.2s",
  }

  const positionStyles = {
    position: baseStyle.position || "relative",
    top: baseStyle.top || "50%",
    left: baseStyle.left || "50%",
  }

  return (
    <>
      <div
        className={`bg-black transition-all duration-150 ease-in-out pointer-events-none ${overLight ? "opacity-20" : "opacity-0"}`}
        style={{
          ...positionStyles,
          height: glassSize.height,
          width: glassSize.width,
          borderRadius: `${cornerRadius}px`,
          transform: baseStyle.transform,
          transition: baseStyle.transition,
        }}
      />
      <div
        className={`bg-black transition-all duration-150 ease-in-out pointer-events-none mix-blend-overlay ${overLight ? "opacity-100" : "opacity-0"}`}
        style={{
          ...positionStyles,
          height: glassSize.height,
          width: glassSize.width,
          borderRadius: `${cornerRadius}px`,
          transform: baseStyle.transform,
          transition: baseStyle.transition,
        }}
      />

      <GlassContainer
        ref={glassRef}
        className={className}
        style={baseStyle}
        cornerRadius={cornerRadius}
        displacementScale={overLight ? displacementScale * 0.5 : displacementScale}
        blurAmount={blurAmount}
        saturation={saturation}
        aberrationIntensity={aberrationIntensity}
        glassSize={glassSize}
        padding={padding}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        active={isActive}
        overLight={overLight}
        mode={mode}
      >
        {children}
      </GlassContainer>

      <span
        style={{
          ...positionStyles,
          height: glassSize.height,
          width: glassSize.width,
          borderRadius: `${cornerRadius}px`,
          transform: baseStyle.transform,
          transition: baseStyle.transition,
          pointerEvents: "none",
          mixBlendMode: "screen",
          opacity: 0.2,
          padding: "1.5px",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          boxShadow: "0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 3px rgba(255, 255, 255, 0.25) inset, 0 1px 4px rgba(0, 0, 0, 0.35)",
          background: `linear-gradient(
          ${135 + mouseOffset.x * 1.2}deg,
          rgba(255, 255, 255, 0.0) 0%,
          rgba(255, 255, 255, ${0.12 + Math.abs(mouseOffset.x) * 0.008}) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%,
          rgba(255, 255, 255, ${0.4 + Math.abs(mouseOffset.x) * 0.012}) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%,
          rgba(255, 255, 255, 0.0) 100%
        )`,
        }}
      />

      <span
        style={{
          ...positionStyles,
          height: glassSize.height,
          width: glassSize.width,
          borderRadius: `${cornerRadius}px`,
          transform: baseStyle.transform,
          transition: baseStyle.transition,
          pointerEvents: "none",
          mixBlendMode: "overlay",
          padding: "1.5px",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          boxShadow: "0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 3px rgba(255, 255, 255, 0.25) inset, 0 1px 4px rgba(0, 0, 0, 0.35)",
          background: `linear-gradient(
          ${135 + mouseOffset.x * 1.2}deg,
          rgba(255, 255, 255, 0.0) 0%,
          rgba(255, 255, 255, ${0.32 + Math.abs(mouseOffset.x) * 0.008}) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%,
          rgba(255, 255, 255, ${0.6 + Math.abs(mouseOffset.x) * 0.012}) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%,
          rgba(255, 255, 255, 0.0) 100%
        )`,
        }}
      />
    </>
  )
}