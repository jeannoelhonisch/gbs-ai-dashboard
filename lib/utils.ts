import { clsx, type ClassValue } from 'clsx'
import { formatDistanceToNow, parseISO, isValid } from 'date-fns'
import { t } from '@/lib/theme'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatRelativeTime(dateStr: string | null): string {
  if (!dateStr) return 'Nie'
  try {
    const d = parseISO(dateStr.replace(' ', 'T'))
    if (!isValid(d)) return 'Unbekannt'
    return formatDistanceToNow(d, { addSuffix: true })
  } catch {
    return 'Unbekannt'
  }
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s === 0 ? `${m}min` : `${m}min ${s}s`
}

// Signal colors from theme.ts — single source of truth
export function severityColor(severity: string): string {
  const map: Record<string, string> = {
    BLOCKER:  t.colors.signalRed,
    CRITICAL: t.colors.signalOrange,
    MAJOR:    t.colors.signalAmber,
    MINOR:    t.colors.signalBlue,
    INFO:     t.colors.signalGray,
  }
  return map[severity] ?? t.colors.signalGray
}

export function typeColor(type: string): string {
  const map: Record<string, string> = {
    VULNERABILITY: t.colors.signalRed,
    BUG:           t.colors.signalOrange,
    CODE_SMELL:    t.colors.signalPurple,
  }
  return map[type] ?? t.colors.signalGray
}

export function classColor(cls: string): string {
  const map: Record<string, string> = {
    SIMPLE:  t.colors.signalGreen,
    simple:  t.colors.signalGreen,
    MEDIUM:  t.colors.signalAmber,
    medium:  t.colors.signalAmber,
    COMPLEX: t.colors.signalRed,
    complex: t.colors.signalRed,
  }
  return map[cls] ?? t.colors.signalGray
}
