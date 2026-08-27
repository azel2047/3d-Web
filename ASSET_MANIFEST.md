# ASSET MANIFEST

## Asset Strategy

This website is built entirely with **procedural/generated assets**. No external stock images, videos, or 3D models are required.

### ASSET REQUIREMENTS MAP

```
HERO
→ Procedural Three.js scene
→ Distorted icosahedron with wireframe material
→ Particle field (2000 particles)
→ Orbital ring geometry
→ Custom lighting setup
→ NO EXTERNAL ASSET REQUIRED

PROJECTS (x4)
→ Procedural Canvas 2D animations per card
→ Circuit pattern, wave pattern, grid pattern, abstract pattern
→ All generated at runtime
→ NO EXTERNAL ASSET REQUIRED

ABOUT
→ Matrix-style data stream Canvas animation
→ Procedural character rain effect
→ NO EXTERNAL ASSET REQUIRED

EXPERIMENTS
→ Three.js scene with noise plane shader
→ Floating torus knot geometry
→ Custom GLSL vertex/fragment shaders
→ NO EXTERNAL ASSET REQUIRED

BACKGROUND
→ CSS gradients and procedural canvas elements
→ NO EXTERNAL ASSET REQUIRED

CURSOR
→ Custom SVG/CSS cursor with spring physics
→ NO EXTERNAL ASSET REQUIRED

PRELOADER
→ CSS animation spinner with dots
→ NO EXTERNAL ASSET REQUIRED
```

## Local Paths

All procedural assets are embedded in component files:

```
src/
├── components/
│   ├── Hero.tsx          → Three.js scene (sphere, particles, ring)
│   ├── Projects.tsx      → Canvas 2D procedural patterns
│   ├── About.tsx         → Matrix data stream animation
│   ├── Experiments.tsx   → Three.js shader scene
│   ├── Preloader.tsx     → CSS animated loading screen
│   └── CustomCursor.tsx  → Framer Motion cursor
```

## Public Assets Directory

```
public/
└── assets/
    ├── images/
    │   ├── projects/     → (empty - all procedural)
    │   ├── textures/     → (empty - all procedural)
    │   └── backgrounds/  → (empty - all procedural)
    ├── videos/
    │   ├── projects/     → (empty - all procedural)
    │   └── backgrounds/  → (empty - all procedural)
    └── models/
        └── webgl/        → (empty - all procedural)
```

## External Dependencies

| Package | Purpose | License |
|---------|---------|---------|
| three | 3D rendering | MIT |
| @react-three/fiber | React Three.js renderer | MIT |
| @react-three/drei | Three.js helpers | MIT |
| framer-motion | Animations | MIT |
| gsap | Animation library | MIT |
| next | Framework | MIT |
| tailwindcss | Styling | MIT |

## Verification Checklist

- [x] No missing images
- [x] No broken video
- [x] No placeholder assets
- [x] No random unrelated imagery
- [x] No watermarks
- [x] No accidental copyrighted assets
- [x] No external assets required
- [x] Images optimized (N/A - procedural)
- [x] Videos optimized (N/A - procedural)
- [x] Mobile assets optimized (N/A - procedural)
- [x] Hero works without external assets
- [x] Website works if external asset network requests fail
- [x] Website feels premium with zero external assets
