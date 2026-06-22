import { motion, AnimatePresence } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Frame standard pour les slides essentielles.
 *
 * Pattern : un hero toujours visible + N "reveals" qui s'ajoutent
 * progressivement (CUMULATIF — chaque étape n'enlève rien, elle ajoute).
 *
 * - hero        : bloc principal (toujours rendu)
 * - reveals[i]  : bloc révélé quand `step >= i + 1`
 * - haloColor   : classe Tailwind du halo de fond (par défaut vert ILAB)
 * - background  : background custom (Aurora, etc.) au lieu du halo
 *
 * Usage :
 *   <EssentialSlideFrame
 *     step={step}
 *     hero={<MyHero />}
 *     reveals={[<Step1 />, <Step2 />]}
 *   />
 */

interface EssentialSlideFrameProps {
  step: number
  hero: ReactNode
  reveals?: ReactNode[]
  haloColor?: string
  /** Si fourni, remplace complètement le background (halo + grille). */
  background?: ReactNode
  /** Classe pour ajuster l'alignement vertical sur les écrans hauts. */
  className?: string
}

const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
}

export function EssentialSlideFrame({
  step,
  hero,
  reveals = [],
  haloColor = 'bg-ilab-green/15',
  background,
  className = '',
}: EssentialSlideFrameProps) {
  return (
    <div
      className={`relative flex min-h-full w-full flex-1 items-center justify-center overflow-hidden px-6 md:px-12 ${className}`}
    >
      {background ?? (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 ilab-grid-bg opacity-20" />
          <div
            className={`absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full ${haloColor} blur-[140px]`}
          />
        </div>
      )}
      <div className="relative z-10 flex w-full max-w-[1600px] flex-col items-center text-center">
        <motion.div {...FADE_UP}>{hero}</motion.div>
        {reveals.map((node, i) => (
          <AnimatePresence key={i} mode="wait">
            {step >= i + 1 && (
              <motion.div
                key={`reveal-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="mt-10 w-full md:mt-12"
              >
                {node}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  )
}

/**
 * Helper : hero standard avec overline + h1 massif + tagline optionnelle.
 */
interface EssentialHeroProps {
  overline?: ReactNode
  overlineColor?: string
  /** h1 en massif (size clamp). */
  title: ReactNode
  tagline?: ReactNode
  gradient?: boolean
}

export function EssentialHero({
  overline,
  overlineColor = 'text-ilab-green',
  title,
  tagline,
  gradient = true,
}: EssentialHeroProps) {
  return (
    <div className="flex flex-col items-center">
      {overline && (
        <span className={`ilab-overline text-base ${overlineColor}`}>
          {overline}
        </span>
      )}
      <h1
        className={`mt-3 font-black leading-[0.85] tracking-tighter text-[clamp(4.5rem,14vw,14rem)] ${
          gradient ? 'ilab-gradient-text animate-shimmer-text' : ''
        }`}
      >
        {title}
      </h1>
      {tagline && (
        <p className="mt-4 max-w-3xl text-[clamp(1.25rem,3vw,2.25rem)] font-light leading-tight text-muted-foreground">
          {tagline}
        </p>
      )}
    </div>
  )
}

/**
 * Helper : "verdict" / takeaway encadré (à utiliser dans une reveal).
 */
interface EssentialVerdictProps {
  label?: string
  children: ReactNode
  accent?: string
}

export function EssentialVerdict({
  label,
  children,
  accent = 'border-ilab-green/30',
}: EssentialVerdictProps) {
  return (
    <div
      className={`inline-flex flex-col items-center gap-2 rounded-2xl border-2 ${accent} bg-card/80 px-6 py-4 backdrop-blur-md md:px-8 md:py-5`}
    >
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-ilab-green md:text-xs">
          {label}
        </span>
      )}
      <p className="text-[clamp(1.1rem,2.4vw,1.75rem)] font-light leading-tight text-foreground">
        {children}
      </p>
    </div>
  )
}
