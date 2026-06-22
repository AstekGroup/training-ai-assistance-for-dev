import { useState } from 'react'
import { Shield, ShieldAlert } from 'lucide-react'
import { DetailDialog, ClickableDetailTrigger } from '@/meetup/components/detail-dialog'
import { securityThreats, securityDefenses, mcpAdvancedPistes } from '@/meetup/data/course-content'

export function Slide08M4McpSecurite() {
  const [open, setOpen] = useState<string | null>(null)
  const selected = securityThreats.find((t) => t.id === open)

  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1500px]">
        <div className="mb-6">
          <div className="ilab-overline mb-3">Module 4 · 13h30–15h45</div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            MCP avancé & <span className="text-ilab-green">sécurité</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Dépasser le « premier MCP » — documenter le périmètre autorisé dans rules/skills (repos, branches, secrets jamais en prompt).
          </p>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-2 font-bold">
            <Shield className="h-5 w-5 text-ilab-green" />
            Pistes MCP entreprise
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {mcpAdvancedPistes.map((p) => (
              <li key={p} className="rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section>
            <h3 className="mb-3 flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
              <ShieldAlert className="h-5 w-5" />
              Menaces (cliquer pour détail)
            </h3>
            <div className="space-y-2">
              {securityThreats.map((threat) => (
                <ClickableDetailTrigger
                  key={threat.id}
                  title={threat.title}
                  summary={threat.content}
                  onClick={() => setOpen(threat.id)}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-bold text-ilab-green">Défenses pratiques</h3>
            <ul className="space-y-2">
              {securityDefenses.map((d) => (
                <li key={d} className="rounded-lg border border-ilab-green/20 bg-ilab-green/5 px-4 py-3 text-sm">
                  {d}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          <strong>TP (14h15–15h45) :</strong> choisir 1–2 serveurs MCP, configurer, documenter le périmètre, vérifier la sécurité de l&apos;application.
        </p>

        {selected && (
          <DetailDialog
            open={!!open}
            onOpenChange={() => setOpen(null)}
            title={selected.title}
            sections={[{ title: 'Description', content: selected.content }]}
          />
        )}
      </div>
    </div>
  )
}
