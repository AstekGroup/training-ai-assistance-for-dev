import { useState } from 'react'
import { DetailDialog, ClickableDetailTrigger } from '@/meetup/components/detail-dialog'
import { promptEngineeringTips } from '@/meetup/data/course-content'
import { useT } from '@/meetup/i18n'

export function Slide05M1Prompt() {
  const t = useT()
  const [open, setOpen] = useState<number | null>(null)
  const selected = open !== null ? promptEngineeringTips[open] : null

  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1500px]">
        <div className="mb-8">
          <div className="ilab-overline mb-3">Module 1 · 10h30–11h15</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            Prompt engineering <span className="text-ilab-green">entreprise</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Templates, contraintes métier et conformité — chaque principe est détaillé au clic.
          </p>
        </div>

        <div className="space-y-3">
          {promptEngineeringTips.map((tip, i) => (
            <ClickableDetailTrigger
              key={tip.title}
              title={tip.title}
              summary={tip.content.slice(0, 100) + '…'}
              onClick={() => setOpen(i)}
            />
          ))}
        </div>

        {selected && (
          <DetailDialog
            open={open !== null}
            onOpenChange={() => setOpen(null)}
            title={selected.title}
            sections={[
              {
                title: t('En pratique', 'In practice'),
                content: selected.content,
              },
              {
                title: t('Lien module 5', 'Link to module 5'),
                content: t(
                  'Ces contraintes se formalisent dans le contrat de contexte (must / should / would / won\'t) et nourrissent AGENTS.md.',
                  'These constraints are formalized in the context contract (must / should / would / won\'t) and feed AGENTS.md.',
                ),
              },
            ]}
          />
        )}
      </div>
    </div>
  )
}
