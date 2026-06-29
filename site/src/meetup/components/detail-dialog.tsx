import type { ReactNode } from 'react'
import { MousePointerClick } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export interface DetailSection {
  title: string
  content: ReactNode
}

interface DetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  sections: DetailSection[]
}

export function DetailDialog({
  open,
  onOpenChange,
  title,
  description,
  sections,
}: DetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          {description && <DialogDescription className="text-base">{description}</DialogDescription>}
        </DialogHeader>
        <div className="space-y-6 pt-2">
          {sections.map((s) => (
            <section key={s.title}>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-ilab-green">
                {s.title}
              </h3>
              <div className="text-base leading-relaxed text-muted-foreground">{s.content}</div>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ClickableDetailTriggerProps {
  onClick: () => void
  title: string
  summary?: string
  className?: string
  children?: ReactNode
  /** @deprecated Préférer `size="compact"` */
  compact?: boolean
  size?: 'default' | 'cozy' | 'compact'
}

const triggerSizes = {
  default: {
    button: 'rounded-xl p-4',
    title: '',
    summary: 'mt-1 line-clamp-2 text-sm',
    icon: 'h-4 w-4',
    showHint: true,
    gap: 'gap-3',
  },
  cozy: {
    button: 'rounded-xl p-3',
    title: 'text-[0.9375rem] leading-snug',
    summary: 'mt-1 line-clamp-2 text-sm leading-relaxed',
    icon: 'h-3.5 w-3.5',
    showHint: false,
    gap: 'gap-2.5',
  },
  compact: {
    button: 'rounded-lg p-2',
    title: 'text-sm leading-snug',
    summary: 'mt-0.5 line-clamp-1 text-xs',
    icon: 'h-3 w-3',
    showHint: false,
    gap: 'gap-2',
  },
} as const

export function ClickableDetailTrigger({
  onClick,
  title,
  summary,
  className = '',
  children,
  compact = false,
  size,
}: ClickableDetailTriggerProps) {
  const resolvedSize = size ?? (compact ? 'compact' : 'default')
  const styles = triggerSizes[resolvedSize]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full border bg-card text-left shadow-sm transition-all hover:border-ilab-green/50 hover:bg-ilab-green/5 hover:shadow-md ${styles.button} ${className}`}
    >
      <div className={`flex items-start justify-between ${styles.gap}`}>
        <div className="min-w-0 flex-1">
          <div
            className={`font-semibold text-foreground group-hover:text-ilab-green ${styles.title}`}
          >
            {title}
          </div>
          {summary && (
            <p className={`text-muted-foreground ${styles.summary}`}>{summary}</p>
          )}
          {children}
        </div>
        <MousePointerClick
          className={`mt-0.5 shrink-0 text-muted-foreground/50 group-hover:text-ilab-green ${styles.icon}`}
        />
      </div>
      {styles.showHint && (
        <div className="mt-2 text-xs text-muted-foreground/70 opacity-0 transition-opacity group-hover:opacity-100">
          Cliquer pour le détail
        </div>
      )}
    </button>
  )
}
