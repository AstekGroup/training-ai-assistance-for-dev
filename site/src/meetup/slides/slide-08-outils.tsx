import { BrandLogo } from '@/meetup/components/brand-logo'
import { useT } from '@/meetup/i18n'

const tools = [
  { brand: 'cursor', name: 'Cursor', desc: 'IDE agentique VS Code' },
  { brand: 'google', name: 'Antigravity', desc: 'IDE agent-first Google' },
  { brand: 'anthropic', name: 'Claude Code', desc: 'Agent terminal Anthropic' },
  { brand: 'github', name: 'GitHub Copilot', desc: 'Assistant intégré GitHub' },
  { brand: 'openai', name: 'Codex', desc: 'Agent CLI OpenAI' },
  { brand: 'mistral', name: 'Mistral Vibe', desc: 'Agent CLI européen' },
] as const

const concepts = [
  { emoji: '🔌', name: 'MCP', desc: 'Model Context Protocol' },
  { emoji: '📋', name: 'SpecKit', desc: 'Spec-driven development' },
  { emoji: '📖', name: 'OpenSpec', desc: 'Contrats & spécifications' },
  { emoji: '🏗️', name: 'BMAD', desc: 'Méthode agentique 4 phases' },
  { emoji: '🔄', name: 'A2A', desc: 'Agent-to-Agent' },
  { emoji: '📄', name: 'AGENTS.md', desc: 'Rules systématiques' },
]

export function Slide08Outils() {
  const t = useT()
  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1500px]">
        <div className="mb-8">
          <div className="ilab-overline mb-3">{t('Écosystème', 'Ecosystem')}</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            {t('Outils', 'Tools')} <span className="text-ilab-green">{t('couverts', 'covered')}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(
              'Panorama pour savoir trancher — pas d\'exhaustivité, mais une grille de lecture entreprise.',
              'Landscape to make informed choices — not exhaustive, but an enterprise decision grid.',
            )}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col items-center rounded-xl border bg-card p-4 text-center shadow-sm transition-colors hover:border-ilab-green/40"
            >
              <BrandLogo id={tool.brand} size="lg" className="mb-2" />
              <div className="text-sm font-bold">{tool.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{tool.desc}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {concepts.map((c) => (
            <div key={c.name} className="rounded-xl border bg-card/60 p-3 text-center">
              <div className="text-2xl">{c.emoji}</div>
              <div className="text-sm font-bold">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.desc}</div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('+ Continue, Windsurf, Junie, OpenCode selon contexte client', '+ Continue, Windsurf, Junie, OpenCode per client context')}
        </p>
      </div>
    </div>
  )
}
