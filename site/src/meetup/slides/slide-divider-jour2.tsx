import { Bot, Shield } from 'lucide-react'
import { SlidePhaseDivider } from '@/meetup/components/slide-phase-divider'

export function SlideDividerJour2() {
  return (
    <SlidePhaseDivider
      number="04"
      kicker="Jour 2"
      title="Agents & industrialisation"
      subtitle="Concevoir la stack agent · Industrialiser MCP, sécurité et BMAD."
      tone="violet"
      icon={Bot}
      bullets={[
        { label: 'Module 3 — Rules, Skills, MCP', icon: Bot },
        { label: 'Module 4 — Sécurité & BMAD', icon: Shield },
      ]}
    />
  )
}
