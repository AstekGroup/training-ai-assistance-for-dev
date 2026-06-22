import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

const LandingPage = lazy(() =>
  import('@/meetup/pages/landing').then((m) => ({ default: m.LandingPage }))
)
const DeckPage = lazy(() =>
  import('@/meetup/pages/deck').then((m) => ({ default: m.DeckPage }))
)

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/slides', element: <DeckPage /> },
  { path: '/slides/:slideIndex', element: <DeckPage /> },
  { path: '*', element: <LandingPage /> },
])
