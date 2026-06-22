import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * SlidePhaseDivider — intercalaire de phase / section.
 *
 * Slide intentionnellement distincte des slides de contenu :
 * - full-bleed avec gradient fort
 * - numéro de phase massif en arrière-plan
 * - titre en serif-accent massif
 * - 3-4 items de préambule
 * - animations de reveal (stagger)
 *
 * Bypasse totalement SlideShell : c'est une respiration visuelle.
 */

export interface PhaseBullet {
  label: string
  icon?: LucideIcon
}

interface SlidePhaseDividerProps {
  /** Numéro affiché (<<03>>, <<04>>) — string pour garder le zero-padding. */
  number: string
  /** Label court au-dessus du titre (<<Phase>>, <<Section>>, <<Acte>>). */
  kicker: string
  /** Titre principal — sera mis en serif-accent. */
  title: string
  /** Sous-titre explicatif de l'intention de la phase. */
  subtitle: string
  /** Items de préambule (ce qu'on va voir dans la phase). */
  bullets?: PhaseBullet[]
  /** Icône principale affichée à côté du kicker. */
  icon?: LucideIcon
  /** Thème de couleur dominant. */
  tone?: 'green' | 'violet' | 'blue' | 'amber' | 'rose' | 'cyan'
  /**
   * Photo d'illustration optionnelle (URL CDN). Si fournie, le layout
   * passe en split : contenu à gauche, photo à droite.
   */
  photoSrc?: string
  /** Texte alternatif de la photo. Requis si `photoSrc` est fourni. */
  photoAlt?: string
}

const toneClass: Record<
  NonNullable<SlidePhaseDividerProps['tone']>,
  {
    gradient: string
    numberText: string
    accent: string
    title: string
    dot: string
    badge: string
    line: string
    bullet: string
    glow: string
  }
> = {
  green: {
    gradient: 'from-ilab-green/20 via-transparent to-transparent',
    numberText: 'text-ilab-green/10',
    accent: 'text-ilab-green',
    title: 'text-ilab-green',
    dot: 'bg-ilab-green',
    badge: 'bg-ilab-green/15 text-ilab-green',
    line: 'from-ilab-green to-transparent',
    bullet: 'bg-ilab-green/10 text-ilab-green border-ilab-green/30',
    glow: 'shadow-[0_0_120px_rgba(74,222,128,0.25)]',
  },
  violet: {
    gradient: 'from-violet-500/20 via-transparent to-transparent',
    numberText: 'text-violet-500/10',
    accent: 'text-violet-500',
    title: 'text-violet-600 dark:text-violet-400',
    dot: 'bg-violet-500',
    badge: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
    line: 'from-violet-500 to-transparent',
    bullet:
      'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30',
    glow: 'shadow-[0_0_120px_rgba(139,92,246,0.3)]',
  },
  blue: {
    gradient: 'from-blue-500/20 via-transparent to-transparent',
    numberText: 'text-blue-500/10',
    accent: 'text-blue-500',
    title: 'text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500',
    badge: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
    line: 'from-blue-500 to-transparent',
    bullet:
      'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    glow: 'shadow-[0_0_120px_rgba(59,130,246,0.3)]',
  },
  amber: {
    gradient: 'from-amber-500/20 via-transparent to-transparent',
    numberText: 'text-amber-500/10',
    accent: 'text-amber-500',
    title: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
    badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    line: 'from-amber-500 to-transparent',
    bullet:
      'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    glow: 'shadow-[0_0_120px_rgba(245,158,11,0.3)]',
  },
  rose: {
    gradient: 'from-rose-500/20 via-transparent to-transparent',
    numberText: 'text-rose-500/10',
    accent: 'text-rose-500',
    title: 'text-rose-600 dark:text-rose-400',
    dot: 'bg-rose-500',
    badge: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
    line: 'from-rose-500 to-transparent',
    bullet:
      'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    glow: 'shadow-[0_0_120px_rgba(244,63,94,0.3)]',
  },
  cyan: {
    gradient: 'from-cyan-500/20 via-transparent to-transparent',
    numberText: 'text-cyan-500/10',
    accent: 'text-cyan-500',
    title: 'text-cyan-600 dark:text-cyan-400',
    dot: 'bg-cyan-500',
    badge: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',
    line: 'from-cyan-500 to-transparent',
    bullet:
      'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    glow: 'shadow-[0_0_120px_rgba(6,182,212,0.3)]',
  },
}

export function SlidePhaseDivider({
  number,
  kicker,
  title,
  subtitle,
  bullets,
  icon: Icon,
  tone = 'green',
  photoSrc,
  photoAlt,
}: SlidePhaseDividerProps) {
  const t = toneClass[tone]
  const hasPhoto = Boolean(photoSrc)

  return (
    <div className="relative flex h-full w-full items-center overflow-hidden">
      {/* Gradient de fond — rayonne depuis la gauche */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br',
          t.gradient,
        )}
      />

      {/* Grille légère en fond (ambiance tech) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Photo d'illustration à droite (optionnelle) */}
      {hasPhoto && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block lg:w-[45%]"
          aria-hidden={!photoAlt}
        >
          <img
            src={photoSrc}
            alt={photoAlt ?? ''}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* Fondu vers la couleur tone à gauche pour intégrer la photo */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-r',
              tone === 'green' && 'from-background via-background/40 to-transparent',
              tone === 'violet' && 'from-background via-background/40 to-transparent',
              tone === 'blue' && 'from-background via-background/40 to-transparent',
              tone === 'amber' && 'from-background via-background/40 to-transparent',
              tone === 'rose' && 'from-background via-background/40 to-transparent',
              tone === 'cyan' && 'from-background via-background/40 to-transparent',
            )}
          />
        </motion.div>
      )}

      {/* Numéro massif en arrière-plan — pur décoratif (masqué si photo, conflit visuel) */}
      {!hasPhoto && (
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -bottom-16 -left-4 md:-bottom-24 md:left-0"
        >
          <span
            className={cn(
              'select-none font-black leading-none tracking-tighter',
              t.numberText,
            )}
            style={{ fontSize: 'clamp(18rem, 32vw, 38rem)' }}
          >
            {number}
          </span>
        </motion.div>
      )}

      {/* Contenu principal — largeur réduite si photo */}
      <div
        className={cn(
          'relative z-10 flex flex-col gap-8 px-10 py-16 md:gap-10 md:px-16',
          hasPhoto
            ? 'w-full max-w-3xl md:max-w-[55%] lg:max-w-[55%]'
            : 'mx-auto w-full max-w-6xl',
        )}
      >
        {/* Kicker — badge + numéro lisible + ligne */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          {Icon && (
            <div
              className={cn(
                'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl backdrop-blur-sm md:h-16 md:w-16',
                t.badge,
                t.glow,
              )}
            >
              <Icon className="h-6 w-6 md:h-7 md:w-7" />
            </div>
          )}
          <div className="flex items-baseline gap-3">
            <span className={cn('font-mono text-sm font-bold', t.accent)}>
              — {number}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground md:text-sm">
              {kicker}
            </span>
          </div>
          <div className={cn('h-px flex-1 bg-gradient-to-r', t.line)} />
        </motion.div>

        {/* Titre massif — serif italic, couleur de la tone */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'font-serif italic text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-[6rem]',
            t.title,
          )}
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="max-w-3xl text-lg text-muted-foreground md:text-2xl"
        >
          {subtitle}
        </motion.p>

        {/* Bullets — ce qui arrive dans la phase */}
        {bullets && bullets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-2 flex flex-wrap gap-3"
          >
            {bullets.map((b, i) => {
              const BIcon = b.icon
              return (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.85 + i * 0.08 }}
                  className={cn(
                    'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm md:text-base',
                    t.bullet,
                  )}
                >
                  {BIcon && <BIcon className="h-4 w-4" />}
                  <span>{b.label}</span>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>

      {/* Ligne décorative bas droite */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'pointer-events-none absolute bottom-10 right-10 h-1 w-40 origin-right rounded-full md:w-72',
          t.dot,
        )}
      />
    </div>
  )
}
