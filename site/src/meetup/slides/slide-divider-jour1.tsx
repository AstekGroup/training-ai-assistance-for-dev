import { Sparkles, Wrench } from 'lucide-react'
import { SlidePhaseDivider } from '@/meetup/components/slide-phase-divider'

export function SlideDividerJour1() {
  return (
    <SlidePhaseDivider
      number="03"
      kicker="Jour 1"
      title="Fondements & pratique"
      subtitle="Structurer le Vibe Coding · Intensifier l'outillage et Git."
      tone="violet"
      icon={Sparkles}
      bullets={[
        { label: 'Module 1 — Prompt & 5 compétences', icon: Sparkles },
        { label: 'Module 2 — Labs & garde-fous', icon: Wrench },
      ]}
    />
  )
}
