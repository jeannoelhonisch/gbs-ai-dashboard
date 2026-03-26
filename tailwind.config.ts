import type { Config } from 'tailwindcss'
import { colors, radius, typography } from './lib/theme'

/**
 * Tailwind config — reads all tokens from lib/theme.ts (Single Source of Truth).
 * Never add colors or radius values here directly — always go through theme.ts.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // ── Colors from theme.ts ──────────────────────────────────────────────
      colors: {
        // Backgrounds
        bg:          colors.bg,
        surface:     colors.surface,
        surfaceSoft: colors.surfaceSoft,
        borderSoft:  colors.borderSoft,
        borderMuted: colors.borderMuted,

        // Text
        textPrimary:   colors.textPrimary,
        textSecondary: colors.textSecondary,
        textMuted:     colors.textMuted,

        // Brand (orange)
        brand:        colors.brand,
        brandSoft:    colors.brandSoft,
        brandText:    colors.brandText,

        // Signal / Semantic
        signalRed:    colors.signalRed,
        signalOrange: colors.signalOrange,
        signalAmber:  colors.signalAmber,
        signalBlue:   colors.signalBlue,
        signalGreen:  colors.signalGreen,
        signalPurple: colors.signalPurple,
        signalCyan:   colors.signalCyan,
        signalGray:   colors.signalGray,
      },

      // ── Border radius from theme.ts ───────────────────────────────────────
      borderRadius: {
        sm:   radius.sm,
        md:   radius.md,
        lg:   radius.lg,
        xl:   radius.xl,
        '2xl':radius['2xl'],
        '3xl':radius['3xl'],
        pill: radius.pill,
      },

      // ── Typography from theme.ts ──────────────────────────────────────────
      fontFamily: {
        display: typography.fontDisplay,
        body:    typography.fontBody,
        sans:    typography.fontBody, // default
      },
    },
  },
  plugins: [],
}

export default config
