import { NextResponse } from 'next/server'
import { getProjectById, getRefactoringStats } from '@/lib/data-reader'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const project = getProjectById(params.id)
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(getRefactoringStats(project))
}
