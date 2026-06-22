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
}

export function ClickableDetailTrigger({
  onClick,
  title,
  summary,
  className = '',
  children,
}: ClickableDetailTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full rounded-xl border bg-card p-4 text-left shadow-sm transition-all hover:border-ilab-green/50 hover:bg-ilab-green/5 hover:shadow-md ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="font-semibold text-foreground group-hover:text-ilab-green">{title}</div>
          {summary && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{summary}</p>}
          {children}
        </div>
        <MousePointerClick className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50 group-hover:text-ilab-green" />
      </div>
      <div className="mt-2 text-xs text-muted-foreground/70 opacity-0 transition-opacity group-hover:opacity-100">
        Cliquer pour le détail
      </div>
    </button>
  )
}
