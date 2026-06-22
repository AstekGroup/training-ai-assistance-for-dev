import { useState } from 'react'
import { GitBranch, FileText, TestTube, Zap } from 'lucide-react'
import { DetailDialog, ClickableDetailTrigger } from '@/meetup/components/detail-dialog'
import { gitIaPractices, tpAxesM2, bonnesPratiquesEntreprise } from '@/meetup/data/course-content'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useT } from '@/meetup/i18n'

const axeIcons = [GitBranch, FileText, TestTube, Zap]

export function Slide06M2GitTpPratiques() {
  const t = useT()
  const [openAxe, setOpenAxe] = useState<number | null>(null)
  const selectedAxe = openAxe !== null ? tpAxesM2[openAxe] : null

  return (
    <div className="relative flex h-full w-full items-center justify-center px-10 py-8">
      <div className="flex h-full w-full max-w-[1600px] flex-col overflow-hidden">
        <div className="mb-4 shrink-0">
          <div className="ilab-overline mb-2">Module 2 · 14h00–17h30</div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Git, <span className="text-ilab-green">labs</span> & garde-fous
          </h2>
        </div>

        <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto lg:grid-cols-2">
          {/* Git + IA */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
              <GitBranch className="h-5 w-5 text-ilab-green" />
              Git + IA pour équipes (14h00–14h30)
            </h3>
            <ul className="space-y-2">
              {gitIaPractices.map((p) => (
                <li key={p} className="rounded-lg border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                  {p}
                </li>
              ))}
            </ul>
          </section>

          {/* TP axes */}
          <section>
            <h3 className="mb-3 text-lg font-bold">Ateliers labs (14h30–16h30) — axes de travail</h3>
            <div className="space-y-2">
              {tpAxesM2.map((axe, i) => {
                const Icon = axeIcons[i]
                return (
                  <ClickableDetailTrigger
                    key={axe.title}
                    title={axe.title}
                    summary={axe.content}
                    onClick={() => setOpenAxe(i)}
                  >
                    <Icon className="mt-1 h-4 w-4 text-ilab-green" />
                  </ClickableDetailTrigger>
                )
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Exemples : blog statique, dashboard, API CRUD, amélioration projet existant. Le formateur ajuste selon le niveau.
            </p>
          </section>

          {/* Bonnes pratiques */}
          <section className="lg:col-span-2">
            <h3 className="mb-3 text-lg font-bold">Bonnes pratiques entreprise (16h45–17h30)</h3>
            <Accordion type="single" collapsible className="rounded-xl border bg-card px-4">
              {bonnesPratiquesEntreprise.map((bp) => (
                <AccordionItem key={bp.title} value={bp.title}>
                  <AccordionTrigger className="text-left font-semibold">{bp.title}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{bp.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        {selectedAxe && (
          <DetailDialog
            open={openAxe !== null}
            onOpenChange={() => setOpenAxe(null)}
            title={selectedAxe.title}
            sections={[
              { title: t('Objectif', 'Objective'), content: selectedAxe.content },
              ...(selectedAxe.examples
                ? [
                    {
                      title: t('Exemples de projets', 'Project examples'),
                      content: (
                        <ul className="list-disc pl-5">
                          {selectedAxe.examples.map((e) => (
                            <li key={e}>{e}</li>
                          ))}
                        </ul>
                      ),
                    },
                  ]
                : []),
            ]}
          />
        )}
      </div>
    </div>
  )
}
