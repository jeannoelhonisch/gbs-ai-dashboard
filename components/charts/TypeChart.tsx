'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { typeColor } from '@/lib/utils'
import { t } from '@/lib/theme'
import { s } from '@/lib/styles'

interface Props { data: Record<string, number> }

export default function TypeChart({ data }: Props) {
  const items = Object.entries(data).map(([name, value]) => ({
    name: name.replace('_', ' '),
    value,
    color: typeColor(name),
  }))

  if (items.length === 0) return <Empty />

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={items} barSize={28} layout="vertical">
        <XAxis
          type="number"
          tick={{ fill: t.colors.textMuted, fontSize: 11, fontFamily: t.typography.fontBody.join(',') }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          dataKey="name" type="category" width={90}
          tick={{ fill: t.colors.textSecondary, fontSize: 11, fontFamily: t.typography.fontBody.join(',') }}
          axisLine={false} tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: t.colors.surface,
            border: `1px solid ${t.colors.borderSoft}`,
            borderRadius: t.radius.lg,
            fontFamily: t.typography.fontBody.join(', '),
            fontSize: 12,
          }}
          labelStyle={{ color: t.colors.textPrimary, fontSize: 12 }}
          itemStyle={{ color: t.colors.textSecondary, fontSize: 12 }}
          cursor={{ fill: 'rgba(255,255,255,0.03)' }}
        />
        <Bar dataKey="value" radius={[0, 6, 6, 0]}>
          {items.map((e, i) => <Cell key={i} fill={e.color} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

function Empty() {
  return (
    <div className={`h-[180px] flex items-center justify-center ${s.bodyMuted}`}>
      Keine Daten
    </div>
  )
}
