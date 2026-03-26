/**
 * AI Dashboard — Singleton Style Classes
 *
 * Single Source of Truth for reusable Tailwind class strings.
 * All components use these — never write raw class strings in components.
 *
 * Rule: One change here → affects the whole app.
 * Import: `import { s } from '@/lib/styles'`
 *
 * Naming convention:
 *   s.card           → static class string
 *   s.cardWith(x)    → function returning class string with variant
 */

import { cn } from '@/lib/utils'

// ── Surfaces & Cards ──────────────────────────────────────────────────────────

export const s = {

  // Cards
  card:             'bg-surface border border-borderSoft rounded-2xl',
  cardElevated:     'bg-surfaceSoft border border-borderMuted rounded-2xl',
  cardPadding:      'p-5',
  cardHeader:       'px-5 py-4 border-b border-borderSoft',
  cardInteractive:  'bg-surface border border-borderSoft rounded-2xl hover:border-brand/30 hover:bg-surfaceSoft transition-all duration-200 cursor-pointer',

  // Page shell
  pageContent: 'p-6 flex flex-col gap-6',
  section:     'flex flex-col gap-4',

  // ── Typography ──────────────────────────────────────────────────────────────

  // Display headings (Sora)
  displayLg:   'font-display text-textPrimary text-3xl font-bold tracking-tight',
  displayMd:   'font-display text-textPrimary text-2xl font-bold tracking-tight',
  displaySm:   'font-display text-textPrimary text-xl font-semibold',

  // UI text (Manrope)
  headingLg:   'font-body text-textPrimary text-lg font-semibold',
  headingMd:   'font-body text-textPrimary text-base font-semibold',
  headingSm:   'font-body text-textPrimary text-sm font-semibold',

  body:        'font-body text-textSecondary text-sm',
  bodyMuted:   'font-body text-textMuted text-xs',
  label:       'font-body text-textMuted text-[11px] font-medium uppercase tracking-widest',
  mono:        'font-mono text-textMuted text-xs',

  // KPI numbers
  kpiHero:     'font-display text-textPrimary text-4xl font-bold tabular-nums',
  kpiLarge:    'font-display text-textPrimary text-3xl font-bold tabular-nums',
  kpiMedium:   'font-display text-textPrimary text-xl font-bold tabular-nums',

  // ── Brand & Colors ──────────────────────────────────────────────────────────

  brandText:   'text-brand',
  brandBg:     'bg-brand/10',
  brandBorder: 'border-brand/20',
  brandRing:   'ring-1 ring-brand/20',

  // ── Layout Grids ────────────────────────────────────────────────────────────

  kpiGrid:     'grid grid-cols-2 lg:grid-cols-4 gap-4',
  twoCol:      'grid grid-cols-1 lg:grid-cols-2 gap-6',
  threeCol:    'grid grid-cols-1 lg:grid-cols-3 gap-6',
  threeToTwo:  'grid grid-cols-1 lg:grid-cols-3 gap-6', // 1:2 layout

  // ── Interactive States ──────────────────────────────────────────────────────

  interactive: 'transition-colors duration-200 cursor-pointer',
  focusRing:   'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-1 focus-visible:ring-offset-bg',
  hoverSurface:'hover:bg-surfaceSoft',

  // Sidebar nav link
  navLink: (active: boolean) => cn(
    'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
    active
      ? 'bg-brand/10 text-brand'
      : 'text-textSecondary hover:text-textPrimary hover:bg-surfaceSoft'
  ),

  // ── Progress / Bars ─────────────────────────────────────────────────────────

  progressTrack: 'h-1.5 rounded-full bg-surfaceSoft overflow-hidden',
  progressBar:   'h-full rounded-full transition-all duration-500',
  progressThick: 'h-2.5 rounded-full bg-surfaceSoft overflow-hidden',

  // ── Badges ──────────────────────────────────────────────────────────────────

  badge:         'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium',
  badgeMd:       'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',

  // Trend badge (positive / negative)
  trendBadge: (positive: boolean) => cn(
    'text-xs font-medium px-2 py-0.5 rounded-full',
    positive ? 'bg-signalGreen/10 text-signalGreen' : 'bg-signalRed/10 text-signalRed'
  ),

  // ── Dividers ────────────────────────────────────────────────────────────────

  divider:     'border-t border-borderSoft',
  dividerMuted:'border-t border-borderMuted',

  // ── Icon Wrappers ────────────────────────────────────────────────────────────

  iconWrap: (color: string) => cn(
    'w-10 h-10 rounded-xl flex items-center justify-center ring-1',
    color
  ),

  // ── Table ───────────────────────────────────────────────────────────────────

  tableHeader: 'text-left text-[11px] text-textMuted uppercase tracking-widest border-b border-borderSoft pb-3 font-medium',
  tableRow:    'text-sm border-b border-borderSoft last:border-0',
  tableCell:   'py-3',

  // ── Empty states ─────────────────────────────────────────────────────────────

  emptyState:  'text-center py-16 flex flex-col items-center gap-3',
  emptyIcon:   'w-8 h-8 opacity-20',
  emptyText:   'text-textMuted text-sm',
  emptySubtext:'text-textMuted text-xs',

  // ── Buttons ──────────────────────────────────────────────────────────────────

  btnPrimary:  'flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-white text-sm font-semibold hover:bg-brandSoft transition-colors duration-200',
  btnGhost:    'flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surfaceSoft hover:bg-borderSoft text-textSecondary hover:text-textPrimary text-xs font-medium transition-colors duration-200',
  btnIcon:     'p-1.5 rounded-lg hover:bg-surfaceSoft text-textMuted hover:text-textPrimary transition-colors duration-200',

  // ── Stat mini-block ──────────────────────────────────────────────────────────

  statBlock:   'bg-surfaceSoft rounded-xl p-3 text-center',
  statValue:   'text-xl font-bold font-display tabular-nums',
  statLabel:   'text-textMuted text-[10px] mt-0.5 font-body',

} as const
