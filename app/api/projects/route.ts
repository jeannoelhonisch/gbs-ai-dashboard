import { NextResponse } from 'next/server'
import { getProjects, getRefactoringStats, getTestingStats } from '@/lib/data-reader'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const projects = getProjects().map(p => {
      const ref = getRefactoringStats(p)
      const test = getTestingStats(p)
      return {
        id: p.id,
        name: p.name,
        displayName: p.displayName,
        description: p.description,
        testing: {
          total: test.total,
          lastRun: test.lastRun,
          lastCount: test.lastCount,
          timeSavedMinutes: test.timeSavedMinutes,
        },
        refactoring: {
          total: ref.total,
          lastRun: ref.lastRun,
          lastCount: ref.lastCount,
          successRate: ref.successRate,
          timeSavedMinutes: ref.timeSavedMinutes,
        },
        totalTimeSavedMinutes: test.timeSavedMinutes + ref.timeSavedMinutes,
      }
    })
    return NextResponse.json(projects)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
