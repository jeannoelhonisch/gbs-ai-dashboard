/**
 * Server-safe i18n helper — kein 'use client', keine React hooks.
 * Import in Server Components: `import { getServerTranslations } from '@/lib/i18n/server'`
 * Import in Client Components: `import { useTranslation } from '@/lib/i18n'`
 */
import { de } from './de'
import { en } from './en'
import type { Translations } from './de'

export type Locale = 'de' | 'en'

const TRANSLATIONS: Record<Locale, Translations> = { de, en }

export function getServerTranslations(locale: Locale = 'de'): Translations {
  return TRANSLATIONS[locale]
}
