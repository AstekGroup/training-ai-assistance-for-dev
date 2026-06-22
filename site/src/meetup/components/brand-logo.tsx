import { useState } from 'react'
import { BRANDS, getBrandLogoUrl } from '@/meetup/data/brands'

/**
 * BrandLogo — affiche le logo d'une marque avec gestion light/dark mode.
 *
 * Source : simpleicons.org via CDN (couleurs officielles) ou fichier
 * SVG local sous `/logos/`. Voir `data/brands.ts` pour le registry.
 *
 * Comportement :
 * - Si `showLabel`, le nom de la marque s'affiche après le logo
 * - Si le SVG ne charge pas (404, CDN down), fallback silencieux sur
 *   le label texte seul (jamais de cassure visuelle)
 * - Versions light/dark indépendantes pour les marques au logo sombre
 *   (Uber noir → blanc en dark mode)
 *
 * Usage :
 *   <BrandLogo id="walmart" showLabel size="md" />
 *   <BrandLogo id="amazon" />  // logo seul, taille sm
 */

interface BrandLogoProps {
  /** Clé dans `BRANDS` (registry). */
  id: string
  /** Taille du logo. Défaut : `sm` (h-4 w-4). */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Affiche le nom de la marque à côté du logo. */
  showLabel?: boolean
  /** Position du label par rapport au logo. */
  labelPosition?: 'right' | 'bottom'
  /** Classes additionnelles sur le wrapper. */
  className?: string
  /** Classes additionnelles sur le label texte. */
  labelClassName?: string
}

// Hauteurs en `h-X w-auto` : les logos icon-only restent carrés (viewBox
// SVG square), les wordmarks (Picnic, Nixtla, Google avec son G+wordmark)
// s'étendent en largeur en gardant leur ratio. Plus de squish.
const SIZE_CLASS: Record<NonNullable<BrandLogoProps['size']>, string> = {
  xs: 'h-3 w-auto',
  sm: 'h-5 w-auto',
  md: 'h-7 w-auto',
  lg: 'h-10 w-auto',
  xl: 'h-14 w-auto',
  '2xl': 'h-20 w-auto',
}

export function BrandLogo({
  id,
  size = 'sm',
  showLabel = false,
  labelPosition = 'right',
  className = '',
  labelClassName = '',
}: BrandLogoProps) {
  const brand = BRANDS[id]
  const [errorLight, setErrorLight] = useState(false)
  const [errorDark, setErrorDark] = useState(false)
  if (!brand) return null

  const lightUrl = getBrandLogoUrl(id, false)
  const darkUrl = getBrandLogoUrl(id, true)
  const sizeClass = SIZE_CLASS[size]
  const hasDistinctDark = brand.darkColor && darkUrl !== lightUrl

  const wrapperClass =
    labelPosition === 'bottom'
      ? `inline-flex flex-col items-center gap-1 ${className}`
      : `inline-flex items-center gap-1.5 ${className}`

  return (
    <span className={wrapperClass}>
      {/* Logo image — version light */}
      {lightUrl && !errorLight && (
        <img
          src={lightUrl}
          alt={brand.name}
          loading="lazy"
          decoding="async"
          onError={() => setErrorLight(true)}
          className={`${sizeClass} object-contain ${
            hasDistinctDark ? 'block dark:hidden' : ''
          }`}
        />
      )}
      {/* Logo image — version dark (uniquement si darkColor distinct) */}
      {hasDistinctDark && darkUrl && !errorDark && (
        <img
          src={darkUrl}
          alt={brand.name}
          loading="lazy"
          decoding="async"
          onError={() => setErrorDark(true)}
          className={`${sizeClass} hidden object-contain dark:block`}
        />
      )}
      {/* Label texte — affiché si demandé OU si les 2 versions ont échoué */}
      {(showLabel || (errorLight && (!hasDistinctDark || errorDark))) && (
        <span className={`font-semibold ${labelClassName}`}>{brand.name}</span>
      )}
    </span>
  )
}
