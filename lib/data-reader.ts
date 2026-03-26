import fs from 'fs'
import path from 'path'
import reposConfig from '@/config/repos.json'

export type ProjectConfig = (typeof reposConfig.projects)[number]

// ─── Environment-aware base path ────────────────────────────────────────────
// Local dev:  DATA_ROOT=C:/dev  (default)
// Docker:     DATA_ROOT=/data   (set in docker-compose.yml)
// All paths in repos.json are relative to this root.

const DATA_ROOT = process.env.DATA_ROOT ?? 'C:/dev'

function resolve(relativePath: string): string {
  return path.join(DATA_ROOT, relativePath)
}

// ─── Raw stat shapes ────────────────────────────────────────────────────────

interface GlobalStatsEntry {
  total: number
  last_run: string
  last_count: number
}

interface MetricsJson {
  applied_count?: number
  skipped_count?: number
  by_classification?: Record<string, number>
  by_classification_success?: Record<string, number>
  by_severity?: Record<string, number>
  by_type?: Record<string, number>
  duration_seconds?: number
  start_time?: string
  end_time?: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function readJson<T>(filePath: string): T | null {
  try {
    const abs = path.resolve(resolve(filePath))
    if (!fs.existsSync(abs)) return null
    const raw = fs.readFileSync(abs, 'utf-8').trim()
    if (!raw || raw === '{}' || raw === '[]') return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function readJsonlLogs(dir: string): MetricsJson[] {
  try {
    const abs = path.resolve(resolve(dir))
    if (!fs.existsSync(abs)) return []
    return fs
      .readdirSync(abs)
      .filter(f => f.endsWith('.jsonl') || f.endsWith('.json'))
      .flatMap(f => {
        const content = fs.readFileSync(path.join(abs, f), 'utf-8')
        return content
          .split('\n')
          .filter(Boolean)
          .map(line => { try { return JSON.parse(line) } catch { return null } })
          .filter(Boolean) as MetricsJson[]
      })
  } catch {
    return []
  }
}

// ─── Public API ─────────────────────────────────────────────────────────────

export function getProjects() {
  return reposConfig.projects
}

export function getProjectById(id: string): ProjectConfig | undefined {
  return reposConfig.projects.find(p => p.id === id)
}

export function getTimeSavingsConfig() {
  return reposConfig.timeSavings
}

// Returns the GLOBAL_STATS entry for a specific project name from a stats file
function getGlobalEntry(statsPath: string, projectName: string): GlobalStatsEntry | null {
  const stats = readJson<Record<string, GlobalStatsEntry>>(statsPath)
  if (!stats) return null
  return stats[projectName] ?? null
}

// ─── Refactoring (Sonarqube-Autofix) ────────────────────────────────────────

export function getRefactoringStats(project: ProjectConfig) {
  const entry = getGlobalEntry(project.refactoring.globalStatsPath, project.name)
  const metrics = readJson<MetricsJson>(
    path.join(project.refactoring.reportsDir, 'metrics.json')  // resolve() applied inside readJson
  )

  const total = entry?.total ?? 0
  const lastCount = entry?.last_count ?? 0
  const lastRun = entry?.last_run ?? null

  const bySeverity = metrics?.by_severity ?? {}
  const byType = metrics?.by_type ?? {}
  const byClass = metrics?.by_classification ?? {}
  const byClassSuccess = metrics?.by_classification_success ?? {}
  const duration = metrics?.duration_seconds ?? 0
  const skipped = metrics?.skipped_count ?? 0

  return {
    total,
    lastCount,
    lastRun,
    bySeverity,
    byType,
    byClassification: byClass,
    byClassificationSuccess: byClassSuccess,
    durationSeconds: duration,
    skipped,
    successRate: total > 0 ? Math.round(((total - skipped) / total) * 100) : 0,
    timeSavedMinutes: total * reposConfig.timeSavings.minutesPerManualFix,
  }
}

// ─── Testing (TestVault AI) ──────────────────────────────────────────────────

export function getTestingStats(project: ProjectConfig) {
  const entry = getGlobalEntry(project.testing.globalStatsPath, project.name)
  const metrics = readJson<MetricsJson>(
    path.join(project.testing.reportsDir, 'metrics.json')
  )

  const total = entry?.total ?? 0
  const lastCount = entry?.last_count ?? 0
  const lastRun = entry?.last_run ?? null

  const byClass = metrics?.by_classification ?? {}
  const byClassSuccess = metrics?.by_classification_success ?? {}
  const duration = metrics?.duration_seconds ?? 0

  return {
    total,
    lastCount,
    lastRun,
    byClassification: byClass,
    byClassificationSuccess: byClassSuccess,
    durationSeconds: duration,
    timeSavedMinutes: total * reposConfig.timeSavings.minutesPerManualTest,
  }
}

// ─── Global aggregated stats ────────────────────────────────────────────────

export function getGlobalStats() {
  let totalTests = 0
  let totalFixes = 0
  let totalTimeSavedMin = 0
  const cfg = reposConfig.timeSavings

  // Read both GLOBAL_STATS files directly
  const refStats = readJson<Record<string, GlobalStatsEntry>>(
    reposConfig.projects[0]?.refactoring.globalStatsPath ?? ''
  )
  const testStats = readJson<Record<string, GlobalStatsEntry>>(
    reposConfig.projects[0]?.testing.globalStatsPath ?? ''
  )

  if (refStats) {
    for (const v of Object.values(refStats)) {
      totalFixes += v.total ?? 0
    }
  }
  if (testStats) {
    for (const v of Object.values(testStats)) {
      totalTests += v.total ?? 0
    }
  }

  totalTimeSavedMin =
    totalTests * cfg.minutesPerManualTest + totalFixes * cfg.minutesPerManualFix

  const projectSummaries = reposConfig.projects.map(p => {
    const ref = getRefactoringStats(p)
    const test = getTestingStats(p)
    return {
      id: p.id,
      name: p.name,
      displayName: p.displayName,
      description: p.description,
      testing: { total: test.total, lastRun: test.lastRun, lastCount: test.lastCount },
      refactoring: { total: ref.total, lastRun: ref.lastRun, lastCount: ref.lastCount },
      timeSavedMinutes: test.timeSavedMinutes + ref.timeSavedMinutes,
    }
  })

  return {
    totalTests,
    totalFixes,
    totalTimeSavedMinutes: totalTimeSavedMin,
    totalTimeSavedHours: Math.round(totalTimeSavedMin / 60),
    projectCount: reposConfig.projects.length,
    projects: projectSummaries,
  }
}
