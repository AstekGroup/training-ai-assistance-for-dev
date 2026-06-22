import { useState } from 'react'
import { useT } from '@/meetup/i18n'
import { DetailDialog } from '@/meetup/components/detail-dialog'
import { modulesPlanning } from '@/meetup/data/course-content'

const modulesFr = [
  { jour: 'J1', slot: 'Matin', num: 'M1', verb: 'Structurer', theme: 'Vibe Coding & prompt engineering', tone: 'emerald', planningId: 'm1' },
  { jour: 'J1', slot: 'Après-midi', num: 'M2', verb: 'Intensifier', theme: 'Outillage, Git, labs & garde-fous', tone: 'emerald', planningId: 'm2' },
  { jour: 'J2', slot: 'Matin', num: 'M3', verb: 'Concevoir', theme: 'Stack agent, Rules, Skills, MCP', tone: 'violet', planningId: 'm3' },
  { jour: 'J2', slot: 'Après-midi', num: 'M4', verb: 'Industrialiser', theme: 'MCP avancé, sécurité, BMAD', tone: 'violet', planningId: 'm4' },
  { jour: 'J3', slot: 'Matin', num: 'M5', verb: 'Cadrer', theme: 'Harness, contrat de contexte, qualité', tone: 'cyan', planningId: 'm5' },
  { jour: 'J3', slot: 'Après-midi', num: 'M6', verb: 'Pratiquer', theme: 'Stage-Gate, TP final multi-agents', tone: 'cyan', planningId: 'm6' },
]

const toneBar: Record<string, string> = {
  emerald: 'bg-emerald-500',
  violet: 'bg-violet-500',
  cyan: 'bg-cyan-500',
}

export function Slide04Parcours() {
  const t = useT()
  const [openModule, setOpenModule] = useState<string | null>(null)
  const planning = modulesPlanning.find((m) => m.id === openModule)

  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1400px]">
        <div className="mb-8">
          <div className="ilab-overline mb-3">{t('Structure', 'Structure')}</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            3 {t('jours', 'days')} ·{' '}
            <span className="text-ilab-green">6 {t('modules', 'modules')}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(
              '2 demi-journées par jour · ~3 h 30 de séquences (+ pauses). Cliquez un module pour le planning détaillé.',
              '2 half-days per day · ~3.5 h sequences (+ breaks). Click a module for detailed schedule.',
            )}
          </p>
        </div>

        <div className="space-y-3">
          {modulesFr.map((m) => (
            <button
              key={m.num}
              type="button"
              onClick={() => setOpenModule(m.planningId)}
              className="flex w-full items-center gap-4 rounded-xl border bg-card p-4 text-left shadow-sm transition-all hover:border-ilab-green/50 hover:bg-ilab-green/5"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-sm font-black text-white ${toneBar[m.tone]}`}>
                {m.num}
              </div>
              <div className="w-28 shrink-0">
                <div className="font-mono text-sm font-bold text-ilab-green">{m.jour}</div>
                <div className="text-xs text-muted-foreground">{m.slot}</div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold">
                  <span className="text-ilab-green">{m.verb}</span>
                  <span className="text-muted-foreground"> — </span>
                  {m.theme}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Planning →</span>
            </button>
          ))}
        </div>

        {planning && (
          <DetailDialog
            open={!!openModule}
            onOpenChange={() => setOpenModule(null)}
            title={planning.label}
            sections={planning.sequences.map((seq) => ({
              title: `${seq.time} — ${seq.title}`,
              content: seq.content,
            }))}
          />
        )}
      </div>
    </div>
  )
}
