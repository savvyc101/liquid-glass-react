export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export const glassPresets = {
  card: {
    displacementScale: 50,
    blurAmount: 0.2,
    saturation: 140,
    aberrationIntensity: 1,
    elasticity: 0.1,
    cornerRadius: 16,
  },
  button: {
    displacementScale: 64,
    blurAmount: 0.1,
    saturation: 130,
    aberrationIntensity: 2,
    elasticity: 0.35,
    cornerRadius: 12,
  },
  input: {
    displacementScale: 30,
    blurAmount: 0.15,
    saturation: 120,
    aberrationIntensity: 1,
    elasticity: 0.05,
    cornerRadius: 8,
  },
  modal: {
    displacementScale: 80,
    blurAmount: 0.3,
    saturation: 150,
    aberrationIntensity: 3,
    elasticity: 0.2,
    cornerRadius: 24,
  },
  subtle: {
    displacementScale: 20,
    blurAmount: 0.05,
    saturation: 110,
    aberrationIntensity: 0.5,
    elasticity: 0.02,
    cornerRadius: 6,
  }
}