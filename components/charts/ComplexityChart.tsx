'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { classColor } from '@/lib/utils'
import { t } from '@/lib/theme'
import { s } from '@/lib/styles'

interface Props { data: Record<string, number> }

export default function ComplexityChart({ data }: Props) {
  const items = Object.entries(data).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
    value,
    color: classColor(name),
  }))

  if (items.length === 0 || items.every(i => i.value === 0)) return <Empty />

  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie data={items} cx="50%" cy="50%" innerRadius={48} outerRadius={70} dataKey="value" paddingAngle={4}>
          {items.map((e, i) => <Cell key={i} fill={e.color} />)}
        </Pie>
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
        />
        <Legend
          iconType="circle"
          iconSize={7}
          formatter={(v) => (
            <span style={{ color: t.colors.textSecondary, fontSize: 11, fontFamily: t.typography.fontBody.join(',') }}>
              {v}
            </span>
          )}
        />
      </PieChart>
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
