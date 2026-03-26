import { NextResponse } from 'next/server'
import { getGlobalStats } from '@/lib/data-reader'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    return NextResponse.json(getGlobalStats())
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
