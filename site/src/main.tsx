import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from './components/theme-provider'
import { DeckVariantProvider } from '@/meetup/providers/deck-variant'
import { LangProvider } from '@/meetup/i18n'
import { router } from './lib/router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="astek-pulse-meetup-theme">
      <LangProvider>
        <DeckVariantProvider>
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <div className="animate-pulse text-muted-foreground">Loading…</div>
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
        </DeckVariantProvider>
      </LangProvider>
    </ThemeProvider>
  </StrictMode>
)
