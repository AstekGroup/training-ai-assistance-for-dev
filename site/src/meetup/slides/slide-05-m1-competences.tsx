import { useState } from 'react'
import type { ComponentType } from 'react'
import { Brain, MessageSquare, Wrench, Database, Eye } from 'lucide-react'
import { DetailDialog, ClickableDetailTrigger } from '@/meetup/components/detail-dialog'
import { competencesVibeCoding } from '@/meetup/data/course-content'
import { useT } from '@/meetup/i18n'

const icons: Record<string, ComponentType<{ className?: string }>> = {
  thinking: Brain,
  prompting: MessageSquare,
  tools: Wrench,
  context: Database,
  review: Eye,
}

const colors: Record<string, string> = {
  thinking: 'text-violet-500',
  prompting: 'text-amber-500',
  tools: 'text-cyan-500',
  context: 'text-blue-500',
  review: 'text-rose-500',
}

export function Slide05M1Competences() {
  const t = useT()
  const [open, setOpen] = useState<string | null>(null)
  const selected = competencesVibeCoding.find((c) => c.id === open)

  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1500px]">
        <div className="mb-8">
          <div className="ilab-overline mb-3">Module 1 · 9h30–10h15</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            Les <span className="text-ilab-green">5 compétences</span> du Vibe Coding
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            {t(
              'Framework transversal de la formation — chaque compétence est mobilisée dans les labs et le TP final. Cliquez pour le détail pédagogique.',
              'Cross-cutting framework — each skill is used in labs and the final workshop. Click for pedagogical detail.',
            )}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {competencesVibeCoding.map((c) => {
            const Icon = icons[c.id]
            return (
              <ClickableDetailTrigger
                key={c.id}
                title={c.name}
                summary={c.short}
                onClick={() => setOpen(c.id)}
              >
                <Icon className={`mt-2 h-6 w-6 ${colors[c.id]}`} />
              </ClickableDetailTrigger>
            )
          })}
        </div>

        <p className="mt-6 rounded-xl border border-ilab-green/20 bg-ilab-green/5 px-5 py-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Exercice guidé (11h15–12h30) :</strong>{' '}
          développer une application Todo en appliquant les 5 compétences — premier contact structuré avec l&apos;outil de vibe coding de la formation.
        </p>

        {selected && (
          <DetailDialog
            open={!!open}
            onOpenChange={() => setOpen(null)}
            title={selected.name}
            description={selected.short}
            sections={[{ title: t('Détail pédagogique', 'Pedagogical detail'), content: selected.detail }]}
          />
        )}
      </div>
    </div>
  )
}
