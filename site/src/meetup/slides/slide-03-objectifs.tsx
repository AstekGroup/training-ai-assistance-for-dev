import { CheckCircle2 } from 'lucide-react'
import { useLang, useT } from '@/meetup/i18n'

const objectifsFr = [
  'Pratiquer le Vibe Coding : méthodologie collaborative avec agents IA',
  'Concevoir avec l\'IA : architecture, modélisation et spécifications',
  'Développer avec les outils d\'assistance : complétion, génération, refactoring',
  'Assurer la qualité : tests automatisés, revue de code, détection d\'anomalies',
  'Intégrer l\'IA sur tout le cycle de vie : de l\'idée à la production',
  'Maîtriser harness engineering et contrat de contexte',
  'Déboguer, optimiser, tester et revoir le code avec l\'IA',
  'Orchestrer la méthode Stage-Gate en contexte entreprise',
]

const objectifsEn = [
  'Practice Vibe Coding: collaborative methodology with AI agents',
  'Design with AI: architecture, modeling and specifications',
  'Develop with assistance tools: completion, generation, refactoring',
  'Ensure quality: automated tests, code review, anomaly detection',
  'Integrate AI across the lifecycle: from idea to production',
  'Master harness engineering and context contract',
  'Debug, optimize, test and review code with AI',
  'Orchestrate Stage-Gate method in enterprise context',
]

export function Slide03Objectifs() {
  const t = useT()
  const { lang } = useLang()
  const objectifs = lang === 'fr' ? objectifsFr : objectifsEn

  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1500px]">
        <div className="mb-8">
          <div className="ilab-overline mb-3">{t('Objectifs pédagogiques', 'Learning objectives')}</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            {t('Ce que vous', 'What you will')}{' '}
            <span className="text-ilab-green">{t('maîtriserez', 'master')}</span>
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {objectifs.map((obj, i) => (
            <div key={obj} className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ilab-green" />
              <div>
                <span className="mr-2 font-mono text-xs font-bold text-ilab-green">{i + 1}</span>
                <span className="text-base text-foreground">{obj}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t(
            'Public : tout développeur, testeur, QA, architecte — pré-requis : programmation de base, Git, IDE agentique.',
            'Audience: any developer, tester, QA, architect — prerequisites: basic programming, Git, agentic IDE.',
          )}
        </p>
      </div>
    </div>
  )
}
