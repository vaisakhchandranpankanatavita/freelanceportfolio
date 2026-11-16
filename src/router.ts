import { useEffect, useState } from 'react'

export type Route = 'home' | 'work' | 'experience' | 'about' | 'contact'
const ROUTES: Route[] = ['home', 'work', 'experience', 'about', 'contact']

const read = (): Route => {
  const r = location.hash.replace(/^#\/?/, '').split('/')[0] as Route
  return ROUTES.includes(r) && r !== 'home' ? r : 'home'
}

/** Tiny hash router, so every page works on any static host (and inside the artifact viewer). */
export function useRoute() {
  const [route, setRoute] = useState<Route>(read)
  useEffect(() => {
    const on = () => {
      const next = read()
      if (next === route) return
      const update = () => { scrollTo(0, 0); setRoute(next) }
      const doc = document as Document & { startViewTransition?: (callback: () => void) => unknown }
      if (doc.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) doc.startViewTransition(update)
      else update()
    }
    addEventListener('hashchange', on)
    return () => removeEventListener('hashchange', on)
  }, [route])
  return route
}
