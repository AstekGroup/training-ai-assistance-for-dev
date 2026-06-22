import type { ComponentType } from 'react'
import { Brain, MessageSquare, Wrench, Database, Eye, GitBranch } from 'lucide-react'
import { useLang, useT } from '@/meetup/i18n'

const competences = [
  { key: 'thinking', icon: Brain, color: 'text-violet-500 bg-violet-500/15' },
  { key: 'prompting', icon: MessageSquare, color: 'text-amber-500 bg-amber-500/15' },
  { key: 'tools', icon: Wrench, color: 'text-cyan-500 bg-cyan-500/15' },
  { key: 'context', icon: Database, color: 'text-blue-500 bg-blue-500/15' },
  { key: 'review', icon: Eye, color: 'text-rose-500 bg-rose-500/15' },
] as const

const labelsFr: Record<string, { name: string; desc: string }> = {
  thinking: { name: 'Thinking', desc: 'Réflexion et raisonnement assistés' },
  prompting: { name: 'Prompting', desc: 'Ingénierie de prompt avancée' },
  tools: { name: 'Tools', desc: 'Maîtrise des outils IDE & MCP' },
  context: { name: 'Context', desc: 'Gestion mémoire & context engineering' },
  review: { name: 'Review', desc: 'Revue critique et validation humaine' },
}

const labelsEn: Record<string, { name: string; desc: string }> = {
  thinking: { name: 'Thinking', desc: 'Assisted reasoning' },
  prompting: { name: 'Prompting', desc: 'Advanced prompt engineering' },
  tools: { name: 'Tools', desc: 'IDE & MCP tooling mastery' },
  context: { name: 'Context', desc: 'Memory & context engineering' },
  review: { name: 'Review', desc: 'Critical review & human validation' },
}

export function Slide09VibeCoding() {
  const t = useT()
  const { lang } = useLang()
  const labels = lang === 'fr' ? labelsFr : labelsEn

  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1400px]">
        <div className="mb-8 text-center">
          <div className="ilab-overline mb-3">{t('Framework', 'Framework')}</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            5 {t('compétences', 'skills')}{' '}
            <span className="ilab-gradient-text">{t('Vibe Coding', 'Vibe Coding')}</span>
          </h2>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {competences.map((c) => (
            <CompetencePill key={c.key} icon={c.icon} color={c.color} {...labels[c.key]} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-ilab-green/30 bg-ilab-green/5 p-6">
            <h3 className="mb-2 text-xl font-bold">{t('Harness Engineering', 'Harness Engineering')}</h3>
            <p className="text-base text-muted-foreground">
              {t(
                'Environnement de travail pour agents : rules, skills, contrat de contexte, DESIGN.md, jeux de tests — « savoir conduire » l\'agent.',
                'Work environment for agents: rules, skills, context contract, DESIGN.md, test suites — "know how to drive" the agent.',
              )}
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-ilab-green" />
              <h3 className="text-xl font-bold">Stage-Gate</h3>
            </div>
            <p className="text-base text-muted-foreground">
              {t(
                'Stages de production séparés par des gates de validation humaine — human-in-the-loop à chaque décision clé.',
                'Production stages separated by human validation gates — human-in-the-loop at every key decision.',
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompetencePill({
  icon: Icon,
  color,
  name,
  desc,
}: {
  icon: ComponentType<{ className?: string }>
  color: string
  name: string
  desc: string
}) {
  return (
    <div className="flex w-44 flex-col items-center rounded-2xl border bg-card p-4 shadow-sm">
      <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-lg font-bold">{name}</div>
      <div className="mt-1 text-center text-xs text-muted-foreground">{desc}</div>
    </div>
  )
}
