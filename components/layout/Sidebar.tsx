'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Layers, ChevronRight, Bot } from 'lucide-react'
import { s } from '@/lib/styles'
import { useTranslation, LanguageSwitcher } from '@/lib/i18n'
import { PulsingDot } from '@/lib/motion'
import { t } from '@/lib/theme'

const NAV_ITEMS = [
  { href: '/',         labelKey: 'bigView'  as const, icon: LayoutDashboard },
  { href: '/projects', labelKey: 'projects' as const, icon: Layers },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { tr } = useTranslation()

  return (
    <aside className="flex flex-col w-56 min-h-screen bg-surface border-r border-borderSoft px-3 py-5 shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
          <Bot className="w-4.5 h-4.5 text-brand" />
        </div>
        <div className="leading-tight min-w-0">
          <p className="text-textPrimary text-sm font-semibold font-display truncate">
            {tr.nav.appName}
          </p>
          <p className="text-textMuted text-[10px] font-body truncate">
            {tr.nav.appTagline}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link key={href} href={href} className={s.navLink(active)}>
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{tr.nav[labelKey]}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
            </Link>
          )
        })}
      </nav>

      {/* Language switcher */}
      <div className="mt-6 px-1">
        <LanguageSwitcher />
      </div>

      {/* Bottom status */}
      <div className="mt-auto px-2 pt-4 border-t border-borderSoft">
        <div className="flex items-center gap-2">
          <PulsingDot color={t.colors.signalGreen} size={7} />
          <span className="text-textMuted text-[10px] font-body leading-tight">
            {tr.nav.liveStatus}
          </span>
        </div>
      </div>
    </aside>
  )
}
