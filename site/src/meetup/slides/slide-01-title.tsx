import { CalendarDays, Sparkles } from 'lucide-react'
import Aurora from '@/components/Aurora'
import { getMeetupMeta } from '@/meetup/data/meetup'
import { useLang } from '@/meetup/i18n'

/**
 * Slide 01 — Titre du meetup.
 *
 * Pattern : ouverture spectaculaire avec gradient animé Aurora + grille
 * + particules + chip "live", typographie monumentale.
 *
 * Modifie `meetup.ts` pour mettre à jour le titre / sous-titre / speaker.
 *
 * MULTILINGUE — démonstration : on lit la langue active via `useLang()` puis
 * `getMeetupMeta(lang)` (au lieu de l'objet statique `meetup`). Tout texte de
 * ce composant suit ainsi la langue. Pour les chaînes en dur, utilise `useT()`.
 */
export function Slide01Title() {
  const { lang } = useLang()
  const meetup = getMeetupMeta(lang)
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex w-full max-w-[1600px] flex-col items-center px-8 text-center">
        <div className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-ilab-green/40 bg-ilab-green/10 px-5 py-2 backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ilab-green opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ilab-green" />
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.22em] text-ilab-green">
            {meetup.edition}
          </span>
        </div>

        <h1 className="relative mb-4 text-[clamp(4rem,13vw,14rem)] font-black leading-[0.9] tracking-tighter">
          <span className="block ilab-gradient-text animate-shimmer-text">
            {meetup.title}
          </span>
        </h1>

        <p className="mt-8 max-w-4xl text-2xl text-muted-foreground md:text-3xl lg:text-4xl">
          {meetup.subtitle}
        </p>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground/80 md:text-lg lg:text-xl">
          {meetup.tagline}
        </p>

        <div className="mt-10 inline-flex items-center gap-3 rounded-full border bg-card/60 px-6 py-3 font-mono text-base shadow-sm backdrop-blur-sm md:text-lg">
          <Sparkles className="h-4 w-4 text-ilab-green" />
          <span className="text-muted-foreground">
            {meetup.format.talk} · {meetup.format.demos} · {meetup.format.qa}
          </span>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-ilab-green to-cyan-500 text-lg font-black text-white shadow-lg shadow-ilab-green/30">
              {meetup.speaker.name
                .split(' ')
                .map((s) => s[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div className="text-left">
              <div className="text-lg font-semibold">{meetup.speaker.name}</div>
              <div className="text-sm text-muted-foreground">
                {meetup.speaker.role}
              </div>
            </div>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="flex items-center gap-3 text-base text-muted-foreground md:text-lg">
            <CalendarDays className="h-5 w-5 text-ilab-green" />
            <span className="font-medium text-foreground">{meetup.date}</span>
            <span className="text-muted-foreground/40">·</span>
            <span>{meetup.duration}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 opacity-80">
        <Aurora
          colorStops={['#00bb7f', '#1e40af', '#00bb7f']}
          amplitude={1.2}
          blend={0.6}
          speed={0.8}
        />
      </div>
      <div className="absolute inset-0 ilab-grid-bg opacity-30" />
      <Particles />
    </div>
  )
}

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 3,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 6,
  }))
  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-ilab-green opacity-40"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `ilab-pulse ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </>
  )
}
