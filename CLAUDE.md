# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Build Commands
- `npm run build` - Complete build process (clean, ESM, CJS, types)
- `npm run build:esm` - Build ESM module only
- `npm run build:cjs` - Build CommonJS module only
- `npm run build:types` - Generate TypeScript declarations
- `npm run clean` - Remove dist directory

### Development
- `npm run dev` - Watch mode for ESM build (rebuilds on file changes)
- `npm run prepublishOnly` - Pre-publish build step

### Linting/Formatting
- Uses Biome for code formatting and linting (@biomejs/biome)
- Check package.json for any additional linting scripts

## Project Architecture

### Core Structure
This is a React component library that implements Apple's Liquid Glass effect. The project has a monorepo structure with workspaces:

- **Main package**: Root directory contains the library source
- **Example app**: `liquid-glass-example/` contains a Next.js demo application
- **Build output**: `dist/` contains compiled library files (ESM, CJS, and TypeScript declarations)

### Source Code Organization (`src/`)
- `index.tsx` - Main LiquidGlass component and GlassContainer
- `shader-utils.ts` - WebGL shader utilities for displacement map generation
- `utils.ts` - Pre-built displacement maps for different visual modes

### Key Technical Details

#### Component Architecture
- **LiquidGlass**: Main exported component with mouse tracking, elastic transformations, and visual effect management
- **GlassContainer**: Internal container component handling SVG filters and backdrop effects
- **GlassFilter**: SVG filter component implementing displacement mapping and chromatic aberration

#### Visual Effect Modes
- `standard` - Basic displacement mapping
- `polar` - Polar coordinate-based displacement  
- `prominent` - Enhanced displacement effect
- `shader` - Real-time WebGL-generated displacement maps

#### Browser Compatibility
- Firefox: Limited support (displacement effects not visible)
- Safari: Partial support
- Chrome/Edge: Full support

#### Build System
- Uses esbuild for fast bundling
- Outputs both ESM and CJS formats
- TypeScript declarations generated separately
- External dependencies: React and React-DOM (peer dependencies)

### Development Notes
- Component uses advanced CSS features (backdrop-filter, SVG filters, mix-blend-mode)
- Mouse tracking can be internal or externally controlled via props
- Elastic transformations calculated based on mouse distance from component edges
- Performance optimized with useCallback and selective re-renders