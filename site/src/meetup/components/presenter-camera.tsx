import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'motion/react'
import {
  Camera,
  CameraOff,
  Circle,
  GripHorizontal,
  Loader2,
  Square,
  Wand2,
  X,
} from 'lucide-react'
import {
  ImageSegmenter,
  FilesetResolver,
  type ImageSegmenterResult,
} from '@mediapipe/tasks-vision'

/**
 * PresenterCamera — affichage circulaire de la webcam du présentateur.
 *
 * - Bouton d'activation (getUserMedia · navigator.mediaDevices)
 * - Affichage circulaire (mask border-radius 50%)
 * - Vidéo mirror (transform scaleX(-1)) pour un rendu Zoom-like
 * - Draggable via motion/react (drag + dragMomentum)
 * - Bouton X pour fermer / arrêter le stream
 * - Raccourci clavier `C` pour toggle la caméra
 * - Fallback propre en cas de refus de permission
 *
 * Usage :
 *   <PresenterCamera size={200} initialPosition={{ x: -40, y: -40 }} />
 *
 * Sécurité : le stream est arrêté proprement sur unmount et sur close.
 */

interface PresenterCameraProps {
  /** Taille initiale du cercle en pixels. Défaut 200. */
  size?: number
  /** Position initiale par rapport au coin bas-droit · en px. */
  initialPosition?: { x: number; y: number }
  /**
   * Bouton d'activation visible ou masqué (suit l'auto-hide de l'UI du deck).
   * N'affecte PAS le cercle actif · une caméra lancée reste visible même
   * quand l'UI du deck est masquée, car c'est du contenu.
   */
  showControls?: boolean
}

type Status = 'idle' | 'starting' | 'active' | 'error' | 'denied'

const MIN_SIZE = 120
const MAX_SIZE = 480
const SIZE_STEP = 20
const STORAGE_KEY = 'presenter-camera-size'
const SHAPE_STORAGE_KEY = 'presenter-camera-shape'
const BG_REMOVAL_STORAGE_KEY = 'presenter-camera-bg-removal'

type Shape = 'circle' | 'square'

// URL CDN du modèle MediaPipe Selfie Segmenter
const SEGMENTER_MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite'
const MEDIAPIPE_WASM_URL =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/wasm'

export function PresenterCamera({
  size: initialSize = 200,
  initialPosition = { x: -40, y: -40 },
  showControls = true,
}: PresenterCameraProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  // Taille mutable · persistée en localStorage pour retrouver
  // la préférence du présentateur entre les sessions.
  const [size, setSize] = useState<number>(() => {
    if (typeof window === 'undefined') return initialSize
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const n = parseInt(saved, 10)
      if (!Number.isNaN(n) && n >= MIN_SIZE && n <= MAX_SIZE) return n
    }
    return initialSize
  })
  const [showSizeIndicator, setShowSizeIndicator] = useState(false)
  const sizeIndicatorTimer = useRef<number | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  // Zone de contrainte pour le drag · couvre l'intégralité du viewport
  // pour que le cercle/carré ne puisse pas sortir de l'écran.
  const constraintsRef = useRef<HTMLDivElement | null>(null)

  // Forme · rond ou carré · persistée aussi en localStorage
  const [shape, setShape] = useState<Shape>(() => {
    if (typeof window === 'undefined') return 'circle'
    const saved = window.localStorage.getItem(SHAPE_STORAGE_KEY)
    return saved === 'square' ? 'square' : 'circle'
  })

  const changeShape = (next: Shape) => {
    setShape(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SHAPE_STORAGE_KEY, next)
    }
  }

  // Effet fond vert · segmentation IA (MediaPipe Selfie Segmenter)
  // Persisté en localStorage · le modèle est chargé en lazy au 1er toggle.
  const [bgRemoval, setBgRemoval] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(BG_REMOVAL_STORAGE_KEY) === 'true'
  })
  const [segmenterReady, setSegmenterReady] = useState(false)
  const [segmenterLoading, setSegmenterLoading] = useState(false)
  const segmenterRef = useRef<ImageSegmenter | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  // Flag pour éviter de relancer le chargement du modèle plusieurs fois
  // (on ne peut pas mettre segmenterLoading dans les deps sans boucle).
  const loadingStartedRef = useRef(false)

  const toggleBgRemoval = () => {
    setBgRemoval((prev) => {
      const next = !prev
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(BG_REMOVAL_STORAGE_KEY, String(next))
      }
      return next
    })
  }

  // Charge le modèle MediaPipe · lazy · une seule fois
  // IMPORTANT : deps = [bgRemoval] uniquement. Si on met `segmenterLoading`
  // dans les deps, setSegmenterLoading(true) re-trigger l'effet, son cleanup
  // pose `cancelled = true`, et le segmenter est fermé dès sa création.
  useEffect(() => {
    if (!bgRemoval) return
    if (segmenterRef.current || loadingStartedRef.current) return
    loadingStartedRef.current = true
    setSegmenterLoading(true)
    let cancelled = false
    ;(async () => {
      try {
        const fileset = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM_URL)
        const segmenter = await ImageSegmenter.createFromOptions(fileset, {
          baseOptions: {
            modelAssetPath: SEGMENTER_MODEL_URL,
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          outputCategoryMask: true,
          outputConfidenceMasks: false,
        })
        if (cancelled) {
          segmenter.close()
          return
        }
        segmenterRef.current = segmenter
        setSegmenterReady(true)
      } catch (err) {
        loadingStartedRef.current = false
        // eslint-disable-next-line no-console
        console.warn('[PresenterCamera] segmenter load failed:', err)
      } finally {
        setSegmenterLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [bgRemoval])

  // Boucle rAF · compose chaque frame dans le canvas quand bgRemoval actif
  useEffect(() => {
    if (!bgRemoval || !segmenterReady || status !== 'active') {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      return
    }
    const video = videoRef.current
    const canvas = canvasRef.current
    const segmenter = segmenterRef.current
    if (!video || !canvas || !segmenter) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let lastTs = -1

    const render = () => {
      if (video.readyState < 2 || video.videoWidth === 0) {
        rafRef.current = requestAnimationFrame(render)
        return
      }
      // Ajuste la taille du canvas au flux vidéo (traitement en résolution
      // native · l'échelle visuelle est faite en CSS).
      if (
        canvas.width !== video.videoWidth ||
        canvas.height !== video.videoHeight
      ) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
      }

      const ts = performance.now()
      if (ts === lastTs) {
        rafRef.current = requestAnimationFrame(render)
        return
      }
      lastTs = ts

      segmenter.segmentForVideo(
        video,
        ts,
        (result: ImageSegmenterResult) => {
          const mask = result.categoryMask
          if (!mask) {
            result.close?.()
            return
          }
          const maskData = mask.getAsUint8Array()
          const w = mask.width
          const h = mask.height

          // 1. Dessine la vidéo (non miroir ici · on gère le miroir en CSS)
          ctx.save()
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          // 2. Récupère les pixels pour appliquer le masque
          const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = frame.data
          // Le masque peut être d'une résolution différente · mais MediaPipe
          // Selfie Segmenter retourne par défaut la même résolution que l'entrée.
          // Valeur 0 = personne · valeur 255 = fond (selfie_segmenter).
          if (w === canvas.width && h === canvas.height) {
            for (let i = 0; i < maskData.length; i++) {
              // 0 = personne → garde la vidéo · sinon alpha = 0 (transparent)
              if (maskData[i] > 0) {
                data[i * 4 + 3] = 0
              }
            }
          } else {
            // Fallback rescale · nearest neighbor
            for (let y = 0; y < canvas.height; y++) {
              const sy = Math.floor((y * h) / canvas.height)
              for (let x = 0; x < canvas.width; x++) {
                const sx = Math.floor((x * w) / canvas.width)
                if (maskData[sy * w + sx] > 0) {
                  data[(y * canvas.width + x) * 4 + 3] = 0
                }
              }
            }
          }
          ctx.putImageData(frame, 0, 0)
          ctx.restore()
          result.close?.()
        },
      )
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [bgRemoval, segmenterReady, status])

  // Cleanup segmenter à l'unmount
  useEffect(() => {
    return () => {
      if (segmenterRef.current) {
        segmenterRef.current.close()
        segmenterRef.current = null
      }
    }
  }, [])

  // Motion values contrôlés pour drag · nous permet de compenser la
  // position au resize pour que le cercle grandisse depuis son CENTRE
  // (sinon il grandirait depuis le coin bottom-right qui est l'ancre CSS).
  const dragX = useMotionValue(initialPosition.x)
  const dragY = useMotionValue(initialPosition.y)

  // Démarre le stream — on stocke en state pour que l'effet d'attachement
  // ci-dessous puisse binder srcObject une fois la <video> dans le DOM.
  const start = async () => {
    if (status === 'starting' || status === 'active') return
    setStatus('starting')
    setErrorMsg(null)
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
        audio: false,
      })
      setStream(newStream)
      setStatus('active')
    } catch (err) {
      const name = (err as Error).name
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        setStatus('denied')
        setErrorMsg('Permission caméra refusée')
      } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        setStatus('error')
        setErrorMsg('Aucune caméra détectée')
      } else {
        setStatus('error')
        setErrorMsg((err as Error).message || 'Erreur caméra')
      }
    }
  }

  // Arrête proprement le stream
  const stop = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop())
    }
    setStream(null)
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setStatus('idle')
    setErrorMsg(null)
  }

  // Attache le stream à l'élément <video> DÈS QU'IL APPARAIT dans le DOM.
  // C'est la seule façon de garantir que videoRef.current n'est pas null
  // (il ne l'est qu'après le premier render en status 'active').
  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl || !stream) return
    videoEl.srcObject = stream
    // Force la lecture · autoplay peut être bloqué sur certaines plateformes
    const playPromise = videoEl.play()
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch((err) => {
        // eslint-disable-next-line no-console
        console.warn('[PresenterCamera] video.play() failed:', err)
      })
    }
  }, [stream, status])

  // Nettoyage à la désincription · stoppe le stream courant
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Affiche brièvement l'indicateur de taille
  const flashSizeIndicator = (persist = true) => {
    setShowSizeIndicator(true)
    if (!persist) return
    if (sizeIndicatorTimer.current) {
      window.clearTimeout(sizeIndicatorTimer.current)
    }
    sizeIndicatorTimer.current = window.setTimeout(
      () => setShowSizeIndicator(false),
      1000,
    )
  }

  /**
   * Resize depuis le CENTRE · compense la position du drag pour que le
   * cercle grandisse / rétrécisse de manière symétrique autour du centre,
   * peu importe l'ancre CSS (bottom-right dans notre cas).
   *
   * Le cercle est ancré en bottom-right · quand sa taille augmente de delta,
   * son bord haut-gauche part vers l'extérieur (up-left). Pour que le centre
   * reste fixe, on déplace la motion.div de +delta/2 en x et en y (c'est-à-dire
   * vers le bas-droite, vers l'ancre, pour compenser le glissement).
   */
  const resize = (delta: number) => {
    setSize((prev) => {
      const next = Math.round(
        Math.max(MIN_SIZE, Math.min(MAX_SIZE, prev + delta)),
      )
      const change = next - prev
      if (change !== 0) {
        dragX.set(dragX.get() + change / 2)
        dragY.set(dragY.get() + change / 2)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(STORAGE_KEY, String(next))
        }
      }
      return next
    })
    flashSizeIndicator()
  }

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (status !== 'active') return
    e.preventDefault()
    const delta = e.deltaY < 0 ? SIZE_STEP : -SIZE_STEP
    resize(delta)
  }

  // Drag-to-resize via la poignée bas-droite · compense aussi la position
  // en continu pour un resize homogène depuis le centre.
  const startResize = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const startSize = size
    const startDragX = dragX.get()
    const startDragY = dragY.get()
    let latestSize = startSize

    setShowSizeIndicator(true)
    if (sizeIndicatorTimer.current) {
      window.clearTimeout(sizeIndicatorTimer.current)
      sizeIndicatorTimer.current = null
    }

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      // Poignée en bas-droite · déplacement diagonale vers l'extérieur = agrandir
      const delta = (dx + dy) / 2
      latestSize = Math.round(
        Math.max(MIN_SIZE, Math.min(MAX_SIZE, startSize + delta)),
      )
      // Compensation de position pour growth depuis le centre
      const sizeChange = latestSize - startSize
      dragX.set(startDragX + sizeChange / 2)
      dragY.set(startDragY + sizeChange / 2)
      setSize(latestSize)
    }

    const onUp = () => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, String(latestSize))
      }
      sizeIndicatorTimer.current = window.setTimeout(
        () => setShowSizeIndicator(false),
        1000,
      )
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  // Raccourci clavier `C` pour toggle · `+` / `-` pour resize
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }
      if (
        (e.key === 'c' || e.key === 'C') &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        e.preventDefault()
        if (status === 'active') {
          stop()
        } else if (status === 'idle' || status === 'error' || status === 'denied') {
          start()
        }
        return
      }
      // Resize via +/- uniquement quand la caméra est active
      if (status === 'active') {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault()
          resize(SIZE_STEP)
        } else if (e.key === '-' || e.key === '_') {
          e.preventDefault()
          resize(-SIZE_STEP)
        }
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  // Cleanup timer indicateur à l'unmount
  useEffect(() => {
    return () => {
      if (sizeIndicatorTimer.current) {
        window.clearTimeout(sizeIndicatorTimer.current)
      }
    }
  }, [])

  const isActive = status === 'active'
  const isLoading = status === 'starting'

  return (
    <>
      {/* Bouton d'activation · pilule fixe alignée sur Glossaire/Sommaire
          · placée à gauche de Glossaire · suit l'auto-hide UI. */}
      {!isActive && !isLoading && (
        <button
          type="button"
          onClick={start}
          aria-label="Activer la caméra présentateur (C)"
          className={`group fixed bottom-20 right-[9.5rem] z-[90] hidden items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-bold text-muted-foreground shadow-md backdrop-blur-md transition-all duration-500 hover:border-ilab-green/50 hover:bg-ilab-green/10 hover:text-ilab-green md:flex ${
            showControls
              ? 'translate-y-0 opacity-80'
              : 'pointer-events-none translate-y-4 opacity-0'
          }`}
        >
          <Camera className="h-3.5 w-3.5" />
          Caméra
          <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">
            C
          </kbd>
          {errorMsg && (
            <span className="ml-1 text-[10px] font-medium text-rose-500">
              · {errorMsg}
            </span>
          )}
        </button>
      )}

    <div
      ref={constraintsRef}
      className={`pointer-events-none fixed inset-0 z-[60] ${
        isActive || isLoading ? '' : 'hidden'
      }`}
    >
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
      className="group pointer-events-auto absolute bottom-0 right-0 select-none"
      style={{ touchAction: 'none', x: dragX, y: dragY }}
    >
      {isLoading && (
        <div
          className="flex items-center justify-center rounded-full border-4 border-ilab-green/40 bg-card/80 backdrop-blur-md"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <Loader2 className="h-8 w-8 animate-spin text-ilab-green" />
        </div>
      )}

      {isActive && (
        <div
          className="relative"
          style={{ width: `${size}px`, height: `${size}px` }}
          onWheel={handleWheel}
        >
          {/* Cadre vidéo · forme dynamique rond / carré · sans bordure
              · en mode fond transparent, pas de shadow (sinon halo carré visible) */}
          <div
            className={`relative overflow-hidden transition-[border-radius] duration-300 ease-out ${
              bgRemoval ? '' : 'shadow-2xl'
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              cursor: 'grab',
              borderRadius: bgRemoval
                ? '0'
                : shape === 'circle'
                  ? '50%'
                  : '16px',
            }}
          >
            {/* Vidéo · cachée quand bgRemoval actif (remplacée par le canvas) */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
              style={{
                transform: 'scaleX(-1)',
                display: bgRemoval ? 'none' : 'block',
              }}
            />
            {/* Canvas de segmentation · personne isolée sur fond vert */}
            {bgRemoval && (
              <canvas
                ref={canvasRef}
                className="h-full w-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />
            )}
            {/* Overlay de chargement du modèle MediaPipe */}
            {bgRemoval && segmenterLoading && !segmenterReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70 text-xs font-bold text-muted-foreground backdrop-blur-sm">
                <Loader2 className="h-5 w-5 animate-spin text-ilab-green" />
                <span>Chargement IA…</span>
              </div>
            )}
          </div>

          {/* Switch forme & fond vert · icônes à gauche · apparait au hover */}
          <div className="absolute left-0 top-1/2 flex -translate-x-full -translate-y-1/2 flex-col gap-1 pr-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => changeShape('circle')}
              aria-label="Forme ronde"
              className={`flex h-7 w-7 items-center justify-center rounded-full border shadow-md backdrop-blur-md transition-all ${
                shape === 'circle'
                  ? 'bg-ilab-green text-white'
                  : 'bg-background/80 text-muted-foreground hover:bg-muted'
              }`}
            >
              <Circle className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => changeShape('square')}
              aria-label="Forme carrée"
              className={`flex h-7 w-7 items-center justify-center rounded-full border shadow-md backdrop-blur-md transition-all ${
                shape === 'square'
                  ? 'bg-ilab-green text-white'
                  : 'bg-background/80 text-muted-foreground hover:bg-muted'
              }`}
            >
              <Square className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={toggleBgRemoval}
              aria-label="Basculer fond vert (IA)"
              title="Fond vert · segmentation IA"
              className={`flex h-7 w-7 items-center justify-center rounded-full border shadow-md backdrop-blur-md transition-all ${
                bgRemoval
                  ? 'bg-[#00b140] text-white'
                  : 'bg-background/80 text-muted-foreground hover:bg-muted'
              }`}
            >
              <Wand2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Bouton fermer */}
          <button
            type="button"
            onClick={stop}
            aria-label="Éteindre la caméra"
            className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border bg-background/80 text-muted-foreground opacity-0 shadow-md backdrop-blur-md transition-all hover:bg-rose-500 hover:text-white group-hover:opacity-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Poignée resize · drag diagonal depuis le bas-droite */}
          <div
            onPointerDown={startResize}
            role="button"
            aria-label="Redimensionner la caméra"
            tabIndex={0}
            className="absolute z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-background/80 text-muted-foreground opacity-0 shadow-md backdrop-blur-md transition-all hover:bg-ilab-green hover:text-white group-hover:opacity-100"
            style={{
              // Position à 45° sur le bord bas-droite du cercle
              // Rayon = size/2 · on place la poignée légèrement à l'extérieur
              bottom: `${size / 2 - (size / 2) * Math.cos(Math.PI / 4) - 12}px`,
              right: `${size / 2 - (size / 2) * Math.cos(Math.PI / 4) - 12}px`,
              cursor: 'nwse-resize',
              touchAction: 'none',
            }}
          >
            <GripHorizontal
              className="h-3.5 w-3.5"
              style={{ transform: 'rotate(-45deg)' }}
            />
          </div>

          {/* Indicateur de taille · apparait pendant 1 s après un resize */}
          {showSizeIndicator && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute -top-8 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-ilab-green px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-md"
            >
              {size} px
            </motion.div>
          )}

          {/* Pilule drag + scroll hint · apparait au hover */}
          <div className="pointer-events-none absolute -bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-background/80 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground opacity-0 shadow-md backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <span>Glisser</span>
            <span className="text-muted-foreground/40">·</span>
            <span>Molette</span>
            <span className="text-muted-foreground/40">·</span>
            <kbd className="rounded bg-muted px-1 font-mono text-[9px] text-foreground">+</kbd>
            <kbd className="rounded bg-muted px-1 font-mono text-[9px] text-foreground">−</kbd>
          </div>
        </div>
      )}
    </motion.div>
    </div>
    </>
  )
}

/**
 * Indicateur compact qui indique à l'utilisateur qu'il peut activer la caméra
 * via `C`. À placer en pilule discrete dans l'UI de la slide.
 */
interface CameraHintProps {
  className?: string
}

export function CameraHint({ className }: CameraHintProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground backdrop-blur-md ${className ?? ''}`}
    >
      <CameraOff className="h-3 w-3" />
      Caméra présentateur
      <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[9px]">C</kbd>
    </div>
  )
}
