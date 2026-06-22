import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { DetailDialog, ClickableDetailTrigger } from '@/meetup/components/detail-dialog'
import { useT } from '@/meetup/i18n'

export function Slide02PourquoiMaintenant() {
  const t = useT()
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1500px]">
        <div className="mb-8">
          <div className="ilab-overline mb-3">{t('Module 1 · Introduction', 'Module 1 · Introduction')}</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            {t('Assistance IA', 'AI assistance')}{' '}
            <span className="text-ilab-green">≠ {t('projet IA', 'AI project')}</span>
          </h2>
        </div>

        <div className="mb-6 rounded-2xl border-2 border-amber-500/40 bg-amber-500/5 px-8 py-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="mt-1 h-7 w-7 shrink-0 text-amber-500" />
            <div>
              <p className="text-xl font-semibold italic md:text-2xl">
                « {t('Avoir une voiture ne vous permet pas de créer une voiture', 'Having a car does not let you build a car')} »
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {t(
                  'Cette formation vise à maîtriser le Vibe Coding et le prompt engineering en contexte entreprise : utiliser l\'IA pour créer ou faire évoluer des logiciels classiques, les tests, la documentation, etc.',
                  'This training aims to master Vibe Coding and prompt engineering in enterprise: using AI to create or evolve classic software, tests, documentation, etc.',
                )}
              </p>
              <p className="mt-3 text-base text-muted-foreground">
                {t(
                  'Attention à ne pas confondre assistance IA et projet IA. Avoir un assistant IA ne vous permet pas de « faire un projet IA » au sens ML / data science. Il existe des cursus dédiés ; les formateurs peuvent vous orienter si besoin.',
                  'Do not confuse AI assistance with AI projects. Having an AI assistant does not mean you can "do an AI project" in the ML / data science sense. Dedicated courses exist; trainers can guide you if needed.',
                )}
              </p>
            </div>
          </div>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          {t('Cliquez sur chaque séquence pour le détail du module 1 :', 'Click each item for Module 1 detail:')}
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          <ClickableDetailTrigger
            title={t('Tour de table', 'Round table')}
            summary={t('Expérience, projets IA en cours, attentes du groupe', 'Experience, ongoing AI projects, group expectations')}
            onClick={() => setOpen('tour')}
          />
          <ClickableDetailTrigger
            title={t('Objectifs & 6 modules', 'Objectives & 6 modules')}
            summary={t('Découpage 3 jours, positionnement niveau', '3-day breakdown, level positioning')}
            onClick={() => setOpen('objectifs')}
          />
          <ClickableDetailTrigger
            title={t('Promesse de la formation', 'Training promise')}
            summary={t('Du copilote opportuniste à la pratique structurée', 'From opportunistic copilot to structured practice')}
            onClick={() => setOpen('promesse')}
          />
        </div>

        <DetailDialog
          open={open === 'tour'}
          onOpenChange={() => setOpen(null)}
          title={t('Tour de table', 'Round table')}
          sections={[
            {
              title: t('Contenu', 'Content'),
              content: t(
                'Partage d\'expérience sur l\'usage actuel des assistants IA, projets en cours dans l\'entreprise, niveau technique du groupe et attentes spécifiques. Permet d\'ajuster les exemples des labs et le rythme des demi-journées.',
                'Share experience on current AI assistant usage, ongoing company projects, group technical level and specific expectations. Allows adjusting lab examples and half-day pacing.',
              ),
            },
          ]}
        />
        <DetailDialog
          open={open === 'objectifs'}
          onOpenChange={() => setOpen(null)}
          title={t('Objectifs & découpage', 'Objectives & structure')}
          sections={[
            {
              title: t('6 modules sur 3 jours', '6 modules over 3 days'),
              content: (
                <ul className="list-disc space-y-1 pl-5">
                  <li>J1 : Structurer + Intensifier (fondements & pratique)</li>
                  <li>J2 : Concevoir + Industrialiser (agents & MCP)</li>
                  <li>J3 : Cadrer + Pratiquer (harness & synthèse)</li>
                </ul>
              ),
            },
            {
              title: t('Public', 'Audience'),
              content: t(
                'Tout développeur, testeur, QA, architecte — pré-requis : programmation de base, IDE agentique (Antigravity recommandé), Git.',
                'Any developer, tester, QA, architect — prerequisites: basic programming, agentic IDE (Antigravity recommended), Git.',
              ),
            },
          ]}
        />
        <DetailDialog
          open={open === 'promesse'}
          onOpenChange={() => setOpen(null)}
          title={t('Promesse', 'Promise')}
          sections={[
            {
              title: t('Ce que vous repartirez avec', 'What you leave with'),
              content: t(
                'Une méthode opérationnelle : 5 compétences Vibe Coding, stack agent (Rules, Skills, MCP), harness engineering, contrat de contexte, Stage-Gate et un TP final multi-agents. ~70 % du temps en pratique (labs, challenge overnight, TP).',
                'An operational method: 5 Vibe Coding skills, agent stack (Rules, Skills, MCP), harness engineering, context contract, Stage-Gate and a multi-agent final workshop. ~70% hands-on time.',
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}
