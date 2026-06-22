import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import {
  ChevronDown,
  ChevronsDownUp,
  ChevronsUpDown,
  CornerDownLeft,
  Eye,
  EyeOff,
  ListOrdered,
  MoveVertical,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { useDeckVariant } from '@/meetup/providers/deck-variant'
import { useLang } from '@/meetup/i18n'

/**
 * TocPanel — sommaire latéral gauche.
 *
 * Ouvre / ferme :
 *   - Touche `S` (hors input) toggle
 *   - `Échap` ferme
 *   - Click backdrop ou X ferme
 *   - ↑ / ↓ pour naviguer dans la liste, Entrée pour aller
 *   - Click sur un item → goTo + ferme
 *
 * Effet visuel (inspiré du StaggeredMenu React Bits) :
 *   - 2 pre-layers colorés cascadent depuis la gauche (vert ILAB + muted)
 *   - Le panneau principal arrive ensuite avec un délai
 *   - Les items entrent avec yPercent 140 + rotate 10 → 0 (stagger)
 *   - Item actif : scale 1.02 + ring ilab-green + shadow
 *   - Phases séparées par des en-têtes colorés
 *   - Portal vers document.body pour échapper aux transforms motion
 */

interface TocPanelProps {
  /**
   * ID du slide courant (utilisé pour marquer la ligne active dans le sommaire).
   * Le sommaire affiche TOUS les slides (visibles + masqués) et utilise les IDs
   * pour l'activeness puisque les indices peuvent décaler entre baseSlides
   * et la liste effective filtrée.
   */
  currentSlideId: string | undefined
  /**
   * Callback quand l'utilisateur clique sur une ligne du sommaire.
   * Reçoit l'ID du slide cible. Le DeckPage gère la navigation (et le
   * démasquage automatique si le slide est masqué).
   */
  onSelect: (slideId: string) => void
  /** Pilule visible ou masquee (suit l'auto-hide UI du deck). */
  showPill?: boolean
}

/* --- Palette par phase (synchronisée avec les dividers) --- */
const phaseTone: Record<string, { dot: string; text: string; bg: string }> = {
  Ouverture: {
    dot: 'bg-muted-foreground/60',
    text: 'text-muted-foreground',
    bg: 'bg-muted/40',
  },
  Contexte: {
    dot: 'bg-blue-500',
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10',
  },
  'Démo 1 — Baselines': {
    dot: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
  },
  'TFT — la solution': {
    dot: 'bg-ilab-green',
    text: 'text-ilab-green',
    bg: 'bg-ilab-green/10',
  },
  'Démo 2 — TFT': {
    dot: 'bg-violet-500',
    text: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10',
  },
  'Foundation Models': {
    dot: 'bg-cyan-500',
    text: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  'Démo 3 — Chronos': {
    dot: 'bg-sky-500',
    text: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-500/10',
  },
  'Synthèse & Décision': {
    dot: 'bg-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-500/10',
  },
  'Maintenance & NASA': {
    dot: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
  },
  'Démo 4 — RUL': {
    dot: 'bg-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-500/10',
  },
  Conclusion: {
    dot: 'bg-ilab-green',
    text: 'text-ilab-green',
    bg: 'bg-ilab-green/10',
  },
}

const defaultTone = {
  dot: 'bg-muted-foreground/60',
  text: 'text-muted-foreground',
  bg: 'bg-muted/40',
}

export function TocPanel({
  currentSlideId,
  onSelect,
  showPill = true,
}: TocPanelProps) {
  const {
    baseSlides,
    isHidden,
    toggleHidden,
  } = useDeckVariant()
  const { lang, t } = useLang()
  // TocPanel utilise toujours `baseSlides` pour qu'on voie l'intégralité
  // du deck (visibles + masqués). Le toggle eye/eye-off de chaque ligne
  // permet de basculer l'état hidden directement.
  const slides = baseSlides
  // Position 0-based du slide courant dans baseSlides, ou 0 si non trouvé.
  const currentIndex = useMemo(
    () => Math.max(0, slides.findIndex((s) => s.id === currentSlideId)),
    [slides, currentSlideId]
  )
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [focusIndex, setFocusIndex] = useState<number>(currentIndex)
  // Phases repliées (stockées par nom de phase)
  const [collapsedPhases, setCollapsedPhases] = useState<Set<string>>(new Set())
  // Distingue : focus via clavier (scroll auto) vs focus via souris (pas de scroll)
  const keyboardNavRef = useRef(false)

  // Listener clavier global : S toggle, Escape close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)

      if (e.key === 'Escape' && open) {
        e.stopImmediatePropagation()
        e.preventDefault()
        setOpen(false)
        return
      }

      if (
        (e.key === 's' || e.key === 'S') &&
        !isInput &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        e.preventDefault()
        setOpen((v) => {
          const next = !v
          if (next) setFocusIndex(currentIndex)
          return next
        })
      }
    }

    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open, currentIndex])

  // Filtrage — `slides` doit être dans les deps : il change quand on switch
  // de variante (full ↔ light), sinon le sommaire reste figé sur l'ancienne.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return slides
    return slides.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        (s.titleEn?.toLowerCase().includes(q) ?? false) ||
        s.phase.toLowerCase().includes(q) ||
        (s.phaseEn?.toLowerCase().includes(q) ?? false) ||
        s.sourceSlide.toLowerCase().includes(q),
    )
  }, [query, slides])

  // Grouper par phase en conservant l'ordre
  const grouped = useMemo(() => {
    const groups: { phase: string; items: typeof slides }[] = []
    filtered.forEach((s) => {
      const last = groups[groups.length - 1]
      if (last && last.phase === s.phase) {
        last.items.push(s)
      } else {
        groups.push({ phase: s.phase, items: [s] })
      }
    })
    return groups
  }, [filtered])

  // État pli/dépli global
  const allPhases = useMemo(() => grouped.map((g) => g.phase), [grouped])
  const allCollapsed =
    allPhases.length > 0 && allPhases.every((p) => collapsedPhases.has(p))

  const togglePhase = (phase: string) => {
    setCollapsedPhases((prev) => {
      const next = new Set(prev)
      if (next.has(phase)) next.delete(phase)
      else next.add(phase)
      return next
    })
  }

  const toggleAll = () => {
    if (allCollapsed) {
      setCollapsedPhases(new Set())
    } else {
      setCollapsedPhases(new Set(allPhases))
    }
  }

  // Flat list for keyboard nav (exclut les items dans une phase repliée)
  const flatIndices = useMemo(
    () =>
      filtered
        .filter((s) => !collapsedPhases.has(s.phase))
        .map((s) => slides.indexOf(s)),
    [filtered, collapsedPhases, slides],
  )

  // Navigation clavier dans la liste
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      if (isInput) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        e.stopImmediatePropagation()
        keyboardNavRef.current = true
        const pos = flatIndices.indexOf(focusIndex)
        const next = Math.min((pos < 0 ? 0 : pos + 1), flatIndices.length - 1)
        setFocusIndex(flatIndices[next])
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        e.stopImmediatePropagation()
        keyboardNavRef.current = true
        const pos = flatIndices.indexOf(focusIndex)
        const next = Math.max(pos - 1, 0)
        setFocusIndex(flatIndices[next])
      } else if (e.key === 'Enter') {
        if (focusIndex >= 0) {
          e.preventDefault()
          e.stopImmediatePropagation()
          const target = slides[focusIndex]
          if (target) {
            onSelect(target.id)
            setOpen(false)
          }
        }
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open, focusIndex, flatIndices, onSelect, slides])

  // Refs pour scroll vers l'item actif (à l'ouverture) et focusé (au clavier)
  const activeRef = useRef<HTMLButtonElement | null>(null)
  const focusedRef = useRef<HTMLButtonElement | null>(null)

  // 1) Scroll vers l'item actif UNIQUEMENT à l'ouverture du panneau
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => {
      activeRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }, 120)
    return () => clearTimeout(t)
  }, [open])

  // 2) Scroll vers l'item focusé UNIQUEMENT si la navigation vient du clavier
  useEffect(() => {
    if (!open) return
    if (!keyboardNavRef.current) return
    focusedRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
    keyboardNavRef.current = false
  }, [focusIndex, open])

  if (typeof document === 'undefined') return null

  const done = currentIndex + 1
  const total = slides.length
  const pct = Math.round((done / total) * 100)

  return createPortal(
    <>
      {/* Pilule indice clavier — visible même fermé */}
      <button
        type="button"
        onClick={() => {
          setFocusIndex(currentIndex)
          setOpen(true)
        }}
        aria-label={t('Ouvrir le sommaire (S)', 'Open table of contents (S)')}
        className={`group fixed bottom-20 left-5 z-[90] flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-bold text-muted-foreground shadow-md backdrop-blur-md transition-all duration-500 hover:border-ilab-green/50 hover:bg-ilab-green/10 hover:text-ilab-green ${
          open || !showPill
            ? 'pointer-events-none translate-y-4 opacity-0'
            : 'translate-y-0 opacity-80'
        }`}
      >
        <ListOrdered className="h-3.5 w-3.5" />
        {t('Sommaire', 'Contents')}
        <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">
          S
        </kbd>
      </button>

      {/* Backdrop + prelayers staggered + panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="toc-root"
            className="fixed inset-0 z-[95]"
            style={{ position: 'fixed', inset: 0 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label={t('Fermer le sommaire', 'Close table of contents')}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-background/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Pre-layer 1 : vert ILAB léger — arrive en premier */}
            <motion.div
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-full max-w-[420px] bg-ilab-green/20"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0 }}
            />

            {/* Pre-layer 2 : card semi-transparent — arrive en second */}
            <motion.div
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-full max-w-[420px] bg-muted"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.08,
              }}
            />

            {/* Panel principal — arrive après les prelayers */}
            <motion.aside
              className="absolute left-0 top-0 flex h-full w-full max-w-[420px] flex-col border-r bg-card shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Sommaire du deck"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.16,
              }}
            >
          {/* Header */}
          <div className="relative shrink-0 border-b bg-gradient-to-br from-ilab-green/10 via-transparent to-transparent px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ilab-green/15 text-ilab-green">
                <ListOrdered className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="ilab-overline text-[10px] text-ilab-green">
                  {t('Sommaire du deck', 'Deck contents')}
                </div>
                <h3 className="text-base font-black tracking-tight md:text-lg">
                  Pulse Meetup #1
                </h3>
                <p className="text-xs text-muted-foreground">
                  {done} / {total} · {t(`${pct} % du deck parcouru`, `${pct} % of the deck viewed`)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('Fermer', 'Close')}
                className="flex h-9 w-9 items-center justify-center rounded-full border bg-background/80 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Barre de progression */}
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-ilab-green"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Recherche + pli/dépli global */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-xl border bg-background px-3 py-2 text-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('Filtrer les slides…', 'Filter slides…')}
                  className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-xs text-muted-foreground hover:text-foreground"
                    aria-label={t('Effacer', 'Clear')}
                  >
                    ×
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={toggleAll}
                aria-label={allCollapsed ? t('Tout déplier', 'Expand all') : t('Tout replier', 'Collapse all')}
                title={allCollapsed ? t('Tout déplier', 'Expand all') : t('Tout replier', 'Collapse all')}
                className="flex h-9 w-9 items-center justify-center rounded-xl border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              >
                {allCollapsed ? (
                  <ChevronsUpDown className="h-4 w-4" />
                ) : (
                  <ChevronsDownUp className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Liste — groupée par phase, stagger */}
          <div className="relative flex-1 overflow-y-auto">
            {/* Gradient haut */}
            <div className="pointer-events-none sticky top-0 z-10 -mb-8 h-8 bg-gradient-to-b from-card to-transparent" />

            {grouped.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                {t('Aucune slide ne correspond à « ', 'No slide matches  ')}
                <strong className="text-foreground">{query}</strong>
                {t(' ».', ' .')}
              </div>
            ) : (
              <div className="px-4 py-3">
                {grouped.map((g, gi) => {
                  const tone = phaseTone[g.phase] ?? defaultTone
                  const collapsed = collapsedPhases.has(g.phase)
                  const hasActive = g.items.some(
                    (s) => slides.indexOf(s) === currentIndex,
                  )
                  return (
                    <section key={`${g.phase}-${gi}`} className="mb-3">
                      <button
                        type="button"
                        onClick={() => togglePhase(g.phase)}
                        aria-expanded={!collapsed}
                        className={`sticky top-0 z-10 mb-1 flex w-full items-center gap-2 rounded-lg bg-card/95 px-2 py-1.5 text-left backdrop-blur-sm transition-colors hover:bg-muted/60 ${
                          hasActive ? 'text-foreground' : ''
                        }`}
                      >
                        <motion.span
                          animate={{ rotate: collapsed ? -90 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex h-4 w-4 items-center justify-center text-muted-foreground"
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </motion.span>
                        <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
                        <span
                          className={`flex-1 text-[10px] font-bold uppercase tracking-widest ${tone.text}`}
                        >
                          {lang === 'en' && g.items[0]?.phaseEn ? g.items[0].phaseEn : g.phase}
                        </span>
                        {hasActive && (
                          <span className="rounded-full bg-ilab-green/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-ilab-green">
                            {t('ici', 'here')}
                          </span>
                        )}
                        <span className="font-mono text-[10px] text-muted-foreground/60">
                          {g.items.length}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {!collapsed && (
                          <motion.ul
                            key={`${g.phase}-list`}
                            className="space-y-1 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            {g.items.map((s) => {
                              const i = slides.indexOf(s)
                              const isActive = i === currentIndex
                              const isFocused = i === focusIndex
                              const slideHidden = isHidden(s.id)
                              return (
                                <li key={s.id}>
                                  <TocItem
                                    slideNum={i + 1}
                                    title={lang === 'en' && s.titleEn ? s.titleEn : s.title}
                                    isDivider={!!s.isDivider}
                                    isActive={isActive}
                                    isFocused={isFocused}
                                    isHidden={slideHidden}
                                    showVisibilityToggle
                                    onToggleHidden={() => toggleHidden(s.id)}
                                    tone={tone}
                                    onClick={() => {
                                      onSelect(s.id)
                                      setOpen(false)
                                    }}
                                    onHover={() => {
                                      keyboardNavRef.current = false
                                      setFocusIndex(i)
                                    }}
                                    btnRef={
                                      isActive
                                        ? activeRef
                                        : isFocused
                                          ? focusedRef
                                          : undefined
                                    }
                                  />
                                </li>
                              )
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </section>
                  )
                })}
              </div>
            )}

            {/* Gradient bas */}
            <div className="pointer-events-none sticky bottom-0 z-10 -mt-8 h-8 bg-gradient-to-t from-card to-transparent" />
          </div>

          {/* Footer — hint clavier */}
          <div className="flex items-center justify-between gap-2 border-t bg-muted/30 px-4 py-2 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <kbd className="rounded bg-muted px-1 py-0.5 font-mono">S</kbd>
              {t('toggle', 'toggle')}
              <kbd className="rounded bg-muted px-1 py-0.5 font-mono">{t('Échap', 'Esc')}</kbd>
              {t('ferme', 'close')}
            </div>
            <div className="flex items-center gap-2">
              <MoveVertical className="h-3 w-3" />
              <kbd className="rounded bg-muted px-1 py-0.5 font-mono">↑↓</kbd>
              <CornerDownLeft className="h-3 w-3" />
              {t('aller', 'go')}
            </div>
            <Sparkles className="h-3 w-3 text-ilab-green" />
          </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  )
}

/* ============================================================
 * Item animé — stagger fade + scale pour l'entrée
 * ============================================================ */

interface TocItemProps {
  slideNum: number
  title: string
  isDivider: boolean
  isActive: boolean
  isFocused: boolean
  /** Le slide est marqué masqué (pertinent uniquement en mode édition). */
  isHidden?: boolean
  /** Si vrai, on affiche le toggle eye/eye-off (mode édition de visibilité). */
  showVisibilityToggle?: boolean
  /** Callback du toggle visibilité (mode édition). */
  onToggleHidden?: () => void
  tone: { dot: string; text: string; bg: string }
  onClick: () => void
  onHover: () => void
  btnRef?: React.Ref<HTMLButtonElement>
}

function TocItem({
  slideNum,
  title,
  isDivider,
  isActive,
  isFocused,
  isHidden = false,
  showVisibilityToggle = false,
  onToggleHidden,
  tone,
  onClick,
  onHover,
  btnRef,
}: TocItemProps) {
  const { t } = useLang()
  // Stagger façon React Bits StaggeredMenu : yPercent 140 + rotate 10 → 0
  // Démarre apres l'ouverture du panel (0.16 + 0.65 * 0.15 ≈ 0.26s)
  // Stagger 0.04s par item pour rester fluide sur 30+ slides
  return (
    <motion.div
      initial={{ opacity: 0, y: '140%', rotate: 10 }}
      animate={{ opacity: 1, y: '0%', rotate: 0 }}
      exit={{ opacity: 0, y: '60%' }}
      transition={{
        duration: 0.7,
        delay: Math.min(0.26 + slideNum * 0.025, 1.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformOrigin: 'left center' }}
    >
      <div
        className={`group relative flex w-full items-stretch gap-1 rounded-xl transition-opacity ${
          isHidden ? 'opacity-25 saturate-0 hover:opacity-50' : ''
        }`}
      >
        <button
          ref={btnRef}
          type="button"
          onClick={onClick}
          onMouseEnter={onHover}
          className={`relative flex flex-1 items-start gap-3 rounded-xl px-3 py-2 text-left transition-all ${
            isActive
              ? `scale-[1.02] ring-2 ring-ilab-green shadow-md ${tone.bg}`
              : isFocused
                ? 'bg-muted/60'
                : 'hover:bg-muted/40'
          } ${isDivider ? 'border-l-4' : 'border-l-4 border-transparent'}`}
          style={
            isDivider
              ? {
                  borderLeftColor: 'hsl(var(--foreground) / 0.15)',
                }
              : undefined
          }
        >
          {/* Numéro slide */}
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-bold ${
              isActive
                ? 'bg-ilab-green text-white'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {String(slideNum).padStart(2, '0')}
          </span>

          {/* Titre */}
          <div className="flex-1 pt-0.5">
            <div
              className={`text-sm leading-tight text-foreground ${
                isDivider ? 'font-black' : 'font-medium'
              } ${isHidden ? 'line-through decoration-rose-500/60' : ''}`}
            >
              {title}
            </div>
            {isDivider && (
              <div
                className={`mt-0.5 text-[10px] font-bold uppercase tracking-widest ${tone.text}`}
              >
                {t('· Divider ·', '· Divider ·')}
              </div>
            )}
          </div>

          {/* Indicateur actif */}
          {isActive && (
            <motion.span
              layoutId="toc-active-dot"
              className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ilab-green"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </button>

        {/* Toggle visibilité — visible uniquement en mode édition */}
        {showVisibilityToggle && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleHidden?.()
            }}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
              isHidden
                ? 'bg-rose-500/15 text-rose-600 hover:bg-rose-500/25 dark:text-rose-400'
                : 'bg-muted/40 text-muted-foreground hover:bg-muted'
            }`}
            aria-label={isHidden ? t('Démasquer ce slide', 'Unhide this slide') : t('Masquer ce slide', 'Hide this slide')}
            title={isHidden ? t('Démasquer', 'Unhide') : t('Masquer', 'Hide')}
          >
            {isHidden ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </motion.div>
  )
}
