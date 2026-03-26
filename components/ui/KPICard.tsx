import type { LucideIcon } from 'lucide-react'
import { s } from '@/lib/styles'
import { cn } from '@/lib/utils'

type SignalColor = 'brand' | 'green' | 'purple' | 'amber' | 'red' | 'cyan' | 'blue'

interface Props {
  label: string
  value: string | number
  sub?: string
  icon: LucideIcon
  color?: SignalColor
  trend?: { value: number; label: string }
}

const colorMap: Record<SignalColor, { bg: string; text: string; ring: string }> = {
  brand:  { bg: 'bg-brand/10',         text: 'text-brand',        ring: 'ring-brand/20' },
  green:  { bg: 'bg-signalGreen/10',   text: 'text-signalGreen',  ring: 'ring-signalGreen/20' },
  purple: { bg: 'bg-signalPurple/10',  text: 'text-signalPurple', ring: 'ring-signalPurple/20' },
  amber:  { bg: 'bg-signalAmber/10',   text: 'text-signalAmber',  ring: 'ring-signalAmber/20' },
  red:    { bg: 'bg-signalRed/10',     text: 'text-signalRed',    ring: 'ring-signalRed/20' },
  cyan:   { bg: 'bg-signalCyan/10',    text: 'text-signalCyan',   ring: 'ring-signalCyan/20' },
  blue:   { bg: 'bg-signalBlue/10',    text: 'text-signalBlue',   ring: 'ring-signalBlue/20' },
}

export default function KPICard({ label, value, sub, icon: Icon, color = 'brand', trend }: Props) {
  const c = colorMap[color]

  return (
    <div className={cn(s.card, s.cardPadding, 'flex flex-col gap-4')}>
      <div className="flex items-start justify-between">
        <div className={cn(s.iconWrap(`${c.bg} ring-1 ${c.ring}`))}>
          <Icon className={cn('w-4.5 h-4.5', c.text)} />
        </div>
        {trend && (
          <span className={s.trendBadge(trend.value >= 0)}>
            {trend.value >= 0 ? '+' : ''}{trend.value} {trend.label}
          </span>
        )}
      </div>

      <div>
        <p className={cn(s.kpiHero, 'kpi-num')}>{value}</p>
        <p className={cn(s.body, 'mt-1')}>{label}</p>
        {sub && <p className={cn(s.bodyMuted, 'mt-0.5 text-textMuted')}>{sub}</p>}
      </div>
    </div>
  )
}
