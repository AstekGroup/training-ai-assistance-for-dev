import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { DetailDialog, ClickableDetailTrigger } from '@/meetup/components/detail-dialog'
import {
  securityThreats,
  securityDefenses,
  mcpAdvancedPistes,
  mcpTokenCostArticle,
} from '@/meetup/data/course-content'

type DetailKind = 'threat' | 'piste' | 'defense'

function detailKey(kind: DetailKind, id: string) {
  return `${kind}:${id}`
}

function parseDetailKey(key: string | null): { kind: DetailKind; id: string } | null {
  if (!key) return null
  const [kind, id] = key.split(':') as [DetailKind, string]
  if (!kind || !id) return null
  return { kind, id }
}

export function Slide08M4McpSecurite() {
  const [open, setOpen] = useState<string | null>(null)
  const parsed = parseDetailKey(open)

  const selectedThreat = parsed?.kind === 'threat' ? securityThreats.find((t) => t.id === parsed.id) : null
  const selectedPiste = parsed?.kind === 'piste' ? mcpAdvancedPistes.find((p) => p.id === parsed.id) : null
  const selectedDefense = parsed?.kind === 'defense' ? securityDefenses.find((d) => d.id === parsed.id) : null

  const selected = selectedThreat ?? selectedPiste ?? selectedDefense
  const dialogTitle = selected ? `${selected.emoji} ${selected.title}` : ''
  const dialogSections = selected?.sections ?? []

  return (
    <div className="relative flex h-full w-full items-center justify-center px-10 py-8">
      <div className="flex w-full max-w-[1500px] flex-col gap-4">
        <header>
          <div className="ilab-overline mb-2">Module 4 · 13h30–15h45</div>
          <h2 className="text-3xl font-black tracking-tight md:text-[2.75rem] md:leading-tight">
            MCP avancé & <span className="text-ilab-green">sécurité</span>
          </h2>
          <p className="mt-2 max-w-4xl text-base text-muted-foreground">
            Dépasser le « premier MCP » — périmètre autorisé dans rules/skills (repos, branches, secrets jamais en prompt).
          </p>
        </header>

        <section>
          <h3 className="mb-2 flex items-center gap-2 text-base font-bold">
            <span aria-hidden className="text-lg">🔌</span>
            Pistes MCP entreprise
          </h3>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {mcpAdvancedPistes.map((p) => (
              <ClickableDetailTrigger
                key={p.id}
                size="cozy"
                title={`${p.emoji} ${p.title}`}
                summary={p.summary}
                onClick={() => setOpen(detailKey('piste', p.id))}
              />
            ))}
          </div>
          <p className="mt-2 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-sm text-muted-foreground">
            <span aria-hidden className="text-base leading-5">⚡</span>
            <span className="min-w-0">
              <strong className="text-foreground">{mcpTokenCostArticle.warning}</strong>
              {' — '}
              <a
                href={mcpTokenCostArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-ilab-green underline-offset-2 hover:underline"
              >
                {mcpTokenCostArticle.label}
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            </span>
          </p>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          <section>
            <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-rose-600 dark:text-rose-400">
              <span aria-hidden className="text-lg">🚨</span>
              Menaces
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {securityThreats.map((threat) => (
                <ClickableDetailTrigger
                  key={threat.id}
                  size="cozy"
                  title={`${threat.emoji} ${threat.title}`}
                  summary={threat.summary}
                  onClick={() => setOpen(detailKey('threat', threat.id))}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-ilab-green">
              <span aria-hidden className="text-lg">🛡️</span>
              Défenses pratiques
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {securityDefenses.map((d) => (
                <ClickableDetailTrigger
                  key={d.id}
                  size="cozy"
                  title={`${d.emoji} ${d.title}`}
                  summary={d.summary}
                  onClick={() => setOpen(detailKey('defense', d.id))}
                  className="border-ilab-green/20 bg-ilab-green/5"
                />
              ))}
            </div>
          </section>
        </div>

        <p className="text-sm text-muted-foreground">
          <strong>TP (14h15–15h45) :</strong> choisir 1–2 serveurs MCP, configurer, documenter le périmètre, vérifier la sécurité de l&apos;application.
        </p>

        {selected && (
          <DetailDialog
            open={!!open}
            onOpenChange={() => setOpen(null)}
            title={dialogTitle}
            sections={dialogSections}
          />
        )}
      </div>
    </div>
  )
}
