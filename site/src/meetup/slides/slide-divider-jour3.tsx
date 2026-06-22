import { Gauge, Users } from 'lucide-react'
import { SlidePhaseDivider } from '@/meetup/components/slide-phase-divider'

export function SlideDividerJour3() {
  return (
    <SlidePhaseDivider
      number="05"
      kicker="Jour 3"
      title="Qualité & synthèse"
      subtitle="Cadrer le harness · Pratiquer Stage-Gate et TP final."
      tone="violet"
      icon={Gauge}
      bullets={[
        { label: 'Module 5 — Harness & qualité', icon: Gauge },
        { label: 'Module 6 — TP final multi-agents', icon: Users },
      ]}
    />
  )
}
