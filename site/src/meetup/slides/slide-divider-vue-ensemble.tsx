import { BookOpen, Users, LayoutGrid } from 'lucide-react'
import { SlidePhaseDivider } from '@/meetup/components/slide-phase-divider'

export function SlideDividerVueEnsemble() {
  return (
    <SlidePhaseDivider
      number="02"
      kicker="Vue d'ensemble"
      title="Vue d'ensemble du cursus"
      subtitle="Objectifs, public cible et structure 3 jours · 6 modules."
      tone="amber"
      icon={BookOpen}
      bullets={[
        { label: '8 objectifs pédagogiques', icon: LayoutGrid },
        { label: 'Développeurs, QA, architectes', icon: Users },
      ]}
    />
  )
}
