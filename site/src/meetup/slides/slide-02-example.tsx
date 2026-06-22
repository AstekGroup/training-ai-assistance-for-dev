import { CheckCircle2, Lightbulb } from 'lucide-react'
import { useT } from '@/meetup/i18n'

/**
 * Slide 02 — exemple de slide de contenu.
 *
 * Pattern de base : titre + sous-titre + 2 colonnes avec une idée et 3 points.
 * Reste compact (1920×1080), utilise la palette ILAB (`text-ilab-green`).
 *
 * MULTILINGUE — démonstration du pattern `useT()` : `const t = useT()` puis
 * chaque chaîne visible devient `t('Texte FR', 'English text')`. C'est la
 * méthode pour les textes en dur d'un slide (les données dynamiques passent
 * par un getter `getX(lang)`, cf. `slide-01-title`). Détails : `i18n.tsx`.
 *
 * Patterns plus avancés disponibles :
 * - Layout split CardSwap-inspired (cf. slide-24 / slide-25b dans le meetup forecasting)
 * - Quadrant SVG positionnement (cf. slide-23e-alternatives)
 * - Modal pédagogique au clic sur une bulle (cf. slide-23e-panorama)
 * - Accordion accordion pour QA préparée (cf. slide-27-qa)
 *
 * Voir `references/slide-patterns.md` pour la liste complète.
 */
export function Slide02Example() {
  const t = useT()
  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1600px]">
        {/* En-tête */}
        <div className="mb-12">
          <div className="ilab-overline mb-3">{t('Section · sous-titre', 'Section · subtitle')}</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            {t('Titre principal du slide', 'Main slide title')}
          </h2>
          <p className="mt-4 max-w-3xl text-xl text-muted-foreground">
            {t(
              'Sous-titre de soutien qui développe brièvement le titre.',
              'A supporting subtitle that briefly expands on the title.',
            )}
          </p>
        </div>

        {/* Corps : 2 colonnes */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ilab-green/15 text-ilab-green">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-2xl font-bold">{t('Idée principale', 'Main idea')}</h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t(
                'Description de la première idée. Garde 2 à 4 lignes max.',
                'Description of the first idea. Keep it to 2–4 lines max.',
              )}
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ilab-green/15 text-ilab-green">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-2xl font-bold">{t('Conséquence concrète', 'Concrete consequence')}</h3>
            <ul className="space-y-2 text-base text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-ilab-green">·</span>{t('Premier point', 'First point')}
              </li>
              <li className="flex gap-2">
                <span className="text-ilab-green">·</span>{t('Deuxième point', 'Second point')}
              </li>
              <li className="flex gap-2">
                <span className="text-ilab-green">·</span>{t('Troisième point', 'Third point')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
