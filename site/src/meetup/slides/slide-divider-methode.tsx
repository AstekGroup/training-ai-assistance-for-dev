import { Compass, Layers } from 'lucide-react'
import { SlidePhaseDivider } from '@/meetup/components/slide-phase-divider'

export function SlideDividerMethode() {
  return (
    <SlidePhaseDivider
      number="06"
      kicker="Méthode"
      title="Méthode & cadres transverses"
      subtitle="Les 5 compétences Vibe Coding, harness engineering et Stage-Gate."
      tone="cyan"
      icon={Compass}
      bullets={[
        { label: '5 compétences Vibe Coding', icon: Layers },
        { label: 'Harness & Stage-Gate', icon: Compass },
      ]}
    />
  )
}
