import { Clock, Target, ArrowRight } from 'lucide-react'
import { SlidePhaseDivider } from '@/meetup/components/slide-phase-divider'
import { moduleCovers, type ModuleCover } from '@/meetup/data/module-transitions'

interface SlideModuleCoverProps {
  moduleId: keyof typeof moduleCovers
}

export function createModuleCoverSlide(moduleId: keyof typeof moduleCovers) {
  return function ModuleCoverSlide() {
    return <SlideModuleCover moduleId={moduleId} />
  }
}

function SlideModuleCover({ moduleId }: SlideModuleCoverProps) {
  const mod = moduleCovers[moduleId]

  return (
    <div className="relative flex h-full w-full flex-col">
      <SlidePhaseDivider
        number={mod.number}
        kicker={`${mod.day} · ${mod.slot}`}
        title={`${mod.verb} — ${mod.title}`}
        subtitle={mod.subtitle}
        tone={mod.tone}
        icon={mod.icon}
        bullets={mod.objectives.slice(0, 3).map((o) => ({ label: o, icon: Target }))}
      />
      <ModuleCoverFooter mod={mod} />
    </div>
  )
}

function ModuleCoverFooter({ mod }: { mod: ModuleCover }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t bg-background/80 px-12 py-5 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-ilab-green" />
          <span className="font-mono font-medium text-foreground">{mod.duration}</span>
          <span>·</span>
          <span>{mod.objectives.length} objectifs pédagogiques</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-ilab-green">
          <span>Module {mod.number}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

// Named exports for registry
export const SlideModuleCoverM1 = createModuleCoverSlide('m1')
export const SlideModuleCoverM2 = createModuleCoverSlide('m2')
export const SlideModuleCoverM3 = createModuleCoverSlide('m3')
export const SlideModuleCoverM4 = createModuleCoverSlide('m4')
export const SlideModuleCoverM5 = createModuleCoverSlide('m5')
export const SlideModuleCoverM6 = createModuleCoverSlide('m6')
