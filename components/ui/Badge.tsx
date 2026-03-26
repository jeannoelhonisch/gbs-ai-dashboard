import { cn } from '@/lib/utils'
import { s } from '@/lib/styles'

interface Props {
  label: string
  color?: string
  size?: 'sm' | 'md'
}

export default function Badge({ label, color = '#6B7280', size = 'sm' }: Props) {
  return (
    <span
      className={cn(size === 'sm' ? s.badge : s.badgeMd)}
      style={{ backgroundColor: `${color}20`, color }}
    >
      {label}
    </span>
  )
}
