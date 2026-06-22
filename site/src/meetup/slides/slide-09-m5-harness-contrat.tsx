import { useState } from 'react'
import { DetailDialog, ClickableDetailTrigger } from '@/meetup/components/detail-dialog'
import { contratPiliers, moscowLevels } from '@/meetup/data/course-content'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const contratTemplate = `## CONTRAT DE CONTEXTE — [NOM DE LA MISSION]

### Objectif
[Un livrable précis : quoi, où dans le code, quel comportement attendu]

### Must / Should / Would / Won't
- **Must** : [...]
- **Should** : [...]
- **Would** : [...]
- **Won't** : [...]

### Contraintes
- Technique : [langages, frameworks, patterns imposés]
- Business : [délais, scope, utilisateurs cibles]
- Qualité : [tests, perf, sécurité, accessibilité]
- Harness : [rules, skills, MCP autorisés et périmètre]

### Contexte
- Existant : [modules, dette connue, dépendances]
- Équipe : [rôles, process de revue]
- Références : [ADR, DESIGN.md, tickets, docs externes]

### Format attendu
[Structure de la réponse : fichiers touchés, type de PR, diagrammes si besoin]

### Critères de validation
[Checklist vérifiable : tests, métriques, conformité design, revue humaine]`

export function Slide09M5HarnessContrat() {
  const [open, setOpen] = useState<string | null>(null)
  const selected = contratPiliers.find((p) => p.pillar === open)

  return (
    <div className="relative flex h-full w-full items-center justify-center px-10 py-8">
      <div className="flex h-full w-full max-w-[1600px] flex-col overflow-hidden">
        <div className="mb-4 shrink-0">
          <div className="ilab-overline mb-2">Module 5 · 9h15–10h15</div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Harness & <span className="text-ilab-green">contrat de contexte</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Le harness = environnement de travail pour agents (rules, outils, périmètre, tests, DESIGN.md). Le contrat = livrable projet entre métier, archi, dev, QA — peut nourrir AGENTS.md mais vocation plus large.
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
          <h3 className="mb-2 text-sm font-bold uppercase text-muted-foreground">MoSCoW — cliquer un pilier pour exemples faible/fort</h3>
          <div className="mb-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {moscowLevels.map((m) => (
              <div key={m.level} className="rounded-lg border bg-card p-3 text-sm">
                <div className="font-bold text-ilab-green">{m.level}</div>
                <div className="text-xs text-muted-foreground">{m.meaning}</div>
                <div className="mt-2 text-xs italic">&laquo; {m.example} &raquo;</div>
              </div>
            ))}
          </div>

          <h3 className="mb-2 text-sm font-bold uppercase text-muted-foreground">Les 5 piliers du contrat</h3>
          <div className="mb-6 space-y-2">
            {contratPiliers.map((p) => (
              <ClickableDetailTrigger
                key={p.pillar}
                title={p.pillar}
                summary={`Faible : ${p.weak}`}
                onClick={() => setOpen(p.pillar)}
              />
            ))}
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="template">
              <AccordionTrigger className="font-bold">Template complet du contrat de contexte</AccordionTrigger>
              <AccordionContent>
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">{contratTemplate}</pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="exemple-api">
              <AccordionTrigger className="font-bold">Exemple — feature API (PaymentIntent Stripe)</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                <p className="mb-2"><strong>Must :</strong> réutiliser StripeClient ; valider montant côté serveur</p>
                <p className="mb-2"><strong>Won&apos;t :</strong> pas de refonte modèle Order ; pas multi-devises</p>
                <p><strong>Validation :</strong> PaymentIntent correct, webhook testé, revue lead + CI verte</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="exemple-ui">
              <AccordionTrigger className="font-bold">Exemple — feature UI (checkout + DESIGN.md)</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                <p className="mb-2"><strong>Must :</strong> respecter DESIGN.md ; mobile-first ; composants ui/ existants</p>
                <p className="mb-2"><strong>Won&apos;t :</strong> pas de lib UI additionnelle ; pas de dark mode ce sprint</p>
                <p><strong>Validation :</strong> design.md lint OK, bouton primaire conforme token, revue design</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {selected && (
          <DetailDialog
            open={!!open}
            onOpenChange={() => setOpen(null)}
            title={`Pilier : ${selected.pillar}`}
            sections={[
              { title: 'Exemple faible', content: selected.weak },
              { title: 'Exemple fort', content: selected.strong },
            ]}
          />
        )}
      </div>
    </div>
  )
}
