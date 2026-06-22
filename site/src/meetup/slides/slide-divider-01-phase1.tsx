import { Sparkles, Target, Zap } from 'lucide-react'
import { SlidePhaseDivider } from '@/meetup/components/slide-phase-divider'
import { useT } from '@/meetup/i18n'

/**
 * Exemple de slide intercalaire de phase.
 *
 * Patterns clés :
 * - 1 SlidePhaseDivider entre chaque grande phase du meetup (respiration visuelle)
 * - Tone unique par phase : green | violet | blue | amber | rose | cyan
 * - Bullets : 2 à 4 max, ce que tu vas couvrir dans la phase
 *
 * Duplique ce fichier pour les autres phases (slide-divider-02-phase2.tsx, etc.)
 */
export function SlideDivider01Phase1() {
  const t = useT()
  return (
    <SlidePhaseDivider
      number="02"
      kicker="Phase 2"
      title={t('Concept', 'Concept')}
      subtitle={t("Ce qu'il faut comprendre avant la démo.", 'What to understand before the demo.')}
      tone="amber"
      icon={Sparkles}
      bullets={[
        { label: t('Premier point clé', 'First key point'), icon: Target },
        { label: t('Deuxième point clé', 'Second key point'), icon: Zap },
        { label: t('Troisième point clé', 'Third key point'), icon: Sparkles },
      ]}
    />
  )
}
