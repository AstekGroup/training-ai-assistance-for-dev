import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  getSlidesByVariant,
  type DeckVariant,
  type SlideEntry,
  type ViewMode,
} from '@/meetup/data/slides'

interface DeckVariantContextValue {
  variant: DeckVariant
  setVariant: (v: DeckVariant) => void
  /**
   * Liste des slides effectivement utilisée pour la navigation.
   *
   * - En mode édition de visibilité : la liste complète (tous les slides
   *   visibles, hidden inclus pour pouvoir les démasquer) avec leur index
   *   recalculé sur cette même liste.
   * - Hors mode édition : les slides masqués sont **filtrés** et la liste
   *   ré-indexée 1..N — la navigation passe par-dessus.
   */
  slides: SlideEntry[]
  /** Liste complète de la variante (full ou light), sans filtrage hidden. */
  baseSlides: SlideEntry[]
  switchVariant: (currentSlideId: string | undefined) => {
    nextVariant: DeckVariant
    nextIndex: number
  }
  viewMode: ViewMode
  setViewMode: (m: ViewMode) => void
  toggleViewMode: () => void

  /* === Visibilité des slides === */
  /** Set des IDs de slides masqués (persisté en localStorage). */
  hiddenIds: Set<string>
  /** Vrai si on est en mode "édition de la visibilité". */
  editingVisibility: boolean
  toggleEditingVisibility: () => void
  /** Bascule l'état hidden du slide passé en argument. */
  toggleHidden: (id: string) => void
  /** Démasque tous les slides. */
  clearHidden: () => void
  /** Helper : la slide est-elle marquée masquée ? */
  isHidden: (id: string) => boolean
  /**
   * Trouve l'index 1-based d'un slide (par ID) dans la liste effective.
   * Renvoie 1 si non trouvé (cas d'un slide masqué hors édition par exemple).
   */
  findIndexById: (id: string) => number
}

const DeckVariantContext = createContext<DeckVariantContextValue | null>(null)

const VARIANT_STORAGE_KEY = 'astek-pulse-meetup-variant'
const VIEWMODE_STORAGE_KEY = 'astek-pulse-meetup-viewmode'
const HIDDEN_STORAGE_KEY = 'astek-pulse-meetup-hidden-slides'

function readInitialVariant(): DeckVariant {
  if (typeof window === 'undefined') return 'full'
  const params = new URLSearchParams(window.location.search)
  const v = params.get('v')
  if (v === 'light' || v === 'full') return v
  const stored = window.localStorage.getItem(VARIANT_STORAGE_KEY)
  return stored === 'light' ? 'light' : 'full'
}

function readInitialViewMode(): ViewMode {
  if (typeof window === 'undefined') return 'rich'
  const params = new URLSearchParams(window.location.search)
  const m = params.get('m')
  if (m === 'essential' || m === 'rich') return m
  const stored = window.localStorage.getItem(VIEWMODE_STORAGE_KEY)
  return stored === 'essential' ? 'essential' : 'rich'
}

function readInitialHidden(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(HIDDEN_STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((x): x is string => typeof x === 'string'))
    }
    return new Set()
  } catch {
    return new Set()
  }
}

function persistHidden(hidden: Set<string>) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(
    HIDDEN_STORAGE_KEY,
    JSON.stringify(Array.from(hidden))
  )
}

export function DeckVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<DeckVariant>(readInitialVariant)
  const [viewMode, setViewModeState] = useState<ViewMode>(readInitialViewMode)
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(readInitialHidden)
  const [editingVisibility, setEditingVisibility] = useState(false)

  const setVariant = useCallback((v: DeckVariant) => {
    setVariantState(v)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(VARIANT_STORAGE_KEY, v)
    }
  }, [])

  const setViewMode = useCallback((m: ViewMode) => {
    setViewModeState(m)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(VIEWMODE_STORAGE_KEY, m)
    }
  }, [])

  const toggleViewMode = useCallback(() => {
    setViewMode(viewMode === 'essential' ? 'rich' : 'essential')
  }, [viewMode, setViewMode])

  const toggleEditingVisibility = useCallback(() => {
    setEditingVisibility((v) => !v)
  }, [])

  const toggleHidden = useCallback((id: string) => {
    setHiddenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      persistHidden(next)
      return next
    })
  }, [])

  const clearHidden = useCallback(() => {
    setHiddenIds(() => {
      const next = new Set<string>()
      persistHidden(next)
      return next
    })
  }, [])

  const isHidden = useCallback(
    (id: string) => hiddenIds.has(id),
    [hiddenIds]
  )

  /** Liste de base de la variante (full ou light), inchangée. */
  const baseSlides = useMemo(
    () => getSlidesByVariant(variant),
    [variant]
  )

  /**
   * Liste effective :
   * - en mode édition : `baseSlides` ré-indexé (on garde tous les slides
   *   pour permettre le démasquage)
   * - sinon : on filtre les hidden et on ré-indexe
   */
  const slides = useMemo<SlideEntry[]>(() => {
    if (editingVisibility) {
      return baseSlides.map((s, i) => ({ ...s, index: i + 1 }))
    }
    return baseSlides
      .filter((s) => !hiddenIds.has(s.id))
      .map((s, i) => ({ ...s, index: i + 1 }))
  }, [baseSlides, hiddenIds, editingVisibility])

  const switchVariant = useCallback<DeckVariantContextValue['switchVariant']>(
    (currentSlideId) => {
      const nextVariant: DeckVariant = variant === 'light' ? 'full' : 'light'
      const nextBase = getSlidesByVariant(nextVariant)
      const nextSlides = editingVisibility
        ? nextBase.map((s, i) => ({ ...s, index: i + 1 }))
        : nextBase
            .filter((s) => !hiddenIds.has(s.id))
            .map((s, i) => ({ ...s, index: i + 1 }))
      const match = currentSlideId
        ? nextSlides.find((s) => s.id === currentSlideId)
        : undefined
      const nextIndex = match?.index ?? 1
      setVariant(nextVariant)
      return { nextVariant, nextIndex }
    },
    [variant, setVariant, editingVisibility, hiddenIds]
  )

  const findIndexById = useCallback(
    (id: string) => {
      const found = slides.find((s) => s.id === id)
      return found?.index ?? 1
    },
    [slides]
  )

  // Sync URL query params (`?v=light`, `?m=essential`)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    if (variant === 'light') url.searchParams.set('v', 'light')
    else url.searchParams.delete('v')
    if (viewMode === 'essential') url.searchParams.set('m', 'essential')
    else url.searchParams.delete('m')
    window.history.replaceState({}, '', url)
  }, [variant, viewMode])

  const value = useMemo<DeckVariantContextValue>(
    () => ({
      variant,
      setVariant,
      slides,
      baseSlides,
      switchVariant,
      viewMode,
      setViewMode,
      toggleViewMode,
      hiddenIds,
      editingVisibility,
      toggleEditingVisibility,
      toggleHidden,
      clearHidden,
      isHidden,
      findIndexById,
    }),
    [
      variant,
      setVariant,
      slides,
      baseSlides,
      switchVariant,
      viewMode,
      setViewMode,
      toggleViewMode,
      hiddenIds,
      editingVisibility,
      toggleEditingVisibility,
      toggleHidden,
      clearHidden,
      isHidden,
      findIndexById,
    ]
  )

  return (
    <DeckVariantContext.Provider value={value}>
      {children}
    </DeckVariantContext.Provider>
  )
}

export function useDeckVariant(): DeckVariantContextValue {
  const ctx = useContext(DeckVariantContext)
  if (!ctx) {
    throw new Error('useDeckVariant doit être utilisé dans <DeckVariantProvider>')
  }
  return ctx
}
