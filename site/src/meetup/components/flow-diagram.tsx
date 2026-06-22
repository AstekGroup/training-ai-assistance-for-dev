import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { ArcherContainer, ArcherElement, type ArcherContainerRef } from 'react-archer'

/**
 * FlowDiagram — schéma de flux animé, piloté pas-à-pas.
 *
 * 3e brique réutilisable des decks Astek Pulse, à côté de :
 *   - SpotlightGrid    (juxtaposition / grille « projecteur puis rangement »)
 *   - ConcentricReveal (inclusion / cercles concentriques)
 *   - FlowDiagram      (flux / graphe : des nœuds reliés par des flèches)
 *
 * Les flèches et leurs points d'attache sont gérés par **react-archer**
 * (lib maintenue, React 19) : on ne dessine plus aucune géométrie SVG à la
 * main. On ne pilote que :
 *   - le positionnement des nœuds (en % du conteneur, robuste au resize),
 *   - leur apparition / fondu progressif via `motion` (halo, tremblement…),
 *   - quelles relations (arêtes) sont actives à chaque `step`.
 *
 * Chaque nœud / arête a un `appearAt` (étape d'apparition) et un `fadeAt`
 * optionnel (étape où il s'estompe — utile pour « le harnais se retire »).
 * Une `boundary` optionnelle dessine un cadre englobant.
 *
 * Thème clair : aucun noir en dur. Tons amber (concept) + neutre.
 * Voir `references/components-catalog.md` du skill.
 */

const EASE = [0.22, 1, 0.36, 1] as const

type Anchor = 'top' | 'bottom' | 'left' | 'right' | 'middle'
export type FlowTone = 'amber' | 'neutral' | 'model'
export type EdgeColor = 'amber' | 'green' | 'rose'

const EDGE_COLOR: Record<EdgeColor, string> = {
  amber: '#f59e0b',
  green: '#10b981',
  rose: '#f43f5e',
}

export interface FlowNode {
  id: string
  /** Centre du nœud, en % de la largeur/hauteur du conteneur. */
  x: number
  y: number
  icon: LucideIcon
  label: string
  sub?: string
  tone?: FlowTone
  size?: 'sm' | 'md'
  /** Étape (step) à laquelle le nœud apparaît. */
  appearAt: number
  /** Halo pulsant amber (LLM brut / maillon clé). */
  halo?: boolean
  /** Surligné : fond amber plein + halo (le maillon décisif). */
  highlight?: boolean
  /** Micro-tremblement (= puissance brute, imprévisible). */
  wobble?: boolean
  /** Étape à partir de laquelle le nœud s'estompe (~0.16). */
  fadeAt?: number
  /** Étape à partir de laquelle le nœud grossit légèrement (signature). */
  growAt?: number
  /** Point d'attache invisible (cible d'une flèche, sans pastille). */
  anchor?: boolean
}

export interface FlowEdge {
  id: string
  from: string
  to: string
  appearAt: number
  fadeAt?: number
  dashed?: boolean
  bidir?: boolean
  color?: EdgeColor
  label?: ReactNode
  /** Forcer les ancrages (sinon déduits des positions relatives). */
  sourceAnchor?: Anchor
  targetAnchor?: Anchor
  /** Ligne droite plutôt que courbe (par défaut : courbe). */
  straight?: boolean
}

export interface FlowBoundary {
  label: string
  appearAt: number
  /** Étape à laquelle le cadre « bat » une fois (= ça tourne par requête). */
  pulseAt?: number
  /** Rectangle englobant, en % (coin haut-gauche + largeur/hauteur). */
  x: number
  y: number
  w: number
  h: number
}

export interface FlowRing {
  /**
   * Anneau / ruban elliptique posé SOUS les nœuds (z-0) pour matérialiser
   * « ceci forme un tout ». Ellipse inscrite dans la boîte [x,y,w,h] en % :
   * elle touche le milieu de chaque côté, donc passe exactement par les
   * centres des 4 nœuds périphériques (haut/bas/gauche/droite).
   */
  x: number
  y: number
  w: number
  h: number
  /** Étape (step) à laquelle l'anneau apparaît. */
  appearAt: number
  /** Étape à partir de laquelle l'anneau s'estompe (« se retire »). */
  fadeAt?: number
  /** Libellé posé sur l'anneau (ex: « Le harnais »). */
  label?: string
  /** Position du label, en % du conteneur (à placer dans une zone libre). */
  labelX?: number
  labelY?: number
  color?: EdgeColor
}

/* ── Déduction des ancrages selon la position relative ─────────── */

function inferAnchors(s: FlowNode, t: FlowNode): { source: Anchor; target: Anchor } {
  const dx = t.x - s.x
  const dy = t.y - s.y
  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0 ? { source: 'right', target: 'left' } : { source: 'left', target: 'right' }
  }
  return dy >= 0 ? { source: 'bottom', target: 'top' } : { source: 'top', target: 'bottom' }
}

function labelColor(color: EdgeColor): string {
  if (color === 'green') return 'text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
  if (color === 'rose') return 'text-rose-600 dark:text-rose-400 border-rose-500/40'
  return 'text-amber-600 dark:text-amber-400 border-amber-500/40'
}

/* ── Un nœud ───────────────────────────────────────────────────── */

function NodeView({
  node,
  step,
  relations,
}: {
  node: FlowNode
  step: number
  relations: object[]
}) {
  // Point d'attache invisible : juste une cible pour react-archer.
  if (node.anchor) {
    return (
      <ArcherElement id={node.id} relations={relations}>
        <div
          className="absolute"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            width: 1,
            height: 1,
          }}
        />
      </ArcherElement>
    )
  }

  const visible = step >= node.appearAt
  const faded = node.fadeAt != null && step >= node.fadeAt
  const grown = node.growAt != null && step >= node.growAt
  const Icon = node.icon
  const size = node.size ?? 'md'
  const glow = (node.halo || node.highlight) && visible && !faded

  // 3 niveaux : harnais = amber · modèle (LLM) = cœur sombre distinct · le reste = neutre clair.
  const toneCls = node.highlight
    ? 'border-amber-500 bg-amber-500 text-white shadow-[0_0_50px_-8px] shadow-amber-500/60'
    : node.tone === 'model'
      ? 'border-foreground/20 bg-foreground text-background shadow-[0_0_48px_-10px] shadow-foreground/40'
      : node.tone === 'neutral'
        ? 'border-border bg-card text-foreground'
        : 'border-amber-500/55 bg-amber-500/[0.13] text-foreground'

  const iconCls = node.highlight
    ? 'text-white'
    : node.tone === 'model'
      ? 'text-background'
      : node.tone === 'neutral'
        ? 'text-muted-foreground'
        : 'text-amber-500'

  const glowCls = node.tone === 'model' ? 'bg-foreground/25' : 'bg-amber-500/40'

  const padCls =
    size === 'sm' ? 'px-5 py-3' : size === 'lg' ? 'px-8 py-5 lg:px-10 lg:py-6' : 'px-6 py-4 lg:px-8 lg:py-5'
  const iconCls2 =
    size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-9 w-9 lg:h-12 lg:w-12' : 'h-7 w-7 lg:h-9 lg:w-9'
  const labelCls =
    size === 'sm' ? 'text-sm lg:text-base' : size === 'lg' ? 'text-lg lg:text-2xl' : 'text-base lg:text-xl'
  const subCls =
    size === 'sm' ? 'text-[0.65rem] lg:text-xs' : size === 'lg' ? 'text-xs lg:text-base' : 'text-xs lg:text-sm'

  return (
    <ArcherElement id={node.id} relations={relations}>
      <motion.div
        className="absolute z-10 flex flex-col items-center"
        style={{ left: `${node.x}%`, top: `${node.y}%` }}
        initial={{ opacity: 0, x: '-50%', y: '-50%' }}
        animate={{ opacity: !visible ? 0 : faded ? 0.16 : 1, x: '-50%', y: '-50%' }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {glow && (
          <motion.span
            aria-hidden
            className={`pointer-events-none absolute inset-0 -z-10 rounded-full blur-2xl ${glowCls}`}
            animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.9, 1.15, 0.9] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          />
        )}
        <motion.div
          className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 text-center backdrop-blur-sm ${toneCls} ${padCls}`}
          animate={{
            scale: !visible ? 0.6 : grown ? 1.06 : faded ? 0.92 : 1,
            rotate: node.wobble && visible && !faded ? [-1.1, 1.1, -1.1] : 0,
          }}
          transition={
            node.wobble && visible && !faded
              ? { rotate: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' }, scale: { duration: 0.45, ease: EASE } }
              : { duration: 0.45, ease: EASE }
          }
        >
          <Icon className={`${iconCls} ${iconCls2}`} />
          <span className={`font-black leading-none ${labelCls}`}>{node.label}</span>
          {node.sub && (
            <span
              className={`leading-tight ${subCls} ${
                node.highlight
                  ? 'text-white/85'
                  : node.tone === 'model'
                    ? 'text-background/75'
                    : 'text-muted-foreground'
              }`}
            >
              {node.sub}
            </span>
          )}
        </motion.div>
      </motion.div>
    </ArcherElement>
  )
}

/* ── Le cadre englobant (boundary) ─────────────────────────────── */

function Boundary({ boundary, step }: { boundary: FlowBoundary; step: number }) {
  const visible = step >= boundary.appearAt
  const pulse = boundary.pulseAt != null && step >= boundary.pulseAt
  return (
    <motion.div
      className="pointer-events-none absolute z-0 rounded-[2rem] border-2 border-dashed border-amber-500/55 bg-amber-500/[0.04]"
      style={{
        left: `${boundary.x}%`,
        top: `${boundary.y}%`,
        width: `${boundary.w}%`,
        height: `${boundary.h}%`,
      }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: visible ? 1 : 0, scale: pulse ? [1, 1.015, 1] : 1 }}
      transition={{
        opacity: { duration: 0.5, ease: EASE },
        scale: pulse ? { duration: 1, ease: 'easeInOut' } : { duration: 0.5, ease: EASE },
      }}
    >
      <span className="absolute -top-3 left-6 bg-background px-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-amber-500/90 lg:text-xs">
        {boundary.label}
      </span>
    </motion.div>
  )
}

/* ── L'anneau / ruban (le harnais matérialisé) ─────────────────── */

function Ring({ ring, step }: { ring: FlowRing; step: number }) {
  const visible = step >= ring.appearAt
  const faded = ring.fadeAt != null && step >= ring.fadeAt
  const stroke = EDGE_COLOR[ring.color ?? 'amber']
  return (
    <>
      {/* La bande elliptique — SOUS les boîtes (z-0), au-dessus du boundary */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-[50%]"
        style={{
          left: `${ring.x}%`,
          top: `${ring.y}%`,
          width: `${ring.w}%`,
          height: `${ring.h}%`,
          border: `6px solid ${stroke}`,
          boxShadow: `0 0 0 1px ${stroke}22, 0 0 80px -8px ${stroke}, inset 0 0 70px -26px ${stroke}`,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: visible ? (faded ? 0.16 : 0.82) : 0,
          scale: visible ? 1 : 0.9,
        }}
        transition={{ duration: 0.7, ease: EASE, delay: visible && !faded ? 0.1 : 0 }}
      />
      {/* Label posé sur l'anneau (zone libre) */}
      {ring.label && ring.labelX != null && ring.labelY != null && (
        <motion.div
          className="pointer-events-none absolute z-20"
          style={{ left: `${ring.labelX}%`, top: `${ring.labelY}%` }}
          initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
          animate={{
            opacity: visible ? (faded ? 0.2 : 1) : 0,
            scale: visible ? 1 : 0.8,
            x: '-50%',
            y: '-50%',
          }}
          transition={{ duration: 0.5, ease: EASE, delay: visible && !faded ? 0.45 : 0 }}
        >
          <span
            className="inline-flex items-center whitespace-nowrap rounded-full border-2 bg-background px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.18em] shadow-lg lg:text-sm"
            style={{ color: stroke, borderColor: `${stroke}aa` }}
          >
            {ring.label}
          </span>
        </motion.div>
      )}
    </>
  )
}

/* ── Le diagramme ──────────────────────────────────────────────── */

export interface FlowDiagramProps {
  nodes: FlowNode[]
  edges: FlowEdge[]
  step: number
  boundary?: FlowBoundary
  /** Anneaux/rubans posés sous les nœuds (matérialisent « le harnais »). */
  rings?: FlowRing[]
  className?: string
}

export function FlowDiagram({ nodes, edges, step, boundary, rings, className = '' }: FlowDiagramProps) {
  const archerRef = useRef<ArcherContainerRef>(null)
  const byId = new Map(nodes.map((n) => [n.id, n]))

  // react-archer recalcule les flèches sur changement de relations / layout.
  useEffect(() => {
    archerRef.current?.refreshScreen()
  }, [step])

  const relationsFor = (node: FlowNode) =>
    edges
      .filter((e) => e.from === node.id)
      .filter((e) => step >= e.appearAt && !(e.fadeAt != null && step >= e.fadeAt))
      .map((e) => {
        const target = byId.get(e.to)
        const inferred = target
          ? inferAnchors(node, target)
          : { source: 'right' as Anchor, target: 'left' as Anchor }
        const color = e.color ?? 'amber'
        return {
          targetId: e.to,
          sourceAnchor: e.sourceAnchor ?? inferred.source,
          targetAnchor: e.targetAnchor ?? inferred.target,
          // tracé directionnel (sauf pointillés, qui gardent leur dasharray)
          className: e.dashed ? undefined : 'fd-edge-draw',
          label: e.label ? (
            <span
              className={`whitespace-nowrap rounded-full border bg-background px-2 py-0.5 text-[0.6rem] font-bold lg:text-xs ${labelColor(color)}`}
            >
              {e.label}
            </span>
          ) : undefined,
          style: {
            strokeColor: EDGE_COLOR[color],
            strokeWidth: 2,
            strokeDasharray: e.dashed ? '5,5' : undefined,
            lineStyle: (e.straight ? 'straight' : 'curve') as 'straight' | 'curve',
            endMarker: true,
            startMarker: !!e.bidir,
            endShape: { arrow: { arrowLength: 6, arrowThickness: 6 } },
          },
        }
      })

  return (
    <ArcherContainer
      ref={archerRef}
      className={`relative h-full w-full ${className}`}
      strokeColor={EDGE_COLOR.amber}
      strokeWidth={2}
      lineStyle="curve"
      offset={4}
      endShape={{ arrow: { arrowLength: 6, arrowThickness: 6 } }}
      svgContainerStyle={{ zIndex: 1 }}
    >
      {boundary && <Boundary boundary={boundary} step={step} />}
      {rings?.map((r, i) => (
        <Ring key={`ring-${i}`} ring={r} step={step} />
      ))}
      {nodes.map((n) => (
        <NodeView key={n.id} node={n} step={step} relations={relationsFor(n)} />
      ))}
    </ArcherContainer>
  )
}
