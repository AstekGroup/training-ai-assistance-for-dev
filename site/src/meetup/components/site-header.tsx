import { Link } from 'react-router'
import { ModeToggle } from '@/components/mode-toggle'
import { Brand } from './brand'
import { Button } from '@/components/ui/button'
import { PlayCircle } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <Brand />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a href="#programme" className="text-muted-foreground hover:text-foreground transition-colors">
            Programme
          </a>
          <a href="#demos" className="text-muted-foreground hover:text-foreground transition-colors">
            Démos
          </a>
          <a href="#chiffres" className="text-muted-foreground hover:text-foreground transition-colors">
            Chiffres clés
          </a>
          <a href="#speaker" className="text-muted-foreground hover:text-foreground transition-colors">
            Speaker
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button asChild size="sm" className="bg-ilab-green hover:bg-ilab-green/90 text-white">
            <Link to="/slides">
              <PlayCircle className="mr-1.5 h-4 w-4" />
              Lancer les slides
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
