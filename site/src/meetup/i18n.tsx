import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/**
 * i18n du deck — multilingue (FR / EN par défaut, extensible).
 *
 * Brique réutilisable Astek Pulse :
 *   - `LangProvider`  : langue persistée (URL `?lang=en` + localStorage), défaut `fr`.
 *   - `useLang()`     : { lang, setLang, toggleLang }.
 *   - `useT()`        : fonction `t(fr, en)` qui renvoie la chaîne de la langue active.
 *   - `tt(lang,fr,en)`: helper PUR (hors React) pour les modules de données
 *                       qui exposent `getX(lang)`.
 *
 * ── COMMENT RENDRE UN MEETUP BILINGUE ───────────────────────────────────
 *  1. Composant React : `const t = useT()` puis remplace chaque chaîne FR
 *     visible par `t('Texte FR', 'English text')` (y compris title/aria-label/alt).
 *  2. Données dynamiques : expose une fonction `getX(lang)` dans le module de
 *     données (data/*.ts) qui renvoie la MÊME forme, localisée via `tt(lang, …)`.
 *     Le composant fait `const { lang } = useLang()` puis `getX(lang)`.
 *  3. Registre `slides.ts` : renseigne `titleEn` (et `phaseEn`) sur chaque slide ;
 *     le bandeau et le sommaire les affichent automatiquement en EN.
 *  4. Pour ajouter une langue (ex. `de`) : étends le type `Lang`, ajoute le
 *     3e argument partout (ou passe à un dictionnaire), et une option au bouton.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Lang = 'fr' | 'en'

/** Helper pur (utilisable dans les modules de données non-React). */
export function tt(lang: Lang, fr: string, en: string): string {
  return lang === 'en' ? en : fr
}

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
  t: (fr: string, en: string) => string
}

const LangContext = createContext<LangContextValue | null>(null)

const STORAGE_KEY = 'astek-pulse-lang'

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'fr'
  const q = new URL(window.location.href).searchParams.get('lang')
  if (q === 'en' || q === 'fr') return q
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'fr') return stored
  return 'fr'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  const toggleLang = useCallback(() => setLang((l) => (l === 'fr' ? 'en' : 'fr')), [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    if (lang === 'en') url.searchParams.set('lang', 'en')
    else url.searchParams.delete('lang')
    window.history.replaceState({}, '', url)
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback((fr: string, en: string) => (lang === 'en' ? en : fr), [lang])

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, toggleLang, t }),
    [lang, toggleLang, t],
  )
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within <LangProvider>')
  return ctx
}

/** Raccourci : la fonction `t(fr, en)`. */
export function useT(): (fr: string, en: string) => string {
  return useLang().t
}
