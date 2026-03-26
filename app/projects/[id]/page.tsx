import { notFound } from 'next/navigation'
import Link from 'next/link'
import TopBar from '@/components/layout/TopBar'
import Card from '@/components/ui/Card'
import { getProjectById, getRefactoringStats, getTestingStats } from '@/lib/data-reader'
import { formatMinutes, formatRelativeTime, classColor, severityColor } from '@/lib/utils'
import { getServerTranslations } from '@/lib/i18n'
import { s } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { FadeIn, PageTransition, SpringPressable, BreathingView } from '@/lib/motion'
import { FlaskConical, Wrench, Clock, ArrowRight, Activity } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 60

interface Props { params: { id: string } }

export default function ProjectOverview({ params }: Props) {
  const project = getProjectById(params.id)
  if (!project) notFound()

  const test = getTestingStats(project)
  const ref  = getRefactoringStats(project)
  const tr   = getServerTranslations()
  const timeSaved = test.timeSavedMinutes + ref.timeSavedMinutes
  const combined  = test.total + ref.total
  const workdays  = Math.round(timeSaved / 60 / 8)

  return (
    <>
      <TopBar
        title={project.displayName}
        subtitle={tr.projectOverview.subtitle(project.name)}
        showBack
      />

      <PageTransition className={s.pageContent}>

        {/* Hero KPIs */}
        <FadeIn delay={0}>
          <div className={s.kpiGrid}>
            {/* Total AI Actions */}
            <div className={cn(s.card, s.cardPadding)}>
              <p className={cn(s.bodyMuted, 'mb-3')}>{tr.projectOverview.kpi.totalActions}</p>
              <p className={cn(s.kpiHero, 'kpi-num')}>{combined}</p>
              <p className={s.bodyMuted}>{tr.projectOverview.kpi.totalSub(test.total, ref.total)}</p>
            </div>
            {/* Time saved */}
            <div className={cn(s.card, s.cardPadding)}>
              <p className={cn(s.bodyMuted, 'mb-3')}>{tr.projectOverview.kpi.timeSaved}</p>
              <p className={cn(s.kpiHero, 'kpi-num text-brand')}>{formatMinutes(timeSaved)}</p>
              <p className={s.bodyMuted}>{tr.projectOverview.kpi.workdaysSub(workdays)}</p>
            </div>
            {/* Tests */}
            <div className={cn(s.card, s.cardPadding)}>
              <p className={cn(s.bodyMuted, 'mb-3')}>{tr.projectOverview.kpi.testsGenerated}</p>
              <p className={cn(s.kpiHero, 'kpi-num text-signalGreen')}>{test.total}</p>
              <p className={s.bodyMuted}>
                {test.lastRun ? formatRelativeTime(test.lastRun) : tr.common.neverRun}
              </p>
            </div>
            {/* Fixes */}
            <div className={cn(s.card, s.cardPadding)}>
              <p className={cn(s.bodyMuted, 'mb-3')}>{tr.projectOverview.kpi.issuesFixed}</p>
              <p className={cn(s.kpiHero, 'kpi-num text-signalPurple')}>{ref.total}</p>
              <p className={s.bodyMuted}>
                {ref.successRate > 0 ? `${ref.successRate}% ${tr.projectOverview.kpi.successRate}` : tr.common.neverRun}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Testing + Refactoring side by side */}
        <FadeIn delay={0.07}>
          <div className={s.twoCol}>

            {/* Testing Card */}
            <Card title={tr.projectOverview.testing.cardTitle} subtitle={tr.projectOverview.testing.cardSubtitle}>
              <div className="flex flex-col gap-5">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className={s.statBlock}>
                    <p className={cn(s.statValue, 'text-signalGreen kpi-num')}>{test.total}</p>
                    <p className={s.statLabel}>{tr.projectOverview.testing.testsTotal}</p>
                  </div>
                  <div className={s.statBlock}>
                    <p className={cn(s.statValue, 'text-textPrimary kpi-num')}>{test.lastCount}</p>
                    <p className={s.statLabel}>{tr.projectOverview.testing.lastRunLabel}</p>
                  </div>
                  <div className={s.statBlock}>
                    <p className={cn(s.statValue, 'text-brand')}>{formatMinutes(test.timeSavedMinutes)}</p>
                    <p className={s.statLabel}>{tr.common.timeSaved}</p>
                  </div>
                </div>

                {/* Complexity bars */}
                {Object.keys(test.byClassification).length > 0 && (
                  <div>
                    <p className={cn(s.bodyMuted, 'mb-2')}>{tr.projectOverview.testing.complexity}</p>
                    <div className="flex flex-col gap-2">
                      {Object.entries(test.byClassification).map(([cls, count]) => {
                        const total = Object.values(test.byClassification).reduce((a, b) => a + b, 0)
                        const pct   = total > 0 ? Math.round((count / total) * 100) : 0
                        const color = classColor(cls)
                        return (
                          <div key={cls}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className={s.body + ' capitalize'}>{cls.toLowerCase()}</span>
                              <span className="font-medium font-body" style={{ color }}>{count} ({pct}%)</span>
                            </div>
                            <div className={s.progressTrack}>
                              <div className={s.progressBar} style={{ width: `${pct}%`, backgroundColor: color }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Meta + link */}
                <div className={cn(s.divider, 'pt-3 flex items-center justify-between')}>
                  <div className={s.bodyMuted}>
                    {test.lastRun
                      ? <span><Activity className="w-3 h-3 inline mr-1" />{formatRelativeTime(test.lastRun)}</span>
                      : <span>{tr.projectOverview.testing.noRun}</span>
                    }
                  </div>
                  <Link
                    href={`/projects/${project.id}/testing`}
                    className="flex items-center gap-1 text-xs text-signalGreen hover:text-textPrimary transition-colors font-semibold font-body"
                  >
                    {tr.projectOverview.testing.details} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Card>

            {/* Refactoring Card */}
            <Card title={tr.projectOverview.refactoring.cardTitle} subtitle={tr.projectOverview.refactoring.cardSubtitle}>
              <div className="flex flex-col gap-5">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className={s.statBlock}>
                    <p className={cn(s.statValue, 'text-signalPurple kpi-num')}>{ref.total}</p>
                    <p className={s.statLabel}>{tr.projectOverview.refactoring.fixesTotal}</p>
                  </div>
                  <div className={s.statBlock}>
                    <p className={cn(s.statValue, 'text-textPrimary kpi-num')}>{ref.successRate}%</p>
                    <p className={s.statLabel}>{tr.projectOverview.refactoring.successRate}</p>
                  </div>
                  <div className={s.statBlock}>
                    <p className={cn(s.statValue, 'text-brand')}>{formatMinutes(ref.timeSavedMinutes)}</p>
                    <p className={s.statLabel}>{tr.common.timeSaved}</p>
                  </div>
                </div>

                {/* Severity bars */}
                {Object.keys(ref.bySeverity).length > 0 && (
                  <div>
                    <p className={cn(s.bodyMuted, 'mb-2')}>{tr.projectOverview.refactoring.severity}</p>
                    <div className="flex flex-col gap-2">
                      {Object.entries(ref.bySeverity).map(([sev, count]) => {
                        const total = Object.values(ref.bySeverity).reduce((a, b) => a + b, 0)
                        const pct   = total > 0 ? Math.round((count / total) * 100) : 0
                        const color = severityColor(sev)
                        return (
                          <div key={sev}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className={s.body}>{sev}</span>
                              <span className="font-medium font-body" style={{ color }}>{count} ({pct}%)</span>
                            </div>
                            <div className={s.progressTrack}>
                              <div className={s.progressBar} style={{ width: `${pct}%`, backgroundColor: color }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Meta + link */}
                <div className={cn(s.divider, 'pt-3 flex items-center justify-between')}>
                  <div className={s.bodyMuted}>
                    {ref.lastRun
                      ? <span><Activity className="w-3 h-3 inline mr-1" />{formatRelativeTime(ref.lastRun)}</span>
                      : <span>{tr.projectOverview.refactoring.noRun}</span>
                    }
                  </div>
                  <Link
                    href={`/projects/${project.id}/refactoring`}
                    className="flex items-center gap-1 text-xs text-signalPurple hover:text-textPrimary transition-colors font-semibold font-body"
                  >
                    {tr.projectOverview.refactoring.details} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Card>

          </div>
        </FadeIn>

        {/* Quick nav tiles */}
        <FadeIn delay={0.14}>
          <div className={s.twoCol}>
            <SpringPressable intensity="subtle">
              <Link
                href={`/projects/${project.id}/testing`}
                className="group flex items-center justify-between bg-signalGreen/5 border border-signalGreen/15 hover:border-signalGreen/35 hover:bg-signalGreen/10 rounded-2xl px-5 py-4 transition-all"
              >
                <div className="flex items-center gap-3">
                  <BreathingView intensity="subtle" active>
                    <FlaskConical className="w-5 h-5 text-signalGreen" />
                  </BreathingView>
                  <div>
                    <p className={cn(s.headingSm, 'group-hover:text-signalGreen transition-colors')}>
                      {tr.projectOverview.nav.testingTitle}
                    </p>
                    <p className={s.bodyMuted}>{tr.projectOverview.nav.testingSubtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-signalGreen group-hover:translate-x-1 transition-transform" />
              </Link>
            </SpringPressable>

            <SpringPressable intensity="subtle">
              <Link
                href={`/projects/${project.id}/refactoring`}
                className="group flex items-center justify-between bg-signalPurple/5 border border-signalPurple/15 hover:border-signalPurple/35 hover:bg-signalPurple/10 rounded-2xl px-5 py-4 transition-all"
              >
                <div className="flex items-center gap-3">
                  <BreathingView intensity="subtle" active>
                    <Wrench className="w-5 h-5 text-signalPurple" />
                  </BreathingView>
                  <div>
                    <p className={cn(s.headingSm, 'group-hover:text-signalPurple transition-colors')}>
                      {tr.projectOverview.nav.refactTitle}
                    </p>
                    <p className={s.bodyMuted}>{tr.projectOverview.nav.refactSubtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-signalPurple group-hover:translate-x-1 transition-transform" />
              </Link>
            </SpringPressable>
          </div>
        </FadeIn>

      </PageTransition>
    </>
  )
}
