/**
 * Helpers géométriques pour le globe cobe — transcription fidèle des fonctions
 * internes de cobe v2.0.1 (lues dans `node_modules/cobe/dist/index.esm.js` :
 * `U` lat/lng→3D, `O` projection écran, `W` placement marqueur).
 *
 * Deux usages :
 *  - `project()` : positionner des overlays HTML (hotspots de hover) PILE sur
 *    les marqueurs rendus par cobe, alignés au pixel ;
 *  - `buildArcSegments()` : découper un arc trop long en sous-arcs le long du
 *    grand cercle, car un arc cobe (Bézier quadratique à 1 point de contrôle)
 *    traverse la sphère au-delà de ~145° de séparation angulaire.
 */

export type LatLng = [number, number]

/** Rayon du globe en espace clip (constante `ee` du source cobe). */
export const GLOBE_RADIUS = 0.8

/** lat/lng (degrés) → vecteur unitaire 3D, convention texture de cobe (fn `U`). */
export function llToVec(lat: number, lng: number): [number, number, number] {
  const r = (lat * Math.PI) / 180
  const a = (lng * Math.PI) / 180 - Math.PI
  const o = Math.cos(r)
  return [-o * Math.cos(a), Math.sin(r), o * Math.sin(a)]
}

/** Inverse de `llToVec` (atan2 cohérent avec la convention de cobe). */
export function vecToLl([x, y, z]: [number, number, number]): LatLng {
  const lat = (Math.asin(Math.max(-1, Math.min(1, y))) * 180) / Math.PI
  const lng = ((Math.atan2(z, -x) + Math.PI) * 180) / Math.PI
  return [lat, ((lng + 540) % 360) - 180]
}

/** Séparation angulaire (degrés) entre deux points. */
export function angularSepDeg(a: LatLng, b: LatLng): number {
  const va = llToVec(a[0], a[1])
  const vb = llToVec(b[0], b[1])
  const d = Math.max(-1, Math.min(1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]))
  return (Math.acos(d) * 180) / Math.PI
}

/** Interpolation sphérique (slerp) entre deux vecteurs unitaires. */
function slerp(
  p: [number, number, number],
  q: [number, number, number],
  t: number,
): [number, number, number] {
  const d = Math.max(-1, Math.min(1, p[0] * q[0] + p[1] * q[1] + p[2] * q[2]))
  const om = Math.acos(d)
  if (om < 1e-6) return p
  const s = Math.sin(om)
  const k0 = Math.sin((1 - t) * om) / s
  const k1 = Math.sin(t * om) / s
  return [k0 * p[0] + k1 * q[0], k0 * p[1] + k1 * q[1], k0 * p[2] + k1 * q[2]]
}

export interface CobeArcSegment {
  from: LatLng
  to: LatLng
  id: string
}

/**
 * Découpe un trajet `from → to` en sous-arcs le long du grand cercle, chacun
 * d'une séparation ≤ `maxSubSepDeg`. Avec un `arcHeight` global modéré (~0.3),
 * chaque sous-arc dégage la surface → la guirlande épouse le globe au lieu de
 * le traverser. Un trajet court (< maxSubSepDeg) reste un seul arc.
 */
export function buildArcSegments(
  from: LatLng,
  to: LatLng,
  opts: { id: string; maxSubSepDeg?: number },
): CobeArcSegment[] {
  const maxSep = opts.maxSubSepDeg ?? 65
  const sep = angularSepDeg(from, to)
  const n = Math.max(1, Math.ceil(sep / maxSep))
  if (n === 1) return [{ from, to, id: opts.id }]
  const va = llToVec(from[0], from[1])
  const vb = llToVec(to[0], to[1])
  const pts: LatLng[] = []
  for (let i = 0; i <= n; i++) pts.push(vecToLl(slerp(va, vb, i / n)))
  const segs: CobeArcSegment[] = []
  for (let i = 0; i < n; i++) {
    segs.push({ from: pts[i], to: pts[i + 1], id: `${opts.id}-${i}` })
  }
  return segs
}

export interface ProjectOpts {
  scale?: number
  offset?: [number, number]
  dpr?: number
  markerElevation?: number
  cssW: number
  cssH: number
}

export interface ProjectResult {
  x: number
  y: number
  visible: boolean
}

/**
 * Projette un marqueur [lat, lng] en coordonnées écran (fraction [0,1] du
 * canvas), pour la rotation phi/theta courante. Transcription 1:1 des fonctions
 * `O`/`W` de cobe → alignement au pixel tant qu'on passe les mêmes
 * scale/offset/devicePixelRatio/markerElevation qu'à `createGlobe`.
 * `visible` = hémisphère avant strict (zv ≥ 0).
 */
export function project(
  lat: number,
  lng: number,
  phi: number,
  theta: number,
  o: ProjectOpts,
): ProjectResult {
  const scale = o.scale ?? 1
  const offX = o.offset?.[0] ?? 0
  const offY = o.offset?.[1] ?? 0
  const dpr = o.dpr ?? 1
  const elev = o.markerElevation ?? 0

  const bw = o.cssW * dpr
  const bh = o.cssH * dpr

  const r = GLOBE_RADIUS + elev
  const u = llToVec(lat, lng)
  const X = u[0] * r
  const Y = u[1] * r
  const Z = u[2] * r

  const cosT = Math.cos(theta)
  const sinT = Math.sin(theta)
  const cosP = Math.cos(phi)
  const sinP = Math.sin(phi)

  const c = cosP * X + sinP * Z
  const s = sinP * sinT * X + cosT * Y - cosP * sinT * Z
  const zv = -sinP * cosT * X + sinT * Y + cosP * cosT * Z

  const x = ((c / (bw / bh)) * scale + (offX * scale * dpr) / bw + 1) / 2
  const y = (-s * scale + (offY * scale * dpr) / bh + 1) / 2

  return { x, y, visible: zv >= 0 }
}
