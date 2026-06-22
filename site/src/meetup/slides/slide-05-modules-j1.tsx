import type { ComponentType } from 'react'
import { Brain, GitBranch, ListTodo, Shield } from 'lucide-react'
import { useT } from '@/meetup/i18n'

export function Slide05ModulesJ1() {
  const t = useT()
  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1500px]">
        <div className="mb-8">
          <div className="ilab-overline mb-3">{t('Jour 1', 'Day 1')}</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            {t('Modules', 'Modules')} <span className="text-ilab-green">1 & 2</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <ModuleCard
            num="M1"
            title={t('Structurer', 'Structure')}
            subtitle={t('Vibe Coding & prompt engineering', 'Vibe Coding & prompt engineering')}
            icon={Brain}
            items={[
              t('5 compétences : Thinking, Prompting, Tools, Context, Review', '5 skills: Thinking, Prompting, Tools, Context, Review'),
              t('Prompt engineering entreprise : précision, conformité, validation', 'Enterprise prompt engineering: precision, compliance, validation'),
              t('Exercice guidé Todo progressive', 'Guided progressive Todo exercise'),
            ]}
          />
          <ModuleCard
            num="M2"
            title={t('Intensifier', 'Intensify')}
            subtitle={t('Outillage, Git, labs & garde-fous', 'Tooling, Git, labs & guardrails')}
            icon={GitBranch}
            items={[
              t('Panorama IDE : Cursor, Antigravity, Copilot, Continue, Windsurf…', 'IDE landscape: Cursor, Antigravity, Copilot, Continue, Windsurf…'),
              t('Git + IA : branches, MR/PR, conventions, revue assistée', 'Git + AI: branches, MR/PR, conventions, assisted review'),
              t('Labs multi-livrables + garde-fous OWASP, perf, architecture', 'Multi-deliverable labs + OWASP, perf, architecture guardrails'),
            ]}
          />
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-ilab-green/30 bg-ilab-green/5 px-6 py-4">
          <ListTodo className="h-5 w-5 text-ilab-green" />
          <p className="text-base text-muted-foreground">
            <Shield className="mr-1 inline h-4 w-4 text-ilab-green" />
            {t(
              'Challenge overnight entre M2 et M3 pour ancrer la pratique avant le virage agents.',
              'Overnight challenge between M2 and M3 to anchor practice before the agents pivot.',
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

function ModuleCard({
  num,
  title,
  subtitle,
  icon: Icon,
  items,
}: {
  num: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  items: string[]
}) {
  return (
    <div className="rounded-2xl border bg-card p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-ilab-green/15 text-lg font-black text-ilab-green">
          {num}
        </div>
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Icon className="ml-auto h-8 w-8 text-ilab-green/50" />
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-base text-muted-foreground">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ilab-green" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
