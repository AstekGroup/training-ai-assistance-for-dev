import { Link, useNavigate } from 'react-router'
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Languages,
  Layers,
  MapPin,
  PlayCircle,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Brand } from '@/meetup/components/brand'
import { getMeetupMeta, phases, keyFigures, highlights } from '@/meetup/data/meetup'
import { slidesFull, slidesLight } from '@/meetup/data/slides'
import { useDeckVariant } from '@/meetup/providers/deck-variant'
import { useLang, useT } from '@/meetup/i18n'
import { ModeToggle } from '@/components/mode-toggle'

/**
 * Page d'accueil du meetup.
 *
 * Sections :
 * - Header sticky (Brand + dark mode + CTA "Lancer le deck")
 * - Hero (titre, subtitle, tagline, CTA primary + secondary, infos pratiques)
 * - Highlights (3-5 points forts)
 * - Chiffres-clés
 * - Programme (phases avec durée)
 * - Speaker
 * - Footer
 *
 * Toutes les data viennent de `src/meetup/data/meetup.ts`.
 *
 * MULTILINGUE — cette page démontre les 3 mécanismes i18n :
 *   - getter `getMeetupMeta(lang)` pour les données du meetup ;
 *   - `useT()` pour les chaînes en dur du chrome ;
 *   - un bouton de bascule de langue dans le header.
 * Les modules `phases` / `keyFigures` / `highlights` restent statiques ici
 * (contenu placeholder) ; applique-leur le même pattern `getX(lang)` que
 * `getMeetupMeta` quand tu remplis ton meetup. Voir `i18n.tsx`.
 */
export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Highlights />
        <KeyFigures />
        <Program />
        <Speaker />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  const { lang, toggleLang, t } = useLang()
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Brand />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('Passer en anglais', 'Switch to French')}
            title={t('Passer en anglais', 'Switch to French')}
            className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:border-ilab-green/50 hover:text-ilab-green"
          >
            <Languages className="h-3.5 w-3.5" />
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <ModeToggle />
          <Button asChild size="sm" className="rounded-full bg-ilab-green text-white hover:bg-ilab-green/90">
            <Link to="/slides">
              {t('Lancer le deck', 'Launch the deck')}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const { lang, t } = useLang()
  const meetup = getMeetupMeta(lang)
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 ilab-grid-bg opacity-30" />
      <div className="container relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-ilab-green/40 bg-ilab-green/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ilab-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ilab-green" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-ilab-green">
            {meetup.edition}
          </span>
        </div>

        <h1 className="mt-8 text-5xl font-black tracking-tight md:text-7xl lg:text-8xl">
          <span className="ilab-gradient-text animate-shimmer-text">
            {meetup.title}
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-2xl text-muted-foreground md:text-3xl">
          {meetup.subtitle}
        </p>

        <p className="mt-4 max-w-2xl text-base text-muted-foreground/80 md:text-lg">
          {meetup.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-ilab-green text-white hover:bg-ilab-green/90"
          >
            <Link to="/slides">
              {t('Lancer le deck', 'Launch the deck')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-ilab-green" />
            {meetup.dateFull}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-ilab-green" />
            {meetup.duration}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-ilab-green" />
            {meetup.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <Users className="h-4 w-4 text-ilab-green" />
            {meetup.audience.join(', ')}
          </span>
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  const t = useT()
  return (
    <section className="border-b bg-muted/30">
      <div className="container mx-auto max-w-7xl px-6 py-20">
        <div className="ilab-overline mb-3">{t('Points forts', 'Highlights')}</div>
        <h2 className="mb-12 text-3xl font-bold md:text-4xl">
          {t('Ce qui rend ce meetup unique', 'What makes this meetup unique')}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <Sparkles className="mb-4 h-6 w-6 text-ilab-green" />
              <h3 className="mb-2 text-lg font-bold">{h.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {h.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function KeyFigures() {
  const t = useT()
  return (
    <section className="border-b">
      <div className="container mx-auto max-w-7xl px-6 py-20">
        <div className="ilab-overline mb-3">{t('Chiffres-clés', 'Key figures')}</div>
        <h2 className="mb-12 text-3xl font-bold md:text-4xl">
          {t("Pour comprendre l'enjeu", 'To grasp what is at stake')}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {keyFigures.map((kf) => (
            <div key={kf.value} className="rounded-2xl border bg-card p-8 text-center">
              <div className="ilab-gradient-text mb-3 text-5xl font-black">
                {kf.value}
              </div>
              <div className="font-semibold">{kf.label}</div>
              <div className="mt-2 text-xs text-muted-foreground">
                {kf.detail} · {kf.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Program() {
  const { lang, t } = useLang()
  const meetup = getMeetupMeta(lang)
  return (
    <section className="border-b bg-muted/30">
      <div className="container mx-auto max-w-7xl px-6 py-20">
        <div className="ilab-overline mb-3">{t('Programme', 'Programme')} · {meetup.duration}</div>
        <h2 className="mb-12 text-3xl font-bold md:text-4xl">
          {t(`Le déroulé en ${phases.length} phases`, `The agenda in ${phases.length} phases`)}
        </h2>
        <ol className="space-y-3">
          {phases.map((p) => (
            <li
              key={p.id}
              className="flex items-start gap-4 rounded-xl border bg-card p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ilab-green/15 text-sm font-black text-ilab-green">
                {String(p.id).padStart(2, '0')}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-lg font-bold">{p.label}</h3>
                  <span className="text-xs font-mono text-muted-foreground">
                    {p.duration}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Speaker() {
  const { lang, t } = useLang()
  const meetup = getMeetupMeta(lang)
  return (
    <section className="border-b">
      <div className="container mx-auto max-w-7xl px-6 py-20">
        <div className="ilab-overline mb-3">{t('Speaker', 'Speaker')}</div>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-ilab-green to-cyan-500 text-2xl font-black text-white shadow-lg shadow-ilab-green/30">
            {meetup.speaker.name
              .split(' ')
              .map((s) => s[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div>
            <div className="text-2xl font-bold">{meetup.speaker.name}</div>
            <div className="text-base text-muted-foreground">
              {meetup.speaker.role}
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {meetup.speaker.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  const t = useT()
  return (
    <section className="border-b bg-ilab-green/5">
      <div className="container mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          {t('Prêt·e à plonger dans le deck ?', 'Ready to dive into the deck?')}
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          {t('Naviguer avec les flèches · F pour le mode plein écran ·', 'Navigate with the arrows · F for fullscreen mode ·')}{' '}
          <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">G</kbd>{' '}
          {t('pour le glossaire ·', 'for the glossary ·')}{' '}
          <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">S</kbd>{' '}
          {t('pour le sommaire · sur mobile :', 'for the contents · on mobile:')} <em>swipe</em> {t('gauche/droite', 'left/right')}
        </p>
        <DeckVariantCtas />
      </div>
    </section>
  )
}

/**
 * 2 CTAs : deck complet (full) vs version light.
 * Cf. `references/deck-variants.md` du skill.
 * Retire cette section si tu n'as qu'une seule variante de deck.
 */
function DeckVariantCtas() {
  const { setVariant } = useDeckVariant()
  const navigate = useNavigate()
  const t = useT()

  const launch = (v: 'full' | 'light') => {
    setVariant(v)
    navigate('/slides/1')
  }

  return (
    <div className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-2">
      <button
        type="button"
        onClick={() => launch('full')}
        className="group flex flex-col gap-3 rounded-3xl border-2 border-ilab-green/40 bg-card p-6 text-left shadow-lg shadow-ilab-green/10 transition-all hover:-translate-y-0.5 hover:border-ilab-green hover:shadow-xl hover:shadow-ilab-green/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ilab-green/15 text-ilab-green">
            <Layers className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-ilab-green">
            {t('Complet', 'Full')}
          </span>
        </div>
        <div>
          <div className="text-2xl font-black">{t('Deck complet', 'Full deck')}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            {t(`${slidesFull.length} slides · version live du meetup`, `${slidesFull.length} slides · live meetup version`)}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm font-bold text-ilab-green transition-transform group-hover:translate-x-0.5">
          <PlayCircle className="h-4 w-4" />
          {t('Lancer le deck complet', 'Launch the full deck')}
          <ArrowRight className="h-4 w-4" />
        </div>
      </button>

      <button
        type="button"
        onClick={() => launch('light')}
        className="group flex flex-col gap-3 rounded-3xl border bg-card p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <Zap className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            {t('Light', 'Light')}
          </span>
        </div>
        <div>
          <div className="text-2xl font-black">{t('Version light', 'Light version')}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            {t(`${slidesLight.length} slides · essentiel narratif · teaser / replay`, `${slidesLight.length} slides · narrative essentials · teaser / replay`)}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm font-bold text-foreground/80 transition-transform group-hover:translate-x-0.5">
          <PlayCircle className="h-4 w-4" />
          {t('Lancer la version light', 'Launch the light version')}
          <ArrowRight className="h-4 w-4" />
        </div>
      </button>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-muted/40">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-3">
          <Brand />
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ILAB by Astek ·{' '}
          <a
            href="https://ilab-by-astek.com"
            className="underline hover:text-foreground"
          >
            ilab-by-astek.com
          </a>
        </p>
      </div>
    </footer>
  )
}
