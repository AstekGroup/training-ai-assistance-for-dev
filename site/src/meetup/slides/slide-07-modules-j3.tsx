import { FileText, Bug, GitMerge } from 'lucide-react'
import { useT } from '@/meetup/i18n'

export function Slide07ModulesJ3() {
  const t = useT()
  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1500px]">
        <div className="mb-8">
          <div className="ilab-overline mb-3">{t('Jour 3', 'Day 3')}</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            {t('Modules', 'Modules')} <span className="text-ilab-green">5 & 6</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-7 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-500">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-sm font-bold text-ilab-green">M5</div>
                <h3 className="text-2xl font-bold">{t('Cadrer', 'Frame')}</h3>
              </div>
            </div>
            <ul className="space-y-2 text-base text-muted-foreground">
              <li>• {t('Harness engineering : rules, skills, DESIGN.md, tests', 'Harness engineering: rules, skills, DESIGN.md, tests')}</li>
              <li>• {t('Contrat de contexte : MoSCoW, 6 piliers, livrable projet', 'Context contract: MoSCoW, 6 pillars, project deliverable')}</li>
              <li>• {t('TP : debug, perf, tests et review assistés par IA', 'Workshop: AI-assisted debug, perf, tests and review')}</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-7 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/15 text-rose-500">
                <GitMerge className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-sm font-bold text-ilab-green">M6</div>
                <h3 className="text-2xl font-bold">{t('Pratiquer', 'Practice')}</h3>
              </div>
            </div>
            <ul className="space-y-2 text-base text-muted-foreground">
              <li>• {t('Méthode Stage-Gate : stages + gates human-in-the-loop', 'Stage-Gate method: stages + human-in-the-loop gates')}</li>
              <li>• {t('TP final : projet collaboratif multi-agents (3 h)', 'Final workshop: collaborative multi-agent project (3 h)')}</li>
              <li>• {t('Synthèse 6 modules, évaluation et prochaines étapes', '6-module wrap-up, assessment and next steps')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 px-6 py-5">
          <Bug className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
          <p className="text-base text-muted-foreground">
            {t(
              'SpecKit / OpenSpec selon besoins client — intégrés au fil des modules pour le cadrage spec-driven.',
              'SpecKit / OpenSpec per client needs — integrated across modules for spec-driven framing.',
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
