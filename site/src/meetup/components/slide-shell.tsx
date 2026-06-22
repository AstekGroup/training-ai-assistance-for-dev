import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, type Transition } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Shell standard pour les slides du deck.
 *
 * Comportement systématique :
 * 1. Au mount, le titre s'affiche centré, en grand (mode <<expanded>>),
 *    occupant tout l'espace dispo. Le contenu (body + takeaway) est masqué.
 * 2. Après `headerHoldMs` (défaut 2,8 s) le titre passe en mode <<compact>> :
 *    bandeau en haut à gauche en plus petit. Le contenu apparaît en dessous
 *    avec une animation fade-up.
 *
 * Les composants `SlideHeader`, `SlideBody`, `SlideTakeaway` se branchent
 * automatiquement sur le contexte `SlideShellContext` pour adapter leur
 * rendu sans configuration locale.
 *
 * Pour skipper la phase d'introduction (slides à contenu très dense, ou
 * en mode debug), passer `headerHoldMs={0}`. Pour rester en grand
 * indéfiniment (slides titre uniquement), passer `Infinity`.
 */

const DEFAULT_HEADER_HOLD_MS = 2800

interface SlideShellContextValue {
  isCompact: boolean
  /** Identifiant unique pour scoper les layoutId de motion à l'instance courante. */
  layoutScope: string
}

const SlideShellContext = createContext<SlideShellContextValue>({
  isCompact: false,
  layoutScope: 'default',
})

export function useSlideShell() {
  return useContext(SlideShellContext)
}

/** Spring config pour la transition expanded → compact (FLIP via motion). */
const FLIP_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 180,
  damping: 26,
  mass: 0.9,
}

interface SlideShellProps {
  children: ReactNode
  className?: string
  /** Background absolu (WebGL, blobs, grilles) inséré derrière le contenu. */
  background?: ReactNode
  /** Spacing vertical interne. Par défaut : `normal`. */
  padding?: 'normal' | 'tight' | 'loose'
  /** Délai avant que le header se réduise. 0 = compact d'emblée, Infinity = toujours grand. */
  headerHoldMs?: number
}

export function SlideShell({
  children,
  className,
  background,
  padding = 'normal',
  headerHoldMs = DEFAULT_HEADER_HOLD_MS,
}: SlideShellProps) {
  const layoutScope = useId()
  const [isCompact, setIsCompact] = useState(headerHoldMs <= 0)

  useEffect(() => {
    if (headerHoldMs <= 0) {
      setIsCompact(true)
      return
    }
    if (!isFinite(headerHoldMs)) {
      setIsCompact(false)
      return
    }
    const t = window.setTimeout(() => setIsCompact(true), headerHoldMs)
    return () => window.clearTimeout(t)
  }, [headerHoldMs])

  // Skip rapide : flèche bas ou Entrée saute à l'état compact.
  useEffect(() => {
    if (isCompact) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault()
        setIsCompact(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isCompact])

  const paddingClass = {
    tight: 'pt-16 pb-24 md:pt-20 md:pb-24',
    normal: 'pt-20 pb-28 md:pt-24 md:pb-28',
    loose: 'pt-24 pb-32 md:pt-28 md:pb-32',
  }[padding]

  return (
    <SlideShellContext.Provider value={{ isCompact, layoutScope }}>
      <div
        className={cn(
          // Mobile : hauteur flexible + overflow visible pour scroll natif.
          // Desktop : full-height container avec clipping interne.
          'relative flex w-full flex-col md:h-full md:overflow-hidden',
          className
        )}
      >
        {background && (
          <div className="pointer-events-none absolute inset-0">
            {background}
          </div>
        )}
        <div
          className={cn(
            'relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-8',
            paddingClass
          )}
        >
          {children}
        </div>
      </div>
    </SlideShellContext.Provider>
  )
}

/* ============================================================
 * SlideHeader — deux états : expanded (centré, grand) / compact (top-left, petit)
 * ============================================================ */

interface SlideHeaderProps {
  overline?: ReactNode
  title: ReactNode
  /** Version simplifiée du titre pour le mode compact. Si absent, on réutilise `title`. */
  compactTitle?: ReactNode
  subtitle?: ReactNode
  className?: string
  align?: 'center' | 'left'
}

export function SlideHeader({
  overline,
  title,
  compactTitle,
  subtitle,
  className,
  align = 'center',
}: SlideHeaderProps) {
  const { isCompact, layoutScope } = useSlideShell()

  // layoutId scopés par instance pour que motion ne crée pas de collision
  // entre deux SlideShell montés en même temps.
  const overlineId = `${layoutScope}-overline`
  const titleId = `${layoutScope}-title`

  if (isCompact) {
    return (
      <div className="flex shrink-0 items-baseline gap-3 self-start">
        {overline && (
          <motion.span
            layoutId={overlineId}
            transition={FLIP_TRANSITION}
            className="text-[10px] font-bold uppercase tracking-[0.18em] text-ilab-green"
          >
            {overline}
          </motion.span>
        )}
        <motion.span
          layoutId={titleId}
          transition={FLIP_TRANSITION}
          className="text-base font-bold tracking-tight md:text-lg"
        >
          {compactTitle ?? title}
        </motion.span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-1 flex-col justify-center',
        align === 'center'
          ? 'items-center text-center'
          : 'items-start text-left',
        className
      )}
    >
      {overline && (
        <motion.div
          layoutId={overlineId}
          transition={FLIP_TRANSITION}
          className={cn(
            'ilab-overline mb-6 text-base text-ilab-green',
            align === 'left' && 'inline-block'
          )}
        >
          {overline}
        </motion.div>
      )}
      <motion.h2
        layoutId={titleId}
        transition={FLIP_TRANSITION}
        className="text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
      >
        {title}
      </motion.h2>
      <AnimatePresence>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mt-6 max-w-4xl text-xl text-muted-foreground md:text-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ============================================================
 * SlideBody — visible uniquement en mode compact (apparaît après le hold)
 * ============================================================ */

interface SlideBodyProps {
  children: ReactNode
  className?: string
  /** 'center' (défaut) centre le contenu verticalement dans le body. */
  align?: 'center' | 'top'
}

export function SlideBody({
  children,
  className,
  align = 'center',
}: SlideBodyProps) {
  const { isCompact } = useSlideShell()

  return (
    <AnimatePresence>
      {isCompact && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            'flex flex-1 flex-col py-6',
            align === 'center' ? 'justify-center' : 'justify-start',
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ============================================================
 * SlideTakeaway — visible uniquement en mode compact
 * ============================================================ */

interface SlideTakeawayProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'accent' | 'dashed'
}

export function SlideTakeaway({
  children,
  className,
  variant = 'default',
}: SlideTakeawayProps) {
  const { isCompact } = useSlideShell()

  const variantClass = {
    default: 'border border-ilab-green/30 bg-ilab-green/5',
    accent:
      'border-2 border-ilab-green/50 bg-ilab-green/10 shadow-lg shadow-ilab-green/10',
    dashed: 'border-2 border-dashed border-ilab-green/40 bg-ilab-green/5',
  }[variant]

  return (
    <AnimatePresence>
      {isCompact && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            'mx-auto w-full max-w-5xl shrink-0 rounded-2xl p-5 text-center',
            variantClass,
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
