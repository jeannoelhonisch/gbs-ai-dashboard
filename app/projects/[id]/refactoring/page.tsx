import { notFound } from 'next/navigation'
import TopBar from '@/components/layout/TopBar'
import Card from '@/components/ui/Card'
import SeverityChart from '@/components/charts/SeverityChart'
import ComplexityChart from '@/components/charts/ComplexityChart'
import TypeChart from '@/components/charts/TypeChart'
import { getProjectById, getRefactoringStats } from '@/lib/data-reader'
import { formatMinutes, formatRelativeTime, formatDuration, severityColor, classColor } from '@/lib/utils'
import { getServerTranslations } from '@/lib/i18n/server'
import { s } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { FadeIn, PageTransition } from '@/lib/motion'
import { Wrench, Clock, Activity, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 60

interface Props { params: { id: string } }

export default function RefactoringDetail({ params }: Props) {
  const project = getProjectById(params.id)
  if (!project) notFound()

  const ref  = getRefactoringStats(project)
  const tr   = getServerTranslations()
  const K    = tr.refactoring

  const sevEntries   = Object.entries(ref.bySeverity)
  const typeEntries  = Object.entries(ref.byType)
  const classEntries = Object.entries(ref.byClassification)
  const classTotal   = classEntries.reduce((a, [, v]) => a + v, 0)
  const totalIssues  = sevEntries.reduce((a, [, v]) => a + v, 0)

  return (
    <>
      <TopBar
        title={`${project.displayName} · Refactoring`}
        subtitle={K.subtitle}
        showBack
      />

      <PageTransition className={s.pageContent}>

        {/* KPIs */}
        <FadeIn delay={0}>
          <div className={s.kpiGrid}>
            <div className={cn(s.card, s.cardPadding)}>
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-4 h-4 text-signalPurple" />
                <p className={s.bodyMuted}>{K.kpi.fixes}</p>
              </div>
              <p className={cn(s.kpiHero, 'text-signalPurple kpi-num')}>{ref.total}</p>
              <p className={s.bodyMuted}>{K.kpi.fixesSub}</p>
            </div>

            <div className={cn(s.card, s.cardPadding)}>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-signalGreen" />
                <p className={s.bodyMuted}>{K.kpi.successRate}</p>
              </div>
              <p className={cn(s.kpiHero, 'text-signalGreen kpi-num')}>{ref.successRate}%</p>
              <p className={s.bodyMuted}>{K.kpi.skipped(ref.skipped)}</p>
            </div>

            <div className={cn(s.card, s.cardPadding)}>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-brand" />
                <p className={s.bodyMuted}>{K.kpi.timeSaved}</p>
              </div>
              <p className={cn(s.kpiHero, 'text-brand')}>{formatMinutes(ref.timeSavedMinutes)}</p>
              <p className={s.bodyMuted}>{K.kpi.timeSavedSub}</p>
            </div>

            <div className={cn(s.card, s.cardPadding)}>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-signalBlue" />
                <p className={s.bodyMuted}>{K.kpi.lastRun}</p>
              </div>
              <p className={cn(s.kpiHero, 'kpi-num')}>{ref.lastCount}</p>
              <p className={s.bodyMuted}>
                {ref.lastRun ? formatRelativeTime(ref.lastRun) : tr.common.neverRun}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Charts row 1 */}
        <FadeIn delay={0.07}>
          <div className={s.twoCol}>
            <Card title={K.charts.severity} subtitle={K.charts.severitySub}>
              <SeverityChart data={ref.bySeverity} />
            </Card>
            <Card title={K.charts.type} subtitle={K.charts.typeSub}>
              <TypeChart data={ref.byType} />
            </Card>
          </div>
        </FadeIn>

        {/* Charts row 2 */}
        <FadeIn delay={0.12}>
          <div className={s.twoCol}>
            <Card title={K.charts.complexity} subtitle={K.charts.complexitySub}>
              <ComplexityChart data={ref.byClassification} />
            </Card>

            {/* Severity breakdown */}
            <Card title={K.charts.breakdown} subtitle={K.charts.breakdownSub}>
              {sevEntries.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {sevEntries.map(([sev, count]) => {
                    const pct   = totalIssues > 0 ? Math.round((count / totalIssues) * 100) : 0
                    const color = severityColor(sev)
                    return (
                      <div key={sev}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                            <span className={s.body}>{sev}</span>
                          </div>
                          <span className="font-semibold text-sm font-display kpi-num" style={{ color }}>{count}</span>
                        </div>
                        <div className={s.progressTrack}>
                          <div className={s.progressBar} style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="h-[180px] flex items-center justify-center">
                  <p className={s.bodyMuted}>{K.charts.noSeverity}</p>
                </div>
              )}
            </Card>
          </div>
        </FadeIn>

        {/* Classification table */}
        {classEntries.length > 0 && (
          <FadeIn delay={0.17}>
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
                    const sr    = ref.byClassificationSuccess[cls]
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
                          {formatMinutes(count * 20)}
                        </td>
                      </tr>
                    )
                  })}
                  <tr className={cn(s.tableRow, 'font-semibold border-t-2 border-borderMuted')}>
                    <td className={cn(s.tableCell, s.headingSm)}>{tr.common.total}</td>
                    <td className={cn(s.tableCell, 'text-right text-signalPurple font-bold font-display kpi-num')}>{classTotal}</td>
                    <td className={cn(s.tableCell, 'text-right', s.body)}>100%</td>
                    <td className={cn(s.tableCell, 'text-right text-signalGreen font-semibold font-body')}>{ref.successRate}%</td>
                    <td className={cn(s.tableCell, 'text-right text-brand font-semibold font-body')}>{formatMinutes(ref.timeSavedMinutes)}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </FadeIn>
        )}

        {ref.total === 0 && (
          <FadeIn>
            <div className={s.emptyState}>
              <Wrench className={s.emptyIcon} />
              <p className={s.emptyText}>{K.empty.text}</p>
              <p className={s.emptySubtext}>{K.empty.subtext}</p>
            </div>
          </FadeIn>
        )}

      </PageTransition>
    </>
  )
}
