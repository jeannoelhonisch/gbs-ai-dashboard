import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import { I18nProvider } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'AI Dashboard · TestForge & RefactlyAI',
  description: 'Central KPI dashboard for AI-driven testing and refactoring',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="flex min-h-screen bg-bg">
        <I18nProvider defaultLocale="de">
          <Sidebar />
          <main className="flex-1 flex flex-col min-w-0 overflow-auto">
            {children}
          </main>
        </I18nProvider>
      </body>
    </html>
  )
}
