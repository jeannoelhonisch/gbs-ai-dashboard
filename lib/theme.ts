/**
 * AI Dashboard — Design Token System
 * Inspired by Mnemorya "Antigravity" Design Philosophy
 *
 * Single Source of Truth for all design values.
 * - Tailwind config reads from here
 * - Components import `t` for raw values (e.g. recharts colors)
 * - styles.ts builds reusable class strings from these tokens
 *
 * Rule: Never hardcode a color, radius, or font anywhere else.
 * Import: `import { t } from '@/lib/theme'`
 */

// ── Color Palette ─────────────────────────────────────────────────────────────

export const colors = {
  // 70% — Dark neutral backgrounds (near-black atmosphere)
  bg:          '#09090f',   // App background
  surface:     '#0e1019',   // Cards, panels
  surfaceSoft: '#13151f',   // Elevated inner surfaces
  borderSoft:  '#1c1f2e',   // Standard borders
  borderMuted: '#242738',   // Secondary borders

  // Text hierarchy
  textPrimary:   '#F0F4FA',  // Headlines, primary content
  textSecondary: '#8A97AD',  // Descriptions, meta
  textMuted:     '#4D5A6E',  // Timestamps, labels, kickers

  // 20% — Brand Orange (primary action + active state)
  brand:         '#F97316',   // Primary CTAs, active tabs, highlights
  brandSoft:     '#FB923C',   // Hover states
  brandSurface:  '#F9731610', // Very soft background tint
  brandBorder:   '#F9731625', // Orange borders
  brandText:     '#FED7AA',   // Text on orange tinted surfaces

  // 10% — Signal colors (severity, types, status — always meaningful)
  signalRed:    '#EF4444',  // BLOCKER / Errors / Critical
  signalOrange: '#F97316',  // CRITICAL (shares brand, semantic meaning)
  signalAmber:  '#F59E0B',  // MAJOR / Warnings
  signalBlue:   '#3B82F6',  // MINOR / Info
  signalGreen:  '#10B981',  // SUCCESS / Testing
  signalPurple: '#8B5CF6',  // CODE_SMELL / Refactoring
  signalCyan:   '#06B6D4',  // Neutral info / secondary
  signalGray:   '#6B7280',  // INFO / Disabled
}

// ── Typography ────────────────────────────────────────────────────────────────

export const typography = {
  // Sora for display/headings, Manrope for body — same as Mnemorya mobile
  fontDisplay: ['Sora', 'system-ui', 'sans-serif'],
  fontBody:    ['Manrope', 'system-ui', 'sans-serif'],

  // Size scale (rem)
  size: {
    xs:   '0.6875rem', // 11px — labels, kickers
    sm:   '0.75rem',   // 12px — meta, timestamps
    base: '0.875rem',  // 14px — body text
    md:   '1rem',      // 16px — card titles
    lg:   '1.125rem',  // 18px — page titles
    xl:   '1.5rem',    // 24px — KPI values
    '2xl':'2rem',      // 32px — hero numbers
    '3xl':'2.5rem',    // 40px — large KPIs
  },

  // Weight
  weight: {
    regular:   '400',
    medium:    '500',
    semibold:  '600',
    bold:      '700',
  },
}

// ── Border Radius ─────────────────────────────────────────────────────────────
// Organic, modern — generously rounded (Mnemorya style)

export const radius = {
  sm:   '8px',   // Small chips, badges, buttons
  md:   '10px',  // Tabs, segments
  lg:   '12px',  // Small cards
  xl:   '14px',  // Standard cards
  '2xl':'16px',  // Large cards, modals
  '3xl':'20px',  // Hero cards
  pill: '9999px',// Pills, avatars
}

// ── Shadows ───────────────────────────────────────────────────────────────────
// Very restrained. UI feels light, not heavy.

export const shadows = {
  soft:   '0 2px 12px rgba(0,0,0,0.35)',   // Standard card shadow
  medium: '0 4px 24px rgba(0,0,0,0.45)',   // Elevated modals
  brand:  '0 4px 16px rgba(249,115,22,0.25)', // Orange glow for CTAs
  glow:   '0 0 20px rgba(249,115,22,0.15)',   // Subtle brand ambient
}

// ── Motion / Animation ────────────────────────────────────────────────────────
// See lib/motion.tsx for components. These are the raw config values.

export const motion = {
  spring: {
    snappy: { type: 'spring', damping: 15, stiffness: 400, mass: 0.8 },
    gentle: { type: 'spring', damping: 20, stiffness: 200, mass: 1.0 },
    bouncy: { type: 'spring', damping: 8,  stiffness: 300, mass: 0.6 },
  },
  timing: {
    micro:      0.15,  // Button press, toggle
    transition: 0.30,  // Modal open, screen change
    stagger:    0.05,  // Per-item in staggered lists
    breathCycle:2.0,   // Ambient breathing (one direction, seconds)
    alertCycle: 1.2,   // Pulsing dot
  },
  press: {
    normal: { scale: 0.97 },
    tight:  { scale: 0.94 },
    subtle: { scale: 0.985 },
  },
  easing: {
    standard: [0.4, 0.0, 0.2, 1],    // Material standard
    decelerate:[0.0, 0.0, 0.2, 1],   // Items entering
    accelerate:[0.4, 0.0, 1.0, 1],   // Items leaving
  },
}

// ── Spacing ───────────────────────────────────────────────────────────────────

export const spacing = {
  pagePadding: '1.5rem',   // p-6
  cardPadding: '1.25rem',  // p-5
  gap:         '1rem',     // gap-4
  gapLg:       '1.5rem',   // gap-6
}

// ── Convenience export ────────────────────────────────────────────────────────

export const t = {
  colors,
  typography,
  radius,
  shadows,
  motion,
  spacing,
} as const
