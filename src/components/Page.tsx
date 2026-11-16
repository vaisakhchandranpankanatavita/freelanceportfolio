import type { ReactNode } from 'react'
import { NAV } from '../data'
import type { Route } from '../router'

/** Wraps an inner page with a "next page" footer link. */
export default function Page({ route, children }: { route: Route; children: ReactNode }) {
  const i = NAV.findIndex(n => n.route === route)
  const next = NAV[(i + 1) % NAV.length]
  return (
    <div className="page">
      {children}
      {route !== 'contact' && (
        <a className="next" href={next.href}>
          <small>Next</small>
          <span>{next.label} <i>→</i></span>
        </a>
      )}
    </div>
  )
}
