import { useState } from 'react'

/**
 * Indique si le navigateur peut créer un contexte WebGL. Garde-fou des éléments
 * 3D : si `false`, on sert un fallback statique plutôt qu'un canvas noir en plein
 * talk. Le support ne change pas au runtime → on le détecte une seule fois dans
 * l'initialiseur (pas d'effet, pas de flash).
 */
export function useWebGLSupported(): boolean {
  const [supported] = useState(() => {
    if (typeof document === 'undefined') return true
    try {
      const canvas = document.createElement('canvas')
      return Boolean(
        canvas.getContext('webgl2') ||
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl'),
      )
    } catch {
      return false
    }
  })

  return supported
}
