/**
 * Registry des marques cités dans le meetup.
 *
 * Chaque entrée pointe vers un logo SVG (simpleicons.org CDN par défaut,
 * fichier local sinon). Les couleurs sont les couleurs officielles de
 * marque ; pour les marques sombres (Uber, Anthropic noir...), un
 * `darkColor` permet d'utiliser une version blanche en dark mode.
 *
 * Étendre ce registry avec les marques évoquées dans le meetup courant.
 * Pour les marques absentes de simpleicons.org, créer un wordmark SVG
 * dans `public/logos/<slug>.svg` et utiliser `local` au lieu de `slug`.
 */

export interface BrandInfo {
  /** Nom affiché (texte). */
  name: string
  /**
   * Slug simpleicons (https://simpleicons.org/?q=walmart).
   * Si `undefined`, utilise `local` à la place.
   */
  slug?: string
  /** Couleur officielle hex (sans #), light mode. */
  color: string
  /** Couleur fallback en dark mode si la primary contraste mal. */
  darkColor?: string
  /**
   * Chemin local relatif à `/logos/` (ex: 'google-g.svg').
   * Utilisé pour les logos multicolores iconiques (Google G, NASA meatball)
   * ou les marques absentes de simpleicons.
   */
  local?: string
  /** Lien officiel (info, pas utilisé dans le rendu). */
  url?: string
}

/**
 * Exemples génériques. Adapte / enrichis selon le sujet du meetup.
 *
 * Astuce : tester chaque slug sur https://cdn.simpleicons.org/<slug>/<color>
 * avant de l'ajouter ici. Si 404, créer un wordmark SVG local.
 */
export const BRANDS: Record<string, BrandInfo> = {
  cursor: {
    name: 'Cursor',
    slug: 'cursor',
    color: '000000',
    darkColor: 'ffffff',
    url: 'https://cursor.sh',
  },
  github: {
    name: 'GitHub',
    slug: 'github',
    color: '181717',
    darkColor: 'ffffff',
    url: 'https://github.com',
  },
  google: {
    name: 'Google',
    slug: 'google',
    color: '4285f4',
    url: 'https://google.com',
  },
  anthropic: {
    name: 'Anthropic',
    slug: 'anthropic',
    color: 'd97757',
    url: 'https://anthropic.com',
  },
  openai: {
    name: 'OpenAI',
    slug: 'openai',
    color: '412991',
    darkColor: 'ffffff',
    url: 'https://openai.com',
  },
  mistral: {
    name: 'Mistral',
    slug: 'mistralai',
    color: 'fa520a',
    url: 'https://mistral.ai',
  },
}

/**
 * Helper : URL du logo pour un brand id, en respectant le mode dark/light.
 *
 * @param id    — clé dans `BRANDS`
 * @param dark  — vrai si on veut la version dark mode (utilise `darkColor`)
 */
export function getBrandLogoUrl(id: string, dark = false): string | null {
  const brand = BRANDS[id]
  if (!brand) return null
  if (brand.local) {
    return `/logos/${brand.local}`
  }
  if (!brand.slug) return null
  const color = dark && brand.darkColor ? brand.darkColor : brand.color
  return `https://cdn.simpleicons.org/${brand.slug}/${color}`
}
