import { Brand } from './brand'

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Brand />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Astek Pulse — Cellule Innovation.
          </p>
        </div>
        <div className="flex flex-col gap-1 text-sm md:items-end">
          <a
            href="https://ilab-by-astek.com"
            className="font-medium text-ilab-green hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            ilab-by-astek.com
          </a>
          <p className="text-xs text-muted-foreground">
            Pulse Meetup #1 · 30 avril 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
