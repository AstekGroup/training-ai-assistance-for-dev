import { ClipboardCheck, Users, FileCheck, Calendar } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useT } from '@/meetup/i18n'

export function Slide10Evaluation() {
  const t = useT()
  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1400px]">
        <div className="mb-8">
          <div className="ilab-overline mb-3">{t('Clôture', 'Wrap-up')}</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            {t('Évaluation &', 'Assessment &')}{' '}
            <span className="text-ilab-green">{t('livrables', 'deliverables')}</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <Users className="mb-3 h-8 w-8 text-ilab-green" />
            <h3 className="mb-2 text-xl font-bold">{t('TP final', 'Final workshop')}</h3>
            <p className="text-sm text-muted-foreground">
              Projet collaboratif multi-agents (3 h) : Product Owner, Architecte, Dev, QA, Reviewer. 3 sprints + démos (~10 min/équipe). Analyse critique collective des limites et opportunités de l&apos;IA.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <FileCheck className="mb-3 h-8 w-8 text-violet-500" />
            <h3 className="mb-2 text-xl font-bold">{t('Livrables formation', 'Training deliverables')}</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Contrat de contexte projet (MoSCoW, 5 piliers)</li>
              <li>• AGENTS.md, skills et MCP configurés</li>
              <li>• DESIGN.md si périmètre UI</li>
              <li>• Démo fonctionnelle + revue qualité</li>
              <li>• Challenge overnight (J1→J2)</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <ClipboardCheck className="mb-3 h-8 w-8 text-cyan-500" />
            <h3 className="mb-2 text-xl font-bold">{t('Évaluation continue', 'Continuous assessment')}</h3>
            <p className="text-sm text-muted-foreground">
              Exercice Todo (M1), labs M2, TP Rules/Skills/MCP (M3), TP MCP sécurité (M4), TP BMAD, TP cycle harness (M5), TP final (M6). Questionnaire de satisfaction en clôture.
            </p>
          </div>
        </div>

        <Accordion type="single" collapsible className="mt-6 rounded-xl border bg-card px-4">
          <AccordionItem value="synthese">
            <AccordionTrigger className="font-bold">
              <Calendar className="mr-2 h-4 w-4" />
              Synthèse des 6 modules — rappel
            </AccordionTrigger>
            <AccordionContent>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['M1', 'Structurer le Vibe Coding et le prompt engineering'],
                    ['M2', 'Intensifier — outillage, Git, labs et garde-fous'],
                    ['M3', 'Concevoir la stack agent — Rules, Skills, MCP'],
                    ['M4', 'Industrialiser — MCP avancé, sécurité, BMAD'],
                    ['M5', 'Cadrer — harness, contrat de contexte, qualité cycle'],
                    ['M6', 'Pratiquer — Stage-Gate, TP final multi-agents'],
                  ].map(([m, label]) => (
                    <tr key={m} className="border-t">
                      <td className="py-2 pr-4 font-mono font-bold text-ilab-green">{m}</td>
                      <td className="py-2 text-muted-foreground">{label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <p className="mt-6 text-center text-ilab-green">philippe.pary@astek.net</p>
      </div>
    </div>
  )
}
