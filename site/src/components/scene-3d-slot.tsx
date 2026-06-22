import { Suspense, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useWebGLSupported } from '@/hooks/use-webgl-supported'

/**
 * Socle transverse pour tout élément 3D / WebGL d'un slide.
 *
 * Contrat (le « comment intégrer de la 3D » du skill, factorisé une fois) :
 *  - `children` = le renderer 3D, déjà enveloppé en `React.lazy` par l'appelant
 *    (chunk 3D isolé, jamais dans le bundle des slides 2D) ;
 *  - bascule sur un fallback statique si WebGL est indisponible, si
 *    `prefers-reduced-motion` est actif, ou si `staticOnly` (ex: deck light) ;
 *  - `Suspense` le temps que le chunk 3D se charge.
 *
 * Le cycle de vie GPU (un seul contexte vivant, libéré au démontage) est porté
 * par le renderer lui-même (cf. `PulseGlobe`), monté/démonté avec le slide actif.
 */

interface Scene3DSlotProps {
  children: ReactNode
  /** Image de secours bundlée (offline) servie en mode statique. */
  fallbackSrc?: string
  fallbackAlt?: string
  /** Force le rendu statique (ex: variante light du deck). */
  staticOnly?: boolean
  className?: string
}

export function Scene3DSlot({
  children,
  fallbackSrc,
  fallbackAlt,
  staticOnly,
  className,
}: Scene3DSlotProps) {
  const reduced = useReducedMotion()
  const webglOk = useWebGLSupported()
  const useStatic = staticOnly || reduced || !webglOk

  if (useStatic) {
    return (
      <div className={className}>
        {fallbackSrc ? (
          <img src={fallbackSrc} alt={fallbackAlt ?? ''} className="h-full w-full object-contain" />
        ) : (
          <Scene3DPlaceholder reason={!webglOk ? 'WebGL indisponible' : 'animations réduites'} />
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      <Suspense fallback={<Scene3DPlaceholder reason="chargement de la scène 3D…" pulse />}>
        {children}
      </Suspense>
    </div>
  )
}

function Scene3DPlaceholder({ reason, pulse = false }: { reason: string; pulse?: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={`relative aspect-square w-2/3 max-w-[60vh] rounded-full border border-ilab-green/20 bg-ilab-green/5 ${
          pulse ? 'animate-pulse' : ''
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_40%,var(--ilab-green-10),transparent_70%)]" />
        <span className="absolute inset-x-0 bottom-6 text-center text-xs text-muted-foreground">
          {reason}
        </span>
      </div>
    </div>
  )
}
