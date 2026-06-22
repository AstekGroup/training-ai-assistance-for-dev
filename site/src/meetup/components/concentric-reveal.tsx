import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { X, MousePointerClick } from 'lucide-react'

/**
 * ConcentricReveal — révélation de couches EMBOÎTÉES (cercles concentriques).
 *
 * Les couches se construisent de l'intérieur vers l'extérieur (ex :
 * Prompt au centre → Context autour → Harness englobant). Pour chaque couche,
 * **2 clics** :
 *   - clic « mise en avant » → la couche apparaît en GROS (disque plein centré)
 *     avec ses détails ;
 *   - clic « rangement » → elle reprend sa taille concentrique dans le schéma
 *     global (les couches plus petites repassent au premier plan).
 * À la fin : le schéma complet + un bandeau « takeaway ».
 *
 * MODE INTERACTIF : une fois rangée, **chaque anneau est cliquable** → il
 * repasse au premier plan dans un overlay avec des explications étendues
 * (champ `more`). Clic ailleurs / ✕ / Échap pour refermer.
 *
 * `step` : 2k → couche k mise en avant ; 2k+1 → couche k rangée.
 *  ⇒ `essentialSteps: layers.length * 2`.
 *
 * Slide `progressive: true` → marche aux flèches en mode normal. Réutilisable —
 * voir le skill create-astek-pulse-meetup.
 */

const EASE = [0.22, 1, 0.36, 1] as const

export interface ConcentricLayer {
  id: string
  name: string
  era: string
  level: string
  detail: string
  /** explications étendues affichées au clic (mode interactif) */
  more?: string[]
  /** classes tailwind du disque (bg + border), du plus clair (interne) au plus fort */
  ring: string
}

const HILITE = 98 // taille (% du carré) en mode « mise en avant »
const MIN_SIZE = 34 // taille de la couche la plus interne

/** Taille concentrique (% du carré) de la couche `i` parmi `n` (interne→externe). */
function sizeFor(i: number, n: number): number {
  if (n <= 1) return 80
  return MIN_SIZE + (100 - MIN_SIZE) * (i / (n - 1))
}

interface ConcentricRevealProps {
  layers: ConcentricLayer[]
  step: number
  takeaway?: ReactNode
}

export function ConcentricReveal({ layers, step, takeaway }: ConcentricRevealProps) {
  const n = layers.length
  const hi = step % 2 === 0 && step / 2 < n ? step / 2 : -1 // couche mise en avant
  const visible = Math.min(n, Math.floor(step / 2) + 1) // couches présentes dans le schéma
  const allSettled = hi < 0 && visible >= n

  // mode interactif : couche sélectionnée au clic
  const [selected, setSelected] = useState<string | null>(null)
  // referme l'overlay quand on change d'étape
  useEffect(() => setSelected(null), [step])
  // Échap referme
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setSelected(null)
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [selected])

  const selectedLayer = selected ? layers.find((l) => l.id === selected) : null

  return (
    <div className="relative flex h-full min-h-full w-full flex-1 flex-col items-center justify-center overflow-hidden bg-background px-6 py-8 md:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 ilab-grid-bg opacity-15" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/15 blur-[160px]" />
      </div>

      <div className="relative aspect-square h-[72vh] max-h-[72vh] w-auto max-w-[94vw]">
        {layers.map((L, i) => {
          if (i >= visible && i !== hi) return null
          const isHi = i === hi
          const size = isHi ? HILITE : sizeFor(i, n)
          const clickable = !isHi // une fois rangée, on peut cliquer dessus
          return (
            <motion.div
              key={L.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: 1,
                scale: 1,
                width: `${size}%`,
                height: `${size}%`,
              }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ zIndex: isHi ? 100 : n - i }}
              onClick={clickable ? () => setSelected(L.id) : undefined}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border-2 ${L.ring} ${
                isHi ? 'shadow-[0_0_140px_-20px] shadow-amber-500/60 backdrop-blur-md' : ''
              } ${clickable ? 'cursor-pointer transition-shadow hover:shadow-[0_0_60px_-12px] hover:shadow-amber-500/50' : ''}`}
            >
              {isHi ? (
                <div className="flex max-w-2xl flex-col items-center px-8 text-center">
                  <span className="text-base font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 md:text-lg">
                    {L.era} · {L.level}
                  </span>
                  <h3 className="mt-2 text-[clamp(2rem,4.6vw,4.25rem)] font-black leading-[0.95] text-foreground">
                    {L.name}
                  </h3>
                  <p className="mt-4 text-[clamp(1.05rem,1.9vw,1.55rem)] font-light leading-tight text-muted-foreground">
                    {L.detail}
                  </p>
                </div>
              ) : i === 0 ? (
                <div className="px-4 text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-amber-600/90 dark:text-amber-400/90 md:text-xs">
                    {L.era}
                  </span>
                  <span className="block text-sm font-black leading-tight text-foreground md:text-xl">
                    {L.name}
                  </span>
                </div>
              ) : (
                <div
                  className="absolute left-0 right-0 text-center"
                  style={{ top: '5%' }}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-amber-600/90 dark:text-amber-400/90 md:text-xs">
                    {L.era} · {L.level}
                  </span>
                  <span className="block text-base font-black leading-tight text-foreground md:text-2xl">
                    {L.name}
                  </span>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* indice mode interactif (quand tout est rangé) */}
      {allSettled && !selectedLayer && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative z-10 mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground md:text-sm"
        >
          <MousePointerClick className="h-4 w-4 text-amber-500" />
          Cliquez sur un anneau pour le détailler
        </motion.p>
      )}

      {takeaway && allSettled && !selectedLayer && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative z-50 mt-3 max-w-4xl rounded-2xl border-2 border-amber-500/40 bg-card/95 px-6 py-4 text-center backdrop-blur-md"
        >
          {takeaway}
        </motion.div>
      )}

      {/* ── MODE INTERACTIF : overlay de détail au clic ── */}
      <AnimatePresence>
        {selectedLayer && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
            className="absolute inset-0 z-[200] flex items-center justify-center bg-background/80 px-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className={`relative flex max-w-3xl flex-col items-center rounded-[2.5rem] border-2 ${selectedLayer.ring} bg-card/95 px-10 py-12 text-center shadow-2xl backdrop-blur-md`}
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Fermer"
                className="absolute right-5 top-5 rounded-full border border-border bg-background/60 p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
              <span className="text-base font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 md:text-lg">
                {selectedLayer.era} · {selectedLayer.level}
              </span>
              <h3 className="mt-2 text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[0.95] text-foreground">
                {selectedLayer.name}
              </h3>
              <p className="mt-5 max-w-2xl text-[clamp(1.1rem,2vw,1.6rem)] font-light leading-tight text-muted-foreground">
                {selectedLayer.detail}
              </p>
              {selectedLayer.more && selectedLayer.more.length > 0 && (
                <ul className="mt-6 flex flex-col gap-2.5 text-left">
                  {selectedLayer.more.map((m) => (
                    <li
                      key={m}
                      className="flex items-start gap-3 text-[clamp(0.95rem,1.6vw,1.25rem)] text-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
