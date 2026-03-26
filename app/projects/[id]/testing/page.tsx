import { notFound } from 'next/navigation'
import TopBar from '@/components/layout/TopBar'
import Card from '@/components/ui/Card'
import ComplexityChart from '@/components/charts/ComplexityChart'
import { getProjectById, getTestingStats } from '@/lib/data-reader'
import { formatMinutes, formatRelativeTime, formatDuration, classColor } from '@/lib/utils'
import { getServerTranslations } from '@/lib/i18n'
import { s } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { FadeIn, PageTransition } from '@/lib/motion'
import { FlaskConical, Clock, Activity, Target } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 60

interface Props { params: { id: string } }

export default function TestingDetail({ params }: Props) {
  const project = getProjectById(params.id)
  if (!project) notFound()

  const test = getTestingStats(project)
  const tr   = getServerTranslations()
  const K    = tr.testing

  const classEntries   = Object.entries(test.byClassification)
  const classTotal     = classEntries.reduce((a, [, v]) => a + v, 0)
  const successEntries = Object.entries(test.byClassificationSuccess)

  return (
    <>
      <TopBar
        title={`${project.displayName} · ${tr.common.tests}`}
        subtitle={K.subtitle}
        showBack
      />

      <PageTransition className={s.pageContent}>

        {/* KPIs */}
        <FadeIn delay={0}>
          <div className={s.kpiGrid}>
            <div className={cn(s.card, s.cardPadding)}>
              <div className="flex items-center gap-2 mb-3">
                <FlaskConical className="w-4 h-4 text-signalGreen" />
                <p className={s.bodyMuted}>{K.kpi.generated}</p>
              </div>
              <p className={cn(s.kpiHero, 'text-signalGreen kpi-num')}>{test.total}</p>
              <p className={s.bodyMuted}>{K.kpi.generatedSub}</p>
            </div>

            <div className={cn(s.card, s.cardPadding)}>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-signalBlue" />
                <p className={s.bodyMuted}>{K.kpi.lastRun}</p>
              </div>
              <p className={cn(s.kpiHero, 'kpi-num')}>{test.lastCount}</p>
              <p className={s.bodyMuted}>
                {test.lastRun ? formatRelativeTime(test.lastRun) : tr.common.neverRun}
              </p>
            </div>

            <div className={cn(s.card, s.cardPadding)}>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-brand" />
                <p className={s.bodyMuted}>{K.kpi.timeSaved}</p>
              </div>
              <p className={cn(s.kpiHero, 'text-brand')}>{formatMinutes(test.timeSavedMinutes)}</p>
              <p className={s.bodyMuted}>{K.kpi.timeSavedSub}</p>
            </div>

            <div className={cn(s.card, s.cardPadding)}>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-signalCyan" />
                <p className={s.bodyMuted}>{K.kpi.pipeline}</p>
              </div>
              <p className={cn(s.kpiHero, 'text-signalCyan')}>
                {test.durationSeconds > 0 ? formatDuration(test.durationSeconds) : '—'}
              </p>
              <p className={s.bodyMuted}>{K.kpi.pipelineSub}</p>
            </div>
          </div>
        </FadeIn>

        {/* Charts */}
        <FadeIn delay={0.07}>
          <div className={s.twoCol}>
            <Card title={K.charts.complexity} subtitle={K.charts.complexitySub}>
              <ComplexityChart data={test.byClassification} />
            </Card>

            <Card title={K.charts.successRate} subtitle={K.charts.successSub}>
              {successEntries.length > 0 ? (
                <div className="flex flex-col gap-4 mt-1">
                  {successEntries.map(([cls, rate]) => {
                    const pct   = Math.round(rate * 100)
                    const color = classColor(cls)
                    return (
                      <div key={cls}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className={cn(s.body, 'capitalize')}>{cls.toLowerCase()}</span>
                          <span className="font-semibold text-sm font-body" style={{ color }}>{pct}%</span>
                        </div>
                        <div className={s.progressThick}>
                          <div className={s.progressBar} style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                        <p className={cn(s.bodyMuted, 'mt-1')}>
                          {K.charts.testsInClass(test.byClassification[cls] ?? 0)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="h-[180px] flex items-center justify-center">
                  <p className={s.bodyMuted}>{K.charts.noSuccessData}</p>
                </div>
              )}
            </Card>
          </div>
        </FadeIn>

        {/* Table */}
        {classEntries.length > 0 && (
          <FadeIn delay={0.14}>
            <Card title={K.table.title} subtitle={K.table.subtitle}>
              <table className="w-full">
                <thead>
                  <tr>
                    {[K.table.class, K.table.count, K.table.share, K.table.successRate, K.table.timeSaved].map((h, i) => (
                      <th key={i} className={cn(s.tableHeader, i > 0 ? 'text-right' : '')}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {classEntries.map(([cls, count]) => {
                    const pct   = classTotal > 0 ? Math.round((count / classTotal) * 100) : 0
                    const sr    = test.byClassificationSuccess[cls]
                    const color = classColor(cls)
                    return (
                      <tr key={cls} className={s.tableRow}>
                        <td className={s.tableCell}>
                          <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                            <span className={cn(s.headingSm, 'capitalize font-medium')}>{cls.toLowerCase()}</span>
                          </span>
                        </td>
                        <td className={cn(s.tableCell, 'text-right font-semibold font-display kpi-num')} style={{ color }}>{count}</td>
                        <td className={cn(s.tableCell, 'text-right', s.body)}>{pct}%</td>
                        <td className={cn(s.tableCell, 'text-right', s.body)}>
                          {sr !== undefined ? `${Math.round(sr * 100)}%` : '—'}
                        </td>
                        <td className={cn(s.tableCell, 'text-right text-brand font-medium font-body')}>
                          {formatMinutes(count * 30)}
                        </td>
                      </tr>
                    )
                  })}
                  <tr className={cn(s.tableRow, 'font-semibold border-t-2 border-borderMuted')}>
                    <td className={cn(s.tableCell, s.headingSm)}>{tr.common.total}</td>
                    <td className={cn(s.tableCell, 'text-right text-signalGreen font-bold font-display kpi-num')}>{classTotal}</td>
                    <td className={cn(s.tableCell, 'text-right', s.body)}>100%</td>
                    <td className={cn(s.tableCell, 'text-right', s.body)}>—</td>
                    <td className={cn(s.tableCell, 'text-right text-brand font-semibold font-body')}>{formatMinutes(test.timeSavedMinutes)}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </FadeIn>
        )}

        {test.total === 0 && (
          <FadeIn>
            <div className={s.emptyState}>
              <FlaskConical className={s.emptyIcon} />
              <p className={s.emptyText}>{K.empty.text}</p>
              <p className={s.emptySubtext}>{K.empty.subtext}</p>
            </div>
          </FadeIn>
        )}

      </PageTransition>
    </>
  )
}
