import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { buildArcSegments, llToVec, project, type LatLng } from './pulse-globe-geo'
import { useIsDark } from '@/hooks/use-is-dark'

/**
 * Globe terrestre 3D interactif (cobe) — renderer de la capacité « éléments 3D ».
 *
 * cobe inline sa carte du monde en base64 : AUCUN fetch réseau, 100 % offline.
 * Caractéristiques :
 *  - rotation automatique continue + drag souris/tactile (les deux cohabitent :
 *    l'auto reprend depuis la position relâchée) ;
 *  - survol des marqueurs → tooltip (overlays HTML projetés au pixel via la
 *    projection interne de cobe, cf. `pulse-globe-geo.ts`) ;
 *  - arcs longs découpés en sous-arcs pour épouser la surface au lieu de la
 *    traverser ;
 *  - taille adaptative (ResizeObserver) et couleurs configurables en props.
 *
 * En cobe v2, `onRender` n'existe plus → la rotation est pilotée par une boucle
 * RAF maison via `globe.update({ phi, theta })`. Toujours chargé en `React.lazy`
 * derrière `Scene3DSlot` (chunk 3D isolé du 1er paint des slides 2D).
 */

// #00bb7f (--ilab-green) en RGB normalisé 0-1.
const ILAB_GREEN: [number, number, number] = [0, 0.733, 0.498]

// Palettes par défaut adaptatives — points plus clairs + glow plus marqué en
// thème sombre (pour ressortir sur fond foncé), points sombres en thème clair.
const PALETTE_DARK = {
  base: [0.34, 0.38, 0.44] as [number, number, number],
  glow: [0.0, 0.34, 0.24] as [number, number, number],
  mapBrightness: 7,
}
const PALETTE_LIGHT = {
  base: [0.2, 0.23, 0.27] as [number, number, number],
  glow: [0.06, 0.18, 0.14] as [number, number, number],
  mapBrightness: 5,
}

const MARKER_ELEVATION = 0
const THETA_CLAMP = 1.3 // < π/2 : ne retourne jamais le globe
const PHI_PER_PX = 1 / 320 // sensibilité horizontale du drag
const THETA_PER_PX = 1 / 480 // sensibilité verticale du drag
const SMOOTH = 0.12 // lissage (lerp exponentiel par frame)

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
/** Plus court chemin angulaire de a vers b (rad), dans [-π, π]. */
const shortestAngle = (a: number, b: number) => Math.atan2(Math.sin(b - a), Math.cos(b - a))
const FOCUS_EASE = 0.085
const DEFAULT_THETA = 0.28

export interface GlobeMarker {
  id: string
  location: LatLng
  size?: number
  /** Titre du tooltip (ex: ville). */
  label?: string
  /** Sous-titre du tooltip (ex: accroche de la news). */
  detail?: string
  isHub?: boolean
}

export interface GlobeArcSpec {
  from: LatLng
  to: LatLng
  id?: string
}

export interface GlobeColors {
  base?: [number, number, number]
  marker?: [number, number, number]
  glow?: [number, number, number]
  arc?: [number, number, number]
}

interface PulseGlobeProps {
  markers: GlobeMarker[]
  arcs?: GlobeArcSpec[]
  colors?: GlobeColors
  /** Vitesse de rotation automatique (rad/frame, 0 = figé hors drag). */
  speed?: number
  /** Hauteur globale des arcs (cf. découpe des arcs longs). */
  arcHeight?: number
  /** Force le thème du globe (sinon auto-détecté via la classe `.dark`). */
  dark?: boolean
  /** Amène ce point [lat,lng] face caméra (pause l'auto-rotation). null = libre. */
  focus?: LatLng | null
  className?: string
}

export function PulseGlobe({
  markers,
  arcs = [],
  colors,
  speed = 0.004,
  arcHeight = 0.32,
  dark,
  focus,
  className,
}: PulseGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hotspotRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const autoDark = useIsDark()
  const isDark = dark ?? autoDark

  // `focus` piloté par ref : changer de cible ne recrée pas le globe.
  const focusRef = useRef<LatLng | null>(focus ?? null)
  useEffect(() => {
    focusRef.current = focus ?? null
  }, [focus])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = container.clientWidth || 600
    let height = container.clientHeight || width

    const palette = isDark ? PALETTE_DARK : PALETTE_LIGHT
    const baseColor = colors?.base ?? palette.base
    const markerColor = colors?.marker ?? ILAB_GREEN
    const glowColor = colors?.glow ?? palette.glow
    const arcColor = colors?.arc ?? ILAB_GREEN

    // découpe les arcs longs (sinon ils traversent la sphère)
    const cobeArcs = arcs.flatMap((a, i) =>
      buildArcSegments(a.from, a.to, { id: a.id ?? `arc-${i}` }).map((seg) => ({
        from: seg.from,
        to: seg.to,
      })),
    )

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: height * dpr,
      phi: 0,
      theta: 0.28,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 14000,
      mapBrightness: palette.mapBrightness,
      baseColor,
      markerColor,
      glowColor,
      markers: markers.map((m) => ({ location: m.location, size: m.size ?? 0.05 })),
      arcs: cobeArcs,
      arcColor,
      arcWidth: 0.6,
      arcHeight,
      markerElevation: MARKER_ELEVATION,
    })

    // ─── rotation : auto-rotation + drag souris/tactile + focus ───
    let autoPhi = 4.1 // démarrage centré sur l'Europe / l'Atlantique
    let thetaBase = DEFAULT_THETA
    let targetDragPhi = 0
    let targetDragTheta = 0
    let dragPhi = 0
    let dragTheta = 0

    let pointerId: number | null = null
    let startX = 0
    let startY = 0
    let startDragPhi = 0
    let startDragTheta = 0

    const onPointerDown = (e: PointerEvent) => {
      pointerId = e.pointerId
      container.setPointerCapture(pointerId)
      startX = e.clientX
      startY = e.clientY
      startDragPhi = targetDragPhi
      startDragTheta = targetDragTheta
      container.style.cursor = 'grabbing'
    }
    const onPointerMove = (e: PointerEvent) => {
      if (pointerId === null) return
      targetDragPhi = startDragPhi + (e.clientX - startX) * PHI_PER_PX
      // + : glisser vers le bas incline le globe vers le bas (sens naturel)
      targetDragTheta = startDragTheta + (e.clientY - startY) * THETA_PER_PX
    }
    const endDrag = () => {
      if (pointerId !== null && container.hasPointerCapture(pointerId)) {
        container.releasePointerCapture(pointerId)
      }
      pointerId = null
      container.style.cursor = 'grab'
    }

    container.style.cursor = 'grab'
    container.addEventListener('pointerdown', onPointerDown)
    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerup', endDrag)
    container.addEventListener('pointerleave', endDrag)
    container.addEventListener('pointercancel', endDrag)

    // ─── taille adaptative ───
    const ro = new ResizeObserver(() => {
      width = container.clientWidth || width
      height = container.clientHeight || height
      globe.update({ width: width * dpr, height: height * dpr })
    })
    ro.observe(container)

    // ─── boucle de rendu ───
    let frame = requestAnimationFrame(function tick() {
      const f = focusRef.current
      if (f && pointerId === null) {
        // amène le point ciblé face caméra (3e ligne de la matrice de vue cobe)
        const u = llToVec(f[0], f[1])
        autoPhi += shortestAngle(autoPhi, Math.atan2(-u[0], u[2])) * FOCUS_EASE
        thetaBase += (clamp(Math.asin(u[1]), -THETA_CLAMP, THETA_CLAMP) - thetaBase) * FOCUS_EASE
      } else {
        if (pointerId === null) autoPhi += speed
        thetaBase += (DEFAULT_THETA - thetaBase) * SMOOTH
      }
      dragPhi += (targetDragPhi - dragPhi) * SMOOTH
      dragTheta += (targetDragTheta - dragTheta) * SMOOTH
      const phi = autoPhi + dragPhi
      const theta = clamp(thetaBase + dragTheta, -THETA_CLAMP, THETA_CLAMP)
      globe.update({ phi, theta })

      // repositionne les hotspots HTML sur les marqueurs rendus
      for (const m of markers) {
        const el = hotspotRefs.current[m.id]
        if (!el) continue
        const p = project(m.location[0], m.location[1], phi, theta, {
          dpr,
          markerElevation: MARKER_ELEVATION,
          cssW: width,
          cssH: height,
        })
        el.style.transform = `translate(${p.x * width}px, ${p.y * height}px) translate(-50%, -50%)`
        el.style.opacity = p.visible ? '1' : '0'
        el.style.pointerEvents = p.visible ? 'auto' : 'none'
      }
      frame = requestAnimationFrame(tick)
    })

    // fade-in une fois la première frame prête (évite le flash du canvas noir)
    const reveal = window.setTimeout(() => {
      canvas.style.opacity = '1'
    }, 0)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(reveal)
      ro.disconnect()
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerup', endDrag)
      container.removeEventListener('pointerleave', endDrag)
      container.removeEventListener('pointercancel', endDrag)
      // `destroy()` suffit ; on NE force PAS WEBGL_lose_context (casserait le
      // remontage StrictMode, et Aurora.tsx ne le fait pas non plus).
      globe.destroy()
    }
  }, [markers, arcs, colors, speed, arcHeight, isDark])

  return (
    <div
      ref={containerRef}
      className={`relative ${className ?? ''}`}
      style={{ touchAction: 'none' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          opacity: 0,
          transition: 'opacity 0.7s ease',
        }}
      />

      {/* overlays de hover, repositionnés chaque frame par la boucle RAF.
          Pas d'overflow-hidden : les tooltips débordent volontiers du globe.
          Les hotspots arrière sont masqués via opacity/pointer-events. */}
      <div className="pointer-events-none absolute inset-0">
        {markers.map((m) => (
          <div
            key={m.id}
            ref={(el) => {
              hotspotRefs.current[m.id] = el
            }}
            className="group absolute left-0 top-0"
            style={{ opacity: 0, transform: 'translate(-9999px, -9999px)' }}
          >
            {/* zone de survol + halo au hover */}
            <span
              className={`block cursor-pointer rounded-full ring-1 ring-ilab-green/40 transition group-hover:ring-2 group-hover:ring-ilab-green ${
                m.isHub ? 'h-7 w-7 bg-ilab-green/15' : 'h-5 w-5 bg-ilab-green/0 group-hover:bg-ilab-green/10'
              }`}
            />
            {/* tooltip (suit le hotspot, masqué hors hover) */}
            {(m.label || m.detail) && (
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden w-max max-w-[14rem] -translate-x-1/2 rounded-lg border border-ilab-green/30 bg-background/95 px-3 py-2 text-left shadow-lg backdrop-blur group-hover:block">
                {m.label && (
                  <div className="text-sm font-bold text-foreground">{m.label}</div>
                )}
                {m.detail && (
                  <div className="text-xs leading-snug text-muted-foreground">{m.detail}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
