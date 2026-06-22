import { designMdContent, cycleQualite } from '@/meetup/data/course-content'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function Slide09M5DesignCycle() {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-10 py-8">
      <div className="flex h-full w-full max-w-[1600px] flex-col overflow-hidden">
        <div className="mb-4 shrink-0">
          <div className="ilab-overline mb-2">Module 5 · Harness UI & cycle qualité</div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            DESIGN.md & <span className="text-ilab-green">cycle complet</span>
          </h2>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          <section className="mb-6 rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
            <h3 className="mb-2 text-lg font-bold">DESIGN.md — contrat visuel pour les agents</h3>
            <p className="mb-4 text-sm text-muted-foreground">{designMdContent.why}</p>
            <div className="mb-4 grid gap-3 md:grid-cols-2">
              {designMdContent.layers.map((l) => (
                <div key={l.layer} className="rounded-lg border bg-card p-3 text-sm">
                  <div className="font-bold">{l.layer}</div>
                  <div className="text-muted-foreground">{l.role}</div>
                </div>
              ))}
            </div>
            <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">Outils CLI</p>
            <ul className="space-y-1 font-mono text-xs text-muted-foreground">
              {designMdContent.cli.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Lien documents : Contrat de contexte (mission) · DESIGN.md (identité visuelle) · AGENTS.md (coding standards)
            </p>
          </section>

          <h3 className="mb-3 text-lg font-bold">IA sur tout le cycle de développement</h3>
          <Accordion type="single" collapsible className="rounded-xl border bg-card px-4">
            {cycleQualite.map((block) => (
              <AccordionItem key={block.title} value={block.title}>
                <AccordionTrigger className="font-semibold">{block.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-6 rounded-xl border border-ilab-green/20 bg-ilab-green/5 p-4 text-sm text-muted-foreground">
            <strong>TP (10h30–12h30) :</strong> cycle complet d&apos;une fonctionnalité avec harness (rules, skills, contrat de contexte, DESIGN.md si UI) — de l&apos;implémentation à la revue de code, avec validation humaine.
          </p>
        </div>
      </div>
    </div>
  )
}
