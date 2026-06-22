import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Maximize2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * ZoomableImage — image cliquable avec effet shine + fullscreen overlay.
 *
 * - Hover : shimmer blanc diagonal qui traverse l'image en 1 s
 *   + léger lift (translate-y-0.5) + scale subtil
 *   + ring vert ILAB qui apparaît
 *   + badge loupe en coin qui s'affiche
 * - Click : overlay fullscreen via React Portal (échappe les transforms
 *   de SlideShell)
 * - Échap ou click backdrop : ferme
 *
 * Usage :
 *   <ZoomableImage
 *     src="/figures/02_tft_best_predictions.png"
 *     alt="Top 4 meilleures prédictions TFT"
 *     className="max-h-[58vh] w-auto rounded-lg bg-white"
 *     caption="Légende optionnelle en fullscreen"
 *   />
 */

interface ZoomableImageProps {
  src: string
  alt: string
  /** Classes appliquées à l'<img> miniature. */
  className?: string
  /** Caption optionnelle affichée sous l'image en plein écran. */
  caption?: string
}

export function ZoomableImage({
  src,
  alt,
  className,
  caption,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        e.preventDefault()
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open])

  return (
    <>
      {/* Miniature cliquable avec shimmer */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ouvrir l'image en plein écran : ${alt}`}
        className="group relative inline-block cursor-zoom-in overflow-hidden rounded-xl ring-2 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:ring-ilab-green/50 hover:shadow-xl hover:shadow-ilab-green/10"
      >
        <img src={src} alt={alt} className={cn('block', className)} />

        {/* Shine overlay — balaie en diagonale au hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-[1100ms] ease-out group-hover:translate-x-full group-hover:opacity-100"
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* Overlay sombre subtil qui apparait au hover — donne du contraste */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ilab-green/0 transition-colors duration-300 group-hover:bg-ilab-green/5"
        />

        {/* Badge loupe — toujours semi-visible, plein au hover */}
        <span className="pointer-events-none absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-ilab-green group-hover:text-white">
          <Maximize2 className="h-4 w-4" />
        </span>

        {/* Ruban "Clic pour agrandir" — apparaît en bas au hover */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-ilab-green px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white transition-transform duration-300 group-hover:translate-y-0">
          Clic pour agrandir
        </span>
      </button>

      {/* Overlay plein écran — Portal pour échapper aux transforms motion */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 animate-fade-up"
            role="dialog"
            aria-modal="true"
            style={{ position: 'fixed', inset: 0 }}
          >
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            />

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-background/90 text-foreground shadow-lg transition-all hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative z-10 flex max-h-[92vh] max-w-[95vw] flex-col items-center gap-3">
              <img
                src={src}
                alt={alt}
                className="max-h-[88vh] max-w-[95vw] rounded-xl border bg-white object-contain shadow-2xl"
              />
              {caption && (
                <p className="max-w-3xl text-center text-sm text-muted-foreground md:text-base">
                  {caption}
                </p>
              )}
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground/60">
                Cliquez ou Échap pour fermer
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
