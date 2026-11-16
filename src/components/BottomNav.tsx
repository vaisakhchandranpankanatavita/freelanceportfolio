import { NAV } from '../data'

/** Site navigation placed at the bottom of each inner page, matching the homepage. */
export default function BottomNav({ route }: { route: string }) {
  return (
    <nav className="bnav" aria-label="Primary">
      <a href="#/" className={route === 'home' ? 'on' : ''} aria-current={route === 'home' ? 'page' : undefined}>Home</a>
      {NAV.map(n => (
        <a key={n.href} href={n.href} className={route === n.route ? 'on' : ''} aria-current={route === n.route ? 'page' : undefined}>{n.label}</a>
      ))}
    </nav>
  )
}
