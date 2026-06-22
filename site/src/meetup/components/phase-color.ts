export type PhaseColorKey =
  | 'emerald'
  | 'amber'
  | 'violet'
  | 'cyan'
  | 'rose'
  | 'blue'

interface PhaseColorTokens {
  dot: string
  text: string
  bg: string
  border: string
  ring: string
  gradient: string
}

export const phaseColorMap: Record<PhaseColorKey, PhaseColorTokens> = {
  emerald: {
    dot: 'bg-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    ring: 'ring-emerald-500/30',
    gradient: 'from-emerald-500/20 to-emerald-500/0',
  },
  amber: {
    dot: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    ring: 'ring-amber-500/30',
    gradient: 'from-amber-500/20 to-amber-500/0',
  },
  violet: {
    dot: 'bg-violet-500',
    text: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    ring: 'ring-violet-500/30',
    gradient: 'from-violet-500/20 to-violet-500/0',
  },
  cyan: {
    dot: 'bg-cyan-500',
    text: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    ring: 'ring-cyan-500/30',
    gradient: 'from-cyan-500/20 to-cyan-500/0',
  },
  rose: {
    dot: 'bg-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    ring: 'ring-rose-500/30',
    gradient: 'from-rose-500/20 to-rose-500/0',
  },
  blue: {
    dot: 'bg-blue-500',
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    ring: 'ring-blue-500/30',
    gradient: 'from-blue-500/20 to-blue-500/0',
  },
}
