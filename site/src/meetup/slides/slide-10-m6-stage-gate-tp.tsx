import { useState } from 'react'
import { DetailDialog, ClickableDetailTrigger } from '@/meetup/components/detail-dialog'
import { stageGateStages, tpFinalRoles, tpFinalProjets } from '@/meetup/data/course-content'

export function Slide10M6StageGateTp() {
  const [open, setOpen] = useState<number | null>(null)
  const selected = open !== null ? stageGateStages[open] : null

  return (
    <div className="relative flex h-full w-full items-center justify-center px-10 py-8">
      <div className="flex h-full w-full max-w-[1600px] flex-col overflow-hidden">
        <div className="mb-4 shrink-0">
          <div className="ilab-overline mb-2">Module 6 · Jour 3 après-midi</div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Stage-Gate & <span className="text-ilab-green">TP final</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            La méthode Stage-Gate structure le flux en stages séparés par des gates (décisions explicites). Avec le Vibe Coding : cadrer les allers-retours IA et garder un human-in-the-loop aux moments critiques. Le développeur devient pilote de flux — la valeur se déplace vers la validation à chaque gate.
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          <h3 className="mb-3 font-bold">Les 5 stages & gates (cliquer)</h3>
          <div className="mb-6 space-y-2">
            {stageGateStages.map((s, i) => (
              <ClickableDetailTrigger
                key={s.stage}
                title={s.stage}
                summary={s.gate}
                onClick={() => setOpen(i)}
              />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section>
              <h3 className="mb-3 font-bold">Rôles multi-agents (TP final)</h3>
              <ul className="space-y-2">
                {tpFinalRoles.map((r) => (
                  <li key={r.role} className="rounded-lg border bg-card px-4 py-3 text-sm">
                    <strong>{r.role}</strong>
                    <span className="text-muted-foreground"> — {r.desc}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="mb-3 font-bold">Projets proposés</h3>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                {tpFinalProjets.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
              <div className="mt-4 rounded-lg border border-ilab-green/20 bg-ilab-green/5 p-4 text-sm">
                <strong>Déroulement :</strong> Setup & brief → Sprint 1 MVP (60 min) → Sprint 2 enrichissement (60 min) → Sprint 3 finalisation (30 min) → Démos (~10 min/équipe)
              </div>
            </section>
          </div>
        </div>

        {selected && (
          <DetailDialog
            open={open !== null}
            onOpenChange={() => setOpen(null)}
            title={selected.stage}
            sections={[
              { title: 'Action', content: selected.action },
              { title: 'Gate (question de validation)', content: selected.gate },
            ]}
          />
        )}
      </div>
    </div>
  )
}
