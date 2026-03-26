/**
 * Deutsch — Zentrale Übersetzungsdatei
 * Single Source of Truth für alle deutschen UI-Texte.
 *
 * Struktur: Seitenbasiert → Komponentenbasiert → Schlüssel
 * Regel: Kein UI-Text wird direkt in Komponenten gehardet.
 */

// Using satisfies + explicit Translations type (defined at bottom)
// so EN can use different string values without literal-type mismatch.
export const de = {

  // ── App-Shell ──────────────────────────────────────────────────────────────
  nav: {
    appName:    'AI Dashboard',
    appTagline: 'TestForge · RefactlyAI',
    bigView:    'Big View',
    projects:   'Projekte',
    liveStatus: 'Live · Auto-Refresh 60s',
  },

  topbar: {
    refresh: 'Aktualisieren',
  },

  // ── Globale Labels ─────────────────────────────────────────────────────────
  common: {
    tests:        'Tests',
    fixes:        'Fixes',
    timeSaved:    'Zeitersparnis',
    lastRun:      'Letzter Run',
    totalActions: 'KI-Aktionen',
    projects:     'Projekte',
    successRate:  'Erfolgsrate',
    noData:       'Noch keine Daten',
    neverRun:     'Noch kein Run',
    unknown:      'Unbekannt',
    never:        'Nie',
    total:        'Gesamt',
    share:        'Anteil',
    count:        'Anzahl',
    duration:     'Laufzeit',
    workdays:     'Arbeitstage',
    lastRunLabel: 'letzter Run',
    configHint:   'Passe config/repos.json an',
    complexity: {
      simple:  'Simple',
      medium:  'Medium',
      complex: 'Complex',
    },
    severity: {
      BLOCKER:  'Blocker',
      CRITICAL: 'Critical',
      MAJOR:    'Major',
      MINOR:    'Minor',
      INFO:     'Info',
    },
    issueType: {
      BUG:           'Bug',
      VULNERABILITY: 'Vulnerability',
      CODE_SMELL:    'Code Smell',
    },
  },

  // ── Big View ───────────────────────────────────────────────────────────────
  bigView: {
    title:    'Big View',
    subtitle: 'Globale KPI-Übersicht · TestForge AI + RefactlyAI',

    kpi: {
      testsGenerated: 'Tests generiert (KI)',
      testsSub:       'TestForge AI — alle Projekte',
      issuesFixed:    'Issues gefixt (KI)',
      issuesSub:      'RefactlyAI — alle Projekte',
      timeSaved:      'Zeitersparnis gesamt',
      timeSavedSub:   '30min/Test + 20min/Fix',
      activeProjects: 'Aktive Projekte',
      projectsSub:    'in beiden KI-Pipelines',
    },

    activity: {
      title:        'KI-Aktivität',
      subtitle:     'Verteilung Testing vs. Refactoring',
      testingLabel: 'Testing (TestForge)',
      refactLabel:  'Refactoring (RefactlyAI)',
      testsGenLabel:'Tests generiert',
      fixesLabel:   'Issues gefixt',
      totalActions: 'Total KI-Aktionen',
    },

    table: {
      title:       'Projekte — Schnellübersicht',
      subtitle:    'Alle Projekte mit KI-Aktivität',
      noProjects:  'Keine Projekte konfiguriert',
    },

    footer: 'Daten werden alle 60s neu geladen · Quellen: GLOBAL_STATS.json + reports/metrics.json',
  },

  // ── Projects List ──────────────────────────────────────────────────────────
  projectsList: {
    title:       'Alle Projekte',
    subtitle:    (count: number) => `${count} Projekte · Testing + Refactoring`,
    noProjects:  'Keine Projekte konfiguriert',
    col: {
      project:     'Projekt',
      testing:     'Testing',
      refactoring: 'Refactoring',
      timeSaved:   'Zeitersparnis',
    },
    testsGenerated: 'Tests generiert',
    issuesFixed:    'Issues gefixt',
    lastRunSuffix:  'letzter Run',
    timeTesting:    'Testing',
    timeRefact:     'Refact.',
  },

  // ── Project Overview ───────────────────────────────────────────────────────
  projectOverview: {
    subtitle:       (name: string) => `Projekt-Overview · ${name}`,
    kpi: {
      totalActions:  'KI-Aktionen gesamt',
      totalSub:      (tests: number, fixes: number) => `${tests} Tests · ${fixes} Fixes`,
      timeSaved:     'Zeitersparnis',
      workdaysSub:   (days: number) => `≈ ${days} Arbeitstage`,
      testsGenerated:'Tests generiert',
      issuesFixed:   'Issues gefixt',
      successRate:   'Success Rate',
    },

    testing: {
      cardTitle:    'Testing · TestForge AI',
      cardSubtitle: 'Automatisch generierte Tests via KI',
      testsTotal:   'Tests gesamt',
      lastRunLabel: 'Letzter Run',
      complexity:   'Komplexität',
      noRun:        'Noch kein Run',
      details:      'Details',
    },

    refactoring: {
      cardTitle:    'Refactoring · RefactlyAI',
      cardSubtitle: 'Automatisch gefixte SonarQube-Issues',
      fixesTotal:   'Fixes gesamt',
      successRate:  'Success Rate',
      severity:     'Issues nach Severity',
      noRun:        'Noch kein Run',
      details:      'Details',
    },

    nav: {
      testingTitle:    'Testing Details',
      testingSubtitle: 'Specs, Coverage, Komplexität',
      refactTitle:     'Refactoring Details',
      refactSubtitle:  'Severity, Typen, PRs',
    },
  },

  // ── Testing Detail ─────────────────────────────────────────────────────────
  testing: {
    subtitle:     'TestForge AI — automatisch generierte Tests',
    kpi: {
      generated:   'Tests generiert',
      generatedSub:'Kumulativ alle Runs',
      lastRun:     'Letzter Run',
      timeSaved:   'Zeitersparnis',
      timeSavedSub:'@ 30min/Test manuell',
      pipeline:    'Laufzeit Pipeline',
      pipelineSub: 'Letzter bekannter Run',
    },
    charts: {
      complexity:     'Verteilung nach Komplexität',
      complexitySub:  'Simple / Medium / Complex',
      successRate:    'Erfolgsrate nach Komplexität',
      successSub:     'Anteil erfolgreich generierter Tests',
      noSuccessData:  'Keine Daten — Pipeline noch nicht gelaufen',
      testsInClass:   (n: number) => `${n} Tests in dieser Klasse`,
    },
    table: {
      title:       'Detailaufschlüsselung',
      subtitle:    'Tests nach Komplexitätsklasse',
      class:       'Klasse',
      count:       'Anzahl',
      share:       'Anteil',
      successRate: 'Erfolgsrate',
      timeSaved:   'Zeitersparnis',
    },
    empty: {
      text:    'Noch keine Tests generiert',
      subtext: 'TestForge AI Pipeline muss zuerst laufen',
    },
  },

  // ── Refactoring Detail ─────────────────────────────────────────────────────
  refactoring: {
    subtitle:     'RefactlyAI — SonarQube Issues automatisch gefixt',
    kpi: {
      fixes:       'Fixes gesamt',
      fixesSub:    'Kumulativ alle Runs',
      successRate: 'Success Rate',
      skipped:     (n: number) => `${n} übersprungen`,
      timeSaved:   'Zeitersparnis',
      timeSavedSub:'@ 20min/Fix manuell',
      lastRun:     'Letzter Run',
    },
    charts: {
      severity:       'Issues nach Severity',
      severitySub:    'BLOCKER → INFO',
      type:           'Issues nach Typ',
      typeSub:        'BUG · VULNERABILITY · CODE_SMELL',
      complexity:     'Fixes nach Komplexität',
      complexitySub:  'Klassifizierung: Simple / Medium / Complex',
      breakdown:      'Severity Breakdown',
      breakdownSub:   'Detailansicht',
      noSeverity:     'Keine Severity-Daten',
    },
    table: {
      title:       'Komplexitäts-Detailtabelle',
      subtitle:    'Fixes nach Klasse mit Erfolgsrate',
      class:       'Klasse',
      count:       'Anzahl',
      share:       'Anteil',
      successRate: 'Erfolgsrate',
      timeSaved:   'Zeitersparnis',
    },
    empty: {
      text:    'Noch keine Fixes angewendet',
      subtext: 'RefactlyAI Pipeline muss zuerst laufen',
    },
  },

}

// Translations type derived from structure but with string (not literal) values
export type Translations = {
  nav: {
    appName: string; appTagline: string; bigView: string; projects: string; liveStatus: string
  }
  topbar: { refresh: string }
  common: {
    tests: string; fixes: string; timeSaved: string; lastRun: string; totalActions: string
    projects: string; successRate: string; noData: string; neverRun: string; unknown: string
    never: string; total: string; share: string; count: string; duration: string
    workdays: string; lastRunLabel: string; configHint: string
    complexity: { simple: string; medium: string; complex: string }
    severity: { BLOCKER: string; CRITICAL: string; MAJOR: string; MINOR: string; INFO: string }
    issueType: { BUG: string; VULNERABILITY: string; CODE_SMELL: string }
  }
  bigView: {
    title: string; subtitle: string
    kpi: { testsGenerated: string; testsSub: string; issuesFixed: string; issuesSub: string
           timeSaved: string; timeSavedSub: string; activeProjects: string; projectsSub: string }
    activity: { title: string; subtitle: string; testingLabel: string; refactLabel: string
                testsGenLabel: string; fixesLabel: string; totalActions: string }
    table: { title: string; subtitle: string; noProjects: string }
    footer: string
  }
  projectsList: {
    title: string; subtitle: (count: number) => string; noProjects: string
    col: { project: string; testing: string; refactoring: string; timeSaved: string }
    testsGenerated: string; issuesFixed: string; lastRunSuffix: string
    timeTesting: string; timeRefact: string
  }
  projectOverview: {
    subtitle: (name: string) => string
    kpi: { totalActions: string; totalSub: (tests: number, fixes: number) => string
           timeSaved: string; workdaysSub: (days: number) => string
           testsGenerated: string; issuesFixed: string; successRate: string }
    testing: { cardTitle: string; cardSubtitle: string; testsTotal: string
               lastRunLabel: string; complexity: string; noRun: string; details: string }
    refactoring: { cardTitle: string; cardSubtitle: string; fixesTotal: string
                   successRate: string; severity: string; noRun: string; details: string }
    nav: { testingTitle: string; testingSubtitle: string; refactTitle: string; refactSubtitle: string }
  }
  testing: {
    subtitle: string
    kpi: { generated: string; generatedSub: string; lastRun: string
           timeSaved: string; timeSavedSub: string; pipeline: string; pipelineSub: string }
    charts: { complexity: string; complexitySub: string; successRate: string; successSub: string
              noSuccessData: string; testsInClass: (n: number) => string }
    table: { title: string; subtitle: string; class: string; count: string
             share: string; successRate: string; timeSaved: string }
    empty: { text: string; subtext: string }
  }
  refactoring: {
    subtitle: string
    kpi: { fixes: string; fixesSub: string; successRate: string; skipped: (n: number) => string
           timeSaved: string; timeSavedSub: string; lastRun: string }
    charts: { severity: string; severitySub: string; type: string; typeSub: string
              complexity: string; complexitySub: string; breakdown: string; breakdownSub: string
              noSeverity: string }
    table: { title: string; subtitle: string; class: string; count: string
             share: string; successRate: string; timeSaved: string }
    empty: { text: string; subtext: string }
  }
}
