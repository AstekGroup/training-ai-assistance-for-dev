import { cn } from '@/lib/utils'

interface BrandProps {
  className?: string
  /**
   * `default` : logo full color sur light + version blanche en dark mode.
   * `light`   : force la version blanche (sur fond sombre / coloré).
   */
  variant?: 'default' | 'light'
}

/**
 * Brand — logo officiel Astek Pulse.
 *
 * Source : MCP Pulse, asset id `full-color` / `full-white`.
 * Bascule automatique light / dark via deux <img> superposées.
 */
export function Brand({ className, variant = 'default' }: BrandProps) {
  if (variant === 'light') {
    return (
      <img
        src="/logos/astek-pulse-white.svg"
        alt="Astek Pulse"
        className={cn('h-8 w-auto', className)}
        loading="lazy"
      />
    )
  }

  return (
    <span className={cn('inline-flex items-center', className)}>
      {/* Light mode : logo couleur */}
      <img
        src="/logos/astek-pulse-color.svg"
        alt="Astek Pulse"
        className="block h-8 w-auto dark:hidden"
        loading="lazy"
      />
      {/* Dark mode : logo blanc */}
      <img
        src="/logos/astek-pulse-white.svg"
        alt="Astek Pulse"
        className="hidden h-8 w-auto dark:block"
        loading="lazy"
      />
    </span>
  )
}
