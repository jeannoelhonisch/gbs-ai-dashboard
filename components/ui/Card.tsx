import { cn } from '@/lib/utils'
import { s } from '@/lib/styles'

interface Props {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
  elevated?: boolean
}

export default function Card({ children, className, title, subtitle, elevated }: Props) {
  return (
    <div className={cn(elevated ? s.cardElevated : s.card, className)}>
      {(title || subtitle) && (
        <div className={s.cardHeader}>
          {title    && <h3 className={s.headingSm}>{title}</h3>}
          {subtitle && <p className={cn(s.bodyMuted, 'mt-0.5')}>{subtitle}</p>}
        </div>
      )}
      <div className={s.cardPadding}>{children}</div>
    </div>
  )
}
