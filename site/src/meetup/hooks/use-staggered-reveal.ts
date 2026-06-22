import { useEffect, useRef, useState } from 'react'

/**
 * Hook de révélation par étapes avec effet "spotlight" :
 *
 * Quand une card est révélée (step atteint son `revealAtStep`), elle apparaît
 * d'abord agrandie au centre de la zone (spotlight), puis « atterrit » à
 * sa position finale dans la grille après un délai.
 *
 * Les cards non révélées sont totalement invisibles (pas de blur, pas
 * d'opacité résiduelle) — elles n'occupent pas l'attention.
 *
 * @param step       Étape courante (0-indexée).
 * @param items      Liste d'items, chacun avec un `id` (clé) et `revealAtStep`.
 * @param spotlightDuration  Durée du moment "spotlight" avant que la card
 *                           ne s'installe à sa place. Défaut 1200 ms.
 * @returns
 *   - `landedIds` : Set des IDs des cards qui sont à leur place finale
 *     (elles apparaissent dans la grille).
 *   - `spotlightId` : ID de la card actuellement en spotlight au centre,
 *     ou `null` si aucune n'est en spotlight.
 */
export function useStaggeredReveal<T extends { id: string; revealAtStep: number }>(
  step: number,
  items: T[],
  spotlightDuration = 1200,
) {
  const [landedIds, setLandedIds] = useState<Set<string>>(() => {
    // Au premier rendu, toutes les cards déjà révélées (revealAtStep < step)
    // sont directement à leur place — pas d'animation rétroactive.
    const initial = new Set<string>()
    items.forEach((it) => {
      if (it.revealAtStep < step) initial.add(it.id)
    })
    return initial
  })

  const [spotlightId, setSpotlightId] = useState<string | null>(null)
  // -1 force la détection step > prev au premier rendu — la card du step
  // initial passe alors en spotlight, ce qui produit l'animation d'entrée.
  const previousStepRef = useRef(-1)

  useEffect(() => {
    const prev = previousStepRef.current
    previousStepRef.current = step

    if (step >= prev) {
      // Avancée (ou mount) : la card révélée à `step` passe en spotlight
      const justRevealed = items.find((it) => it.revealAtStep === step)
      if (justRevealed && !landedIds.has(justRevealed.id)) {
        setSpotlightId(justRevealed.id)
        const t = setTimeout(() => {
          setLandedIds((prevSet) => {
            const next = new Set(prevSet)
            next.add(justRevealed.id)
            return next
          })
          setSpotlightId(null)
        }, spotlightDuration)
        return () => clearTimeout(t)
      }
    } else {
      // Recul : on retire les cards dont le revealAtStep > step du set landed
      setLandedIds((prevSet) => {
        const next = new Set<string>()
        prevSet.forEach((id) => {
          const item = items.find((it) => it.id === id)
          if (item && item.revealAtStep < step) next.add(id)
        })
        return next
      })
      setSpotlightId(null)
    }
  }, [step, items, landedIds, spotlightDuration])

  return { landedIds, spotlightId }
}
