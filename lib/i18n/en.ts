/**
 * English — Central translation file
 * Mirrors de.ts structure exactly — all keys must be present.
 */

import type { Translations } from './de'

export const en: Translations = {

  nav: {
    appName:    'AI Dashboard',
    appTagline: 'TestForge · RefactlyAI',
    bigView:    'Big View',
    projects:   'Projects',
    liveStatus: 'Live · Auto-refresh 60s',
  },

  topbar: {
    refresh: 'Refresh',
  },

  common: {
    tests:        'Tests',
    fixes:        'Fixes',
    timeSaved:    'Time Saved',
    lastRun:      'Last Run',
    totalActions: 'AI Actions',
    projects:     'Projects',
    successRate:  'Success Rate',
    noData:       'No data yet',
    neverRun:     'Never run',
    unknown:      'Unknown',
    never:        'Never',
    total:        'Total',
    share:        'Share',
    count:        'Count',
    duration:     'Duration',
    workdays:     'workdays',
    lastRunLabel: 'last run',
    configHint:   'Adjust config/repos.json',
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

  bigView: {
    title:    'Big View',
    subtitle: 'Global KPI Overview · TestForge AI + RefactlyAI',

    kpi: {
      testsGenerated: 'Tests generated (AI)',
      testsSub:       'TestForge AI — all projects',
      issuesFixed:    'Issues fixed (AI)',
      issuesSub:      'RefactlyAI — all projects',
      timeSaved:      'Total time saved',
      timeSavedSub:   '30min/test + 20min/fix',
      activeProjects: 'Active projects',
      projectsSub:    'across both AI pipelines',
    },

    activity: {
      title:        'AI Activity',
      subtitle:     'Distribution Testing vs. Refactoring',
      testingLabel: 'Testing (TestForge)',
      refactLabel:  'Refactoring (RefactlyAI)',
      testsGenLabel:'Tests generated',
      fixesLabel:   'Issues fixed',
      totalActions: 'Total AI Actions',
    },

    table: {
      title:      'Projects — Quick Overview',
      subtitle:   'All projects with AI activity',
      noProjects: 'No projects configured',
    },

    footer: 'Data reloads every 60s · Sources: GLOBAL_STATS.json + reports/metrics.json',
  },

  projectsList: {
    title:       'All Projects',
    subtitle:    (count: number) => `${count} projects · Testing + Refactoring`,
    noProjects:  'No projects configured',
    col: {
      project:     'Project',
      testing:     'Testing',
      refactoring: 'Refactoring',
      timeSaved:   'Time Saved',
    },
    testsGenerated: 'Tests generated',
    issuesFixed:    'Issues fixed',
    lastRunSuffix:  'last run',
    timeTesting:    'Testing',
    timeRefact:     'Refact.',
  },

  projectOverview: {
    subtitle:       (name: string) => `Project Overview · ${name}`,
    kpi: {
      totalActions:  'Total AI Actions',
      totalSub:      (tests: number, fixes: number) => `${tests} tests · ${fixes} fixes`,
      timeSaved:     'Time Saved',
      workdaysSub:   (days: number) => `≈ ${days} workdays`,
      testsGenerated:'Tests generated',
      issuesFixed:   'Issues fixed',
      successRate:   'Success Rate',
    },

    testing: {
      cardTitle:    'Testing · TestForge AI',
      cardSubtitle: 'Automatically generated tests via AI',
      testsTotal:   'Total tests',
      lastRunLabel: 'Last run',
      complexity:   'Complexity',
      noRun:        'No run yet',
      details:      'Details',
    },

    refactoring: {
      cardTitle:    'Refactoring · RefactlyAI',
      cardSubtitle: 'Automatically fixed SonarQube issues',
      fixesTotal:   'Total fixes',
      successRate:  'Success rate',
      severity:     'Issues by severity',
      noRun:        'No run yet',
      details:      'Details',
    },

    nav: {
      testingTitle:    'Testing Details',
      testingSubtitle: 'Specs, coverage, complexity',
      refactTitle:     'Refactoring Details',
      refactSubtitle:  'Severity, types, PRs',
    },
  },

  testing: {
    subtitle:     'TestForge AI — automatically generated tests',
    kpi: {
      generated:   'Tests generated',
      generatedSub:'Cumulative across all runs',
      lastRun:     'Last run',
      timeSaved:   'Time saved',
      timeSavedSub:'@ 30min/test manually',
      pipeline:    'Pipeline duration',
      pipelineSub: 'Last known run',
    },
    charts: {
      complexity:     'Distribution by Complexity',
      complexitySub:  'Simple / Medium / Complex',
      successRate:    'Success Rate by Complexity',
      successSub:     'Share of successfully generated tests',
      noSuccessData:  'No data — pipeline has not run yet',
      testsInClass:   (n: number) => `${n} tests in this class`,
    },
    table: {
      title:       'Detailed breakdown',
      subtitle:    'Tests by complexity class',
      class:       'Class',
      count:       'Count',
      share:       'Share',
      successRate: 'Success Rate',
      timeSaved:   'Time Saved',
    },
    empty: {
      text:    'No tests generated yet',
      subtext: 'TestForge AI pipeline needs to run first',
    },
  },

  refactoring: {
    subtitle:     'RefactlyAI — SonarQube issues fixed automatically',
    kpi: {
      fixes:       'Total fixes',
      fixesSub:    'Cumulative across all runs',
      successRate: 'Success rate',
      skipped:     (n: number) => `${n} skipped`,
      timeSaved:   'Time saved',
      timeSavedSub:'@ 20min/fix manually',
      lastRun:     'Last run',
    },
    charts: {
      severity:       'Issues by Severity',
      severitySub:    'BLOCKER → INFO',
      type:           'Issues by Type',
      typeSub:        'BUG · VULNERABILITY · CODE_SMELL',
      complexity:     'Fixes by Complexity',
      complexitySub:  'Classification: Simple / Medium / Complex',
      breakdown:      'Severity Breakdown',
      breakdownSub:   'Detailed view',
      noSeverity:     'No severity data',
    },
    table: {
      title:       'Complexity detail table',
      subtitle:    'Fixes by class with success rate',
      class:       'Class',
      count:       'Count',
      share:       'Share',
      successRate: 'Success Rate',
      timeSaved:   'Time Saved',
    },
    empty: {
      text:    'No fixes applied yet',
      subtext: 'RefactlyAI pipeline needs to run first',
    },
  },

}
