import { Bot, Lock, Layers } from 'lucide-react'
import { useT } from '@/meetup/i18n'

export function Slide06ModulesJ2() {
  const t = useT()
  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1500px]">
        <div className="mb-8">
          <div className="ilab-overline mb-3">{t('Jour 2', 'Day 2')}</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            {t('Modules', 'Modules')} <span className="text-ilab-green">3 & 4</span>
          </h2>
        </div>

        <div className="mb-8 rounded-2xl border-2 border-violet-500/30 bg-violet-500/5 p-6 text-center">
          <p className="font-mono text-lg font-bold text-violet-600 dark:text-violet-400">
            Agent = LLM + Contexte + Rules + Skills + MCP + Modes
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-7 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-500">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-sm font-bold text-ilab-green">M3</div>
                <h3 className="text-2xl font-bold">{t('Concevoir', 'Design')}</h3>
              </div>
            </div>
            <ul className="space-y-2 text-base text-muted-foreground">
              <li>• {t('Anatomie agent, modèles, drift, modes plan/edit/ask/debug', 'Agent anatomy, models, drift, plan/edit/ask/debug modes')}</li>
              <li>• {t('AGENTS.md, Rules à 3 niveaux (entreprise / équipe / individu)', 'AGENTS.md, Rules at 3 levels (enterprise / team / individual)')}</li>
              <li>• {t('TP : premier serveur MCP + skills de base', 'Workshop: first MCP server + basic skills')}</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-7 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-sm font-bold text-ilab-green">M4</div>
                <h3 className="text-2xl font-bold">{t('Industrialiser', 'Industrialize')}</h3>
              </div>
            </div>
            <ul className="space-y-2 text-base text-muted-foreground">
              <li>• {t('MCP avancé : Context7, forge, navigateur, ciblage des outils', 'Advanced MCP: Context7, forge, browser, tool scoping')}</li>
              <li>• {t('Sécurité : prompt injection, data leakage, sandboxing', 'Security: prompt injection, data leakage, sandboxing')}</li>
              <li>• {t('BMAD-METHOD : Brainstorm · Model · Architect · Develop', 'BMAD-METHOD: Brainstorm · Model · Architect · Develop')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <Layers className="h-4 w-4 text-ilab-green" />
          {t('Retour challenge overnight en ouverture de J2', 'Overnight challenge debrief at start of Day 2')}
        </div>
      </div>
    </div>
  )
}
