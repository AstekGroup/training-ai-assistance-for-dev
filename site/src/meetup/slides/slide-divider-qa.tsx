import { MessageSquare } from 'lucide-react'
import { SlidePhaseDivider } from '@/meetup/components/slide-phase-divider'

export function SlideDividerQA() {
  return (
    <SlidePhaseDivider
      number="07"
      kicker="Échanges"
      title="Questions & prochaines étapes"
      subtitle="Planifier une session, adapter le cursus à votre contexte."
      tone="rose"
      icon={MessageSquare}
      bullets={[]}
    />
  )
}
