import { useState } from 'react'
import { BrandLogo } from '@/meetup/components/brand-logo'
import { DetailDialog, ClickableDetailTrigger } from '@/meetup/components/detail-dialog'
import { toolsPanorama } from '@/meetup/data/course-content'
import { useT } from '@/meetup/i18n'

export function Slide06M2Outils() {
  const t = useT()
  const [open, setOpen] = useState<string | null>(null)
  const selected = toolsPanorama.find((tool) => tool.id === open)

  return (
    <div className="relative flex h-full w-full items-center justify-center px-10 py-8">
      <div className="flex h-full w-full max-w-[1600px] flex-col">
        <div className="mb-6 shrink-0">
          <div className="ilab-overline mb-2">Module 2 · 13h30–14h00</div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Panorama <span className="text-ilab-green">outillage</span>
          </h2>
          <p className="mt-3 max-w-4xl text-base text-muted-foreground">
            {t(
              'Complément au module 1 : choisir l\'outil selon le poste (plan vs agent, intégration Git, MCP, modèle). Pas d\'exhaustivité — l\'objectif est de savoir trancher. Antigravity : entrée agent-first de Google (agents multiples, écosystème Gemini). Cliquez un outil pour présentation, forces et limites.',
              'Complement to module 1: choose tools by role. Click a tool for presentation, strengths and limits.',
            )}
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {toolsPanorama.map((tool) => (
              <ClickableDetailTrigger
                key={tool.id}
                title={tool.name}
                summary={tool.presentation.slice(0, 90) + '…'}
                onClick={() => setOpen(tool.id)}
                className="p-3"
              >
                {tool.brandId && <BrandLogo id={tool.brandId} size="sm" className="mt-2" />}
              </ClickableDetailTrigger>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            + OpenCode, Junie, Lovable selon contexte — voir syllabus module 2
          </p>
        </div>

        {selected && (
          <DetailDialog
            open={!!open}
            onOpenChange={() => setOpen(null)}
            title={selected.name}
            description={selected.presentation}
            sections={[
              { title: t('Points forts', 'Strengths'), content: selected.strengths },
              { title: t('Limites', 'Limits'), content: selected.limits },
            ]}
          />
        )}
      </div>
    </div>
  )
}
