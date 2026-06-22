import { motion, AnimatePresence } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * SpotlightReveal — révélation « projecteur puis rangement » pour cartes de CONTENU
 * (≠ SpotlightGrid qui est pour des photos).
 *
 * Chaque élément apparaît d'abord **en GRAND au centre** (vue détaillée), puis, au
 * clic suivant, **vole se ranger** dans sa case d'une grille qui occupe tout l'espace.
 * Le déplacement centre→case (et grand→petit) est assuré par `layoutId` (magic-move
 * motion). DEUX clics par élément (pour parler pendant la vue centrale) :
 *   - clic pair  → l'élément k apparaît en grand au centre (vue détaillée) ;
 *   - clic impair → il se range dans la case k (vue compacte), rien d'autre ne bouge.
 *  ⇒ `essentialSteps` (côté slide) = count * 2 (+ étapes éventuelles après).
 *
 * Le slide fournit deux rendus : `renderBig(i)` (riche, central) et `renderDocked(i)`
 * (compact, en case). Conçu plein cadre → la grille **remplit l'écran**. Réutilisable.
 */

const EASE = [0.22, 1, 0.36, 1] as const

export interface SpotlightRevealProps {
  count: number
  step: number
  /** Préfixe unique des layoutId (un seul slot monté par index → magic-move). */
  layoutKey: string
  /** Classe de la grille des cases (ex: 'grid-cols-5' ou 'grid-cols-3 grid-rows-2'). */
  gridClassName: string
  renderBig: (index: number) => ReactNode
  renderDocked: (index: number) => ReactNode
  className?: string
}

export function SpotlightReveal({
  count,
  step,
  layoutKey,
  gridClassName,
  renderBig,
  renderDocked,
  className = '',
}: SpotlightRevealProps) {
  const dockedCount = Math.min(count, Math.ceil(step / 2))
  const bigIndex = step % 2 === 0 && step / 2 < count ? step / 2 : -1

  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* Grille des cases (fixe) — les éléments rangés s'y placent */}
      <div className={`grid h-full w-full gap-3 lg:gap-4 ${gridClassName}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="relative min-h-0">
            {i < dockedCount && (
              <motion.div
                layout
                layoutId={`${layoutKey}-${i}`}
                transition={{ duration: 0.55, ease: EASE }}
                className="h-full w-full"
              >
                {renderDocked(i)}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Vue centrale (grande, détaillée) de l'élément courant */}
      <AnimatePresence>
        {bigIndex >= 0 && (
          <motion.div
            key="stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
          >
            <motion.div
              layout
              layoutId={`${layoutKey}-${bigIndex}`}
              transition={{ duration: 0.55, ease: EASE }}
              className="pointer-events-auto h-[88%] w-[min(64%,60rem)]"
            >
              {renderBig(bigIndex)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
