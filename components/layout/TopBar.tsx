'use client'

import { useRouter } from 'next/navigation'
import { RefreshCw, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { s } from '@/lib/styles'
import { useTranslation } from '@/lib/i18n'
import { SpringPressable } from '@/lib/motion'

interface Props {
  title: string
  subtitle?: string
  showBack?: boolean
}

export default function TopBar({ title, subtitle, showBack }: Props) {
  const router = useRouter()
  const { tr } = useTranslation()
  const [spinning, setSpinning] = useState(false)

  const refresh = () => {
    setSpinning(true)
    router.refresh()
    setTimeout(() => setSpinning(false), 700)
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-borderSoft bg-surface sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {showBack && (
          <SpringPressable onClick={() => router.back()} intensity="tight">
            <div className={s.btnIcon}>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </SpringPressable>
        )}
        <div>
          <h1 className={`${s.headingLg} leading-tight`}>{title}</h1>
          {subtitle && <p className={`${s.bodyMuted} mt-0.5`}>{subtitle}</p>}
        </div>
      </div>

      <SpringPressable onClick={refresh} intensity="normal">
        <div className={s.btnGhost}>
          <RefreshCw className={`w-3.5 h-3.5 ${spinning ? 'animate-spin' : ''}`} />
          {tr.topbar.refresh}
        </div>
      </SpringPressable>
    </div>
  )
}
