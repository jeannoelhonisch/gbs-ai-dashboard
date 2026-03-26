'use client'

/**
 * AI Dashboard — Web Motion System
 * Framer Motion adaptation of Mnemorya "Antigravity" motion philosophy.
 *
 * USAGE:
 *   import { SpringPressable, BreathingView, PulsingDot, FadeIn, StaggerList } from '@/lib/motion'
 *
 *   <SpringPressable onPress={fn}><Button /></SpringPressable>
 *   <BreathingView intensity="subtle"><Icon /></BreathingView>
 *   <FadeIn delay={0.1}><Card /></FadeIn>
 *
 * RULE: All animation parameters come from lib/theme.ts → t.motion.
 * Never define local spring configs or timing values in components.
 *
 * Docs: Mnemorya Design System → Animationen & Motion
 */

import React from 'react'
import { motion as fm, AnimatePresence, type HTMLMotionProps } from 'framer-motion'
import { t } from '@/lib/theme'

// ── Re-export framer primitives under our namespace ───────────────────────────
export { AnimatePresence }
export const motion = fm

// ── SpringPressable ───────────────────────────────────────────────────────────
// Drop-in for any clickable element. Spring-feedback on press.

interface SpringPressableProps extends Omit<HTMLMotionProps<'div'>, 'whileTap'> {
  children: React.ReactNode
  intensity?: keyof typeof t.motion.press
  onClick?: () => void
  disabled?: boolean
  as?: 'div' | 'button' | 'a'
}

export function SpringPressable({
  children,
  intensity = 'normal',
  onClick,
  disabled = false,
  style,
  className,
  ...rest
}: SpringPressableProps) {
  const preset = t.motion.press[intensity]

  return (
    <fm.div
      whileTap={disabled ? undefined : preset}
      whileHover={disabled ? undefined : { scale: 1.005 }}
      transition={t.motion.spring.snappy as any}
      onClick={disabled ? undefined : onClick}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer', ...style }}
      className={className}
      {...rest}
    >
      {children}
    </fm.div>
  )
}

// ── BreathingView ─────────────────────────────────────────────────────────────
// Ambient idle animation — subtly pulsing opacity + scale.

const BREATH_PRESETS = {
  subtle: { opMin: 0.82, opMax: 1,   scMin: 0.975, scMax: 1.015 },
  normal: { opMin: 0.70, opMax: 1,   scMin: 0.950, scMax: 1.04  },
  strong: { opMin: 0.55, opMax: 1,   scMin: 0.900, scMax: 1.08  },
} as const

interface BreathingViewProps {
  children: React.ReactNode
  intensity?: keyof typeof BREATH_PRESETS
  active?: boolean
  className?: string
}

export function BreathingView({
  children,
  intensity = 'subtle',
  active = true,
  className,
}: BreathingViewProps) {
  const { opMin, opMax, scMin, scMax } = BREATH_PRESETS[intensity]
  const cycle = t.motion.timing.breathCycle

  return (
    <fm.div
      animate={active
        ? { opacity: [opMax, opMin, opMax], scale: [scMax, scMin, scMax] }
        : { opacity: 1, scale: 1 }
      }
      transition={active
        ? { duration: cycle * 2, repeat: Infinity, ease: 'easeInOut' }
        : { duration: 0.3 }
      }
      className={className}
    >
      {children}
    </fm.div>
  )
}

// ── PulsingDot ────────────────────────────────────────────────────────────────
// Animated alert indicator — pulsing opacity + scale.

interface PulsingDotProps {
  color: string
  size?: number
  active?: boolean
  className?: string
}

export function PulsingDot({ color, size = 8, active = true, className }: PulsingDotProps) {
  const cycle = t.motion.timing.alertCycle

  return (
    <fm.div
      animate={active
        ? { opacity: [1, 0.5, 1], scale: [1, 1.35, 1] }
        : { opacity: 1, scale: 1 }
      }
      transition={active
        ? { duration: cycle * 2, repeat: Infinity, ease: 'easeInOut' }
        : { duration: 0.3 }
      }
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        flexShrink: 0,
      }}
    />
  )
}

// ── FadeIn ────────────────────────────────────────────────────────────────────
// Standard item entrance — fade up from below (Mnemorya stagger pattern).

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

export function FadeIn({ children, delay = 0, direction = 'up', className }: FadeInProps) {
  const offset = 12
  const initial = {
    opacity: 0,
    y: direction === 'up' ? offset : direction === 'down' ? -offset : 0,
    x: direction === 'left' ? offset : direction === 'right' ? -offset : 0,
  }

  return (
    <fm.div
      initial={initial}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        ...t.motion.spring.gentle,
        delay,
      } as any}
      className={className}
    >
      {children}
    </fm.div>
  )
}

// ── StaggerList ───────────────────────────────────────────────────────────────
// Staggered list entrance — children fade in one after another.

interface StaggerListProps {
  children: React.ReactNode[]
  baseDelay?: number
  className?: string
}

export function StaggerList({ children, baseDelay = 0, className }: StaggerListProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <FadeIn key={i} delay={baseDelay + i * t.motion.timing.stagger}>
          {child}
        </FadeIn>
      ))}
    </div>
  )
}

// ── PageTransition ────────────────────────────────────────────────────────────
// Wraps page content with a smooth entrance.

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <fm.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...t.motion.spring.gentle, duration: t.motion.timing.transition } as any}
      className={className}
    >
      {children}
    </fm.div>
  )
}

// ── NumberTicker ──────────────────────────────────────────────────────────────
// Animates a number counting up from 0 to its target value.

interface NumberTickerProps {
  value: number
  duration?: number
  className?: string
  suffix?: string
}

export function NumberTicker({ value, duration = 1.2, className, suffix }: NumberTickerProps) {
  return (
    <fm.span
      className={className}
      style={{ display: 'inline-block' }}
    >
      <Counter from={0} to={value} duration={duration} suffix={suffix} />
    </fm.span>
  )
}

// Internal counter helper
function Counter({ from, to, duration, suffix = '' }: { from: number; to: number; duration: number; suffix?: string }) {
  const [count, setCount] = React.useState(from)

  React.useEffect(() => {
    const start = performance.now()
    let frame: number

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(from + (to - from) * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [from, to, duration])

  return <>{count}{suffix}</>
}
