import { modelUseCases } from '@/meetup/data/course-content'

export function Slide07M3Modeles() {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1500px]">
        <div className="mb-6">
          <div className="ilab-overline mb-3">Module 3 · Théorie agents</div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Modèles & <span className="text-ilab-green">use cases</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Choisir le modèle et le mode selon la tâche — tableau de référence du module 3.
          </p>
        </div>

        <div className="mb-6 overflow-hidden rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 font-bold">Use case</th>
                <th className="px-4 py-3 font-bold">Mode</th>
                <th className="px-4 py-3 font-bold">Modèle conseillé</th>
              </tr>
            </thead>
            <tbody>
              {modelUseCases.map((row) => (
                <tr key={row.useCase} className="border-t">
                  <td className="px-4 py-3">{row.useCase}</td>
                  <td className="px-4 py-3 font-mono text-ilab-green">{row.mode}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-5">
            <h3 className="mb-2 font-bold">Modèles high</h3>
            <p className="text-sm text-muted-foreground">
              Claude Opus 4.7, Gemini 3.1 Pro — epic, plan complexe, optimisation.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <h3 className="mb-2 font-bold">Modèles légers</h3>
            <p className="text-sm text-muted-foreground">
              Haiku, Mistral 3, Kimi K2.6 — lint, commit, scripts simples. Mistral : rapport qualité/coût souverain.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-ilab-green/20 bg-ilab-green/5 p-5">
          <h3 className="mb-2 font-bold">TP Module 3 (11h15–12h30)</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• <strong>Rules</strong> : rédaction AGENTS.md + tests</li>
            <li>• <strong>Skills</strong> : rédaction skills (inclure doc agentskills.io) + tests</li>
            <li>• <strong>MCP</strong> : trouver un MCP, intégration rules/skills, tests</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
