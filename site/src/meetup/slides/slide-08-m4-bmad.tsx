import { bmadPhases } from '@/meetup/data/course-content'

export function Slide08M4Bmad() {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-12 py-10">
      <div className="w-full max-w-[1200px]">
        <div className="mb-8 text-center">
          <div className="ilab-overline mb-3">Module 4 · 16h00–16h45</div>
          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            <span className="text-ilab-green">BMAD</span>-METHOD
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Méthode de développement logiciel utilisant les agents IA — Brainstorm · Model · Architect · Develop.
            Voir{' '}
            <a href="https://bmadcodes.com/" className="text-ilab-green underline" target="_blank" rel="noreferrer">
              bmadcodes.com
            </a>
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {bmadPhases.map((p, i) => (
            <div key={p.phase} className="relative rounded-2xl border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-ilab-green text-sm font-black text-white">
                {p.phase[0]}
              </div>
              <h3 className="text-xl font-bold">{p.phase}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              {i < bmadPhases.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden text-ilab-green md:block">→</span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          TP guidé : installation, déroulé, lecture des livrables générés par les agents à chaque phase.
        </p>
      </div>
    </div>
  )
}
