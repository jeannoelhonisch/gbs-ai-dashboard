import TopBar from '@/components/layout/TopBar'
import KPICard from '@/components/ui/KPICard'
import Card from '@/components/ui/Card'
import { getGlobalStats } from '@/lib/data-reader'
import { formatMinutes, formatRelativeTime } from '@/lib/utils'
import { getServerTranslations } from '@/lib/i18n'
import { s } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { FadeIn, PageTransition, SpringPressable } from '@/lib/motion'
import {
  FlaskConical, Wrench, Clock, FolderKanban, TrendingUp, ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default function BigView() {
  const stats = getGlobalStats()
  const tr    = getServerTranslations()

  const totalActions = stats.totalTests + stats.totalFixes
  const lastTestCount = stats.projects.reduce((a, p) => a + p.testing.lastCount, 0)
  const lastFixCount  = stats.projects.reduce((a, p) => a + p.refactoring.lastCount, 0)

  return (
    <>
      <TopBar title={tr.bigView.title} subtitle={tr.bigView.subtitle} />

      <PageTransition className={s.pageContent}>

        {/* KPI Row */}
        <FadeIn delay={0}>
          <div className={s.kpiGrid}>
            <KPICard
              label={tr.bigView.kpi.testsGenerated}
              value={stats.totalTests}
              sub={tr.bigView.kpi.testsSub}
              icon={FlaskConical}
              color="green"
              trend={{ value: lastTestCount, label: tr.common.lastRunLabel }}
            />
            <KPICard
              label={tr.bigView.kpi.issuesFixed}
              value={stats.totalFixes}
              sub={tr.bigView.kpi.issuesSub}
              icon={Wrench}
              color="purple"
              trend={{ value: lastFixCount, label: tr.common.lastRunLabel }}
            />
            <KPICard
              label={tr.bigView.kpi.timeSaved}
              value={`${stats.totalTimeSavedHours}h`}
              sub={tr.bigView.kpi.timeSavedSub}
              icon={Clock}
              color="amber"
            />
            <KPICard
              label={tr.bigView.kpi.activeProjects}
              value={stats.projectCount}
              sub={tr.bigView.kpi.projectsSub}
              icon={FolderKanban}
              color="cyan"
            />
          </div>
        </FadeIn>

        {/* Activity + Projects */}
        <FadeIn delay={0.08}>
          <div className={s.threeCol}>

            {/* Activity card */}
            <Card title={tr.bigView.activity.title} subtitle={tr.bigView.activity.subtitle}>
              <div className="flex flex-col gap-5">

                {/* Testing bar */}
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className={s.body}>{tr.bigView.activity.testingLabel}</span>
                    <span className="text-signalGreen font-semibold font-body">
                      {stats.totalTests} {tr.bigView.activity.testsGenLabel}
                    </span>
                  </div>
                  <div className={s.progressTrack}>
                    <div
                      className={cn(s.progressBar, 'bg-signalGreen')}
                      style={{ width: totalActions > 0 ? `${(stats.totalTests / totalActions) * 100}%` : '0%' }}
                    />
                  </div>
                </div>

                {/* Refactoring bar */}
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className={s.body}>{tr.bigView.activity.refactLabel}</span>
                    <span className="text-signalPurple font-semibold font-body">
                      {stats.totalFixes} {tr.bigView.activity.fixesLabel}
                    </span>
                  </div>
                  <div className={s.progressTrack}>
                    <div
                      className={cn(s.progressBar, 'bg-signalPurple')}
                      style={{ width: totalActions > 0 ? `${(stats.totalFixes / totalActions) * 100}%` : '0%' }}
                    />
                  </div>
                </div>

                {/* Totals */}
                <div className={cn(s.divider, 'pt-4 grid grid-cols-2 gap-3')}>
                  <div className={s.statBlock}>
                    <p className={cn(s.statValue, 'text-textPrimary kpi-num')}>{totalActions}</p>
                    <p className={s.statLabel}>{tr.bigView.activity.totalActions}</p>
                  </div>
                  <div className={s.statBlock}>
                    <p className={cn(s.statValue, 'text-brand kpi-num')}>{stats.totalTimeSavedHours}h</p>
                    <p className={s.statLabel}>{tr.common.timeSaved}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Projects table */}
            <Card
              className="lg:col-span-2"
              title={tr.bigView.table.title}
              subtitle={tr.bigView.table.subtitle}
            >
              <div className="flex flex-col gap-1">
                {stats.projects.map((p, i) => (
                  <FadeIn key={p.id} delay={0.12 + i * 0.04}>
                    <SpringPressable intensity="subtle">
                      <Link
                        href={`/projects/${p.id}`}
                        className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-surfaceSoft transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className={cn(s.headingSm, 'truncate group-hover:text-brand transition-colors')}>
                            {p.displayName}
                          </p>
                          <p className={cn(s.bodyMuted, 'truncate')}>{p.description}</p>
                        </div>

                        <div className="flex items-center gap-5 shrink-0">
                          <div className="text-right">
                            <p className="text-signalGreen text-sm font-semibold font-display kpi-num">{p.testing.total}</p>
                            <p className={s.bodyMuted}>{tr.common.tests}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-signalPurple text-sm font-semibold font-display kpi-num">{p.refactoring.total}</p>
                            <p className={s.bodyMuted}>{tr.common.fixes}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-brand text-sm font-semibold font-display">{formatMinutes(p.timeSavedMinutes)}</p>
                            <p className={s.bodyMuted}>{tr.common.timeSaved}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-textMuted group-hover:text-brand transition-colors" />
                        </div>
                      </Link>
                    </SpringPressable>
                  </FadeIn>
                ))}

                {stats.projects.length === 0 && (
                  <div className={s.emptyState}>
                    <p className={s.emptyText}>{tr.bigView.table.noProjects}</p>
                    <p className={s.emptySubtext}>{tr.common.configHint}</p>
                  </div>
                )}
              </div>
            </Card>

          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={0.16}>
          <div className="flex items-center gap-2 text-textMuted text-xs font-body">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{tr.bigView.footer}</span>
          </div>
        </FadeIn>

      </PageTransition>
    </>
  )
}
