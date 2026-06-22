import { useState } from 'react'
import { DetailDialog, ClickableDetailTrigger } from '@/meetup/components/detail-dialog'
import { agentAnatomyLayers, driftContent } from '@/meetup/data/course-content'
import { useT } from '@/meetup/i18n'

export function Slide07M3Anatomie() {
  const t = useT()
  const [open, setOpen] = useState<string | null>(null)
  const selected = agentAnatomyLayers.find((l) => l.id === open)

  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1500px]">
        <div className="mb-6">
          <div className="ilab-overline mb-3">Module 3 · 9h30–10h30</div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Anatomie d&apos;un <span className="text-ilab-green">agent IA</span>
          </h2>
          <div className="mt-4 rounded-xl border-2 border-violet-500/30 bg-violet-500/5 p-4 font-mono text-sm md:text-base">
            Agent IA vibe-coding = LLM + Contexte (IDE, mémoire, rules, skills, MCP, Mode)
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Rules à 3 niveaux : entreprise · équipe · individuel. Cliquez chaque couche pour le détail.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {agentAnatomyLayers.map((layer) => (
            <ClickableDetailTrigger
              key={layer.id}
              title={layer.name}
              summary={layer.detail.slice(0, 80) + '…'}
              onClick={() => setOpen(layer.id)}
            />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <h3 className="mb-3 text-lg font-bold text-amber-600 dark:text-amber-400">Le drift — perte de qualité dans le temps</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">Causes</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {driftContent.causes.map((c) => (
                  <li key={c}>• {c}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">Remèdes</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {driftContent.remedies.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {selected && (
          <DetailDialog
            open={!!open}
            onOpenChange={() => setOpen(null)}
            title={selected.name}
            sections={[
              { title: t('Définition', 'Definition'), content: selected.detail },
              ...(selected.id === 'rules'
                ? [
                    {
                      title: 'AGENTS.md',
                      content: (
                        <span>
                          Format principal des Rules — règles systématiques à chaque prompt.{' '}
                          <a href="https://agents.md" className="text-ilab-green underline" target="_blank" rel="noreferrer">
                            agents.md
                          </a>
                        </span>
                      ),
                    },
                  ]
                : []),
              ...(selected.id === 'skills'
                ? [
                    {
                      title: 'Agent Skills',
                      content: (
                        <span>
                          Concevoir et maintenir des skills — voir{' '}
                          <a href="https://agentskills.io/home" className="text-ilab-green underline" target="_blank" rel="noreferrer">
                            agentskills.io
                          </a>
                        </span>
                      ),
                    },
                  ]
                : []),
            ]}
          />
        )}
      </div>
    </div>
  )
}
