import TopBar from '@/components/layout/TopBar'
import { getProjects, getRefactoringStats, getTestingStats } from '@/lib/data-reader'
import { formatMinutes, formatRelativeTime } from '@/lib/utils'
import { getServerTranslations } from '@/lib/i18n/server'
import { s } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { FadeIn, PageTransition, SpringPressable } from '@/lib/motion'
import { FlaskConical, Wrench, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default function ProjectsPage() {
  const projects = getProjects()
  const tr       = getServerTranslations()

  const rows = projects.map(p => {
    const ref  = getRefactoringStats(p)
    const test = getTestingStats(p)
    return { ...p, testing: test, refactoring: ref, timeSaved: test.timeSavedMinutes + ref.timeSavedMinutes }
  })

  return (
    <>
      <TopBar
        title={tr.projectsList.title}
        subtitle={tr.projectsList.subtitle(projects.length)}
      />

      <PageTransition className={s.pageContent}>

        {/* Column header */}
        <FadeIn>
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-4">
            <span className={s.label}>{tr.projectsList.col.project}</span>
            <span className={cn(s.label, 'text-center text-signalGreen')}>{tr.projectsList.col.testing}</span>
            <span className={cn(s.label, 'text-center text-signalPurple')}>{tr.projectsList.col.refactoring}</span>
            <span className={cn(s.label, 'text-center text-brand')}>{tr.projectsList.col.timeSaved}</span>
            <span />
          </div>
        </FadeIn>

        {/* Project rows */}
        {rows.map((p, i) => (
          <FadeIn key={p.id} delay={i * 0.05}>
            <SpringPressable intensity="subtle">
              <Link
                href={`/projects/${p.id}`}
                className={cn(s.cardInteractive, 'grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-5 py-4 group')}
              >
                {/* Name */}
                <div>
                  <p className={cn(s.headingSm, 'group-hover:text-brand transition-colors')}>{p.displayName}</p>
                  <p className={cn(s.body, 'mt-0.5')}>{p.description}</p>
                  <p className={cn(s.mono, 'mt-1')}>{p.name}</p>
                </div>

                {/* Testing */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <FlaskConical className="w-3.5 h-3.5 text-signalGreen" />
                    <span className="text-signalGreen font-bold text-lg font-display kpi-num">{p.testing.total}</span>
                  </div>
                  <p className={s.bodyMuted}>{tr.projectsList.testsGenerated}</p>
                  {p.testing.lastRun && (
                    <p className={cn(s.bodyMuted, 'mt-0.5')}>{formatRelativeTime(p.testing.lastRun)}</p>
                  )}
                  {p.testing.lastCount > 0 && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded-md text-[9px] bg-signalGreen/10 text-signalGreen font-medium">
                      +{p.testing.lastCount} {tr.projectsList.lastRunSuffix}
                    </span>
                  )}
                </div>

                {/* Refactoring */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Wrench className="w-3.5 h-3.5 text-signalPurple" />
                    <span className="text-signalPurple font-bold text-lg font-display kpi-num">{p.refactoring.total}</span>
                  </div>
                  <p className={s.bodyMuted}>{tr.projectsList.issuesFixed}</p>
                  {p.refactoring.lastRun && (
                    <p className={cn(s.bodyMuted, 'mt-0.5')}>{formatRelativeTime(p.refactoring.lastRun)}</p>
                  )}
                  {p.refactoring.lastCount > 0 && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded-md text-[9px] bg-signalPurple/10 text-signalPurple font-medium">
                      +{p.refactoring.lastCount} {tr.projectsList.lastRunSuffix}
                    </span>
                  )}
                </div>

                {/* Time saved */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5 text-brand" />
                    <span className="text-brand font-bold text-lg font-display">{formatMinutes(p.timeSaved)}</span>
                  </div>
                  <p className={s.bodyMuted}>{tr.common.timeSaved}</p>
                  <div className="mt-1 flex justify-center gap-2 text-[9px] text-textMuted">
                    <span>{formatMinutes(p.testing.timeSavedMinutes)} {tr.projectsList.timeTesting}</span>
                    <span>·</span>
                    <span>{formatMinutes(p.refactoring.timeSavedMinutes)} {tr.projectsList.timeRefact}</span>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-4 h-4 text-textMuted group-hover:text-brand transition-colors" />
              </Link>
            </SpringPressable>
          </FadeIn>
        ))}

        {rows.length === 0 && (
          <FadeIn>
            <div className={s.emptyState}>
              <p className={s.emptyText}>{tr.projectsList.noProjects}</p>
              <p className={s.emptySubtext}>{tr.common.configHint}</p>
            </div>
          </FadeIn>
        )}

      </PageTransition>
    </>
  )
}
