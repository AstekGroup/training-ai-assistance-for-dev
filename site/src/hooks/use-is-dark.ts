import { useEffect, useState } from 'react'

/**
 * Indique si le thème sombre est actif (classe `.dark` sur la racine, posée par
 * le ThemeProvider). Réactif : observe les changements de classe pour que les
 * éléments 3D adaptent leurs couleurs au basculement de thème.
 */
export function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const obs = new MutationObserver(() => setIsDark(root.classList.contains('dark')))
    obs.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  return isDark
}
