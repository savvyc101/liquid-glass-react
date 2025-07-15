export interface Vec2 {
  x: number
  y: number
}

export type GlassMode = "standard" | "polar" | "prominent" | "shader"

export interface GlassEffectProps {
  displacementScale?: number
  blurAmount?: number
  saturation?: number
  aberrationIntensity?: number
  elasticity?: number
  cornerRadius?: number
  overLight?: boolean
  mode?: GlassMode
  mouseContainer?: React.RefObject<HTMLElement | null> | null
  globalMousePos?: Vec2
  mouseOffset?: Vec2
}

export interface BaseGlassProps extends GlassEffectProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  padding?: string
}

export interface ShaderOptions {
  width: number
  height: number
  fragment: (uv: Vec2, mouse?: Vec2) => Vec2
  mousePosition?: Vec2
}