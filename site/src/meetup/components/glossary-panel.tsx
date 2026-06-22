import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  BookOpen,
  ChevronRight,
  Keyboard,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { glossary, type GlossaryCategory, type GlossaryEntry } from '@/meetup/data/glossary'

/**
 * GlossaryPanel — panneau latéral de glossaire accessible partout dans le deck.
 *
 * Ouvre / ferme :
 *   - Touche `G` (hors input) toggle l'ouverture
 *   - Touche `Échap` ferme
 *   - Click backdrop ou bouton X ferme
 *
 * Utilise un Portal vers document.body pour échapper aux transforms
 * motion de SlideShell. Ignore `G` si l'utilisateur tape dans un champ
 * texte ou a une combinaison modifier (évite conflit avec raccourcis).
 */

const CATEGORY_ORDER: GlossaryCategory[] = [
  'Métrique',
  'Modèle',
  'Concept',
  'Paramètre',
  'Dataset',
]

const categoryColor: Record<
  GlossaryCategory,
  { text: string; bg: string; border: string }
> = {
  Métrique: {
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  Modèle: {
    text: 'text-ilab-green',
    bg: 'bg-ilab-green/10',
    border: 'border-ilab-green/30',
  },
  Concept: {
    text: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
  },
  Paramètre: {
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
  Dataset: {
    text: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
  },
}

interface GlossaryPanelProps {
  /** Pilule visible ou masquee (suit l'auto-hide UI du deck). */
  showPill?: boolean
}

export function GlossaryPanel({ showPill = true }: GlossaryPanelProps = {}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeTerm, setActiveTerm] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Focus auto le champ de recherche dès l'ouverture du panneau
  useEffect(() => {
    if (!open) return
    // requestAnimationFrame pour laisser le panel se monter avant le focus
    const id = requestAnimationFrame(() => {
      searchInputRef.current?.focus()
      searchInputRef.current?.select()
    })
    return () => cancelAnimationFrame(id)
  }, [open])

  // Listener clavier global : G toggle, Escape close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)

      if (e.key === 'Escape' && open) {
        e.stopImmediatePropagation()
        e.preventDefault()
        setOpen(false)
        setActiveTerm(null)
        return
      }

      if (
        (e.key === 'g' || e.key === 'G') &&
        !isInput &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }

    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return glossary
    return glossary.filter((e) => {
      return (
        e.term.toLowerCase().includes(q) ||
        e.fullName?.toLowerCase().includes(q) ||
        e.short.toLowerCase().includes(q) ||
        e.detail.toLowerCase().includes(q)
      )
    })
  }, [query])

  const grouped = useMemo(() => {
    const out: Record<GlossaryCategory, GlossaryEntry[]> = {
      Métrique: [],
      Modèle: [],
      Concept: [],
      Paramètre: [],
      Dataset: [],
    }
    filtered.forEach((e) => out[e.category].push(e))
    return out
  }, [filtered])

  const active = activeTerm
    ? glossary.find((e) => e.term === activeTerm) ?? null
    : null

  if (typeof document === 'undefined') return null

  return createPortal(
    <>
      {/* Pilule indice clavier — visible même fermé */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le glossaire (G)"
        className={`group fixed bottom-20 right-5 z-[90] flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-bold text-muted-foreground shadow-md backdrop-blur-md transition-all duration-500 hover:border-ilab-green/50 hover:bg-ilab-green/10 hover:text-ilab-green ${
          open || !showPill
            ? 'pointer-events-none translate-y-4 opacity-0'
            : 'translate-y-0 opacity-80'
        }`}
      >
        <BookOpen className="h-3.5 w-3.5" />
        Glossaire
        <kbd className="rounded bg-muted px-1 py-0.5 font-mono text-[10px]">
          G
        </kbd>
      </button>

      {/* Backdrop + panel */}
      <div
        className={`fixed inset-0 z-[95] transition-opacity duration-300 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ position: 'fixed', inset: 0 }}
      >
        <button
          type="button"
          aria-label="Fermer le glossaire"
          onClick={() => {
            setOpen(false)
            setActiveTerm(null)
          }}
          className="absolute inset-0 bg-background/40 backdrop-blur-sm"
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col border-l bg-card shadow-2xl transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Glossaire du meetup"
        >
          {/* Header */}
          <div className="relative shrink-0 border-b bg-gradient-to-br from-ilab-green/10 via-transparent to-transparent px-5 py-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ilab-green/15 text-ilab-green">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="ilab-overline text-[10px] text-ilab-green">
                  Pulse Meetup #1
                </div>
                <h3 className="text-base font-black tracking-tight md:text-lg">
                  Glossaire
                </h3>
                <p className="text-xs text-muted-foreground">
                  {glossary.length} termes · métriques, modèles, concepts
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setActiveTerm(null)
                }}
                aria-label="Fermer"
                className="flex h-9 w-9 items-center justify-center rounded-full border bg-background/80 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Recherche */}
            <div className="mt-3 flex items-center gap-2 rounded-xl border bg-background px-3 py-2 text-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un terme…"
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-xs text-muted-foreground hover:text-foreground"
                  aria-label="Effacer la recherche"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Body : soit détail d'un terme, soit liste par catégorie */}
          <div className="flex-1 overflow-y-auto">
            {active ? (
              <EntryDetail
                entry={active}
                onClose={() => setActiveTerm(null)}
                onFollow={(term) => setActiveTerm(term)}
              />
            ) : (
              <EntryList
                grouped={grouped}
                onSelect={(term) => setActiveTerm(term)}
                query={query}
              />
            )}
          </div>

          {/* Footer — hint clavier */}
          <div className="flex items-center justify-between gap-3 border-t bg-muted/30 px-5 py-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Keyboard className="h-3 w-3" />
              <kbd className="rounded bg-muted px-1 py-0.5 font-mono">G</kbd>{' '}
              toggle ·{' '}
              <kbd className="rounded bg-muted px-1 py-0.5 font-mono">Échap</kbd>{' '}
              ferme
            </span>
            <span className="flex items-center gap-1 uppercase tracking-widest">
              <Sparkles className="h-3 w-3 text-ilab-green" />
              Ineat Lab
            </span>
          </div>
        </aside>
      </div>
    </>,
    document.body,
  )
}

/* ============================================================
 * Liste par catégorie
 * ============================================================ */

interface EntryListProps {
  grouped: Record<GlossaryCategory, GlossaryEntry[]>
  onSelect: (term: string) => void
  query: string
}

function EntryList({ grouped, onSelect, query }: EntryListProps) {
  const totalFound = Object.values(grouped).reduce((acc, arr) => acc + arr.length, 0)

  if (totalFound === 0) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        Aucun terme ne correspond à «&nbsp;
        <strong className="text-foreground">{query}</strong>
        &nbsp;».
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {CATEGORY_ORDER.map((cat) => {
        const entries = grouped[cat]
        if (entries.length === 0) return null
        const c = categoryColor[cat]
        return (
          <section key={cat}>
            <div
              className={`mb-2 inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${c.border} ${c.bg} ${c.text}`}
            >
              {cat}
              <span className="text-muted-foreground/80">· {entries.length}</span>
            </div>
            <ul className="space-y-1">
              {entries.map((e) => (
                <li key={e.term}>
                  <button
                    type="button"
                    onClick={() => onSelect(e.term)}
                    className="group flex w-full items-start gap-3 rounded-xl border border-transparent px-3 py-2 text-left transition-all hover:border-muted-foreground/20 hover:bg-muted/40"
                  >
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold">{e.term}</span>
                        {e.fullName && (
                          <span className="text-[10px] text-muted-foreground">
                            · {e.fullName}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                        {e.short}
                      </p>
                    </div>
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

/* ============================================================
 * Détail d'un terme
 * ============================================================ */

interface EntryDetailProps {
  entry: GlossaryEntry
  onClose: () => void
  onFollow: (term: string) => void
}

function EntryDetail({ entry, onClose, onFollow }: EntryDetailProps) {
  const c = categoryColor[entry.category]

  return (
    <div className="p-5">
      <button
        type="button"
        onClick={onClose}
        className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Retour à la liste
      </button>

      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-black tracking-tight md:text-3xl">
          {entry.term}
        </h4>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${c.border} ${c.bg} ${c.text}`}
        >
          {entry.category}
        </span>
      </div>
      {entry.fullName && (
        <p className="mt-1 text-sm italic text-muted-foreground">
          {entry.fullName}
        </p>
      )}

      <p className={`mt-4 rounded-xl bg-muted/40 p-3 text-sm font-medium ${c.text}`}>
        {entry.short}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-foreground/90 md:text-base">
        {entry.detail}
      </p>

      {entry.formula && (
        <div className="mt-4 rounded-xl border-l-4 border-ilab-green bg-muted/30 p-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ilab-green">
            Formule
          </div>
          <p className="mt-1 font-mono text-sm">{entry.formula}</p>
        </div>
      )}

      {entry.example && (
        <div className="mt-3 rounded-xl border-l-4 border-amber-500 bg-amber-500/5 p-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Exemple
          </div>
          <p className="mt-1 text-sm">{entry.example}</p>
        </div>
      )}

      {entry.related && entry.related.length > 0 && (
        <div className="mt-5">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Voir aussi
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {entry.related.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onFollow(r)}
                className="rounded-full border bg-card px-3 py-1 text-xs font-bold text-foreground transition-all hover:border-ilab-green/50 hover:bg-ilab-green/10 hover:text-ilab-green"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
