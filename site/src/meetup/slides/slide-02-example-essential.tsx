import { CheckCircle2, Lightbulb } from 'lucide-react'
import {
  EssentialSlideFrame,
  EssentialHero,
  EssentialVerdict,
} from '@/meetup/components/essential-slide-frame'
import type { EssentialSlideProps } from '@/meetup/data/slides'
import { useT } from '@/meetup/i18n'

/**
 * Slide 02 — version ESSENTIELLE.
 *
 * Pattern de référence pour les slides essentielles :
 *
 * - Hero TOUJOURS visible (titre + tagline)
 * - reveals[0] s'ajoute quand step >= 1
 * - reveals[1] s'ajoute quand step >= 2
 * - **Cumulatif** : aucune étape ne remplace les précédentes
 *
 * Navigation :
 * - Flèche droite ou swipe → étape suivante (puis slide suivant à la fin)
 * - Flèche gauche ou swipe → étape précédente
 * - Toggle vers la version riche : raccourci `E` ou bouton top-bar
 *
 * Voir `references/essential-mode.md` pour les patterns complets.
 */
export function Slide02ExampleEssential({ step }: EssentialSlideProps) {
  const t = useT()
  return (
    <EssentialSlideFrame
      step={step}
      hero={
        <EssentialHero
          overline={t('Phase 2 · idée principale', 'Phase 2 · main idea')}
          title={
            <>
              {t('Une idée', 'A')}
              <br />
              <span className="text-ilab-green">{t('percutante', 'striking idea')}</span>
            </>
          }
          tagline={
            <>
              {t('Le ', 'The ')}<span className="ilab-serif-accent">{t('message', 'message')}</span>{t(" que tu veux que l'audience retienne.", ' you want the audience to remember.')}
            </>
          }
          gradient={false}
        />
      }
      reveals={[
        // Étape 1 : un détail qui s'ajoute
        <div className="flex items-center justify-center gap-3 rounded-xl border border-ilab-green/30 bg-ilab-green/5 px-5 py-4">
          <Lightbulb className="h-6 w-6 shrink-0 text-ilab-green" />
          <p className="text-base text-foreground md:text-lg">
            {t("Premier détail qui appuie l'idée.", 'A first detail that supports the idea.')}
          </p>
        </div>,
        // Étape 2 : verdict / takeaway
        <div className="flex justify-center">
          <EssentialVerdict label={t('À retenir', 'Takeaway')}>
            <span className="ilab-serif-accent font-semibold">
              {t('Conclusion punchy', 'A punchy conclusion')}
            </span>{' '}
            {t('en une phrase.', 'in one sentence.')}
          </EssentialVerdict>
        </div>,
      ]}
    />
  )
}
