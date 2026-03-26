'use client'

/**
 * AI Dashboard — i18n System
 *
 * Central provider for multi-language support.
 * Supported locales: 'de' (default) | 'en'
 *
 * USAGE:
 *   // In client components:
 *   const { tr, locale, setLocale } = useTranslation()
 *   <p>{tr.bigView.title}</p>
 *   <button onClick={() => setLocale('en')}>EN</button>
 *
 *   // In server components — use getServerTranslations():
 *   const tr = getServerTranslations()
 */

import React, { createContext, useContext, useState } from 'react'
import { de } from './de'
import { en } from './en'
import type { Translations } from './de'

export type Locale = 'de' | 'en'

const TRANSLATIONS: Record<Locale, Translations> = { de, en }

interface I18nContextValue {
  locale:    Locale
  setLocale: (l: Locale) => void
  tr:        Translations
}

const I18nContext = createContext<I18nContextValue>({
  locale:    'de',
  setLocale: () => {},
  tr:        de,
})

// ── Provider ──────────────────────────────────────────────────────────────────

interface I18nProviderProps {
  children: React.ReactNode
  defaultLocale?: Locale
}

export function I18nProvider({ children, defaultLocale = 'de' }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Read from localStorage if available (client-side persistence)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dashboard-locale') as Locale | null
      if (stored && stored in TRANSLATIONS) return stored
    }
    return defaultLocale
  })

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboard-locale', l)
    }
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, tr: TRANSLATIONS[locale] }}>
      {children}
    </I18nContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useTranslation() {
  return useContext(I18nContext)
}

// ── Server-side helper (returns default locale translations) ──────────────────
// Use in Server Components where the context is not available.

export function getServerTranslations(locale: Locale = 'de'): Translations {
  return TRANSLATIONS[locale]
}

// ── Language Switcher Component ───────────────────────────────────────────────

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useTranslation()

  return (
    <div className={`flex items-center gap-1 rounded-lg bg-surfaceSoft p-0.5 ${className ?? ''}`}>
      {(['de', 'en'] as Locale[]).map(l => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={[
            'px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200',
            locale === l
              ? 'bg-brand text-white shadow-sm'
              : 'text-textMuted hover:text-textSecondary',
          ].join(' ')}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
