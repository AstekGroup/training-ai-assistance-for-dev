import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'

/**
 * IntroTitle — intro « titre hero » pour slides PLEIN CADRE (visuels).
 *
 * Séquence STRICTE en 3 temps (esprit slide 8, sans rogner le visuel) :
 *   1. **Hero** : fond plein cadre + titre grand, centré. On ne voit RIEN d'autre.
 *   2. **Rangement** : le titre se réduit et file en haut à gauche. Le fond couvre
 *      TOUJOURS — le contenu reste caché.
 *   3. **Révélation** : le fond s'efface, le contenu (plein cadre) apparaît.
 *
 * Le titre est **un seul élément, toujours monté, en `z-50`** (donc toujours
 * AU-DESSUS du contenu), animé par `layout`. Le fond (`z-40`) masque le contenu
 * jusqu'à la révélation (déclenchée APRÈS le rangement). Pas de `layoutId` croisé
 * avec un `AnimatePresence` qui sort (cause du contenu visible trop tôt).
 *
 * Deux modes :
 *   - `overlay` (défaut) : le contenu est **plein cadre jusqu'en haut** (le fond
 *     monte sous le titre) ; le titre **flotte** au coin haut-gauche. À réserver aux
 *     contenus **centrés** (schéma, cercle) où le titre ne recouvre rien d'utile.
 *   - `band` : le titre occupe une **bande d'en-tête**, le contenu est **dessous**.
 *     À réserver aux contenus **qui rempliraient le coin** (images plein cadre) pour
 *     que le titre ne les chevauche pas.
 *
 * Skippable ↓ / Entrée. Pour des slides de TEXTE, préférer `SlideShell`.
 */

const EASE = [0.22, 1, 0.36, 1] as const

interface IntroTitleProps {
  title: ReactNode
  overline?: ReactNode
  children: ReactNode
  mode?: 'overlay' | 'band'
  /** Durée du titre plein écran avant rangement (ms). */
  heroMs?: number
  /** Moment de révélation du contenu (ms) — APRÈS la fin du rangement. */
  revealMs?: number
}

export function IntroTitle({
  title,
  overline,
  children,
  mode = 'overlay',
  heroMs = 1500,
  revealMs = 2400,
}: IntroTitleProps) {
  const [parked, setParked] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const band = mode === 'band'

  useEffect(() => {
    const t1 = setTimeout(() => setParked(true), heroMs)
    const t2 = setTimeout(() => setRevealed(true), revealMs)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [heroMs, revealMs])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setParked(true)
        setRevealed(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const headerPad = 'px-6 pb-3 pt-16 md:px-10'

  return (
    <div className="relative flex h-full min-h-full w-full flex-1 flex-col overflow-hidden">
      {band ? (
        <>
          {/* Bande d'en-tête : réserve la hauteur du titre rangé (placeholder invisible). */}
          <div className={`pointer-events-none shrink-0 ${headerPad}`}>
            <div className="invisible inline-flex flex-col gap-0.5">
              {overline && <div className="ilab-overline text-[10px] md:text-xs">{overline}</div>}
              <div className="text-[clamp(1.2rem,2.6vw,2rem)] font-black leading-tight">{title}</div>
            </div>
          </div>
          {/* z-0 = contexte d'empilement : confine les z-index internes du contenu
              (ex. le cercle mis en avant de ConcentricReveal en z-100) SOUS le fond. */}
          <div className="relative z-0 min-h-0 w-full flex-1">{children}</div>
        </>
      ) : (
        // overlay : contenu plein cadre jusqu'en haut (le fond monte sous le titre).
        // z-0 = contexte d'empilement (confine les z-index internes du contenu).
        <div className="absolute inset-0 z-0">{children}</div>
      )}

      {/* Fond intro : masque le contenu jusqu'à la révélation. */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            key="introbg"
            className="absolute inset-0 z-40 bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        )}
      </AnimatePresence>

      {/* LE titre — élément unique, toujours monté, z-50 (toujours au-dessus). */}
      <motion.div
        layout
        transition={{ duration: 0.65, ease: EASE }}
        className={
          parked
            ? `pointer-events-none absolute left-0 top-0 z-50 flex flex-col gap-0.5 ${headerPad}`
            : 'pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 px-8 text-center'
        }
      >
        {overline && (
          <motion.div
            layout
            className={`ilab-overline text-ilab-green ${
              parked ? 'text-[10px] md:text-xs' : 'text-base md:text-lg'
            }`}
          >
            {overline}
          </motion.div>
        )}
        <motion.h2
          layout
          className={`font-black tracking-tight text-foreground ${
            parked
              ? 'text-left text-[clamp(1.2rem,2.6vw,2rem)] leading-tight'
              : 'text-[clamp(2.5rem,7.5vw,6.5rem)] leading-[1.02]'
          }`}
        >
          {title}
        </motion.h2>
      </motion.div>
    </div>
  )
}
