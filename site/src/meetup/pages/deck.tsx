import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  FileText,
  Home,
  Languages,
  Layers,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Brand } from '@/meetup/components/brand'
import { GlossaryPanel } from '@/meetup/components/glossary-panel'
import { PresenterCamera } from '@/meetup/components/presenter-camera'
import { TocPanel } from '@/meetup/components/toc-panel'
import { useDeckVariant } from '@/meetup/providers/deck-variant'
import { useLang } from '@/meetup/i18n'

const UI_IDLE_MS = 2500

export function DeckPage() {
  const { slideIndex } = useParams<{ slideIndex?: string }>()
  const navigate = useNavigate()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [uiVisible, setUiVisible] = useState(true)
  const idleTimer = useRef<number | null>(null)
  const slideAreaRef = useRef<HTMLDivElement | null>(null)
  const {
    variant,
    slides,
    baseSlides,
    switchVariant,
    viewMode,
    toggleViewMode,
    hiddenIds,
    editingVisibility,
    toggleEditingVisibility,
    toggleHidden,
    clearHidden,
    isHidden,
  } = useDeckVariant()
  const { lang, toggleLang, t } = useLang()
  // Mémorise l'ID du slide courant pour qu'on puisse le retrouver après que
  // la liste `slides` a changé (toggle edit mode, masquage d'un autre slide).
  const intendedSlideIdRef = useRef<string | null>(null)

  const current = useMemo(() => {
    const idx = slideIndex ? parseInt(slideIndex, 10) - 1 : 0
    const safe = Math.max(0, Math.min(slides.length - 1, idx))
    return { index: safe, slide: slides[safe] }
  }, [slideIndex, slides])

  /* --- Mode essentiel : compteur d'étapes de révélation --- */
  const isEssentialActive =
    viewMode === 'essential' &&
    current.slide.essentialComponent !== undefined &&
    !current.slide.isDivider
  /** Slide en révélation progressive (pas-à-pas) y compris en mode rich. */
  const isProgressiveRich =
    current.slide.progressive === true && !current.slide.isDivider
  /** Vrai dès qu'il y a un mécanisme step actif (essential ou progressive). */
  const isStepped = isEssentialActive || isProgressiveRich
  const totalSteps = isStepped
    ? Math.max(1, current.slide.essentialSteps ?? 1)
    : 1
  const [step, setStep] = useState(0)

  // Reset step quand on change de slide ou de viewMode
  useEffect(() => {
    setStep(0)
  }, [current.slide.id, viewMode])

  // Sécurité : si totalSteps a changé (ex: switch slide), clamp step
  useEffect(() => {
    if (step > totalSteps - 1) setStep(0)
  }, [step, totalSteps])

  const handleVariantSwitch = useCallback(() => {
    const currentId = current.slide?.id
    const { nextIndex } = switchVariant(currentId)
    navigate(`/slides/${nextIndex}`)
  }, [current.slide, switchVariant, navigate])

  const goTo = useCallback(
    (idx: number) => {
      const safe = Math.max(0, Math.min(slides.length - 1, idx))
      // Mémorise l'ID pour préserver le slide courant à travers les
      // changements de liste (toggle edit mode, masquage).
      intendedSlideIdRef.current = slides[safe]?.id ?? null
      navigate(`/slides/${safe + 1}`)
    },
    [navigate, slides]
  )

  /**
   * Re-anchor : quand `slides` change (entrée/sortie mode édition, masquage
   * d'un slide, switch variante), on retrouve le slide ciblé par son ID
   * pour que l'utilisateur reste sur le même contenu si possible.
   */
  useEffect(() => {
    const intended = intendedSlideIdRef.current
    if (!intended) {
      intendedSlideIdRef.current = current.slide?.id ?? null
      return
    }
    const found = slides.find((s) => s.id === intended)
    if (found) {
      const urlIdx = slideIndex ? parseInt(slideIndex, 10) : 1
      if (found.index !== urlIdx) {
        navigate(`/slides/${found.index}`, { replace: true })
      }
    } else {
      // Le slide visé n'est plus dans la liste effective (par ex. on vient
      // de sortir du mode édition et le slide était masqué). On reste sur
      // celui qui s'affiche maintenant à la même position et on met à jour.
      intendedSlideIdRef.current = current.slide?.id ?? null
    }
  }, [slides, slideIndex, navigate, current.slide?.id])

  /**
   * Lisibilité multi-écrans (solution PÉRENNE, sans transform). La taille de
   * police RACINE — donc tout ce qui est en `rem` (texte ET espacements) ainsi
   * que les `clamp(..vw..)` — suit la HAUTEUR du viewport. Sur un grand écran
   * ou un projecteur haute résolution, le deck grossit proportionnellement et
   * reste lisible, SANS casser le layout responsive (qui s'adapte à n'importe
   * quel ratio : 16:9, 16:10, 21:9…) ni les diagrammes react-archer.
   *
   * ⚠️ NE PAS remplacer par un canevas mis à l'échelle via `transform: scale`
   * (façon reveal.js) : le `transform` se verrouille sur un ratio (bandes/coupure
   * sur 16:10 et 21:9) ET fausse `getBoundingClientRect`, ce qui DÉCONNECTE les
   * flèches react-archer (`FlowDiagram`) et les unités `vw` des titres. Le scaling
   * de la police racine est la seule approche qui scale le texte sans rien casser.
   *
   * Régler `FONT_DIVISOR` = régler le « zoom » global du deck (plus petit = plus
   * gros). Mobile (< md) : taille par défaut (flux scrollable). Scopé au deck
   * (restauré au démontage) pour ne pas affecter la landing.
   */
  useEffect(() => {
    const FONT_DIVISOR = 56
    const root = document.documentElement
    const previous = root.style.fontSize
    const apply = () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        const px = Math.max(16, Math.min(32, window.innerHeight / FONT_DIVISOR))
        root.style.fontSize = `${px}px`
      } else {
        root.style.fontSize = ''
      }
    }
    apply()
    window.addEventListener('resize', apply)
    window.addEventListener('orientationchange', apply)
    return () => {
      window.removeEventListener('resize', apply)
      window.removeEventListener('orientationchange', apply)
      root.style.fontSize = previous
    }
  }, [])

  /**
   * Navigation : en mode essentiel, on incrémente le step jusqu'à atteindre la
   * dernière étape, puis on passe au slide suivant. Hors mode essentiel ou
   * sur une slide sans version essentielle, on passe directement au slide suivant.
   */
  const goNext = useCallback(() => {
    if (isStepped && step < totalSteps - 1) {
      setStep((s) => s + 1)
    } else {
      goTo(current.index + 1)
    }
  }, [isStepped, step, totalSteps, goTo, current.index])

  const goPrev = useCallback(() => {
    if (isStepped && step > 0) {
      setStep((s) => s - 1)
    } else {
      goTo(current.index - 1)
    }
  }, [isStepped, step, goTo, current.index])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  /* --- Auto-hide UI en fullscreen --- */
  const revealUI = useCallback(() => {
    setUiVisible(true)
    if (idleTimer.current !== null) {
      window.clearTimeout(idleTimer.current)
    }
    idleTimer.current = window.setTimeout(() => {
      setUiVisible(false)
    }, UI_IDLE_MS)
  }, [])

  useEffect(() => {
    if (!isFullscreen) {
      // Hors fullscreen : UI toujours visible, aucun timer.
      if (idleTimer.current !== null) {
        window.clearTimeout(idleTimer.current)
        idleTimer.current = null
      }
      setUiVisible(true)
      return
    }
    // Entrée en fullscreen : on cache après delay.
    revealUI()
    return () => {
      if (idleTimer.current !== null) {
        window.clearTimeout(idleTimer.current)
        idleTimer.current = null
      }
    }
  }, [isFullscreen, revealUI])

  /* --- Keyboard --- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowUp') {
        // Seule touche qui fait reapparaitre l'UI en fullscreen.
        e.preventDefault()
        if (isFullscreen) revealUI()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(slides.length - 1)
      } else if (e.key === 'Escape') {
        if (document.fullscreenElement) document.exitFullscreen()
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      } else if (
        (e.key === 'e' || e.key === 'E') &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        e.preventDefault()
        toggleViewMode()
      } else if (
        (e.key === 'm' || e.key === 'M') &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        // M = toggle Mode édition de visibilité
        e.preventDefault()
        toggleEditingVisibility()
      } else if (
        (e.key === 'h' || e.key === 'H') &&
        editingVisibility &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        // H = toggle Hidden du slide courant (seulement en mode édition)
        e.preventDefault()
        if (current.slide?.id) toggleHidden(current.slide.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [
    goNext,
    goPrev,
    goTo,
    toggleFullscreen,
    isFullscreen,
    revealUI,
    toggleViewMode,
    slides.length,
    toggleEditingVisibility,
    editingVisibility,
    toggleHidden,
    current.slide?.id,
  ])

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  /* --- Swipe horizontal mobile — navigation précédent/suivant ---
   *
   * Heuristiques :
   * - Minimum 60 px de déplacement horizontal
   * - Horizontal doit dominer le vertical (facteur 1,3) pour ne pas
   *   interférer avec le scroll vertical du contenu
   * - Geste de moins de 800 ms (on distingue un flick d'un long drag)
   * - Un tap simple (dx ≈ 0) ne déclenche jamais de navigation
   *
   * Le listener est attaché à la zone de contenu slide, pas au root :
   * les barres top/bottom et leurs boutons restent insensibles au swipe.
   */
  useEffect(() => {
    const el = slideAreaRef.current
    if (!el) return
    let startX = 0
    let startY = 0
    let startT = 0
    let active = false

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      startT = Date.now()
      active = true
    }
    const onEnd = (e: TouchEvent) => {
      if (!active) return
      active = false
      const t = e.changedTouches[0]
      const dx = t.clientX - startX
      const dy = t.clientY - startY
      const dt = Date.now() - startT
      if (dt > 800) return
      if (Math.abs(dx) < 60) return
      if (Math.abs(dx) < Math.abs(dy) * 1.3) return
      if (dx < 0) goNext()
      else goPrev()
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend', onEnd, { passive: true })
    el.addEventListener('touchcancel', () => { active = false }, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend', onEnd)
    }
  }, [goNext, goPrev])

  // Choix du composant à rendre selon le mode actif.
  // En mode essentiel, on utilise `essentialComponent` s'il existe.
  // Sinon, fallback silencieux sur la version riche (slides titre/divider/Q&A).
  const RichComponent = current.slide.component
  const EssentialComponent = current.slide.essentialComponent

  const showUI = !isFullscreen || uiVisible
  const slideHasEssential = EssentialComponent !== undefined && !current.slide.isDivider

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-background text-foreground md:h-screen md:w-screen md:overflow-hidden">
      {/* Top bar — fixed pour rester visible pendant le scroll mobile */}
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-between gap-2 px-3 py-3 md:px-6 md:py-4 transition-all duration-500 ${
          showUI
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 opacity-0'
        }`}
      >
        {/* Brand masquée sur très petit écran pour dégager de la place */}
        <div className="pointer-events-auto hidden sm:block">
          <Brand />
        </div>
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border bg-background/70 px-3 py-1.5 text-xs font-mono text-muted-foreground backdrop-blur-md">
          <span className="font-bold text-foreground">
            {String(current.index + 1).padStart(2, '0')}
          </span>
          <span className="text-muted-foreground/50">/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
          {variant === 'light' && (
            <span className="ml-1.5 rounded-full bg-ilab-green/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-ilab-green">
              Light
            </span>
          )}
          {editingVisibility && (
            <span className="ml-1.5 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              {t('Édition', 'Editing')}
            </span>
          )}
          {!editingVisibility && hiddenIds.size > 0 && (
            <span
              className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground"
              title={t(`${hiddenIds.size} slide(s) masqué(s) · raccourci M`, `${hiddenIds.size} hidden slide(s) · shortcut M`)}
            >
              −{hiddenIds.size}
            </span>
          )}
          <span className="ml-2 hidden text-[10px] uppercase tracking-widest text-muted-foreground sm:inline">
            · {lang === 'en' && current.slide.phaseEn ? current.slide.phaseEn : current.slide.phase}
          </span>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Bouton de langue FR/EN (i18n) — voir src/meetup/i18n.tsx */}
          <Button
            variant="outline"
            className="h-9 gap-1.5 rounded-full px-3 text-xs font-bold backdrop-blur-md"
            onClick={toggleLang}
            aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            title={lang === 'fr' ? 'English version' : 'Version française'}
          >
            <Languages className="h-4 w-4" />
            {lang.toUpperCase()}
          </Button>
          <Button
            size="icon"
            variant="outline"
            className={`h-9 w-9 rounded-full backdrop-blur-md transition-colors ${
              viewMode === 'essential'
                ? 'border-ilab-green/60 bg-ilab-green/15 text-ilab-green hover:bg-ilab-green/25'
                : ''
            } ${!slideHasEssential && viewMode === 'rich' ? 'opacity-60' : ''}`}
            onClick={toggleViewMode}
            aria-label={
              viewMode === 'essential'
                ? t('Passer en mode complet (riche)', 'Switch to full (rich) mode')
                : t('Passer en mode essentiel (slides percutantes)', 'Switch to essential mode (punchy slides)')
            }
            title={
              viewMode === 'essential'
                ? t('Mode essentiel actif · Échap E pour repasser en mode complet', 'Essential mode on · Esc E to return to full mode')
                : slideHasEssential
                  ? t('Activer le mode essentiel · raccourci E', 'Enable essential mode · shortcut E')
                  : t("Cette slide n'a pas de version essentielle (raccourci E)", 'This slide has no essential version (shortcut E)')
            }
          >
            {viewMode === 'essential' ? (
              <Sparkles className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 rounded-full backdrop-blur-md"
            onClick={handleVariantSwitch}
            aria-label={
              variant === 'light'
                ? t('Passer au deck complet', 'Switch to the full deck')
                : t('Passer à la version light', 'Switch to the light version')
            }
            title={
              variant === 'light'
                ? t('Deck complet', 'Full deck')
                : t('Version light', 'Light version')
            }
          >
            {variant === 'light' ? (
              <Layers className="h-4 w-4" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
          </Button>

          {/* Mode édition de visibilité — toggle */}
          <Button
            size="icon"
            variant="outline"
            className={`h-9 w-9 rounded-full backdrop-blur-md transition-colors ${
              editingVisibility
                ? 'border-amber-500/60 bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 dark:text-amber-400'
                : ''
            }`}
            onClick={toggleEditingVisibility}
            aria-label={
              editingVisibility
                ? t('Sortir du mode édition de visibilité', 'Exit visibility editing mode')
                : t('Entrer en mode édition de visibilité', 'Enter visibility editing mode')
            }
            title={
              editingVisibility
                ? t('Mode édition actif · M pour sortir · H pour masquer/démasquer le slide courant', 'Editing mode on · M to exit · H to hide/show the current slide')
                : hiddenIds.size > 0
                  ? t(`Édition visibilité (M) · ${hiddenIds.size} slide(s) masqué(s)`, `Visibility editing (M) · ${hiddenIds.size} hidden slide(s)`)
                  : t('Édition visibilité · raccourci M', 'Visibility editing · shortcut M')
            }
          >
            {editingVisibility ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>

          {/* Bouton "Masquer / Démasquer ce slide" — visible uniquement en mode édition */}
          {editingVisibility && (
            <Button
              size="icon"
              variant="outline"
              className={`h-9 w-9 rounded-full backdrop-blur-md transition-colors ${
                isHidden(current.slide.id)
                  ? 'border-rose-500/60 bg-rose-500/15 text-rose-600 hover:bg-rose-500/25 dark:text-rose-400'
                  : ''
              }`}
              onClick={() => toggleHidden(current.slide.id)}
              aria-label={
                isHidden(current.slide.id)
                  ? t('Démasquer ce slide', 'Unhide this slide')
                  : t('Masquer ce slide', 'Hide this slide')
              }
              title={
                isHidden(current.slide.id)
                  ? t('Slide masqué · clic ou H pour démasquer', 'Hidden slide · click or H to unhide')
                  : t('Masquer ce slide · raccourci H', 'Hide this slide · shortcut H')
              }
            >
              {isHidden(current.slide.id) ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          )}

          {/* Reset — démasquer tous les slides, visible en mode édition s'il y a des hidden */}
          {editingVisibility && hiddenIds.size > 0 && (
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9 rounded-full backdrop-blur-md"
              onClick={clearHidden}
              aria-label={t('Démasquer tous les slides', 'Unhide all slides')}
              title={t(`Démasquer tous les slides (${hiddenIds.size} masqués)`, `Unhide all slides (${hiddenIds.size} hidden)`)}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 rounded-full backdrop-blur-md"
            onClick={toggleFullscreen}
            aria-label={t('Plein écran', 'Fullscreen')}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            asChild
            size="icon"
            variant="outline"
            className="h-9 w-9 rounded-full backdrop-blur-md"
          >
            <Link to="/" aria-label={t('Retour à la landing', 'Back to landing')}>
              <Home className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Slide content — scroll naturel sur mobile, plein écran sur desktop.
          Le padding top/bottom laisse de la place aux barres fixes.
          Le ref capture les swipe horizontaux pour la navigation mobile. */}
      <div
        ref={slideAreaRef}
        key={current.slide.id}
        className="relative flex flex-1 flex-col items-stretch pt-16 pb-28 animate-fade-up md:items-center md:justify-center md:pt-0 md:pb-0"
      >
        {/* Slide masquée : on dim le contenu réel */}
        <div
          className={`flex w-full flex-1 flex-col md:contents ${
            editingVisibility && isHidden(current.slide.id)
              ? 'pointer-events-none opacity-30 saturate-50'
              : ''
          }`}
        >
          {isEssentialActive && EssentialComponent ? (
            <EssentialComponent step={step} />
          ) : isProgressiveRich ? (
            // RichComponent attend une prop `step` quand progressive=true
            (() => {
              const Progressive = RichComponent as React.ComponentType<{
                step: number
              }>
              return <Progressive step={step} />
            })()
          ) : (
            <RichComponent />
          )}
        </div>

        {/* Overlay slide masqué — visuellement très flagrant.
            Cadre rouge épais, watermark diagonal, banner large fixé en haut. */}
        {editingVisibility && isHidden(current.slide.id) && (
          <>
            {/* Watermark diagonal MASQUÉ traversant tout le slide */}
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
              <span
                className="select-none font-black uppercase tracking-[0.2em] text-rose-500/25 [text-shadow:_0_2px_18px_rgba(244,63,94,0.18)]"
                style={{
                  transform: 'rotate(-14deg)',
                  fontSize: 'clamp(6rem, 18vw, 18rem)',
                  lineHeight: 0.85,
                }}
              >
                {t('Masqué', 'Hidden')}
              </span>
            </div>

            {/* Cadre rouge dashed autour de toute la zone slide */}
            <div className="pointer-events-none absolute inset-x-2 inset-y-16 z-20 rounded-2xl border-4 border-dashed border-rose-500/70 md:inset-y-2" />

            {/* Banner du haut — bien plus large et lisible */}
            <div className="pointer-events-none fixed inset-x-0 top-16 z-30 flex justify-center px-4 md:top-20">
              <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border-2 border-rose-500 bg-rose-500/15 px-5 py-3 shadow-lg shadow-rose-500/20 backdrop-blur-md">
                <EyeOff className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
                    {t('Slide masqué', 'Hidden slide')}
                  </span>
                  <span className="text-[11px] font-medium text-rose-700/80 dark:text-rose-300/80">
                    {t('Invisible hors mode édition · raccourci', 'Invisible outside editing mode · shortcut')}{' '}
                    <kbd className="rounded bg-rose-500/20 px-1 font-mono text-[10px]">H</kbd>{' '}
                    {t('pour démasquer', 'to unhide')}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom bar — fixed pour rester visible pendant le scroll mobile */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-20 flex flex-col gap-2 px-3 pb-3 md:gap-3 md:px-6 md:pb-6 transition-all duration-500 ${
          showUI
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'
        }`}
      >
        {/* Indicateur d'étapes (mode essentiel ou slide progressive · multi-step) */}
        {isStepped && totalSteps > 1 && (
          <div className="pointer-events-auto mx-auto flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                aria-label={t(`Étape ${i + 1} sur ${totalSteps}`, `Step ${i + 1} of ${totalSteps}`)}
                className={`h-2 rounded-full transition-all ${
                  i === step
                    ? 'w-8 bg-ilab-green'
                    : i < step
                      ? 'w-2 bg-ilab-green/50'
                      : 'w-2 bg-border hover:bg-muted-foreground/40'
                }`}
              />
            ))}
            <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {t('Étape', 'Step')} {step + 1} / {totalSteps}
            </span>
          </div>
        )}

        {/* Progress segments — masqués sur mobile (trop denses pour 73 slides).
            En mode édition, les slides masqués apparaissent avec un trait
            barré et une opacité réduite. */}
        <div className="pointer-events-auto mx-auto hidden w-full max-w-xl items-center justify-center gap-1.5 md:flex">
          {slides.map((s, i) => {
            const slideIsHidden = isHidden(s.id)
            return (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className={`relative h-1 flex-1 rounded-full transition-all ${
                  slideIsHidden
                    ? 'bg-rose-500/40 opacity-50'
                    : i === current.index
                      ? 'bg-ilab-green'
                      : i < current.index
                        ? 'bg-ilab-green/40'
                        : 'bg-border hover:bg-muted-foreground/40'
                }`}
                aria-label={t(`Aller au slide ${i + 1}${slideIsHidden ? ' (masqué)' : ''}`, `Go to slide ${i + 1}${slideIsHidden ? ' (hidden)' : ''}`)}
              >
                {slideIsHidden && (
                  <span className="pointer-events-none absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-rose-500" />
                )}
              </button>
            )
          })}
        </div>

        {/* Nav buttons */}
        <div className="pointer-events-auto flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-full backdrop-blur-md disabled:opacity-40"
            onClick={goPrev}
            disabled={current.index === 0}
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            {t('Précédent', 'Previous')}
          </Button>
          {/* Indicateur central — position sur mobile, hint clavier sur desktop */}
          <div className="flex-1 text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground md:hidden">
            {String(current.index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            {variant === 'light' && (
              <span className="ml-1.5 text-ilab-green">· Light</span>
            )}
            {viewMode === 'essential' && (
              <span className="ml-1.5 text-ilab-green">· {t('Essentiel', 'Essential')}</span>
            )}
          </div>
          <div className="hidden text-[10px] uppercase tracking-widest text-muted-foreground md:block">
            {editingVisibility
              ? t('Édition · H masquer/démasquer · M sortir · Flèches ← → naviguer', 'Editing · H hide/show · M exit · Arrows ← → navigate')
              : viewMode === 'essential'
                ? t('Flèches ← → étape · E mode complet · F plein écran · M édition', 'Arrows ← → step · E full mode · F fullscreen · M editing')
                : isFullscreen
                  ? t('Flèches ← → naviguer · ↑ afficher les contrôles · Échap quitter', 'Arrows ← → navigate · ↑ show controls · Esc exit')
                  : t('Flèches ← → · Espace · F plein écran · E essentiel · M édition', 'Arrows ← → · Space · F fullscreen · E essential · M editing')}
          </div>
          <Button
            size="sm"
            className="h-9 rounded-full bg-ilab-green text-white hover:bg-ilab-green/90 disabled:opacity-40"
            onClick={goNext}
            disabled={current.index === slides.length - 1}
          >
            Suivant
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Glossaire global — raccourci G, accessible partout */}
      <GlossaryPanel showPill={showUI} />

      {/* Sommaire / navigation — raccourci S.
          Le sommaire affiche TOUS les slides (visibles + masqués) avec un
          toggle eye par ligne. Si l'utilisateur clique un slide masqué, on
          le démasque automatiquement avant de naviguer. */}
      <TocPanel
        currentSlideId={current.slide?.id}
        onSelect={(id) => {
          if (hiddenIds.has(id)) {
            // Démasque + calcule le nouvel index dans la liste mise à jour
            toggleHidden(id)
            const visibleAfter = baseSlides.filter(
              (s) => s.id === id || !hiddenIds.has(s.id)
            )
            const newIdx = visibleAfter.findIndex((s) => s.id === id)
            if (newIdx >= 0) {
              intendedSlideIdRef.current = id
              navigate(`/slides/${newIdx + 1}`)
            }
          } else {
            const found = slides.find((s) => s.id === id)
            if (found) {
              intendedSlideIdRef.current = id
              navigate(`/slides/${found.index}`)
            }
          }
        }}
        showPill={showUI}
      />

      {/* Caméra présentateur globale — raccourci C · le bouton d'activation
           suit l'auto-hide UI, mais la caméra active reste visible en contenu */}
      <PresenterCamera showControls={showUI} />

    </div>
  )
}
