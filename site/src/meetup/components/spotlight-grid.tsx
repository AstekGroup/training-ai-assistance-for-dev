import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { X, MousePointerClick } from 'lucide-react'

/**
 * SpotlightGrid — révélation « projecteur puis rangement », pilotée par `step`.
 *
 * Chaque image **arrive en gros plan** au centre (en glissant depuis la droite),
 * puis **vole se ranger** dans sa case d'une grille 2×2 quand la suivante arrive.
 * Les images s'accumulent une à une. Au début une seule image ; à la fin la
 * grille complète + un bandeau « takeaway ».
 *
 * Positionnement ABSOLU animé (top/left/width/height en %) — pas de `layoutId`,
 * donc le mouvement est **toujours identique et fiable** à chaque étape.
 *
 * DEUX clics par image (pour pouvoir parler entre les deux) :
 *   - clic « pair » → l'image suivante ARRIVE en gros plan (glisse depuis la droite) ;
 *   - clic « impair » → cette image se RANGE dans sa case (rien d'autre ne bouge).
 *  ⇒ `essentialSteps: items.length * 2`.
 *
 * MODE INTERACTIF : une fois rangée, **chaque image est cliquable** → elle repasse
 * au premier plan dans un overlay avec ses explications étendues (champ `more`).
 * ✕ / Échap / clic ailleurs pour refermer.
 *
 * Conçu pour fonctionner en mode normal (slide `progressive: true`) comme en
 * essentiel. Réutilisable — voir le skill create-astek-pulse-meetup.
 */

const EASE = [0.22, 1, 0.36, 1] as const

export interface SpotlightItem {
  id: string
  img: string
  /** classe object-position, ex: 'object-[center_35%]' */
  pos?: string
  kicker: string
  title: string
  caption: string
  /** explications étendues affichées au clic (mode interactif) */
  more?: string[]
}

interface Rect {
  top: number
  left: number
  width: number
  height: number
}

// Scène (gros plan, centré) et cases de la grille 2×2 (en %, gap ~2%).
const STAGE: Rect = { top: 6, left: 9, width: 82, height: 88 }
const CELLS: Rect[] = [
  { top: 0, left: 0, width: 49, height: 49 }, // haut-gauche
  { top: 0, left: 51, width: 49, height: 49 }, // haut-droite
  { top: 51, left: 0, width: 49, height: 49 }, // bas-gauche
  { top: 51, left: 51, width: 49, height: 49 }, // bas-droite
]

export function SpotlightPanel({
  item,
  big = false,
}: {
  item: SpotlightItem
  big?: boolean
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-black">
      <img
        src={item.img}
        alt={item.title}
        className={`absolute inset-0 h-full w-full object-cover ${item.pos ?? 'object-center'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/30 to-transparent" />
      <div className={`relative z-10 ${big ? 'max-w-2xl p-8 md:p-10' : 'p-4 md:p-5'}`}>
        <span
          className={`font-bold uppercase tracking-widest text-amber-400 ${
            big ? 'text-base md:text-lg' : 'text-[10px] md:text-xs'
          }`}
        >
          {item.kicker}
        </span>
        <h3
          className={`font-black leading-[0.95] tracking-tight text-white ${
            big ? 'mt-1 text-[clamp(2rem,4.4vw,4rem)]' : 'text-sm md:text-2xl'
          }`}
        >
          {item.title}
        </h3>
        {big && (
          <p className="mt-3 text-[clamp(1.05rem,1.9vw,1.55rem)] font-light leading-tight text-white/85">
            {item.caption}
          </p>
        )}
      </div>
    </div>
  )
}

interface SpotlightGridProps {
  items: SpotlightItem[]
  step: number
  takeaway?: ReactNode
}

export function SpotlightGrid({ items, step, takeaway }: SpotlightGridProps) {
  const n = items.length
  // 2 clics par image : pair = arrivée en gros plan, impair = rangement.
  const dockedCount = Math.min(n, Math.ceil(step / 2)) // images rangées
  const bigIndex = step % 2 === 0 && step / 2 < n ? step / 2 : -1 // gros plan (ou -1)
  const allDocked = bigIndex < 0 && dockedCount >= n

  // mode interactif : image sélectionnée au clic
  const [selected, setSelected] = useState<string | null>(null)
  useEffect(() => setSelected(null), [step])
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
  const selectedItem = selected ? items.find((it) => it.id === selected) : null

  return (
    <div className="relative h-full min-h-full w-full flex-1 overflow-hidden bg-background p-4 md:p-5">
      <div className="relative h-full w-full">
        {items.map((item, i) => {
          const isBig = i === bigIndex
          const isDocked = i < dockedCount
          if (!isBig && !isDocked) return null // pas encore révélée
          const rect = isBig ? STAGE : CELLS[i]
          const clickable = isDocked && !isBig
          return (
            <motion.div
              key={item.id}
              // entrée : glisse depuis la droite en gros plan (1re apparition)
              initial={{
                top: `${STAGE.top}%`,
                left: `${STAGE.left}%`,
                width: `${STAGE.width}%`,
                height: `${STAGE.height}%`,
                x: 700,
                opacity: 0,
              }}
              animate={{
                top: `${rect.top}%`,
                left: `${rect.left}%`,
                width: `${rect.width}%`,
                height: `${rect.height}%`,
                x: 0,
                opacity: 1,
              }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ position: 'absolute', zIndex: isBig ? 40 : 10 + i }}
              onClick={clickable ? () => setSelected(item.id) : undefined}
              className={
                clickable
                  ? 'cursor-pointer transition-shadow hover:shadow-[0_0_50px_-10px] hover:shadow-amber-500/60'
                  : undefined
              }
            >
              <SpotlightPanel item={item} big={isBig} />
            </motion.div>
          )
        })}
      </div>

      {/* indice mode interactif */}
      {allDocked && !selectedItem && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute left-1/2 top-3 z-50 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow backdrop-blur-md md:text-sm"
        >
          <MousePointerClick className="h-4 w-4 text-amber-500" />
          Cliquez sur une image pour la détailler
        </motion.p>
      )}

      {takeaway && allDocked && !selectedItem && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute inset-x-4 bottom-4 z-50 rounded-2xl border-2 border-amber-500/40 bg-card/95 px-6 py-4 text-center shadow-lg backdrop-blur-md md:inset-x-5 md:bottom-5"
        >
          {takeaway}
        </motion.div>
      )}

      {/* ── MODE INTERACTIF : overlay de détail au clic ── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
            className="absolute inset-0 z-[200] flex items-center justify-center bg-background/80 px-6 py-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[84vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl"
            >
              <img
                src={selectedItem.img}
                alt={selectedItem.title}
                className={`absolute inset-0 h-full w-full object-cover ${selectedItem.pos ?? 'object-center'}`}
              />
              {/* scrims haut + bas pour légende + détails */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/20 to-black/90" />
              <button
                onClick={() => setSelected(null)}
                aria-label="Fermer"
                className="absolute right-5 top-5 z-10 rounded-full border border-white/20 bg-black/40 p-2 text-white/80 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              {/* légende en haut */}
              <div className="absolute left-0 right-0 top-0 z-[1] max-w-2xl p-8 md:p-10">
                <span className="text-base font-bold uppercase tracking-widest text-amber-400 md:text-lg">
                  {selectedItem.kicker}
                </span>
                <h3 className="mt-1 text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[0.95] text-white">
                  {selectedItem.title}
                </h3>
                <p className="mt-3 max-w-xl text-[clamp(1.05rem,2vw,1.6rem)] font-light leading-tight text-white/85">
                  {selectedItem.caption}
                </p>
              </div>
              {/* explications étendues en bas */}
              {selectedItem.more && selectedItem.more.length > 0 && (
                <ul className="absolute inset-x-0 bottom-0 z-[1] flex flex-col gap-2.5 p-8 md:p-10">
                  {selectedItem.more.map((m) => (
                    <li
                      key={m}
                      className="flex items-start gap-3 text-[clamp(0.95rem,1.7vw,1.35rem)] text-white"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
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
