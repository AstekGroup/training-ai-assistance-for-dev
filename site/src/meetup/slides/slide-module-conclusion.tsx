import { CheckCircle2, ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { moduleConclusions, type ModuleConclusion } from '@/meetup/data/module-transitions'
import { cn } from '@/lib/utils'

interface SlideModuleConclusionProps {
  moduleId: keyof typeof moduleConclusions
}

export function createModuleConclusionSlide(moduleId: keyof typeof moduleConclusions) {
  return function ModuleConclusionSlide() {
    return <SlideModuleConclusion moduleId={moduleId} />
  }
}

const toneAccent: Record<ModuleConclusion['tone'], string> = {
  green: 'text-ilab-green border-ilab-green/30 bg-ilab-green/5',
  violet: 'text-violet-500 border-violet-500/30 bg-violet-500/5',
  cyan: 'text-cyan-500 border-cyan-500/30 bg-cyan-500/5',
  amber: 'text-amber-500 border-amber-500/30 bg-amber-500/5',
  rose: 'text-rose-500 border-rose-500/30 bg-rose-500/5',
  blue: 'text-blue-500 border-blue-500/30 bg-blue-500/5',
}

const toneBadge: Record<ModuleConclusion['tone'], string> = {
  green: 'bg-ilab-green/15 text-ilab-green',
  violet: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
  cyan: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',
  amber: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  rose: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
  blue: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
}

function SlideModuleConclusion({ moduleId }: SlideModuleConclusionProps) {
  const mod = moduleConclusions[moduleId]

  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1400px]">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <div className={cn('mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider', toneBadge[mod.tone])}>
              <Sparkles className="h-3.5 w-3.5" />
              Fin de module
            </div>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              {mod.title}
            </h2>
          </div>
          <div className={cn('flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 text-3xl font-black', toneAccent[mod.tone])}>
            {mod.number}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <CheckCircle2 className="h-5 w-5 text-ilab-green" />
              Ce que vous avez acquis
            </h3>
            <ul className="space-y-3">
              {mod.acquired.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ilab-green" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <div className={cn('rounded-2xl border-2 p-6', toneAccent[mod.tone])}>
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
                <BookOpen className="h-5 w-5" />
                À retenir
              </h3>
              <p className="text-base leading-relaxed">{mod.takeaway}</p>
            </div>

            {mod.homework && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Entre les modules
                </h3>
                <p className="text-sm text-muted-foreground">{mod.homework}</p>
              </div>
            )}

            {mod.nextModule && (
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Module suivant
                </p>
                <div className="flex items-center gap-3">
                  <span className={cn('flex h-12 w-12 items-center justify-center rounded-xl text-lg font-black', toneBadge[mod.tone])}>
                    {mod.nextModule.number}
                  </span>
                  <div className="flex-1">
                    <div className="text-xl font-bold">{mod.nextModule.verb}</div>
                    <p className="text-sm text-muted-foreground">{mod.nextModule.hint}</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-ilab-green" />
                </div>
              </div>
            )}

            {!mod.nextModule && (
              <div className="rounded-2xl border border-ilab-green/30 bg-ilab-green/5 p-6 text-center">
                <p className="text-lg font-bold text-ilab-green">Formation terminée</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Synthèse transversale et évaluation à suivre.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export const SlideModuleConclusionM1 = createModuleConclusionSlide('m1')
export const SlideModuleConclusionM2 = createModuleConclusionSlide('m2')
export const SlideModuleConclusionM3 = createModuleConclusionSlide('m3')
export const SlideModuleConclusionM4 = createModuleConclusionSlide('m4')
export const SlideModuleConclusionM5 = createModuleConclusionSlide('m5')
export const SlideModuleConclusionM6 = createModuleConclusionSlide('m6')
