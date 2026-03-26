import { NextResponse } from 'next/server'
import { getProjectById, getRefactoringStats, getTestingStats } from '@/lib/data-reader'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const project = getProjectById(params.id)
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const ref = getRefactoringStats(project)
  const test = getTestingStats(project)

  return NextResponse.json({
    id: project.id,
    name: project.name,
    displayName: project.displayName,
    description: project.description,
    testing: test,
    refactoring: ref,
    totalTimeSavedMinutes: test.timeSavedMinutes + ref.timeSavedMinutes,
    combinedTotal: test.total + ref.total,
  })
}
